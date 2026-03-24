"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";

const stepIcons = [
  // Discovery — speech bubble / ear
  <svg key="discovery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>,
  // Design — pen tool / prototype
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>,
  // Development — code brackets
  <svg key="development" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  // Launch — rocket
  <svg key="launch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
];

const stepKeys = ["discovery", "design", "development", "launch"] as const;

export default function ProcessSection() {
  const t = useTranslations("process");
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="proceso" className="relative py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bapps-purple/[0.04] to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bapps-purple/30 bg-bapps-purple/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-bapps-yellow" />
            <span className="text-sm font-medium text-bapps-purple-light">{t("badge")}</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {/* Connector line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="mx-auto h-full origin-left bg-gradient-to-r from-bapps-purple/0 via-bapps-purple/30 to-bapps-purple/0"
              style={{ width: "calc(100% - 120px)", marginLeft: 60 }}
            />
          </div>

          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
              className="relative flex h-full flex-col"
            >
              {/* Step card */}
              <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-background-secondary p-7 transition-all duration-300 hover:border-bapps-purple/40 hover:bg-background-tertiary hover:shadow-lg hover:shadow-bapps-purple/5">
                {/* Number badge */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bapps-purple/10 text-bapps-purple transition-colors duration-300 group-hover:bg-bapps-purple/20">
                    {stepIcons[i]}
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-bapps-purple/15 transition-colors duration-300 group-hover:text-bapps-purple/25 select-none">
                    {t(`steps.${key}.number`)}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-bapps-purple-light">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-foreground-muted">
                  {t(`steps.${key}.description`)}
                </p>

                {/* Timeframe pill */}
                <div className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-bapps-purple/20 bg-bapps-purple/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-bapps-yellow" />
                  <span className="text-xs font-medium text-bapps-purple-light">
                    {t(`steps.${key}.timeframe`)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
