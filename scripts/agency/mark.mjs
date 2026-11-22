#!/usr/bin/env node
/**
 * Registra en leads.json qué pasó con cada prospecto.
 *
 * Uso:  pnpm agency:mark <estado> <id> [<id>…]
 *       pnpm agency:mark sent ChIJ… ChIJ…     (el comando que copia queue.html)
 *       pnpm agency:mark                       muestra el conteo por estado
 *
 * Estados:
 *   sent     se le escribió
 *   replied  contestó
 *   optout   pidió que no le escriban más: no se lo vuelve a contactar
 *   skip     no corresponde (no es pyme, otra ciudad, ya tiene web)
 *   pitched  vuelve a la cola
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const LEADS = resolve(dirname(fileURLToPath(import.meta.url)), "leads.json");
const STATES = ["sent", "replied", "optout", "skip", "pitched"];
const [state, ...ids] = process.argv.slice(2);

const leads = existsSync(LEADS) ? JSON.parse(readFileSync(LEADS, "utf-8")) : [];
const report = () => {
  const counts = leads.reduce((acc, lead) => ({ ...acc, [lead.status]: (acc[lead.status] ?? 0) + 1 }), {});
  console.log(Object.entries(counts).map(([status, n]) => `${status}: ${n}`).join(" · ") || "sin prospectos");
};

if (!state) {
  report();
  process.exit(0);
}
if (!STATES.includes(state) || !ids.length) {
  console.error(`Uso: pnpm agency:mark <${STATES.join("|")}> <id> [<id>…]`);
  process.exit(1);
}

const unknown = ids.filter((id) => !leads.some((lead) => lead.id === id));
if (unknown.length) {
  // Mejor no escribir nada que registrar a medias una tanda de envíos.
  console.error(`No están en leads.json: ${unknown.join(", ")}. No se modificó nada.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
for (const lead of leads) {
  if (!ids.includes(lead.id)) continue;
  // Una baja es definitiva: no se pisa por error con un "sent" posterior.
  if (lead.status === "optout" && state !== "optout") {
    console.error(`${lead.name} pidió la baja: se deja como optout.`);
    continue;
  }
  lead.status = state;
  lead[`${state}At`] = today;
}

writeFileSync(LEADS, JSON.stringify(leads, null, 2) + "\n", "utf-8");
report();
