import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import { projects } from "@/lib/data";
import ProjectDetailContent from "@/components/pages/ProjectDetailContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

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

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.indexOf(project);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <ProjectDetailContent project={project} nextProject={nextProject} />;
}
