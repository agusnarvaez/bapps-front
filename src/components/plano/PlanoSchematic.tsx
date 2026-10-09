"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NODES = [
  { id: "a", x: 60, y: 40, label: "01" },
  { id: "b", x: 220, y: 40, label: "02" },
  { id: "c", x: 220, y: 160, label: "03" },
  { id: "d", x: 60, y: 220, label: "04" },
  { id: "e", x: 340, y: 220, label: "05" },
];

const CONNECTORS = [
  "M60 40 H220",
  "M220 40 V160",
  "M220 160 H60 V220",
  "M220 160 H340 V220",
];

/**
 * An abstract technical schematic — nodes and orthogonal connectors, like a
 * floor plan or a circuit diagram of "the system" being built. Replaces a
 * literal product illustration with the world's own drawing language; draws
 * itself in once, the hero's signature moment.
 */
export default function PlanoSchematic({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 280"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {CONNECTORS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--plano-line-strong)"
          strokeWidth={1.5}
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={reduced ? undefined : { pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.2, 0.8, 0.3, 1] }}
        />
      ))}
      {NODES.map((node, i) => {
        const isPrimary = node.id === "d";
        return (
          <motion.g
            key={node.id}
            initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.1, ease: [0.2, 0.8, 0.3, 1] }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <rect
              x={node.x - 16}
              y={node.y - 16}
              width={32}
              height={32}
              stroke={isPrimary ? "var(--plano-stamp)" : "var(--plano-line-strong)"}
              strokeWidth={isPrimary ? 2 : 1.5}
              fill={isPrimary ? "rgba(181,67,46,0.15)" : "transparent"}
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-plano-mono)"
              fill={isPrimary ? "var(--plano-stamp)" : "var(--plano-line-strong)"}
            >
              {node.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
