"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { navigateTo } from "@/lib/router";
import MarkTag from "@/components/plano/MarkTag";

const serviceKeys = [
  "webApps",
  "mobileApps",
  "landingPages",
  "ecommerce",
  "uiux",
  "consulting",
] as const;

const servicePageSlugs: Partial<Record<ServiceKey, string>> = {
  webApps: "aplicaciones-a-medida",
  mobileApps: "apps-moviles",
  landingPages: "landing-pages",
  ecommerce: "ecommerce",
  uiux: "diseno-web",
  consulting: "consultoria",
};

type ServiceKey = (typeof serviceKeys)[number];

const serviceTags: Record<ServiceKey, string[]> = {
  webApps: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  mobileApps: ["React Native", "Expo", "iOS", "Android"],
  landingPages: ["Next.js", "SEO", "Google Analytics", "Vercel"],
  ecommerce: ["MercadoPago", "Stripe", "WooCommerce", "Shopify"],
  uiux: ["Figma", "Design System", "Prototipado", "A/B Testing"],
  consulting: ["Auditoría", "Roadmap", "Arquitectura", "MVP"],
};

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null);

  const toggle = (key: ServiceKey) =>
    setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section id="servicios" className="plano-world relative scroll-mt-20 bg-background py-32 text-foreground">
      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="font-[family-name:var(--font-plano-display)] text-4xl tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-plano-body)] text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Schedule — a technical drawing's spec sheet, not a card grid */}
        <div className="border-t border-border">
          {serviceKeys.map((key, i) => {
            const isOpen = openKey === key;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                className="border-b border-border"
              >
                <button
                  onClick={() => toggle(key)}
                  className="group flex w-full items-start gap-5 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? t("collapse") : t("expand")}
                >
                  <MarkTag className="mt-1 h-8 w-12 shrink-0 border-plano-blue-light text-plano-blue-light">
                    S-{String(i + 1).padStart(2, "0")}
                  </MarkTag>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-plano-body)] text-xl font-semibold text-foreground">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground-muted">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center text-plano-blue-light"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </motion.span>
                </button>

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
                      <div className="ml-[68px] mb-6 border-l border-border pl-5">
                        <p className="mb-3 font-[family-name:var(--font-plano-mono)] text-xs uppercase tracking-widest text-foreground-subtle">
                          {t(`items.${key}.detail`)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {serviceTags[key].map((tag) => (
                            <span
                              key={tag}
                              className="border border-border px-2.5 py-1 font-[family-name:var(--font-plano-mono)] text-xs text-foreground-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {servicePageSlugs[key] && (
                          <button
                            onClick={() => navigateTo(`/${locale}/servicios/${servicePageSlugs[key]}/`)}
                            className="mt-4 inline-flex items-center gap-1.5 font-[family-name:var(--font-plano-mono)] text-xs uppercase tracking-widest text-plano-blue-light underline decoration-dashed underline-offset-4 transition-colors hover:text-plano-stamp"
                          >
                            Ver más
                            <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                              <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
