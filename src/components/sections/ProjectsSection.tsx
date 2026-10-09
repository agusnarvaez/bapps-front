"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import type { Project } from "@/lib/data/types";
import ProjectImage from "@/components/ui/ProjectImage";
import MarkTag from "@/components/plano/MarkTag";
import { getFeaturedProjectsLive } from "@/lib/sanity/live";

export default function ProjectsSection({
  featuredProjects = [],
  locale,
}: {
  featuredProjects?: Project[];
  locale: "es" | "en";
}) {
  const t = useTranslations("projects");
  const tCategories = useTranslations("projectsPage.categories");
  const { ref: headerRef, inView } = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState(featuredProjects);

  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setProjects(featuredProjects);
  }, [featuredProjects]);

  useEffect(() => {
    let active = true;

    void getFeaturedProjectsLive(locale).then((liveProjects) => {
      if (active) {
        setProjects(liveProjects);
      }
    });

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <section id="proyectos" className="plano-world relative scroll-mt-20 bg-background py-32 text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="mb-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-plano-display)] text-4xl tracking-tight sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md font-[family-name:var(--font-plano-body)] text-lg text-foreground-muted">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            href={`/${locale}/projects`}
            className="hidden items-center gap-2 border-b border-dashed border-border pb-1 font-[family-name:var(--font-plano-mono)] text-sm tracking-wide text-foreground-muted transition-colors hover:border-plano-blue-light hover:text-foreground md:flex"
          >
            {t("viewAll")}
          </motion.a>
        </div>

        {/* Progress rule — a plotted scale, not a decorative bar */}
        <div className="mb-8 h-px w-full bg-border">
          <motion.div className="h-full bg-plano-blue-light" style={{ width: progressWidth }} />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide md:px-[calc((100vw-1280px)/2+1.5rem)]"
        style={{ scrollbarWidth: "none" }}
        role="region"
        aria-label="Featured projects carousel"
        tabIndex={0}
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            className="group relative flex-shrink-0 snap-start"
          >
            <div className="relative flex h-[440px] w-[340px] flex-col overflow-hidden border border-border bg-background-secondary transition-colors duration-300 hover:border-plano-blue-light/50 sm:w-[400px]">
              <div className="relative h-[52%] overflow-hidden">
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="400px"
                />
              </div>

              {/* Title block — the drawing sheet's own corner stamp */}
              <div className="flex items-center gap-3 border-b border-border px-5 py-3">
                <MarkTag className="h-6 w-10 shrink-0 border-plano-blue-light text-plano-blue-light">
                  P-{String(i + 1).padStart(2, "0")}
                </MarkTag>
                <span className="font-[family-name:var(--font-plano-mono)] text-xs uppercase tracking-widest text-foreground-subtle">
                  {tCategories(project.category)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-[family-name:var(--font-plano-body)] text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-foreground-muted line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-0.5 font-[family-name:var(--font-plano-mono)] text-xs text-foreground-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="border border-border px-2 py-0.5 font-[family-name:var(--font-plano-mono)] text-xs text-foreground-subtle">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        <motion.a
          href={`/${locale}/projects`}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + projects.length * 0.1, duration: 0.6 }}
          className="group flex h-[440px] w-[260px] flex-shrink-0 snap-start items-center justify-center border border-dashed border-border transition-colors duration-300 hover:border-plano-blue-light/60"
        >
          <div className="text-center">
            <span className="font-[family-name:var(--font-plano-mono)] text-sm uppercase tracking-widest text-foreground-muted transition-colors group-hover:text-foreground">
              {t("viewAll")}
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
