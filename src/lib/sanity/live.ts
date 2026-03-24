import { sanityClient, isSanityConfigured } from "./client";
import {
  mapSanityProjectToProject,
  mapSanityProjectsToProjects,
  sortProjectsByOrder,
} from "./mappers";
import {
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
} from "./projectQueries";
import { projects as fallbackProjects } from "@/lib/data";
import type { Project, SanityProjectDocument } from "@/lib/data/types";

export async function getProjectsLive(
  locale: "es" | "en"
): Promise<Project[]> {
  if (!isSanityConfigured()) {
    return fallbackProjects;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docs: SanityProjectDocument[] = await (sanityClient as any).fetch(
      PROJECTS_QUERY
    );
    if (docs.length === 0) {
      return fallbackProjects;
    }

    return sortProjectsByOrder(mapSanityProjectsToProjects(docs, locale));
  } catch (error) {
    console.error("[Sanity] Live fetch for projects failed:", error);
    return fallbackProjects;
  }
}

export async function getFeaturedProjectsLive(
  locale: "es" | "en"
): Promise<Project[]> {
  const allProjects = await getProjectsLive(locale);
  return allProjects.filter((project) => project.featured).slice(0, 6);
}

export async function getProjectBySlugLive(
  slug: string,
  locale: "es" | "en"
): Promise<Project | null> {
  if (!isSanityConfigured()) {
    return fallbackProjects.find((project) => project.slug === slug) || null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: SanityProjectDocument | null = await (sanityClient as any).fetch(
      PROJECT_BY_SLUG_QUERY,
      { slug }
    );

    return doc ? mapSanityProjectToProject(doc, locale) : null;
  } catch (error) {
    console.error("[Sanity] Live fetch for project by slug failed:", error);
    return fallbackProjects.find((project) => project.slug === slug) || null;
  }
}

export async function getNextProjectLive(
  currentSlug: string,
  locale: "es" | "en"
): Promise<Project | null> {
  const allProjects = await getProjectsLive(locale);
  const currentIndex = allProjects.findIndex(
    (project) => project.slug === currentSlug
  );

  if (currentIndex === -1) {
    return null;
  }

  const nextIndex = (currentIndex + 1) % allProjects.length;
  return allProjects[nextIndex] || null;
}
