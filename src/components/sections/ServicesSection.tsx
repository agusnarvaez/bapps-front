"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import TiltCard from "@/components/ui/TiltCard";

const serviceKeys = [
  "webApps",
  "mobileApps",
  "landingPages",
  "ecommerce",
  "uiux",
  "consulting",
] as const;

type ServiceKey = (typeof serviceKeys)[number];

const serviceTags: Record<ServiceKey, string[]> = {
  webApps: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  mobileApps: ["React Native", "Expo", "iOS", "Android"],
  landingPages: ["Next.js", "SEO", "Google Analytics", "Vercel"],
  ecommerce: ["MercadoPago", "Stripe", "WooCommerce", "Shopify"],
  uiux: ["Figma", "Design System", "Prototipado", "A/B Testing"],
  consulting: ["Auditoría", "Roadmap", "Arquitectura", "MVP"],
};

const serviceIcons: Record<ServiceKey, React.ReactNode> = {
  webApps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mobileApps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  landingPages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  ),
  uiux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <path d="M17.5 10.5c2.5 0 4 3 4 5.5 0 .5-.5 1-1 1h-2" />
      <circle cx="8.5" cy="6.5" r="2.5" />
      <path d="M2.5 16c0-2.5 1.5-5.5 4-5.5h4c2.5 0 4 3 4 5.5 0 .5-.5 1-1 1h-10c-.5 0-1-.5-1-1z" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  ),
};


export default function ServicesSection() {
  const t = useTranslations("services");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null);

  const toggle = (key: ServiceKey) =>
    setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section id="servicios" className="relative py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-bapps-purple/5 blur-[120px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, i) => {
            const isOpen = openKey === key;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <TiltCard
                  className={`group relative h-full overflow-hidden rounded-2xl border bg-background-secondary p-8 transition-all duration-500 ${
                    isOpen
                      ? "border-bapps-purple/50 bg-background-tertiary"
                      : "border-border hover:border-bapps-purple/30 hover:bg-background-tertiary"
                  }`}
                  maxTilt={isOpen ? 0 : 6}
                >
                  <div className="relative flex h-full flex-col">
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bapps-purple/10 text-bapps-purple transition-all duration-300 group-hover:bg-bapps-purple/20 group-hover:shadow-lg group-hover:shadow-bapps-purple/10">
                      {serviceIcons[key]}
                    </div>

                    {/* Title & description */}
                    <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-bapps-purple-light">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Expandable panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 border-t border-border pt-5">
                            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground-muted">
                              {t(`items.${key}.detail`)}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {serviceTags[key].map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-bapps-purple/25 bg-bapps-purple/10 px-3 py-1 text-xs font-medium text-bapps-purple-light"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle button */}
                    <button
                      onClick={() => toggle(key)}
                      className="mt-5 flex items-center gap-1.5 self-start text-xs font-medium text-foreground-muted transition-colors hover:text-bapps-purple-light"
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <path d="M3 6l5 5 5-5" />
                        </svg>
                      </motion.span>
                      {isOpen ? t("collapse") : t("expand")}
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
