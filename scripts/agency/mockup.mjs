#!/usr/bin/env node
/**
 * Mockup: render template.html with a lead's data → PNG screenshot.
 * Same Puppeteer pattern as scripts/prerender.mjs, but renders inline HTML
 * (no server needed) via page.setContent.
 *
 * Usage: node scripts/agency/mockup.mjs <leadId>
 */

import puppeteer from "puppeteer";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADS = resolve(__dirname, "leads.json");
const TEMPLATE = resolve(__dirname, "template.html");
const OUT_DIR = resolve(__dirname, "out/mockups");

const id = process.argv[2];
if (!id) {
  console.error("Usage: node scripts/agency/mockup.mjs <leadId>");
  process.exit(1);
}

const leads = existsSync(LEADS) ? JSON.parse(readFileSync(LEADS, "utf-8")) : [];
const lead = leads.find((l) => l.id === id);
if (!lead) {
  console.error(`Lead ${id} no está en leads.json`);
  process.exit(1);
}

// {{key}} → lead[key], escaping < to keep injected text from breaking the HTML.
const html = readFileSync(TEMPLATE, "utf-8").replace(/\{\{(\w+)\}\}/g, (_, k) =>
  String(lead[k] ?? "").replace(/</g, "&lt;")
);

mkdirSync(OUT_DIR, { recursive: true });
const out = resolve(OUT_DIR, `${id}.png`);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: out, fullPage: true });
  console.log(`mockup → ${out}`);
} finally {
  await browser.close();
}
