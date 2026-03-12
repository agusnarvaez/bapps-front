"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Perspective value */
  perspective?: number;
  /** Glow on hover */
  glow?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  perspective = 800,
  glow = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const xPos = (e.clientX - rect.left) / rect.width;
      const yPos = (e.clientY - rect.top) / rect.height;

      rotateX.set((yPos - 0.5) * -maxTilt * 2);
      rotateY.set((xPos - 0.5) * maxTilt * 2);
      glowX.set(xPos * 100);
      glowY.set(yPos * 100);
    },
    [reduced, maxTilt, rotateX, rotateY, glowX, glowY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(173,96,225,0.12) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}
