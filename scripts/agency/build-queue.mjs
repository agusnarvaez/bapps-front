#!/usr/bin/env node
/**
 * Arma queue.html: una tarjeta por prospecto pendiente (estado "pitched"), con su
 * mockup, el mensaje y el link de WhatsApp con el texto precargado.
 * Celulares primero; los fijos van al final, marcados, porque rara vez tienen WhatsApp.
 *
 * Uso: node scripts/agency/build-queue.mjs   (alias: pnpm agency:queue)
 *
 * WhatsApp no deja adjuntar la imagen desde el link: se arrastra el mockup al chat.
 * Cada "Abrir WhatsApp" queda anotado en el navegador; el botón de arriba copia el
 * comando que lo registra en leads.json (pnpm agency:mark sent …).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { cleanPitch, phoneKind, rubroOf, waLink } from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADS = resolve(__dirname, "leads.json");
const OUT = resolve(__dirname, "queue.html");

const leads = existsSync(LEADS) ? JSON.parse(readFileSync(LEADS, "utf-8")) : [];
const ORDER = { movil: 0, desconocido: 1, fijo: 2 };
const pending = leads
  .filter((lead) => lead.status === "pitched" && lead.pitch)
  .map((lead) => ({ ...lead, kind: phoneKind(lead.phone) }))
  .sort((a, b) => ORDER[a.kind] - ORDER[b.kind]);

const counts = leads.reduce((acc, lead) => ({ ...acc, [lead.status]: (acc[lead.status] ?? 0) + 1 }), {});
const summary = Object.entries(counts).map(([status, n]) => `${status}: ${n}`).join(" · ");

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const KIND_LABEL = { movil: "celular", fijo: "fijo: puede no tener WhatsApp", desconocido: "tipo de línea sin confirmar" };

const cards = pending
  .map(
    (l) => `
  <article class="card" data-id="${esc(l.id)}">
    <img src="out/mockups/${esc(l.id)}.png" alt="Mockup de ${esc(l.name)}" loading="lazy" onerror="this.style.display='none'">
    <div class="body">
      <h2>${esc(l.name)}</h2>
      <p class="meta">${esc(rubroOf(l).label)} · ${esc(l.phone)} · <span class="kind ${l.kind}">${KIND_LABEL[l.kind]}</span></p>
      <p class="meta">${esc(l.address)}</p>
      <pre class="pitch">${esc(cleanPitch(l.pitch))}</pre>
      <a class="send" href="${esc(waLink(l.phone, l.pitch))}" target="_blank" rel="noopener">Abrir WhatsApp →</a>
      <span class="done">✓ abierto</span>
    </div>
  </article>`
  )
  .join("\n");

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cola de envío: ${pending.length} pendientes</title>
<style>
  body { font-family:system-ui, sans-serif; max-width:900px; margin:2rem auto; padding:0 1rem; background:#0b0b0f; color:#e7e7ea; }
  h1 { font-size:1.4rem; }
  .note { color:#9a9aa6; line-height:1.5; }
  .bar { position:sticky; top:0; background:#0b0b0f; padding:.75rem 0; border-bottom:1px solid #26262f; display:flex; gap:1rem; align-items:center; }
  .bar button { background:#7c3aed; color:#fff; border:none; border-radius:8px; padding:.55rem 1rem; font-weight:600; cursor:pointer; }
  .bar button:disabled { background:#2d2d3a; color:#9a9aa6; cursor:default; }
  .card { display:flex; gap:1rem; background:#15151c; border:1px solid #26262f; border-radius:12px; padding:1rem; margin:1rem 0; }
  .card img { width:220px; height:auto; border-radius:8px; align-self:flex-start; border:1px solid #26262f; cursor:grab; }
  .card.sent { opacity:.45; }
  .body { flex:1; min-width:0; }
  h2 { margin:0 0 .25rem; font-size:1.1rem; }
  .meta { color:#9a9aa6; font-size:.85rem; margin:0 0 .35rem; }
  .kind.fijo { color:#fca5a5; } .kind.movil { color:#86efac; } .kind.desconocido { color:#fcd34d; }
  .pitch { white-space:pre-wrap; background:#0e0e14; border:1px solid #26262f; border-radius:8px; padding:.75rem; font-family:inherit; font-size:.9rem; margin:.6rem 0 .75rem; }
  .send { display:inline-block; background:#25d366; color:#06210f; font-weight:600; text-decoration:none; padding:.55rem 1rem; border-radius:8px; }
  .done { display:none; margin-left:.75rem; color:#86efac; font-size:.9rem; }
  .card.sent .done { display:inline; }
</style></head><body>
<h1>Cola de envío: ${pending.length} pendientes</h1>
<p class="note">Total en leads.json → ${esc(summary) || "sin prospectos"}.<br>
Por cada uno: <b>1)</b> Abrir WhatsApp (el texto ya viene escrito) · <b>2)</b> arrastrar el mockup al chat · <b>3)</b> enviar.
Volumen bajo: unos 20 a 30 por día.</p>
<div class="bar">
  <button id="copy" disabled>Copiar comando para registrar enviados</button>
  <span class="note" id="count">Ninguno abierto todavía.</span>
</div>
${cards || '<p class="note">No hay prospectos pendientes. Corré el scout y el paso de mensaje primero.</p>'}
<script>
  // ponytail: lo abierto se anota en localStorage (este navegador). La fuente de
  // verdad es leads.json: el botón copia el comando que lo registra ahí.
  const KEY = "agency-opened";
  const opened = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  const present = () => [...document.querySelectorAll(".card")].filter((card) => opened.has(card.dataset.id));
  const refresh = () => {
    document.querySelectorAll(".card").forEach((card) => card.classList.toggle("sent", opened.has(card.dataset.id)));
    const n = present().length;
    document.getElementById("copy").disabled = n === 0;
    document.getElementById("count").textContent = n ? n + " abierto(s) sin registrar." : "Ninguno abierto todavía.";
  };
  document.querySelectorAll(".send").forEach((link) =>
    link.addEventListener("click", () => {
      opened.add(link.closest(".card").dataset.id);
      localStorage.setItem(KEY, JSON.stringify([...opened]));
      refresh();
    })
  );
  document.getElementById("copy").addEventListener("click", async (event) => {
    await navigator.clipboard.writeText("pnpm agency:mark sent " + present().map((card) => card.dataset.id).join(" "));
    event.target.textContent = "✓ Copiado: pegalo en la terminal";
  });
  refresh();
</script>
</body></html>`;

writeFileSync(OUT, html, "utf-8");
console.log(`queue.html → ${pending.length} pendientes (${summary}). Abrilo en el navegador.`);
