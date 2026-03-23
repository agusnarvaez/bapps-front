"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import type { Project } from "@/lib/data/types";

export default function ProjectsSection({
  featuredProjects = [],
}: {
  featuredProjects?: Project[];
}) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const { ref: headerRef, inView } = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="proyectos" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md text-lg text-foreground-muted">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            href={`/${locale}/projects`}
            className="hidden items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground-muted transition-all duration-300 hover:border-bapps-purple/50 hover:text-foreground md:flex"
          >
            {t("viewAll")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-px w-full bg-border">
          <motion.div className="h-full bg-bapps-purple" style={{ width: progressWidth }} />
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide md:px-[calc((100vw-1280px)/2+1.5rem)]"
        style={{ scrollbarWidth: "none" }}
        role="region"
        aria-label="Featured projects carousel"
        tabIndex={0}
      >
        {featuredProjects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            className="group relative flex-shrink-0 snap-start"
          >
            <div className="relative h-[420px] w-[340px] overflow-hidden rounded-2xl border border-border bg-background-secondary transition-all duration-500 hover:border-bapps-purple/30 sm:w-[400px]">
              {/* Image */}
              <div className="relative h-[55%] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary to-transparent" />

                {/* Category badge */}
                <div className="absolute left-4 top-4 rounded-full bg-bapps-purple/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-bapps-purple-light">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-foreground-muted line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground-subtle">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-bapps-purple/10 text-bapps-purple opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2" aria-hidden="true">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.article>
        ))}

        {/* "View all" card */}
        <motion.a
          href={`/${locale}/projects`}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + featuredProjects.length * 0.1, duration: 0.6 }}
          className="group flex h-[420px] w-[280px] flex-shrink-0 snap-start items-center justify-center rounded-2xl border border-dashed border-border transition-all duration-500 hover:border-bapps-purple/50 hover:bg-background-secondary"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bapps-purple/10 text-bapps-purple transition-all duration-300 group-hover:bg-bapps-purple/20">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <p className="font-medium text-foreground-muted transition-colors group-hover:text-foreground">
              {t("viewAll")}
            </p>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
