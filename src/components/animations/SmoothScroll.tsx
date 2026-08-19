"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Skip smooth scroll when user prefers reduced motion
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Defer starting the perpetual rAF loop past first paint — native
    // scroll works fine for the ~200-500ms until this kicks in.
    let idleId: number | ReturnType<typeof setTimeout>;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => requestAnimationFrame(raf), {
        timeout: 500,
      });
    } else {
      idleId = setTimeout(() => requestAnimationFrame(raf), 200);
    }

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as ReturnType<typeof setTimeout>);
      }
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
