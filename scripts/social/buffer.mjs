#!/usr/bin/env node
/**
 * Manda a Buffer, como BORRADORES, las piezas que generó `pnpm social <slug>`.
 * Nada sale publicado: cada borrador se aprueba a mano en Buffer.
 *
 * Uso:  pnpm social:buffer <slug>            crea los borradores
 *       pnpm social:buffer <slug> --dry-run  muestra qué mandaría, sin subir ni crear nada
 *       pnpm social:buffer --channels        lista los canales conectados en Buffer
 *       pnpm social:buffer <slug> --force    vuelve a mandar una nota ya enviada
 *
 * Necesita en .env.local: BUFFER_API_KEY y SANITY_WRITE_TOKEN (ver .env.example).
 * Buffer no acepta archivos, sólo URLs públicas: las imágenes y el PDF se suben
 * antes al CDN de Sanity (que no duplica: mismo archivo, misma URL).
 *
 * Qué manda a cada canal:
 *   instagram → carrusel con las placas JPG + instagram.txt
 *   linkedin  → carrusel.pdf como documento + linkedin.txt
 */

import { createClient } from "@sanity/client";
import { loadEnv } from "vite";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const BUFFER_API = "https://api.buffer.com";
const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const slug = args.find((arg) => !arg.startsWith("--"));
const env = loadEnv("production", ROOT, "");

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

async function buffer(query, variables = {}) {
  const response = await fetch(BUFFER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.BUFFER_API_KEY}` },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.errors?.length) {
    const detail = body.errors?.map((error) => error.message).join("; ") || response.statusText;
    throw new Error(`Buffer respondió ${response.status}: ${detail}`);
  }
  return body.data;
}

async function getChannels() {
  const { account } = await buffer(`query { account { organizations { id name } } }`);
  const channels = [];
  for (const organization of account.organizations) {
    const data = await buffer(
      `query ($organizationId: OrganizationId!) { channels(input: { organizationId: $organizationId }) { id name service } }`,
      { organizationId: organization.id }
    );
    channels.push(...data.channels);
  }
  return channels;
}

const CREATE_DRAFT = `
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on PostActionSuccess { post { id status } }
      ... on MutationError { message }
    }
  }`;

function draftInput(channel, piece) {
  const base = { channelId: channel.id, schedulingType: "automatic", mode: "addToQueue", saveToDraft: true };
  if (channel.service === "instagram") {
    return {
      ...base,
      text: piece.instagram,
      assets: piece.images.map((url, i) => ({
        image: { url, metadata: { altText: `${piece.title} (placa ${i + 1} de ${piece.images.length})` } },
      })),
      metadata: { instagram: { type: "post", shouldShareToFeed: true } },
    };
  }
  return {
    ...base,
    text: piece.linkedin,
    assets: [{ document: { url: piece.pdf, thumbnailUrl: piece.images[0], title: piece.title } }],
  };
}

if (!flags.has("--dry-run") && !env.BUFFER_API_KEY) fail("Falta BUFFER_API_KEY en .env.local (ver .env.example).");

if (flags.has("--channels")) {
  for (const channel of await getChannels()) console.log(`${channel.service.padEnd(12)} ${channel.name}  (${channel.id})`);
  process.exit(0);
}

if (!slug) fail("Falta el slug. Uso: pnpm social:buffer <slug> [--dry-run] [--force] | --channels");

const dir = resolve(ROOT, "social-out", slug);
if (!existsSync(resolve(dir, "post.json"))) fail(`No hay piezas para "${slug}". Generalas primero: pnpm social ${slug}`);

const sentFile = resolve(dir, "buffer.json");
// Sin esto, correr el comando dos veces deja borradores duplicados en Buffer.
if (existsSync(sentFile) && !flags.has("--force")) {
  fail(`"${slug}" ya se mandó a Buffer (${sentFile}). Para mandarla de nuevo: --force`);
}

const { title } = JSON.parse(readFileSync(resolve(dir, "post.json"), "utf-8"));
const jpgs = readdirSync(dir).filter((file) => /^\d+\.jpg$/.test(file)).sort();
const piece = {
  title,
  linkedin: readFileSync(resolve(dir, "linkedin.txt"), "utf-8"),
  instagram: readFileSync(resolve(dir, "instagram.txt"), "utf-8"),
  images: jpgs.map((file) => `<url de ${file}>`),
  pdf: "<url de carrusel.pdf>",
};

if (flags.has("--dry-run")) {
  for (const service of ["instagram", "linkedin"]) {
    console.log(`\n── ${service} ──`);
    console.log(JSON.stringify(draftInput({ id: `<canal de ${service}>`, service }, piece), null, 2));
  }
  process.exit(0);
}

if (!env.SANITY_WRITE_TOKEN) fail("Falta SANITY_WRITE_TOKEN en .env.local (ver .env.example).");

const channels = (await getChannels()).filter((channel) => ["instagram", "linkedin"].includes(channel.service));
if (!channels.length) fail("Buffer no tiene canales de Instagram ni de LinkedIn conectados.");

const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
});
const upload = async (type, file) =>
  (await sanity.assets.upload(type, readFileSync(resolve(dir, file)), { filename: `${slug}-${file}` })).url;

piece.images = [];
for (const file of jpgs) piece.images.push(await upload("image", file));
piece.pdf = await upload("file", "carrusel.pdf");
console.log(`${jpgs.length} imágenes + PDF alojados en Sanity.`);

const sent = [];
let failed = false;
for (const channel of channels) {
  try {
    const { createPost } = await buffer(CREATE_DRAFT, { input: draftInput(channel, piece) });
    if (!createPost.post) throw new Error(createPost.message ?? "respuesta sin borrador");
    sent.push({ channel: channel.name, service: channel.service, postId: createPost.post.id, status: createPost.post.status });
    console.log(`✔ borrador en ${channel.service} (${channel.name})`);
  } catch (error) {
    failed = true;
    console.error(`✖ ${channel.service} (${channel.name}): ${error.message}`);
  }
}

if (sent.length) writeFileSync(sentFile, JSON.stringify({ sentAt: new Date().toISOString(), drafts: sent }, null, 2));
if (failed) process.exit(1);
console.log("Revisá y aprobá los borradores en https://publish.buffer.com");
