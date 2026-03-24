/**
 * Sanity query functions for projects.
 * Used at build time for static export and metadata generation.
 */

import { sanityClient, isSanityConfigured } from "./client";
import {
  mapSanityProjectToProject,
  mapSanityProjectsToProjects,
  sortProjectsByOrder,
} from "./mappers";
import {
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "./projectQueries";
import { projects as fallbackProjects } from "@/lib/data";
import type { SanityProjectDocument, Project } from "@/lib/data/types";

/**
 * Fetch all published projects from Sanity.
 * Falls back to local data if Sanity is not configured.
 */
export async function getProjects(locale: "es" | "en"): Promise<Project[]> {
  if (!isSanityConfigured()) {
    console.warn("[Sanity] Not configured. Using fallback data.");
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
    const projects = mapSanityProjectsToProjects(docs, locale);
    return sortProjectsByOrder(projects);
  } catch (err) {
    console.error("[Sanity] Failed to fetch projects:", err);
    return fallbackProjects;
  }
}

/**
 * Fetch only featured projects for homepage carousel.
 */
export async function getFeaturedProjects(locale: "es" | "en"): Promise<Project[]> {
  const all = await getProjects(locale);
  return all.filter((p) => p.featured).slice(0, 6); // Limit to 6 for performance
}

/**
 * Fetch a single project by slug.
 * Returns null if not found.
 */
export async function getProjectBySlug(
  slug: string,
  locale: "es" | "en"
): Promise<Project | null> {
  if (!isSanityConfigured()) {
    // Fallback to local data
    const project = fallbackProjects.find((p) => p.slug === slug);
    return project || null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: SanityProjectDocument | null = await (sanityClient as any).fetch(
      PROJECT_BY_SLUG_QUERY,
      { slug }
    );
    return doc ? mapSanityProjectToProject(doc, locale) : null;
  } catch (err) {
    console.error("[Sanity] Failed to fetch project by slug:", err);
    const project = fallbackProjects.find((p) => p.slug === slug);
    return project || null;
  }
}

/**
 * Get all project slugs from Sanity for static export.
 */
export async function getProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return fallbackProjects.map((p) => p.slug);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docs: SanityProjectDocument[] = await (sanityClient as any).fetch(PROJECT_SLUGS_QUERY);
    const slugs = docs
      .map((d) => d.slug?.current)
      .filter((slug): slug is string => !!slug);

    return slugs.length > 0 ? slugs : fallbackProjects.map((p) => p.slug);
  } catch (err) {
    console.error("[Sanity] Failed to fetch project slugs:", err);
    return fallbackProjects.map((p) => p.slug);
  }
}

/**
 * Get the next project in the sequence for navigation.
 * Ordered by editorial order field, then creation date.
 */
export async function getNextProject(
  currentSlug: string,
  locale: "es" | "en"
): Promise<Project | null> {
  const allProjects = await getProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;
  // Wrap around to first project if at the end
  const nextIndex = (currentIndex + 1) % allProjects.length;
  return allProjects[nextIndex] || null;
}
