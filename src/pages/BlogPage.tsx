"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";
import { getBlogPosts } from "@/lib/sanity/blogPostQueries";
import { navigateTo } from "@/lib/router";
import type { BlogPost } from "@/lib/data/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post, index, locale }: { post: BlogPost; index: number; locale: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.5 }}
      className="group flex flex-col rounded-2xl border border-border bg-background-secondary p-6 transition-all duration-300 hover:border-bapps-purple/30 hover:bg-background-tertiary"
    >
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bapps-purple/25 bg-bapps-purple/10 px-3 py-0.5 text-xs font-medium text-bapps-purple-light"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h2 className="mb-3 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-bapps-purple-light">
        {post.title}
      </h2>

      <p className="flex-1 text-sm leading-relaxed text-foreground-muted">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-foreground-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readTime && (
            <>
              <span>·</span>
              <span>{post.readTime} min de lectura</span>
            </>
          )}
        </div>

        <button
          onClick={() => navigateTo(`/${locale}/blog/${post.slug}/`)}
          className="flex items-center gap-1.5 text-sm font-medium text-bapps-purple-light transition-colors hover:text-bapps-purple"
        >
          Leer artículo
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateDocumentMetadata({
      title: "Blog — Diseño Web y Apps | BApps",
      description: "Artículos sobre diseño web, desarrollo de apps y estrategia digital para empresas en Argentina.",
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let active = true;
    void getBlogPosts().then((fetched) => {
      if (active) {
        setPosts(fetched);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "BApps Blog",
    description: "Artículos sobre diseño web, desarrollo de apps y estrategia digital para empresas en Argentina.",
    url: "https://bapps.com.ar/es/blog/",
    publisher: {
      "@type": "Organization",
      name: "BApps",
      url: "https://bapps.com.ar",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bapps-purple/[0.05] via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-bapps-purple/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigateTo(`/${locale}/`)}
            className="mb-8 flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M8 13l-5-5 5-5M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver al inicio
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-bapps-purple/30 bg-bapps-purple/10 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bapps-yellow animate-pulse" />
            <span className="text-sm font-medium text-bapps-purple-light">Blog · BApps</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl md:text-6xl"
          >
            Recursos y guías
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 max-w-xl text-lg text-foreground-muted"
          >
            Diseño web, apps y estrategia digital — sin relleno, con casos reales.
          </motion.p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-background-secondary" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-foreground-muted">Próximamente nuevos artículos.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
