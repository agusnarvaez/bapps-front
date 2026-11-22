#!/usr/bin/env node
/**
 * Mockup: página de muestra del negocio según su rubro → PNG de 1080x1350
 * (el formato que mejor se ve en el chat de WhatsApp).
 *
 * Uso:  node scripts/agency/mockup.mjs <leadId>
 *       node scripts/agency/mockup.mjs --all     todos los leads con mensaje
 */

import puppeteer from "puppeteer";
import { readFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { mockupHtml } from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADS = resolve(__dirname, "leads.json");
const OUT_DIR = resolve(__dirname, "out/mockups");
const SIZE = { width: 1080, height: 1350 };

const arg = process.argv[2];
if (!arg) {
  console.error("Uso: node scripts/agency/mockup.mjs <leadId> | --all");
  process.exit(1);
}

const leads = existsSync(LEADS) ? JSON.parse(readFileSync(LEADS, "utf-8")) : [];
const targets = arg === "--all" ? leads.filter((lead) => lead.pitch) : leads.filter((lead) => lead.id === arg);
if (!targets.length) {
  console.error(arg === "--all" ? "No hay leads con mensaje en leads.json" : `Lead ${arg} no está en leads.json`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const cut = [];
try {
  const page = await browser.newPage();
  await page.setViewport(SIZE);
  for (const lead of targets) {
    await page.setContent(mockupHtml(lead), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    // Un mockup con el contenido cortado no se manda: se avisa cuál revisar.
    const overflows = await page.evaluate(() => document.body.scrollHeight > window.innerHeight + 1);
    if (overflows) cut.push(lead.name);
    writeFileSync(resolve(OUT_DIR, `${lead.id}.png`), await page.screenshot({ type: "png" }));
  }
} finally {
  await browser.close();
}

console.log(`${targets.length} mockup(s) → ${OUT_DIR}`);
if (cut.length) {
  console.error(`No entran en 1080x1350 (revisar el nombre o los textos del rubro): ${cut.join(", ")}`);
  process.exit(1);
}
