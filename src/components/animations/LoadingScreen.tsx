"use client";
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ponytail: module-scope flag survives SPA route changes (resets on a real
// page reload) so the intro plays once per visit, not on every click.
let hasPlayedThisSession = false;
// This overlay is opaque and full-screen, so nothing else can visually
// paint (including LCP content) until it's gone — every ms here is a
// direct tax on Core Web Vitals for every first-time visitor. Was 2200ms.
const INTRO_DURATION_MS = 1200;

export default function LoadingScreen() {
    const t = useTranslations("hero")

  const [visible, setVisible] = useState(() => !hasPlayedThisSession);

  useEffect(() => {
    // Nothing to animate — this mount already decided not to show.
    if (!visible) return;

    // Check if reduced motion is preferred
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Shorter duration for reduced-motion users
    const timeout = prefersReduced ? 400 : INTRO_DURATION_MS;

    // ponytail: only flip the module flag once the intro actually finishes —
    // setting it eagerly breaks under StrictMode's mount→cleanup→remount,
    // since the remount's effect would see it already true and never
    // re-arm the timer the first cleanup just cancelled.
    const timer = setTimeout(() => {
      setVisible(false);
      hasPlayedThisSession = true;
    }, timeout);
    // Prevent scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [visible]);

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
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute h-64 w-64 rounded-full bg-bapps-purple/20 blur-[80px]"
          />

          {/* Logo mark — stylized "B" */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
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
                transition={{ duration: 0.65, ease: "easeInOut", delay: 0.16 }}
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
                transition={{ delay: 0.27, duration: 0.22 }}
              >
                B
              </motion.text>
            </svg>
          </motion.div>

          {/* Brand name — ponytail: not a real h1, this is a transient splash
              mark (removed from the DOM after ~1s), not page content. Having
              it as an h1 gave the page two level-1 headings. */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.27 }}
            className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-wider text-foreground"
            aria-hidden="true"
          >
            BApps
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.65, duration: 0.27 }}
            className="mt-2 text-sm text-foreground-muted"
          >
            {t("badge")}
          </motion.p>

          {/* Loading bar */}
          <motion.div className="mt-8 h-0.5 w-32 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.98, ease: "easeInOut", delay: 0.16 }}
              className="h-full w-full bg-gradient-to-r from-bapps-purple to-bapps-yellow"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
