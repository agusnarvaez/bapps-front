"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { navigateTo } from "@/lib/router";
import RegistrationMarks from "@/components/plano/RegistrationMarks";
import Stamp from "@/components/plano/Stamp";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="relative px-6 py-32">
      <div
        ref={ref}
        className="plano-world plano-grid-blue relative mx-auto max-w-6xl overflow-hidden border border-plano-line px-8 py-20 text-center text-plano-paper md:px-16 md:py-28"
      >
        <RegistrationMarks tone="light" />

        {/* Faint seal ring behind the headline — traces in like every other
            ruled line in this world, never just faded */}
        <svg
          viewBox="0 0 400 400"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
          aria-hidden="true"
        >
          <motion.circle
            cx="200" cy="200" r="180" fill="none" stroke="var(--plano-paper)" strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.3, 1] }}
          />
          <motion.circle
            cx="200" cy="200" r="160" fill="none" stroke="var(--plano-paper)" strokeWidth="1" strokeDasharray="3 6"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.2, 0.8, 0.3, 1] }}
          />
        </svg>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative font-[family-name:var(--font-plano-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative mx-auto mt-4 max-w-md font-[family-name:var(--font-plano-body)] text-lg text-plano-paper/80"
        >
          {t("subtitle")}
        </motion.p>

        <div className="relative mt-10 flex justify-center">
          <Stamp inView={inView} rotate={-3}>
            <button
              onClick={() => navigateTo(`/${locale}/contact`)}
              className="rounded-full border-2 border-plano-paper/35 bg-plano-stamp px-10 py-4 font-[family-name:var(--font-plano-mono)] text-base font-bold uppercase tracking-wider text-plano-paper transition-transform duration-200 hover:scale-[1.03]"
            >
              {t("button")}
            </button>
          </Stamp>
        </div>
      </div>
    </section>
  );
}
