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

export default function WhyUsSection() {
  const t = useTranslations("whyUs");
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="por-que-nosotros"
      className="plano-world plano-grid-paper relative scroll-mt-20 py-32 text-plano-ink"
    >
      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="font-[family-name:var(--font-plano-display)] text-4xl tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 font-[family-name:var(--font-plano-body)] text-xl text-plano-ink-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Inspection checklist — signed off item by item */}
        <div className="border-t border-plano-paper-line sm:grid sm:grid-cols-2 sm:border-t-0">
          {reasonKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
              className="flex gap-4 border-b border-plano-paper-line py-6 sm:border-t sm:py-7 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
            >
              <svg viewBox="0 0 16 16" fill="none" className="mt-1 h-4 w-4 flex-shrink-0 text-plano-blue" aria-hidden="true">
                <rect x="1" y="1" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <motion.path
                  d="M4 8.2l2.6 2.6L12 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                />
              </svg>
              <div>
                <h3 className="font-[family-name:var(--font-plano-body)] font-semibold text-plano-ink">
                  {t(`reasons.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-plano-ink-muted">
                  {t(`reasons.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Margin note — a hand-pinned annotation, not a banner alert */}
        <motion.div
          initial={{ opacity: 0, rotate: -3, y: 16 }}
          animate={inView ? { opacity: 1, rotate: -1.5, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative mt-12 max-w-md border border-dashed border-plano-ink-muted/40 bg-plano-paper px-6 py-5"
        >
          <span
            className="absolute -top-1.5 left-6 h-3 w-3 rounded-full border border-plano-stamp bg-plano-stamp/20"
            aria-hidden="true"
          />
          <p className="font-[family-name:var(--font-plano-body)] text-sm italic leading-relaxed text-plano-ink">
            {t("disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
