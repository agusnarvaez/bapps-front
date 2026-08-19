"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";
import { servicePages } from "@/lib/data/services-seo";
import { useInView } from "@/hooks/useInView";
import { navigateTo } from "@/lib/router";

const orderedKeys = [
  "uiux",
  "landingPages",
  "webApps",
  "ecommerce",
  "mobileApps",
  "consulting",
] as const;

const keyToSlug: Record<(typeof orderedKeys)[number], string> = {
  uiux: "diseno-web",
  landingPages: "landing-pages",
  webApps: "aplicaciones-a-medida",
  ecommerce: "ecommerce",
  mobileApps: "apps-moviles",
  consulting: "consultoria",
};

export default function ServicesIndexPage() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    updateDocumentMetadata({
      title: "Servicios de desarrollo de software a medida en Argentina | BApps",
      description:
        "Diseño web, apps móviles, e-commerce, aplicaciones a medida y consultoría tecnológica. Conocé precios, plazos y alcance de cada servicio.",
    });
  }, []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: orderedKeys.map((key, i) => {
      const slug = keyToSlug[key];
      const service = servicePages.find((s) => s.slug === slug);
      return {
        "@type": "ListItem",
        position: i + 1,
        url: `https://bapps.com.ar/${locale}/servicios/${slug}/`,
        name: service?.h1 ?? t(`items.${key}.title`),
      };
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `https://bapps.com.ar/${locale}/` },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `https://bapps.com.ar/${locale}/servicios/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bapps-purple/[0.06] via-transparent to-transparent" />
        <div ref={ref} className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bapps-purple/30 bg-bapps-purple/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-bapps-yellow" />
              <span className="text-sm font-medium text-bapps-purple-light">{t("badge")}</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-muted">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedKeys.map((key, i) => {
              const slug = keyToSlug[key];
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  onClick={() => navigateTo(`/${locale}/servicios/${slug}/`)}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background-secondary p-8 text-left transition-all duration-300 hover:border-bapps-purple/30 hover:bg-background-tertiary"
                >
                  <h2 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-bapps-purple-light">
                    {t(`items.${key}.title`)}
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {t(`items.${key}.description`)}
                  </p>
                  <span className="mt-5 flex items-center gap-1 text-xs font-medium text-bapps-purple-light">
                    Ver más
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                      <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
