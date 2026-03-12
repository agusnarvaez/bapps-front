import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

describe("useReducedMotion", () => {
  let listeners: Array<(e: { matches: boolean }) => void>;
  let mockMatches: boolean;

  beforeEach(() => {
    listeners = [];
    mockMatches = false;

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        get matches() {
          return mockMatches;
        },
        addEventListener: (_event: string, handler: (e: { matches: boolean }) => void) => {
          listeners.push(handler);
        },
        removeEventListener: (_event: string, handler: (e: { matches: boolean }) => void) => {
          listeners = listeners.filter((l) => l !== handler);
        },
      })),
    });
  });

  afterEach(() => {
    listeners = [];
  });

  it("returns false when no preference for reduced motion", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when user prefers reduced motion", () => {
    mockMatches = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("reacts to media query changes", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((l) => l({ matches: true }));
    });
    expect(result.current).toBe(true);

    act(() => {
      listeners.forEach((l) => l({ matches: false }));
    });
    expect(result.current).toBe(false);
  });

  it("cleans up event listener on unmount", () => {
    const { unmount } = renderHook(() => useReducedMotion());
    expect(listeners.length).toBe(1);
    unmount();
    expect(listeners.length).toBe(0);
  });
});
