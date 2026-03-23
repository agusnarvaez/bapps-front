import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getProjects } from "@/lib/sanity/queries";
import type { Project } from "@/lib/data/types";
import ProjectsGrid from "@/components/pages/ProjectsGrid";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { es: "/es/projects", en: "/en/projects" },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch projects from Sanity (with fallback to local data if not configured)
  const projects: Project[] = await getProjects(locale as "es" | "en");

  return <ProjectsGrid projects={projects} locale={locale as "es" | "en"} />;
}
