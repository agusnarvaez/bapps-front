import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import {
  getProjectSlugs,
  getProjectBySlug,
  getNextProject,
} from "@/lib/sanity/queries";
import ProjectDetailContent from "@/components/pages/ProjectDetailContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale as "es" | "en");

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        es: `/es/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} | BApps`,
      description: project.shortDescription,
      url: `/${locale}/projects/${slug}`,
      images: project.image
        ? [{ url: project.image, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale as "es" | "en");
  if (!project) notFound();

  const nextProject = await getNextProject(slug, locale as "es" | "en");

  return (
    <ProjectDetailContent
      project={project}
      nextProject={nextProject || undefined}
      locale={locale as "es" | "en"}
    />
  );
}
