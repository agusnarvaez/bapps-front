import { useEffect, useState } from "react";
import ProjectsGrid from "@/components/pages/ProjectsGrid";
import { getProjects } from "@/lib/sanity/queries";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/types";
import { useTranslations } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const t = useTranslations("projectsPage");
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    updateDocumentMetadata({
      title: t("title"),
      description: t("subtitle"),
    });
  }, [t]);

  useEffect(() => {
    let active = true;

    void getProjects(locale).then((fetchedProjects) => {
      if (active) {
        setProjects(fetchedProjects);
      }
    });

    return () => {
      active = false;
    };
  }, [locale]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `https://bapps.com.ar/${locale}/` },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `https://bapps.com.ar/${locale}/projects/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Spinner hasta que responde Sanity: el prerender espera a que no haya
          .animate-spin, así no congela los proyectos de ejemplo (daban 404). */}
      {projects ? (
        <ProjectsGrid projects={projects} locale={locale} />
      ) : (
        <div className="flex min-h-screen items-center justify-center pt-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-bapps-purple border-t-transparent" />
        </div>
      )}
    </>
  );
}
