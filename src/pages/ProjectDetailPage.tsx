import { useEffect, useMemo, useState } from "react";
import ProjectDetailContent from "@/components/pages/ProjectDetailContent";
import NotFoundContent from "@/components/pages/NotFoundContent";
import { getNextProject, getProjectBySlug } from "@/lib/sanity/queries";
import { projects as fallbackProjects } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/types";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

function getFallbackProject(slug: string) {
  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

function getFallbackNextProject(slug: string) {
  const projectIndex = fallbackProjects.findIndex(
    (project) => project.slug === slug
  );

  if (projectIndex < 0) {
    return undefined;
  }

  return fallbackProjects[(projectIndex + 1) % fallbackProjects.length];
}

export default function ProjectDetailPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const initialProject = useMemo(() => getFallbackProject(slug), [slug]);
  const [project, setProject] = useState<Project | null>(initialProject);
  const [nextProject, setNextProject] = useState<Project | undefined>(
    () => getFallbackNextProject(slug)
  );

  useEffect(() => {
    let active = true;

    void Promise.all([getProjectBySlug(slug, locale), getNextProject(slug, locale)]).then(
      ([fetchedProject, fetchedNextProject]) => {
        if (!active) {
          return;
        }

        setProject(fetchedProject);
        setNextProject(fetchedNextProject ?? undefined);
      }
    );

    return () => {
      active = false;
    };
  }, [locale, slug]);

  useEffect(() => {
    if (!project) {
      updateDocumentMetadata({
        title: "Proyecto no encontrado | BApps",
        description: "El proyecto solicitado no existe.",
      });
      return;
    }

    updateDocumentMetadata({
      title: `${project.title} | BApps`,
      description: project.shortDescription,
    });
  }, [project]);

  if (!project) {
    return <NotFoundContent />;
  }

  return (
    <ProjectDetailContent
      project={project}
      nextProject={nextProject}
      locale={locale}
    />
  );
}
