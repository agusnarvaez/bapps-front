import { useEffect, useState } from "react";
import ProjectsGrid from "@/components/pages/ProjectsGrid";
import { getProjects } from "@/lib/sanity/queries";
import { projects as fallbackProjects } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/types";
import { useTranslations } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const t = useTranslations("projectsPage");
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

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
      <ProjectsGrid projects={projects} locale={locale} />
    </>
  );
}
