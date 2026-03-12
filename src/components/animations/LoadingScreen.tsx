"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Shorter duration for reduced-motion users
    const timeout = prefersReduced ? 400 : 2200;

    const timer = setTimeout(() => setVisible(false), timeout);
    // Prevent scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Restore scroll when dismissed
  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated glow behind logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute h-64 w-64 rounded-full bg-bapps-purple/20 blur-[80px]"
          />

          {/* Logo mark — stylized "B" */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              {/* Background circle */}
              <motion.circle
                cx="40"
                cy="40"
                r="38"
                stroke="var(--bapps-purple)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
              {/* Letter B */}
              <motion.text
                x="50%"
                y="52%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="var(--bapps-purple)"
                fontSize="36"
                fontWeight="bold"
                fontFamily="var(--font-display), sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                B
              </motion.text>
            </svg>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-wider text-foreground"
          >
            BApps
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-2 text-sm text-foreground-muted"
          >
            Software a medida
          </motion.p>

          {/* Loading bar */}
          <motion.div className="mt-8 h-0.5 w-32 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
              className="h-full w-full bg-gradient-to-r from-bapps-purple to-bapps-yellow"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
