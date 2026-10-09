"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StampProps {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  inView?: boolean;
  delay?: number;
}

/**
 * A rubber-stamp mark: a ring-bordered, ink-grained badge that lands with a
 * single "thunk" when it scrolls into view. Wraps the actual button/link so
 * every stamp (hero CTA, closing CTA) shares one real stamp material —
 * ring border, worn ink texture, imprecise rotation — not just a tilted
 * rectangle.
 */
export default function Stamp({
  children,
  className = "",
  rotate = -3,
  inView = true,
  delay = 0,
}: StampProps) {
  const reduced = useReducedMotion();
  const filterId = useId();

  const badge = (
    <div className={`relative inline-flex ${className}`}>
      {/* outer ring — the stamp's second, looser border */}
      <span
        className="pointer-events-none absolute -inset-2 rounded-full border border-plano-stamp/45"
        aria-hidden="true"
      />
      {/* worn ink grain, bleeding slightly past the badge edge */}
      <svg
        className="pointer-events-none absolute -inset-1 rounded-full mix-blend-multiply opacity-[0.16]"
        aria-hidden="true"
      >
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );

  if (reduced) {
    return (
      <div style={{ transform: `rotate(${rotate}deg)` }}>{badge}</div>
    );
  }

  return (
    <motion.div
      style={{ ["--stamp-rotate" as string]: `${rotate}deg` }}
      initial={{ opacity: 0, scale: 1.35, rotate }}
      animate={inView ? { opacity: 1, scale: 1, rotate } : { opacity: 0, scale: 1.35, rotate }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.3, 1] }}
    >
      {badge}
    </motion.div>
  );
}
