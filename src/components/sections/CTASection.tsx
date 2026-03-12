"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useInView } from "@/hooks/useInView";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative py-32">
      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-bapps-purple via-bapps-purple-dark to-background-tertiary" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-bapps-yellow/20 blur-[80px] animate-pulse" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-bapps-purple-light/30 blur-[80px] animate-pulse [animation-delay:1s]" />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative px-8 py-20 text-center md:px-16 md:py-28">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl md:text-7xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mx-auto mt-4 max-w-md text-xl text-white/70"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10"
            >
              <MagneticButton
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 rounded-full bg-bapps-yellow px-10 py-4 text-lg font-bold text-background transition-all duration-300 hover:shadow-2xl hover:shadow-bapps-yellow/30"
                strength={16}
              >
                {t("button")}
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 -translate-x-full bg-bapps-yellow-dark transition-transform duration-300 group-hover:translate-x-0" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
