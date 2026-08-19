"use client";

import { useEffect, useState } from "react";

// ponytail: defers non-critical work until the browser is idle (or a
// timeout fallback) so it doesn't compete with LCP-critical resources
// during first paint. Upgrade to a real scheduler if this ever needs
// priority levels — a single idle callback is enough for now.
export function useDeferredMount(timeoutMs = 1000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout: timeoutMs,
      });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), timeoutMs);
    return () => clearTimeout(id);
  }, [timeoutMs]);

  return ready;
}
