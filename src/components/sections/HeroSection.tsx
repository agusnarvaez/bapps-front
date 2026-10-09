"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import RegistrationMarks from "@/components/plano/RegistrationMarks";
import PlanoSchematic from "@/components/plano/PlanoSchematic";
import DrawLine from "@/components/plano/DrawLine";
import Stamp from "@/components/plano/Stamp";
import { navigateTo, isExternalHref } from "@/lib/router";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduced = useReducedMotion();

  const titleParts = t("title").split(t("highlight"));

  return (
    <section
      id="hero"
      className="plano-world plano-grid-blue relative flex min-h-screen scroll-mt-20 items-center overflow-hidden text-plano-paper"
    >
      <RegistrationMarks tone="light" />

      {/* Schematic — desktop only, the hero's signature drawn moment */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center lg:flex">
        <PlanoSchematic className="h-auto w-full max-w-md opacity-90" />
      </div>

      {/* Vignette so the grid recedes behind content on small screens */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-plano-blue via-plano-blue/95 to-transparent lg:via-plano-blue/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">
          <h1 className="font-[family-name:var(--font-plano-display)] text-4xl leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
            {titleParts[0]}
            <span className="relative inline-block text-plano-stamp">
              {t("highlight")}
              <DrawLine
                d="M2 8 Q 40 2, 80 7 T 158 6"
                viewBox="0 0 160 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-plano-stamp"
                strokeWidth={2.5}
                delay={0.5}
                duration={0.7}
              />
            </span>
            {titleParts[1]}
          </h1>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mt-6 max-w-xl pl-5"
          >
            {/* Margin callouts — leader-lines annotating the subtitle,
                like a marked-up drawing (angled marks, not text-anchored:
                the two languages don't share phrase positions) */}
            <DrawLine
              d="M0 8 L18 1"
              viewBox="0 0 18 9"
              className="absolute -left-1 top-[0.5em] h-2.5 w-4.5 text-plano-stamp"
              strokeWidth={1.5}
              delay={1}
              duration={0.35}
            />
            <DrawLine
              d="M0 8 L18 1"
              viewBox="0 0 18 9"
              className="absolute -left-1 top-[2.4em] h-2.5 w-4.5 text-plano-stamp"
              strokeWidth={1.5}
              delay={1.15}
              duration={0.35}
            />
            <p className="font-[family-name:var(--font-plano-body)] text-lg leading-relaxed text-plano-paper/80 md:text-xl">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* CTAs — the row slides in; the stamp gets its own thunk so
              nesting it inside a fading parent never hides the animation */}
          <motion.div
            initial={reduced ? undefined : { y: 16 }}
            animate={reduced ? undefined : { y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Stamp rotate={-4} delay={0.75}>
              <a
                href={`/${locale}/contact`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/${locale}/contact`);
                }}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-plano-paper/35 bg-plano-stamp px-7 py-3 font-[family-name:var(--font-plano-mono)] text-sm font-semibold uppercase tracking-wider text-plano-paper transition-transform duration-200 hover:scale-[1.03]"
              >
                {t("cta")}
              </a>
            </Stamp>

            <a
              href="https://cal.com/bapps/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-dashed border-plano-paper/40 pb-0.5 font-[family-name:var(--font-plano-mono)] text-sm tracking-wide text-plano-paper/85 transition-colors hover:border-plano-paper hover:text-plano-paper"
            >
              {t("ctaSchedule")}
            </a>

            <a
              href={`/${locale}/projects`}
              onClick={(e) => {
                if (!isExternalHref(`/${locale}/projects`)) {
                  e.preventDefault();
                  navigateTo(`/${locale}/projects`);
                }
              }}
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-plano-mono)] text-sm tracking-wide text-plano-paper/60 transition-colors hover:text-plano-paper"
            >
              {t("ctaSecondary")}
              <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Section links — plain technical annotations, not pills */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16 flex flex-wrap gap-6 font-[family-name:var(--font-plano-mono)] text-xs uppercase tracking-widest text-plano-paper/45"
          >
            <a href="#servicios" className="transition-colors hover:text-plano-paper">
              → {t("navServices")}
            </a>
            <a href="#proceso" className="transition-colors hover:text-plano-paper">
              → {t("navProcess")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Title block — bottom-left, the drawing sheet's identifying strip:
          firm, discipline, scale, sheet — the fields a real dwg carries */}
      <div className="absolute bottom-6 left-6 z-10 hidden flex-col gap-1 border-t border-plano-paper/25 pt-2 font-[family-name:var(--font-plano-mono)] text-[11px] uppercase tracking-widest text-plano-paper/50 sm:flex">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-plano-paper/75">BAPPS</span>
          <span aria-hidden="true">·</span>
          <span>{t("badge")}</span>
        </div>
        <div className="flex items-center gap-3 text-plano-paper/35">
          <span>1:1</span>
          <span aria-hidden="true">·</span>
          <span>2022</span>
          <span aria-hidden="true">·</span>
          <span>01/01</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-1 sm:flex"
        aria-hidden="true"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-8 w-px bg-plano-paper/40"
        />
        <svg viewBox="0 0 12 8" className="h-2 w-3" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" className="text-plano-paper/40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
