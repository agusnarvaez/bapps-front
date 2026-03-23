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
    <section id="equipo" className="relative py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[400px] rounded-full bg-bapps-purple/5 blur-[120px]" />

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
          <p className="mx-auto mt-4 max-w-md text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background-secondary"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {clientConfig.showTeamPhotos && member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={member.name}
                    className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(173,96,225,0.28),_transparent_42%),linear-gradient(160deg,_rgba(17,17,24,0.92),_rgba(26,26,36,0.98))] transition-transform duration-700 group-hover:scale-105"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-bapps-purple/20 blur-3xl"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 bottom-16 h-36 w-36 rounded-full bg-bapps-yellow/10 blur-3xl"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="flex h-full w-full items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="font-[family-name:var(--font-display)] text-6xl tracking-[0.2em] text-white sm:text-7xl">
                          {getMemberInitials(member.name)}
                        </span>
                      </div>
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white/60 backdrop-blur-sm"
                    >
                      Team
                    </div>
                  </div>
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-background-secondary/30 to-transparent" />

                {/* Info overlay - appears on hover */}
                <div className="absolute inset-0 flex items-end p-6 opacity-100">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-bapps-purple-light">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Social link */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-bapps-purple"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}

                {/* Purple line accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-bapps-purple transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
