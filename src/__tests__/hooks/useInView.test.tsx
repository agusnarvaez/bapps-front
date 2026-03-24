import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { useInView } from "@/hooks/useInView";
import React from "react";

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

let observeCallback: ObserverCallback | null = null;
let observedEl: Element | null = null;
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

beforeEach(() => {
  observeCallback = null;
  observedEl = null;
  unobserveMock.mockClear();
  disconnectMock.mockClear();

  vi.stubGlobal(
    "IntersectionObserver",
    class MockIntersectionObserver {
      constructor(callback: ObserverCallback) {
        observeCallback = callback;
      }
      observe(el: Element) {
        observedEl = el;
      }
      unobserve = unobserveMock;
      disconnect = disconnectMock;
    }
  );
});

/** Test component that uses the hook and renders its ref onto a div */
function TestComponent({ options = {} }: { options?: Parameters<typeof useInView>[0] }) {
  const { ref, inView } = useInView(options);
  return <div ref={ref} data-testid="target" data-inview={String(inView)} />;
}

describe("useInView", () => {
  it("returns inView=false initially", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("target").dataset.inview).toBe("false");
  });

  it("observes the element after mount", () => {
    render(<TestComponent />);
    expect(observedEl).toBeTruthy();
  });

  it("sets inView to true when element intersects", () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      observeCallback?.([{ isIntersecting: true }]);
    });

    expect(getByTestId("target").dataset.inview).toBe("true");
  });

  it("unobserves element when once=true (default) and intersecting", () => {
    render(<TestComponent options={{ once: true }} />);

    act(() => {
      observeCallback?.([{ isIntersecting: true }]);
    });

    expect(unobserveMock).toHaveBeenCalled();
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
