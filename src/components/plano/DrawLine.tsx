"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DrawLineProps {
  /** SVG path or line points, e.g. "M0 0 L100 0" */
  d: string;
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  inView?: boolean;
  dashArray?: string;
}

/**
 * A single ink line that draws itself in, like a leader-line or dimension
 * line appearing on a drafting sheet. The one signature motion of the
 * "El Plano" world — reused for callouts, connectors, and underlines
 * instead of scattered fades/slides.
 */
export default function DrawLine({
  d,
  viewBox,
  className = "",
  strokeWidth = 1.5,
  delay = 0,
  duration = 0.8,
  inView = true,
  dashArray,
}: DrawLineProps) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
        animate={
          reduced
            ? undefined
            : inView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration, delay, ease: [0.2, 0.8, 0.3, 1] }}
      />
    </svg>
  );
}
