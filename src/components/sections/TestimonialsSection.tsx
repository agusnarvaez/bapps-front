"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { testimonials, stats } from "@/lib/data";

function StatCounter({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix?: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 2000, started);

  return (
    <div className="text-center">
      <div className="font-[family-name:var(--font-display)] text-5xl tracking-tight text-bapps-purple md:text-6xl">
        {count}
        {suffix && <span className="text-bapps-yellow">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm text-foreground-muted">{label}</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bapps-purple/[0.03] to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20 grid grid-cols-3 gap-8 rounded-2xl border border-border bg-background-secondary p-8 md:p-12"
        >
          <StatCounter
            value={stats.projects}
            suffix="+"
            label={t("stats.projects")}
            started={inView}
          />
          <StatCounter
            value={stats.clients}
            suffix="+"
            label={t("stats.clients")}
            started={inView}
          />
          <StatCounter
            value={stats.years}
            label={t("stats.years")}
            started={inView}
          />
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Quote icon */}
          <div className="absolute -top-6 left-0 text-bapps-purple/20" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
          </div>

          <div className="relative overflow-hidden rounded-2xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl leading-relaxed text-foreground md:text-2xl">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-bapps-purple to-bapps-purple-dark" />
                  <div>
                    <cite className="not-italic font-semibold text-foreground">
                      {testimonials[activeIndex].author}
                    </cite>
                    <p className="text-sm text-foreground-muted">
                      {testimonials[activeIndex].role},{" "}
                      {testimonials[activeIndex].company}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-bapps-purple"
                    : "w-2.5 bg-foreground-subtle/30 hover:bg-foreground-subtle/50"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
