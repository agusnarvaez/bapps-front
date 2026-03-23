/**
 * Sanity client configuration.
 * Configure when connecting to Sanity.
 *
 * Install: npm install @sanity/client next-sanity @sanity/image-url
 *
 * Required environment variables:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET (default: "production")
 *   - NEXT_PUBLIC_SANITY_API_VERSION (default: "2024-01-01")
 */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * Sanity client - only initialized if projectId is configured.
 * If not configured, queries will fall back to local data.
 */
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (null as any); // Fallback: will be caught by isSanityConfigured() before use

/**
 * Build image URLs from Sanity image objects.
 * Usage: imageUrl(project.image).width(800).url()
 */
export const imageUrl = (source: SanityImageSource) => {
  if (!projectId) return null;
  return imageUrlBuilder({ projectId, dataset }).image(source);
};

/**
 * Check if Sanity is configured.
 */
export const isSanityConfigured = (): boolean => {
  return !!projectId && sanityClient !== null;
};
