#!/usr/bin/env node
/**
 * Genera las piezas de redes de una nota del blog: carrusel (JPG + PDF) y textos.
 *
 * Uso:  pnpm social <slug>        una nota
 *       pnpm social --latest      la última publicada
 *       pnpm social --list        lista los slugs
 *
 * Salida: social-out/<slug>/  (01.jpg…, carrusel.pdf, linkedin.txt, instagram.txt)
 * El PDF es para LinkedIn (se sube como "documento"); los JPG, para Instagram.
 * No publica nada: deja todo listo para revisar. Para mandarlo a Buffer: pnpm social:buffer <slug>
 */

import puppeteer from "puppeteer";
import { createClient } from "@sanity/client";
import { loadEnv } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { buildCaptions, buildSlides } from "./content.mjs";
import { slideHtml } from "./template.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const SIZE = { width: 1080, height: 1350 };
const arg = process.argv[2];

if (!arg) {
  console.error("Falta el slug. Uso: pnpm social <slug> | --latest | --list");
  process.exit(1);
}

const env = loadEnv("production", ROOT, "");
if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID en el .env");
  process.exit(1);
}
const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

const PUBLISHED = `_type == "blogPost" && defined(publishedAt)`;

if (arg === "--list") {
  const posts = await sanity.fetch(`*[${PUBLISHED}] | order(publishedAt desc){ "slug": slug.current, title }`);
  for (const post of posts) console.log(`${post.slug}\n    ${post.title}`);
  process.exit(0);
}

const FIELDS = `{ "slug": slug.current, title, excerpt, tags, content }`;
const post =
  arg === "--latest"
    ? await sanity.fetch(`*[${PUBLISHED}] | order(publishedAt desc)[0]${FIELDS}`)
    : await sanity.fetch(`*[${PUBLISHED} && slug.current == $slug][0]${FIELDS}`, { slug: arg });

if (!post) {
  console.error(`No hay una nota publicada con el slug "${arg}". Probá: pnpm social --list`);
  process.exit(1);
}

const slides = buildSlides(post);
if (slides.length < 4) {
  console.error(`La nota "${post.slug}" tiene muy pocas secciones con texto para armar un carrusel.`);
  process.exit(1);
}

const outDir = resolve(ROOT, "social-out", post.slug);
mkdirSync(outDir, { recursive: true });

const logo = `data:image/png;base64,${readFileSync(resolve(ROOT, "public/images/logo-bapps.png")).toString("base64")}`;
const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setViewport(SIZE);
  const images = [];
  for (const [i, slide] of slides.entries()) {
    // Una placa con texto cortado no se publica. Si no entra, se le sacan ítems
    // de la lista de a uno; si aun así no entra, se corta acá y no en Instagram.
    const fits = async () => {
      await page.setContent(slideHtml(slide, i, slides.length, logo), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      return page.evaluate(() => {
        const main = document.querySelector("main");
        return main.scrollHeight <= main.clientHeight + 1;
      });
    };
    let ok = await fits();
    while (!ok && slide.items?.length) {
      slide.items.pop();
      ok = await fits();
    }
    if (!ok) throw new Error(`La placa ${i + 1} no entra en 1080x1350: acortá el título o el párrafo.`);
    // JPEG y no PNG: es el único formato que acepta la API de Instagram.
    const jpg = await page.screenshot({ type: "jpeg", quality: 93 });
    writeFileSync(resolve(outDir, `${String(i + 1).padStart(2, "0")}.jpg`), jpg);
    images.push(`data:image/jpeg;base64,${Buffer.from(jpg).toString("base64")}`);
  }

  await page.setContent(
    `<style>@page{size:1080px 1350px;margin:0}body{margin:0}img{display:block;width:1080px;height:1350px}</style>` +
      images.map((src) => `<img src="${src}">`).join(""),
    { waitUntil: "load" }
  );
  await page.pdf({ path: resolve(outDir, "carrusel.pdf"), width: "1080px", height: "1350px", printBackground: true });
} finally {
  await browser.close();
}

const captions = buildCaptions(post);
writeFileSync(resolve(outDir, "linkedin.txt"), captions.linkedin);
writeFileSync(resolve(outDir, "instagram.txt"), captions.instagram);
writeFileSync(resolve(outDir, "post.json"), JSON.stringify({ slug: post.slug, title: post.title, slides: slides.length }, null, 2));

console.log(`${slides.length} placas + carrusel.pdf + textos en social-out/${post.slug}/`);
