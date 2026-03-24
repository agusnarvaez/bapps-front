"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";

const reasonKeys = [
  "dedicated",
  "ownCode",
  "response",
  "transparent",
  "selective",
  "partnership",
] as const;

const reasonIcons: Record<(typeof reasonKeys)[number], React.ReactNode> = {
  dedicated: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  ownCode: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  response: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  transparent: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  selective: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  partnership: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
};

export default function WhyUsSection() {
  const t = useTranslations("whyUs");
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="por-que-nosotros" className="relative py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-bapps-yellow/3 blur-[140px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bapps-purple/30 bg-bapps-purple/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-bapps-yellow" />
            <span className="text-sm font-medium text-bapps-purple-light">{t("badge")}</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-xl text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasonKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="group rounded-2xl border border-border bg-background-secondary p-7 transition-all duration-300 hover:border-bapps-purple/35 hover:bg-background-tertiary hover:shadow-lg hover:shadow-bapps-purple/5"
            >
              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-bapps-purple/10 text-bapps-purple transition-all duration-300 group-hover:bg-bapps-purple/20 group-hover:shadow-md group-hover:shadow-bapps-purple/10">
                {reasonIcons[key]}
              </div>

              {/* Check mark + title */}
              <div className="mb-2 flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 flex-shrink-0 text-bapps-yellow">
                  <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-semibold text-foreground transition-colors group-hover:text-bapps-purple-light">
                  {t(`reasons.${key}.title`)}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-foreground-muted">
                {t(`reasons.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pratfall disclaimer — "what we DON'T do" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-8 flex items-start gap-4 rounded-2xl border border-bapps-yellow/20 bg-bapps-yellow/5 px-7 py-5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-5 w-5 flex-shrink-0 text-bapps-yellow">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm leading-relaxed text-foreground-muted">
            <span className="font-semibold text-foreground">{t("disclaimer")}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
