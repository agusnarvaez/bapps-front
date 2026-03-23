"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  // All mutable cursor state lives in a single ref — no React re-renders
  const state = useRef({ hovering: false, clicking: false, visible: false });
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();

  // Apply visual state directly to the DOM, bypassing React
  const applyStyles = useCallback(() => {
    const { hovering, clicking, visible } = state.current;
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const dotSize = hovering ? 48 : clicking ? 6 : 10;
    cursor.style.width = `${dotSize}px`;
    cursor.style.height = `${dotSize}px`;
    cursor.style.opacity = visible ? "1" : "0";
    cursor.style.backgroundColor = hovering ? "var(--bapps-yellow)" : "#fff";

    const ringSize = hovering ? 56 : 36;
    trail.style.width = `${ringSize}px`;
    trail.style.height = `${ringSize}px`;
    trail.style.opacity = visible ? "0.5" : "0";
    trail.style.borderColor = hovering
      ? "var(--bapps-yellow)"
      : "var(--bapps-purple)";
  }, []);

  // RAF loop only handles transforms — no state reads
  const animate = useCallback(() => {
    trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.15;
    trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.15;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }
    if (trailRef.current) {
      trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || reduced) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!state.current.visible) {
        state.current.visible = true;
        applyStyles();
      }
    };

    const onMouseDown = () => {
      state.current.clicking = true;
      applyStyles();
    };
    const onMouseUp = () => {
      state.current.clicking = false;
      applyStyles();
    };
    const onMouseLeave = () => {
      state.current.visible = false;
      applyStyles();
    };
    const onMouseEnter = () => {
      state.current.visible = true;
      applyStyles();
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        state.current.hovering = true;
        applyStyles();
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        state.current.hovering = false;
        applyStyles();
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    rafRef.current = requestAnimationFrame(animate);
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = "";
    };
  }, [animate, applyStyles, reduced]);

  if (typeof window !== "undefined") {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || reduced) return null;
  }

  return (
    <>
      {/* Main dot — initial styles, rest applied via applyStyles() */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference rounded-full transition-[width,height,opacity,background-color] duration-200 ease-out"
        style={{
          width: 10,
          height: 10,
          opacity: 0,
          backgroundColor: "#fff",
          willChange: "transform",
        }}
      />
      {/* Trail ring */}
      <div
        ref={trailRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,opacity,border-color] duration-300 ease-out"
        style={{
          width: 36,
          height: 36,
          opacity: 0,
          borderColor: "var(--bapps-purple)",
          willChange: "transform",
        }}
      />
    </>
  );
}
