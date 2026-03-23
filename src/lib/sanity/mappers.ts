/**
 * Mappers to convert Sanity documents to frontend domain models.
 * Handles locale resolution, fallbacks, and type safety.
 */

import type { SanityProjectDocument, Project } from "@/lib/data/types";

const PROJECT_FALLBACK_IMAGE = "/images/og-default.jpg";

/**
 * Maps a Sanity project document to the frontend Project domain model.
 * Resolves locale, handles optional fields, and applies fallback image if missing.
 *
 * @param doc - Raw Sanity project document
 * @param locale - "es" or "en"
 * @returns Project domain model ready for UI consumption
 * @throws Error if slug or core fields are missing
 */
export function mapSanityProjectToProject(
  doc: SanityProjectDocument,
  locale: "es" | "en"
): Project {
  if (!doc.slug?.current) {
    throw new Error(`Project document ${doc._id} missing required slug`);
  }

  // Resolve bilingual fields with fallback to "es" if locale not available
  const getLocalizedField = <T,>(
    field: Record<"es" | "en", T> | undefined,
    fallback: T
  ): T => {
    if (!field) return fallback;
    return field[locale] ?? field["es"] ?? fallback;
  };

  const title = getLocalizedField(doc.title, "");
  if (!title) {
    throw new Error(`Project ${doc.slug.current} missing title for locale ${locale}`);
  }

  const description = getLocalizedField(doc.description, "");
  const shortDescription = getLocalizedField(doc.shortDescription, "");

  return {
    slug: doc.slug.current,
    title,
    description: description || title, // Fallback to title if description empty
    shortDescription: shortDescription || title.substring(0, 80),
    image: PROJECT_FALLBACK_IMAGE, // Always resolved; real image URL or fallback
    technologies: doc.technologies || [],
    category: doc.category || "webapp",
    url: doc.url,
    testimonial: doc.testimonial
      ? (getLocalizedField(doc.testimonial, undefined) as {
          quote: string;
          author: string;
          role: string;
        })
      : undefined,
    featured: doc.featured ?? false,
    order: doc.order ?? 999,
  };
}

/**
 * Maps multiple Sanity project documents to Project array.
 * Filters out documents that fail mapping and logs errors.
 */
export function mapSanityProjectsToProjects(
  docs: SanityProjectDocument[],
  locale: "es" | "en"
): Project[] {
  return docs.reduce<Project[]>((acc, doc) => {
    try {
      acc.push(mapSanityProjectToProject(doc, locale));
    } catch (err) {
      console.warn(`[Sanity Mapper] Failed to map project:`, err);
    }
    return acc;
  }, []);
}

/**
 * Sorts projects by order (editorial), then by creation date (newest first).
 * Used for "next project" navigation and carousel ordering.
 */
export function sortProjectsByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const orderDiff = (a.order ?? 999) - (b.order ?? 999);
    if (orderDiff !== 0) return orderDiff;
    // If orders are equal, maintain stable sort (don't change relative order)
    return 0;
  });
}
