"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data/types";

const categories = ["all", "webapp", "mobile", "landing", "ecommerce"] as const;

export default function ProjectsGrid() {
  const t = useTranslations("projectsPage");
  const locale = useLocale();
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight sm:text-6xl md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "border-bapps-purple bg-bapps-purple/10 text-bapps-purple-light"
                  : "border-border text-foreground-muted hover:border-border-hover hover:text-foreground"
              }`}
            >
              {cat === "all"
                ? t("filterAll")
                : t(`categories.${cat}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-foreground-muted"
          >
            {t("noResults")}
          </motion.p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = useTranslations("projectsPage");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
    >
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-border bg-background-secondary transition-all duration-500 hover:border-bapps-purple/30"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-bapps-purple/0 transition-all duration-500 group-hover:bg-bapps-purple/20">
            <motion.div
              initial={false}
              className="rounded-full bg-white/10 p-4 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>

          {/* Category badge */}
          <div className="absolute left-4 top-4 rounded-full bg-bapps-purple/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-bapps-purple-light">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-background-tertiary px-3 py-1 text-xs text-foreground-subtle"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-full bg-background-tertiary px-3 py-1 text-xs text-foreground-subtle">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* View link */}
          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-bapps-purple-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {t("viewProject")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
