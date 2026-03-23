"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MagneticButton from "@/components/ui/MagneticButton";

const Rocket3D = dynamic(() => import("@/components/3d/Rocket3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduced = useReducedMotion();

  const titleParts = t("title").split(t("highlight"));

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Particles */}
      <ParticlesBackground />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-background" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-32 bg-gradient-to-t from-background to-transparent" />

      {/* 3D Rocket - desktop only, skip when reduced motion */}
      {!reduced && (
        <div className="pointer-events-none absolute right-0 top-0 z-[2] hidden h-full w-1/2 lg:block">
          <Rocket3D />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-bapps-purple/30 bg-bapps-purple/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-bapps-yellow animate-pulse" />
            <span className="text-sm font-medium text-bapps-purple-light">
              {t("badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {titleParts[0]}
            <span className="relative inline-block text-bapps-purple">
              {t("highlight")}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-bapps-yellow"
              />
            </span>
            {titleParts[1]}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href={`/${locale}/contact`}
              className="btn-shimmer rounded-full bg-bapps-purple px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-bapps-purple/30"
            >
              <span className="inline-flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
                </svg>
                {t("cta")}
              </span>
            </MagneticButton>
            <MagneticButton
              href={`/${locale}/projects`}
              className="rounded-full border border-border px-8 py-3.5 text-base font-medium text-foreground-muted transition-all duration-300 hover:border-bapps-purple/50 hover:text-foreground"
              ripple={false}
            >
              <span className="inline-flex items-center gap-2">
                {t("ctaSecondary")}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>
          </motion.div>

          {/* Section nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {([
              { key: "navServices", hash: "#servicios" },
              { key: "navProcess", hash: "#proceso" },
            ] as const).map(({ key, hash }) => (
              <a
                key={key}
                href={hash}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground-muted transition-all duration-200 hover:border-bapps-purple/50 hover:text-foreground"
              >
                {t(key)}
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-foreground-subtle">
                  <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-10 w-6 rounded-full border-2 border-foreground-subtle p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-bapps-purple"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
