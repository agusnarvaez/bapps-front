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
              Software a medida
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
              className="rounded-full bg-bapps-purple px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-bapps-purple/30"
            >
              {t("cta")}
              <span className="absolute inset-0 -translate-x-full bg-bapps-purple-dark transition-transform duration-300 group-hover:translate-x-0" />
            </MagneticButton>
            <MagneticButton
              href={`/${locale}/projects`}
              className="flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-base font-medium text-foreground-muted transition-all duration-300 hover:border-bapps-purple/50 hover:text-foreground"
              ripple={false}
            >
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
            </MagneticButton>
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
