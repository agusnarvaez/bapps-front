"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import DrawLine from "@/components/plano/DrawLine";

const stepKeys = ["discovery", "design", "development", "launch"] as const;

function DimensionBracket({ label }: { label: string }) {
  return (
    <div className="mt-5 inline-flex items-center gap-1.5 font-[family-name:var(--font-plano-mono)] text-xs text-plano-blue-light">
      <span className="h-2 w-px bg-current" aria-hidden="true" />
      <span className="h-px w-4 bg-current" aria-hidden="true" />
      <span className="tabular-nums">{label}</span>
      <span className="h-px w-4 bg-current" aria-hidden="true" />
      <span className="h-2 w-px bg-current" aria-hidden="true" />
    </div>
  );
}

export default function ProcessSection() {
  const t = useTranslations("process");
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="proceso" className="plano-world relative scroll-mt-20 bg-background-secondary py-32 text-foreground">
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-[family-name:var(--font-plano-display)] text-4xl tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 font-[family-name:var(--font-plano-body)] text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Phasing strip — a plotted schedule, not icon cards */}
        <div className="relative grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          <DrawLine
            d="M0 0.5 H100"
            viewBox="0 0 100 1"
            dashArray="0.6 0.9"
            className="pointer-events-none absolute left-0 right-0 top-0 hidden h-px w-full text-border lg:block"
            strokeWidth={1}
            duration={1.1}
            inView={inView}
          />

          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
              className="relative"
            >
              <div className="hidden h-3 w-px bg-plano-blue-light lg:block" aria-hidden="true" />

              <span className="font-[family-name:var(--font-plano-mono)] text-sm tabular-nums text-plano-blue-light">
                {t(`steps.${key}.number`)}
              </span>

              <h3 className="mt-2 font-[family-name:var(--font-plano-body)] text-lg font-semibold text-foreground">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {t(`steps.${key}.description`)}
              </p>

              <DimensionBracket label={t(`steps.${key}.timeframe`)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
