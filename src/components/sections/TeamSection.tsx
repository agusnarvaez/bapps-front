"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { clientConfig } from "@/lib/config/client";
import { team } from "@/lib/data";

function getMemberInitials(name: string) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const initials = nameParts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return initials || "?";
}

export default function TeamSection() {
  const t = useTranslations("team");
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="equipo" className="plano-world relative scroll-mt-20 bg-background-secondary py-32 text-foreground">
      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-[family-name:var(--font-plano-display)] text-4xl tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-plano-body)] text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Roster of certifying seals — the way a drawing carries the
            stamp of the engineer who signed off on it */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-32">
                <div className="h-full w-full overflow-hidden rounded-full">
                  {clientConfig.showTeamPhotos && member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                      sizes="128px"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={member.name}
                      className="flex h-full w-full items-center justify-center bg-background-tertiary"
                    >
                      <span className="font-[family-name:var(--font-plano-display)] text-3xl text-plano-blue-light">
                        {getMemberInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>
                {/* Ruled seal ring — the engineer's-stamp motif, drawn in
                    once rather than merely faded, and the only ring on the
                    avatar so the mark reads as one consistent device */}
                <svg
                  viewBox="0 0 128 128"
                  className="pointer-events-none absolute inset-0 h-full w-full text-plano-blue-light transition-colors duration-300 group-hover:text-plano-stamp"
                  aria-hidden="true"
                >
                  <motion.circle
                    cx="64" cy="64" r="63" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.2, 0.8, 0.3, 1] }}
                  />
                </svg>
              </div>

              <h3 className="mt-5 font-[family-name:var(--font-plano-body)] text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-plano-mono)] text-xs uppercase tracking-widest text-foreground-subtle">
                {member.role}
              </p>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-foreground-subtle transition-colors hover:text-plano-blue-light"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
