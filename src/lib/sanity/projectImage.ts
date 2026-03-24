import { imageUrl } from "./client";
import type { SanityProjectDocument } from "@/lib/data/types";

export const PROJECT_FALLBACK_IMAGE = "/images/og-default.jpg";

export function resolveProjectImage(
  source?: SanityProjectDocument["image"]
): string {
  if (!source?.asset?._ref) {
    return PROJECT_FALLBACK_IMAGE;
  }

  try {
    const url = imageUrl(source)
      ?.width(1600)
      .fit("max")
      .auto("format")
      .url();

    return url || PROJECT_FALLBACK_IMAGE;
  } catch (error) {
    console.warn("[Sanity] Failed to resolve project image URL:", error);
    return PROJECT_FALLBACK_IMAGE;
  }
}
