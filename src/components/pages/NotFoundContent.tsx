"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Starfield background */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px rounded-full bg-white"
            style={{
              left: `${(i * 17 + 7) % 100}%`,
              top: `${(i * 13 + 3) % 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.3) % 3,
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        {/* Floating rocket */}
        <motion.div
          className="mx-auto mb-8"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="mx-auto h-32 w-32 text-bapps-purple"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Rocket body */}
            <ellipse cx="50" cy="50" rx="12" ry="28" fill="currentColor" opacity="0.2" />
            <ellipse cx="50" cy="50" rx="10" ry="25" stroke="currentColor" strokeWidth="2" />
            {/* Nose cone */}
            <path d="M40 28 L50 8 L60 28" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Window */}
            <circle cx="50" cy="40" r="5" stroke="#E7FB79" strokeWidth="2" />
            <circle cx="50" cy="40" r="2" fill="#E7FB79" opacity="0.5" />
            {/* Fins */}
            <path d="M40 65 L28 80 L40 72" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
            <path d="M60 65 L72 80 L60 72" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
            {/* Exhaust */}
            <motion.path
              d="M44 75 L50 92 L56 75"
              stroke="#E7FB79"
              strokeWidth="2"
              fill="#E7FB79"
              opacity="0.6"
              animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.9, 1.1, 0.9] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ transformOrigin: "50px 75px" }}
            />
          </svg>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-[family-name:var(--font-display)] text-[8rem] leading-none tracking-tighter text-bapps-purple/20 sm:text-[12rem]">
            {t("subtitle")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="-mt-6 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg text-foreground-muted"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-full bg-bapps-purple px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-bapps-purple-dark hover:shadow-lg hover:shadow-bapps-purple/25"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t("backHome")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
