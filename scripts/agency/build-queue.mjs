#!/usr/bin/env node
/**
 * Build queue.html: one card per pitched lead with the message, a wa.me send
 * link (text pre-filled), and the mockup image. Open it, review, click to send.
 *
 * Usage: node scripts/agency/build-queue.mjs   (alias: pnpm agency:queue)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADS = resolve(__dirname, "leads.json");
const OUT = resolve(__dirname, "queue.html");

const leads = existsSync(LEADS) ? JSON.parse(readFileSync(LEADS, "utf-8")) : [];
const pitched = leads.filter((l) => l.status === "pitched" && l.pitch);

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// ponytail: 1-line dup of scout's waLink — sharing across .mjs isn't worth a util module.
const waLink = (phone, msg) =>
  `https://wa.me/${String(phone).replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

const PALETTES = {
  veterinary_care:  "verde esmeralda y blanco con toques cálidos — transmite cuidado y confianza",
  hair_salon:       "negro, blanco y rose gold — elegante y moderno",
  beauty_salon:     "tonos nude, blanco y dorado suave — sofisticado y femenino",
  accounting:       "azul marino y blanco — profesional y confiable",
  consultant:       "azul marino y gris oscuro — corporativo y serio",
  restaurant:       "naranja cálido, crema y marrón — apetecible y acogedor",
  gym:              "negro, naranja y gris — energético y potente",
  pharmacy:         "verde y blanco — saludable y limpio",
  hardware_store:   "naranja, gris oscuro y blanco — industrial y directo",
  grocery_store:    "verde fresco y blanco — fresco y cercano",
};

const imgPrompt = (l) => {
  const palette = PALETTES[l.rubro] ?? "azul marino y blanco — profesional y limpio";
  return `Crea un mockup fotorrealista de landing page para "${l.name}", ${l.rubro} en Argentina. Estilo moderno y profesional: header con nombre del negocio, sección hero con título destacado y botón de llamada a la acción, sección de servicios con íconos, sección de contacto. Paleta: ${palette}. Vista desktop en marco de browser, encuadre 16:9, alta resolución, UI design screenshot.`;
};

const cards = pitched
  .map(
    (l) => `
  <article class="card">
    <img src="out/mockups/${esc(l.id)}.png" alt="mockup" loading="lazy" onerror="this.style.display='none'">
    <div class="body">
      <h2>${esc(l.name)}</h2>
      <p class="meta">${esc(l.rubro)} · ${esc(l.phone)} · ${esc(l.address)}</p>
      <p class="label">📸 Prompt para imagen (ChatGPT / DALL·E)</p>
      <pre class="img-prompt">${esc(imgPrompt(l))}</pre>
      <button class="copy" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent); this.textContent='✓ Copiado'">Copiar prompt</button>
      <p class="label" style="margin-top:1rem">💬 Mensaje WhatsApp</p>
      <pre class="pitch">${esc(l.pitch)}</pre>
      <a class="send" href="${esc(waLink(l.phone, l.pitch))}" target="_blank" rel="noopener">Abrir WhatsApp →</a>
    </div>
  </article>`
  )
  .join("\n");

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cola de envío — ${pitched.length} leads</title>
<style>
  body { font-family:system-ui, sans-serif; max-width:900px; margin:2rem auto; padding:0 1rem; background:#0b0b0f; color:#e7e7ea; }
  h1 { font-size:1.4rem; }
  .note { color:#9a9aa6; }
  .card { display:flex; gap:1rem; background:#15151c; border:1px solid #26262f; border-radius:12px; padding:1rem; margin:1rem 0; }
  .card img { width:240px; height:auto; border-radius:8px; align-self:flex-start; border:1px solid #26262f; }
  .body { flex:1; min-width:0; }
  h2 { margin:0 0 .25rem; font-size:1.1rem; }
  .meta { color:#9a9aa6; font-size:.85rem; margin:0 0 .75rem; }
  .pitch { white-space:pre-wrap; background:#0e0e14; border:1px solid #26262f; border-radius:8px; padding:.75rem; font-family:inherit; font-size:.9rem; margin:0 0 .75rem; }
  .label { color:#9a9aa6; font-size:.8rem; margin:.75rem 0 .3rem; text-transform:uppercase; letter-spacing:.05em; }
  .img-prompt { white-space:pre-wrap; background:#0a0a10; border:1px solid #2d2d3a; border-radius:8px; padding:.75rem; font-family:inherit; font-size:.85rem; margin:0; color:#c8c8d8; }
  .copy { margin:.4rem 0 0; background:#2d2d3a; color:#e7e7ea; border:none; border-radius:6px; padding:.35rem .75rem; font-size:.8rem; cursor:pointer; }
  .copy:hover { background:#3a3a4a; }
  .send { display:inline-block; background:#25d366; color:#06210f; font-weight:600; text-decoration:none; padding:.55rem 1rem; border-radius:8px; }
</style></head><body>
<h1>Cola de envío — ${pitched.length} leads listos</h1>
<p class="note">Revisá cada mensaje. Clic en “Enviar” abre WhatsApp con el texto precargado — vos apretás enviar.</p>
${cards || '<p class="note">No hay leads en estado "pitched". Corré el scout y el paso de pitch primero.</p>'}
</body></html>`;

writeFileSync(OUT, html, "utf-8");
console.log(`queue.html → ${pitched.length} leads. Abrilo en el navegador.`);
