"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { updateDocumentMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services-seo";
import MagneticButton from "@/components/ui/MagneticButton";
import NotFoundContent from "@/components/pages/NotFoundContent";
import { navigateTo } from "@/lib/router";

const icons: Record<string, React.ReactNode> = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function BenefitIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bapps-purple/15 text-bapps-purple">
      {icons.check}
    </div>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="border-b border-border py-6"
    >
      <h3 className="text-base font-semibold text-foreground md:text-lg">{question}</h3>
      <p className="mt-3 text-foreground-muted leading-relaxed">{answer}</p>
    </motion.div>
  );
}

export default function ServicePage({ slug }: { slug: string }) {
  const locale = useLocale();
  const service = getServiceBySlug(slug);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ threshold: 0.1 });
  const { ref: audienceRef, inView: audienceInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (service) {
      updateDocumentMetadata({
        title: service.title,
        description: service.metaDescription,
      });
    }
  }, [service]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!service) {
    return <NotFoundContent />;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "BApps",
      url: "https://bapps.com.ar",
    },
    areaServed: "AR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-24 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bapps-purple/[0.06] via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-bapps-purple/10 blur-[120px]" />

        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-bapps-purple/30 bg-bapps-purple/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-bapps-yellow animate-pulse" />
            <span className="text-sm font-medium text-bapps-purple-light">{service.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-[family-name:var(--font-display)] max-w-4xl text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {service.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted md:text-xl"
          >
            {service.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href={`/${locale}/contact`}
              className="btn-shimmer rounded-full bg-bapps-purple px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-bapps-purple/30"
            >
              {service.ctaText}
            </MagneticButton>
            <button
              onClick={() => {
                sessionStorage.setItem("scrollTarget", "servicios");
                navigateTo(`/${locale}/`);
              }}
              className="rounded-full border border-border px-8 py-3.5 text-base font-medium text-foreground-muted transition-all duration-300 hover:border-bapps-purple/50 hover:text-foreground"
            >
              Ver todos los servicios
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div ref={benefitsRef} className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] mb-12 text-3xl tracking-tight sm:text-4xl"
          >
            ¿Qué incluye?
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 rounded-2xl border border-border bg-background-secondary p-6"
              >
                <BenefitIcon />
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20">
        <div ref={audienceRef} className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-border bg-background-secondary p-8 md:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={audienceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] mb-8 text-3xl tracking-tight sm:text-4xl"
            >
              {service.audienceTitle}
            </motion.h2>

            <ul className="space-y-4">
              {service.audienceItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={audienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bapps-purple/20 text-bapps-purple">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                  </span>
                  <span className="text-foreground-muted">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-[family-name:var(--font-display)] mb-2 text-3xl tracking-tight sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mb-10 text-foreground-muted">Todo lo que necesitás saber antes de arrancar.</p>

          <div>
            {service.faq.map((item, i) => (
              <FaqItem key={item.question} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-bapps-purple via-bapps-purple-dark to-background-tertiary" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-bapps-yellow/20 blur-[80px] animate-pulse" />
              <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-bapps-purple-light/30 blur-[80px] animate-pulse [animation-delay:1s]" />
            </div>
            <div className="relative px-8 py-20 text-center md:px-16 md:py-24">
              <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl">
                ¿Listo para arrancar?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
                Primera consulta sin costo, sin compromiso. Te respondemos en menos de 24hs.
              </p>
              <div className="mt-10">
                <MagneticButton
                  href={`/${locale}/contact`}
                  className="btn-shimmer inline-flex items-center gap-3 rounded-full bg-bapps-yellow px-10 py-4 text-lg font-bold text-background transition-all duration-300 hover:shadow-2xl hover:shadow-bapps-yellow/30"
                  strength={16}
                >
                  {service.ctaText}
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
