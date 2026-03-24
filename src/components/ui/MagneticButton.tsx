"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Magnetic pull strength (px). Set 0 to disable magnet. */
  strength?: number;
  /** Show ripple effect on click */
  ripple?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled = false,
  strength = 12,
  ripple = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(((e.clientX - centerX) / (rect.width / 2)) * strength);
      y.set(((e.clientY - centerY) / (rect.height / 2)) * strength);
    },
    [reduced, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (ripple && !reduced && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const id = Date.now();
        setRipples((prev) => [
          ...prev,
          { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
        ]);
        setTimeout(
          () => setRipples((prev) => prev.filter((r) => r.id !== id)),
          600
        );
      }
      onClick?.();
    },
    [ripple, reduced, onClick]
  );

  const motionProps = reduced
    ? {}
    : {
        style: { x: springX, y: springY },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      };

  const inner = (
    <>
      {/* Glow effect */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 24px 4px rgba(173, 96, 225, 0.25)",
        }}
        aria-hidden="true"
      />
      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/25 animate-[ripple_0.6s_ease-out_forwards]"
          style={{
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        />
      ))}
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={`group relative inline-flex items-center overflow-hidden ${className}`}
        onClick={handleClick}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={`group relative inline-flex items-center overflow-hidden ${className}`}
      onClick={handleClick}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
