#!/usr/bin/env node
/**
 * Scout: Google Places API (New) `searchText` → keep businesses with NO website
 * but WITH a phone → dedupe against leads.json → append. Advances a cursor in
 * state.json so each run continues paginating where the last one stopped.
 *
 * Usage:
 *   node scripts/agency/scout.mjs --city "La Plata" --category "estudio contable" --limit 20
 *   node scripts/agency/scout.mjs --demo     # offline self-check, no API key needed
 *
 * Needs GOOGLE_PLACES_API_KEY (in .env.local or the shell env).
 */

import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADS = resolve(__dirname, "leads.json");
const STATE = resolve(__dirname, "state.json");
const ENDPOINT = "https://places.googleapis.com/v1/places:searchText";
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.formattedAddress",
  "places.primaryType",
  "nextPageToken",
].join(",");

// --- tiny .env.local loader (no dotenv dep; scripts don't get Vite's env) ---
const envFile = resolve(__dirname, "../../.env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf-8").split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

// --- pure helpers (covered by --demo) ---

/** Build a wa.me deep link from an international phone + message. */
function waLink(intlPhone, msg) {
  const digits = String(intlPhone || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

/** Keep only places with a phone and NO website; map to lead objects. */
function filterLeads(places = []) {
  return places
    .filter((p) => !p.websiteUri && (p.nationalPhoneNumber || p.internationalPhoneNumber))
    .map((p) => ({
      id: p.id,
      name: p.displayName?.text ?? "",
      rubro: p.primaryType ?? "",
      phone: p.internationalPhoneNumber ?? p.nationalPhoneNumber ?? "",
      address: p.formattedAddress ?? "",
      status: "new",
    }));
}

/** Drop incoming leads whose id already exists in `existing`. */
function dedupe(existing, incoming) {
  const seen = new Set(existing.map((l) => l.id));
  return incoming.filter((l) => l.id && !seen.has(l.id));
}

// --- io ---
const readJson = (f, fallback) =>
  existsSync(f) ? JSON.parse(readFileSync(f, "utf-8")) : fallback;
const writeJson = (f, data) =>
  writeFileSync(f, JSON.stringify(data, null, 2) + "\n", "utf-8");

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

// --- demo self-check (offline; throws + non-zero exit on failure) ---
function demo() {
  const sample = [
    { id: "A", displayName: { text: "Con Web SA" }, websiteUri: "http://x.com", nationalPhoneNumber: "011 1" },
    { id: "B", displayName: { text: "Sin Web SRL" }, internationalPhoneNumber: "+54 9 11 2345-6789", primaryType: "accounting" },
    { id: "C", displayName: { text: "Sin Tel" } }, // no website, no phone → drop
  ];
  const leads = filterLeads(sample);
  assert.equal(leads.length, 1, "filter keeps only no-website + phone");
  assert.equal(leads[0].id, "B");
  assert.equal(dedupe([{ id: "B" }], leads).length, 0, "dedupe drops existing id");

  const link = waLink("+54 9 11 2345-6789", "hola, ¿cómo va?");
  assert.ok(link.startsWith("https://wa.me/5491123456789?text="), `digits: ${link}`);
  assert.equal(decodeURIComponent(link.split("text=")[1]), "hola, ¿cómo va?", "text round-trips");

  console.log("demo OK — filter, dedupe, waLink pass");
}

// --- main ---
async function scout() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    console.error("Falta GOOGLE_PLACES_API_KEY (ponela en .env.local). Probá --demo para un check offline.");
    process.exit(1);
  }
  const state = readJson(STATE, {});
  const city = arg("city", state.city);
  const category = arg("category", state.category);
  const limit = Number(arg("limit", 20));
  if (!city || !category) {
    console.error('Faltan --city y --category (o un state.json que los tenga).');
    process.exit(1);
  }

  const body = {
    textQuery: `${category} en ${city}`,
    languageCode: "es",
    regionCode: "AR",
    pageSize: Math.min(limit, 20),
  };
  // Continue the same query from where we left off, if the cursor matches.
  if (state.nextPageToken && state.city === city && state.category === category) {
    body.pageToken = state.nextPageToken;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`Places API ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  const leads = readJson(LEADS, []);
  const fresh = dedupe(leads, filterLeads(data.places ?? []));
  writeJson(LEADS, [...leads, ...fresh]);
  writeJson(STATE, { city, category, nextPageToken: data.nextPageToken ?? null });

  console.log(`+${fresh.length} leads nuevos (sin web) en "${category} / ${city}". Total: ${leads.length + fresh.length}.`);
  console.log(data.nextPageToken ? "Hay más páginas — corré de nuevo para seguir." : "Fin de resultados para este target.");
}

if (process.argv.includes("--demo")) demo();
else scout().catch((e) => { console.error(e); process.exit(1); });
