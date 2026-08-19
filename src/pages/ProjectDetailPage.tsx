import { useEffect, useState } from "react";
import ProjectDetailContent from "@/components/pages/ProjectDetailContent";
import NotFoundContent from "@/components/pages/NotFoundContent";
import { getNextProject, getProjectBySlug } from "@/lib/sanity/queries";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/types";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

export default function ProjectDetailPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  // ponytail: undefined = still loading, null = confirmed not found after
  // the fetch resolves. Collapsing these (as this used to, via a synchronous
  // local-fallback lookup) made every project not in that fallback list
  // render "not found" on first paint — prerender.mjs has no spinner to wait
  // out here, so it snapshotted that transient state as if it were real.
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [nextProject, setNextProject] = useState<Project | undefined>(undefined);

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
    if (project === undefined) {
      return;
    }

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

  if (project === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-bapps-purple border-t-transparent" />
      </div>
    );
  }

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
