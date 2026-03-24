"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/data/types";
import ProjectImage from "@/components/ui/ProjectImage";
import { getNextProjectLive, getProjectBySlugLive } from "@/lib/sanity/live";

export default function ProjectDetailContent({
  project,
  nextProject,
  locale,
}: {
  project: Project;
  nextProject?: Project;
  locale: "es" | "en";
}) {
  const t = useTranslations("projectDetail");
  const [currentProject, setCurrentProject] = useState(project);
  const [currentNextProject, setCurrentNextProject] = useState(nextProject);

  useEffect(() => {
    setCurrentProject(project);
    setCurrentNextProject(nextProject);
  }, [project, nextProject]);

  useEffect(() => {
    let active = true;

    void Promise.all([
      getProjectBySlugLive(project.slug, locale),
      getNextProjectLive(project.slug, locale),
    ]).then(([liveProject, liveNextProject]) => {
      if (!active) {
        return;
      }

      if (liveProject) {
        setCurrentProject(liveProject);
      }

      setCurrentNextProject(liveNextProject || undefined);
    });

    return () => {
      active = false;
    };
  }, [locale, project.slug]);

  return (
    <article className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted transition-colors hover:text-bapps-purple-light"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            {t("backToProjects")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-8"
        >
          <span className="inline-block rounded-full bg-bapps-purple/10 px-4 py-1.5 text-sm font-medium text-bapps-purple-light">
            {currentProject.category}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl tracking-tight sm:text-6xl md:text-7xl">
            {currentProject.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-10 overflow-hidden rounded-2xl border border-border"
        >
          <div className="relative aspect-video">
            <ProjectImage
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              {t("aboutProject")}
            </h2>
            <p className="text-lg leading-relaxed text-foreground-muted">
              {currentProject.description}
            </p>

            {currentProject.testimonial && (
              <div className="mt-12">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {t("clientTestimonial")}
                </h3>
                <blockquote className="relative rounded-xl border border-border bg-background-secondary p-6">
                  <svg
                    className="absolute -top-3 left-6 h-6 w-6 text-bapps-purple"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                  </svg>
                  <p className="mt-2 italic leading-relaxed text-foreground-muted">
                    &ldquo;{currentProject.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm">
                    <span className="font-medium text-foreground">
                      {currentProject.testimonial.author}
                    </span>
                    <span className="text-foreground-subtle">
                      {" - "}
                      {currentProject.testimonial.role}
                    </span>
                  </footer>
                </blockquote>
              </div>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="rounded-xl border border-border bg-background-secondary p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-subtle">
                {t("technologies")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background-tertiary px-4 py-1.5 text-sm text-foreground-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {currentProject.url && (
              <a
                href={currentProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-bapps-purple px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-bapps-purple-dark hover:shadow-lg hover:shadow-bapps-purple/25"
              >
                {t("visitSite")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            <div className="rounded-xl border border-bapps-purple/20 bg-bapps-purple/5 p-6 text-center">
              <p className="mb-4 text-sm font-medium text-foreground">
                {t("ctaTitle")}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-bapps-yellow px-6 py-2.5 text-sm font-bold text-background transition-all duration-300 hover:bg-bapps-yellow-dark hover:shadow-lg hover:shadow-bapps-yellow/25"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-24 border-t border-border pt-12"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground-subtle">
            {t("nextProject")}
          </p>
          {currentNextProject && (
            <Link
              href={`/${locale}/projects/${currentNextProject.slug}`}
              className="group flex items-center justify-between"
            >
              <h3 className="font-[family-name:var(--font-display)] text-3xl tracking-tight transition-colors group-hover:text-bapps-purple-light sm:text-4xl">
                {currentNextProject.title}
              </h3>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-bapps-purple group-hover:bg-bapps-purple/10">
                <svg
                  className="h-5 w-5 text-foreground-muted transition-colors group-hover:text-bapps-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          )}
        </motion.div>
      </div>
    </article>
  );
}
