# Agency — lead-gen + outreach (v1)

Routine que encuentra pymes **sin sitio web** en Google Maps, arma un pitch de WhatsApp
personalizado + 1 mockup, y los deja en una cola para enviarlos a mano.

## Setup (una vez)
1. Creá una API key en https://console.cloud.google.com y habilitá **Places API (New)**.
2. Poné `GOOGLE_PLACES_API_KEY=...` en `.env.local` (ya está gitignored).
3. Poné un límite de cuota/billing en GCP para no llevarte sorpresas de costo.

## Uso manual
```bash
node scripts/agency/scout.mjs --demo                              # self-check sin API
pnpm scout --city "La Plata" --category "estudio contable" --limit 20
# (Claude escribe el pitch de cada lead 'new' en leads.json y lo pasa a 'pitched')
node scripts/agency/mockup.mjs <leadId>                           # 1 PNG por lead
pnpm agency:queue                                                 # genera queue.html
```
Abrí `queue.html`, revisá, y clic en "Enviar" → WhatsApp con el mensaje precargado.

## Como routine (/loop)
```
/loop pnpm scout --city "La Plata" --category "estudio contable"; luego leé scripts/agency/leads.json, por cada lead status:"new" escribí un pitch de WhatsApp en español argentino (personalizado por nombre/rubro, breve, con una línea de opt-out tipo "si no te interesa, avisame y no escribo más"), marcá status:"pitched", corré node scripts/agency/mockup.mjs <id> por cada uno, y al final pnpm agency:queue. Reportá cuántos leads nuevos.
```
Estado compartido por filesystem → cada tick sigue donde quedó. `/loop` necesita tu compu
abierta; si querés que corra solo, migralo a un cloud agent (skill `schedule`).

## Estado (filesystem, gitignored — PII)
- `leads.json` — leads y su estado (`new` → `pitched`)
- `state.json` — cursor de paginación (ciudad/rubro/nextPageToken)
- `out/mockups/*.png`, `queue.html`

## Riesgo
Cold WhatsApp a números públicos de negocio. Enviá con **aprobación humana**, volumen bajo
(~30/día), opt-out en cada mensaje. No automatices el envío (ban + Ley 25.326).
