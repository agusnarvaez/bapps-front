import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/hooks/useCountUp";

describe("useCountUp", () => {
  let pendingCallbacks: Array<(timestamp: number) => void>;
  let rafId: number;

  beforeEach(() => {
    pendingCallbacks = [];
    rafId = 0;

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      pendingCallbacks.push(cb);
      return ++rafId;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /** Drain ONE round of queued RAF callbacks with a given timestamp */
  function stepRAF(timestamp: number) {
    const cbs = [...pendingCallbacks];
    pendingCallbacks = [];
    cbs.forEach((cb) => cb(timestamp));
  }

  it("returns 0 when start is false", () => {
    const { result } = renderHook(() => useCountUp(100, 2000, false));
    expect(result.current).toBe(0);
  });

  it("does not request animation frame when start is false", () => {
    renderHook(() => useCountUp(100, 2000, false));
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("starts animating when start is true", () => {
    renderHook(() => useCountUp(100, 2000, true));
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it("reaches the end value after full duration", () => {
    const { result } = renderHook(() => useCountUp(100, 1000, true));

    // First RAF sets startTime=500, progress=(500-500)/1000=0, schedules next
    // Second RAF at t=1500, progress=(1500-500)/1000=1, setCount(100)
    act(() => {
      stepRAF(500);
      stepRAF(1500);
    });

    expect(result.current).toBe(100);
  });

  it("returns intermediate value mid-animation", () => {
    const { result } = renderHook(() => useCountUp(100, 1000, true));

    // First RAF at t=100 sets startTime=100
    act(() => stepRAF(100));
    // Second RAF at t=600 → progress = (600-100)/1000 = 0.5
    act(() => stepRAF(600));

    // Ease-out cubic at 50%: 1 - (1 - 0.5)^3 = 0.875 → floor(87.5) = 87
    expect(result.current).toBe(87);
  });

  it("cancels animation frame on unmount", () => {
    const { unmount } = renderHook(() => useCountUp(100, 1000, true));
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});
