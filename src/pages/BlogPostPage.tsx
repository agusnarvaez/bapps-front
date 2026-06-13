"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";
import { getBlogPostBySlug } from "@/lib/sanity/blogPostQueries";
import { navigateTo } from "@/lib/router";
import MagneticButton from "@/components/ui/MagneticButton";
import NotFoundContent from "@/components/pages/NotFoundContent";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import type { BlogPost } from "@/lib/data/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ slug }: { slug: string }) {
  const locale = useLocale();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let active = true;
    void getBlogPostBySlug(slug).then((fetched) => {
      if (active) setPost(fetched);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (post) {
      updateDocumentMetadata({
        title: `${post.title} | BApps`,
        description: post.metaDescription ?? post.excerpt,
      });
    }
  }, [post]);

  if (post === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-bapps-purple border-t-transparent" />
      </div>
    );
  }

  if (post === null) {
    return <NotFoundContent />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "BApps",
      url: "https://bapps.com.ar",
    },
    publisher: {
      "@type": "Organization",
      name: "BApps",
      url: "https://bapps.com.ar",
      logo: {
        "@type": "ImageObject",
        url: "https://bapps.com.ar/images/logo-bapps.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bapps.com.ar/${locale}/blog/${post.slug}/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bapps-purple/[0.05] via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-bapps-purple/8 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-2 text-sm text-foreground-muted"
          >
            <button
              onClick={() => navigateTo(`/${locale}/`)}
              className="transition-colors hover:text-foreground"
            >
              Inicio
            </button>
            <span>/</span>
            <button
              onClick={() => navigateTo(`/${locale}/blog/`)}
              className="transition-colors hover:text-foreground"
            >
              Blog
            </button>
            <span>/</span>
            <span className="truncate max-w-[200px] text-foreground">{post.title}</span>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 flex flex-wrap gap-2"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-bapps-purple/25 bg-bapps-purple/10 px-3 py-0.5 text-xs font-medium text-bapps-purple-light"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-5 flex flex-wrap items-center gap-3 text-sm text-foreground-muted"
          >
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M5 2v3M11 2v3M2 7h12" />
              </svg>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            {post.readTime && (
              <>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3.5l2 1.5" strokeLinecap="round" />
                  </svg>
                  <span>{post.readTime} min de lectura</span>
                </div>
              </>
            )}
            <span>·</span>
            <span>Por BApps</span>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <section className="mb-12">
          <div className="mx-auto max-w-3xl px-6">
            <motion.img
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-2xl border border-border object-cover"
              style={{ maxHeight: "420px" }}
            />
          </div>
        </section>
      )}

      {/* Article content */}
      <article className="pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mx-auto max-w-3xl px-6"
        >
          <PortableTextRenderer blocks={post.content} />
        </motion.div>
      </article>

      {/* CTA */}
      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-bapps-purple via-bapps-purple-dark to-background-tertiary" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-bapps-yellow/20 blur-[80px] animate-pulse" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-bapps-purple-light/30 blur-[80px] animate-pulse [animation-delay:1s]" />
            </div>
            <div className="relative px-8 py-16 text-center md:px-12">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/60">¿Listo para arrancar?</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
                Cotizá tu proyecto gratis
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-base text-white/70">
                Primera consulta sin costo. Te respondemos en menos de 24hs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <MagneticButton
                  href={`/${locale}/contact`}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-bapps-yellow px-8 py-3.5 text-base font-bold text-background transition-all duration-300 hover:shadow-xl hover:shadow-bapps-yellow/30"
                  strength={14}
                >
                  Contactar ahora
                </MagneticButton>
                <button
                  onClick={() => navigateTo(`/${locale}/blog/`)}
                  className="rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
                >
                  Más artículos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
