import { sanityClient, isSanityConfigured, imageUrl } from "./client";
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_SLUGS_QUERY,
} from "./blogQueries";
import { fallbackBlogPosts } from "@/lib/data/blog";
import type { BlogPost, SanityBlogDocument } from "@/lib/data/types";

function mapSanityBlogPost(doc: SanityBlogDocument): BlogPost {
  let coverImage: string | undefined;
  if (doc.coverImage?.asset) {
    const builder = imageUrl(doc.coverImage as Parameters<typeof imageUrl>[0]);
    coverImage = builder?.width(1200).auto("format").url() ?? undefined;
  }

  return {
    _id: doc._id,
    slug: doc.slug?.current ?? "",
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    metaDescription: doc.metaDescription ?? doc.excerpt ?? "",
    content: doc.content ?? [],
    coverImage,
    publishedAt: doc.publishedAt ?? doc._createdAt,
    readTime: doc.readTime,
    tags: doc.tags ?? [],
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
    return fallbackBlogPosts;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docs: SanityBlogDocument[] = await (sanityClient as any).fetch(BLOG_POSTS_QUERY);
    if (docs.length === 0) return fallbackBlogPosts;
    return docs.map(mapSanityBlogPost);
  } catch (err) {
    console.error("[Sanity] Failed to fetch blog posts:", err);
    return fallbackBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) {
    return fallbackBlogPosts.find((p) => p.slug === slug) ?? null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: SanityBlogDocument | null = await (sanityClient as any).fetch(
      BLOG_POST_BY_SLUG_QUERY,
      { slug }
    );
    if (doc) return mapSanityBlogPost(doc);
    return fallbackBlogPosts.find((p) => p.slug === slug) ?? null;
  } catch (err) {
    console.error("[Sanity] Failed to fetch blog post by slug:", err);
    return fallbackBlogPosts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return fallbackBlogPosts.map((p) => p.slug);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docs: SanityBlogDocument[] = await (sanityClient as any).fetch(BLOG_POST_SLUGS_QUERY);
    const slugs = docs.map((d) => d.slug?.current).filter((s): s is string => !!s);
    return slugs.length > 0 ? slugs : fallbackBlogPosts.map((p) => p.slug);
  } catch (err) {
    console.error("[Sanity] Failed to fetch blog slugs:", err);
    return fallbackBlogPosts.map((p) => p.slug);
  }
}
