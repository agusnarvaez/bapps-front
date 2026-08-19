# GEO Audit Report: BApps

**Audit Date:** 2026-06-25
**URL:** https://bapps.com.ar
**Business Type:** Agency/Services (diseño web y desarrollo de software a medida)
**Pages Analyzed:** 18 (sitemap completo)
**Audit anterior:** 10/100 (Junio 2026, sprint de mejoras aplicado)

---

## Executive Summary

**Overall GEO Score: 40/100 (Poor — mejora de 4× desde el 10/100 anterior)**

La implementación técnica de las últimas semanas fue significativa: el sitio pasó de ser invisible para crawlers de IA (HTML vacío) a tener fundaciones sólidas — prerendering estático, JSON-LD de organización, llms.txt, OG tags completos, headers de seguridad, GBP, LinkedIn. El score subió de 10 a 40 en un ciclo de sprint.

El bottleneck ahora no es técnico: es **autoridad de entidad**. Los modelos de IA (ChatGPT, Gemini, Perplexity) no citan BApps porque no hay señales externas verificables que le digan a esos modelos que BApps existe como entidad real. Tres acciones de bajo esfuerzo — Wikidata, Clutch, autores nombrados — pueden mover el score a 55-60 en 30 días sin tocar código.

**Problema crítico inmediato:** 3 de 4 blog posts devuelven 404 en producción.

### Score Breakdown

| Categoría | Score | Peso | Score Ponderado |
|---|---|---|---|
| AI Citability | 42/100 | 25% | 10.5 |
| Brand Authority | 18/100 | 20% | 3.6 |
| Content E-E-A-T | 38/100 | 20% | 7.6 |
| Technical GEO | 62/100 | 15% | 9.3 |
| Schema & Structured Data | 42/100 | 10% | 4.2 |
| Platform Optimization | 44/100 | 10% | 4.4 |
| **Overall GEO Score** | | | **39.6 → 40/100** |

---

## Logros desde el audit anterior (de 10 → 40)

| Item | Estado |
|---|---|
| llms.txt | ✅ Live |
| robots.txt permisivo (todos los crawlers de IA) | ✅ Correcto |
| Organization + LocalBusiness JSON-LD hardcoded | ✅ Live |
| OG tags + Twitter Card completos | ✅ Live |
| Google Fonts preconnect (sin render-blocking) | ✅ Live |
| Security headers (HSTS, X-Frame, nosniff, Referrer) | ✅ Live |
| www → non-www redirect 301 | ✅ Live |
| Sitemap: 18 URLs con lastmod y hreflang | ✅ Live |
| Política de Privacidad (/es/privacidad/) | ✅ Live |
| IndexNow key file + msvalidate.01 | ✅ Live |
| OG Social Image (1200×630) | ✅ Live |
| Google Business Profile | ✅ Live (13 vistas) |
| LinkedIn company page | ✅ Live (0 seguidores, reciente) |
| Prerendering estático (Puppeteer) | ✅ Código listo — deploy a verificar |
| sameAs: Instagram, LinkedIn, GitHub | ✅ Correcto |

---

## Critical Issues (Arreglar ya)

### 1. 3 de 4 blog posts devuelven 404 en producción

Las siguientes URLs están en el sitemap y en llms.txt pero no sirven contenido:

- `/es/blog/por-que-tu-negocio-pierde-clientes-mientras-dormis/`
- `/es/blog/como-saber-cuanto-vendio-tu-negocio-hoy-sin-estar-presente/`
- `/es/blog/negocio-no-aparece-en-google-clientes-perdidos/`

Solo funciona `/es/blog/cuanto-cuesta-pagina-web-argentina-2026/`.

**Causas probables:**
- El prerendering no generó esos archivos HTML (corrió antes de que los posts existieran en Sanity)
- El .htaccess SPA fallback falla para URLs de blog profundas
- Los slugs en Sanity no coinciden exactamente con los del sitemap

**Fix:** Correr `pnpm build:prerender` con todos los posts en Sanity, verificar que `dist/es/blog/[slug]/index.html` existe para las 4 URLs, y re-deployar.

### 2. Deploy del prerendering no verificado

Confirmar que el `dist/` deployado incluye los archivos prerendered con schemas en body, no solo el `index.html` shell.

**Verificación rápida:** `curl -s https://bapps.com.ar/es/servicios/diseno-web/ | grep -c "FAQPage"` debe devolver > 0.

---

## High Priority Issues (Esta semana)

### 3. Sin autores nombrados en blog posts

Todos los posts atribuyen "BApps" (Organization) como autor. Esto es el factor E-E-A-T más dañino. Los modelos de IA ponderan significativamente más el contenido con autores Person verificables.

**Fix en código:** Cambiar el Article schema en `BlogPostPage.tsx` para usar `@type: Person` con nombre, URL y sameAs a LinkedIn.

### 4. Sin página Nosotros/About

Los nombres Agustín Narvaez, Julián Gibelli y Franco Nicotra aparecen en la sección Equipo del homepage pero sin bios individuales ni credenciales. Esta es la brecha de E-E-A-T más alta.

### 5. Sin entidad en Wikidata

Wikidata es la fuente principal de resolución de entidades para ChatGPT, Perplexity y Gemini. No requiere cumplir criterios de notabilidad de Wikipedia. Crear un entry con 6+ propiedades toma 30 minutos y vale ~15 puntos en Brand Authority.

### 6. Canonical tag hardcodeado para homepage en todas las rutas

El canonical en `index.html` apunta siempre a `https://bapps.com.ar/es/` independientemente de la ruta. El prerendering corrige esto por ruta, pero solo si los archivos prerendered se sirven. Verificar que cada `dist/{ruta}/index.html` tiene su canonical correcto.

---

## Medium Priority Issues (Este mes)

### 7. CSP header faltante

Agregar al bloque `mod_headers` en `.htaccess`:

```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```

### 8. hreflang solo en sitemap, no en `<head>` de cada página

AI crawlers no procesan el sitemap XML para señales hreflang — solo parsean `<head>`. Agregar las tags de alternate en cada archivo prerendered.

### 9. Article schema: falta image y dateModified

El `coverImage` se fetchea de Sanity pero no entra al JSON-LD. Google requiere `image` para rich results de Article.

### 10. Bots de IA no nombrados explícitamente en robots.txt

Agregar al `public/robots.txt`:

```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

Y agregar `<meta name="robots" content="max-snippet:-1">` en todas las páginas clave.

### 11. Sin BreadcrumbList schema en blog y service pages

El breadcrumb visual existe en blog posts pero no tiene JSON-LD equivalente.

---

## Low Priority Issues

- `sameAs` sin YouTube ni Twitter/X (cuando existan)
- `telephone` faltante en Organization contactPoint
- `foundingDate` y `addressLocality` faltantes en Organization
- `potentialAction: SearchAction` faltante en WebSite schema
- `speakable` ausente en todos los schemas
- Sin Permissions-Policy header
- `src/components/seo/JsonLd.tsx` es código muerto — eliminar
- Imágenes con nombres genéricos (`member-1.jpg`, `project-1.jpg`) — Gemini es multimodal

---

## Category Deep Dives

### AI Citability — 42/100

| Bloque | Score | Motivo |
|---|---|---|
| Blog: "Cuánto cuesta una página web" | 78/100 | 4 opciones de precio con rangos USD, muy citable |
| Service page: "70% del tráfico en AR es mobile" | 65/100 | Dato específico y autocontenido |
| Homepage: proceso de 4 fases con tiempos | 54/100 | Estructurado, responde pregunta real |
| Homepage H1: "Convertimos ideas en software que vende" | 22/100 | Marketing copy, no citable como fact |

### Brand Authority — 18/100

| Plataforma | Estado |
|---|---|
| Wikipedia | ❌ Ausente |
| Wikidata | ❌ Ausente |
| Clutch.co | ❌ Ausente |
| Reddit | ❌ Ausente |
| YouTube | ❌ Ausente |
| LinkedIn | ✅ Creado (0 seguidores) |
| Instagram | ✅ Existe |
| GitHub | ✅ Existe |
| Google Business Profile | ✅ Creado (0 reseñas) |

### Content E-E-A-T — 38/100

| Dimensión | Score | Gap principal |
|---|---|---|
| Experience | 7/25 | Sin casos de éxito con clientes reales, sin métricas |
| Expertise | 6/25 | Sin individuos nombrados en contenido, sin credenciales |
| Authoritativeness | 10/25 | Sin página Nosotros, sin menciones externas |
| Trustworthiness | 15/25 | HTTPS + Privacy Policy OK; sin dirección física |

### Technical GEO — 62/100

| Componente | Score |
|---|---|
| Server-side rendering / prerender | 40/100 — incertidumbre de deploy |
| Meta tags e indexabilidad | 80/100 |
| Crawlability | 85/100 |
| Security headers | 75/100 — falta CSP |
| Mobile optimization | 85/100 |

Si el prerendering está deployado correctamente: sube a ~79/100.

### Schema & Structured Data — 42/100

| Schema | Estado | Gap |
|---|---|---|
| Organization + LocalBusiness | ✅ Presente | Falta telephone, foundingDate, addressLocality |
| WebSite | ✅ Presente | Falta SearchAction |
| Article | ✅ Presente (prerendered) | Autor = Organization (debe ser Person), falta image, dateModified |
| FAQPage | ✅ Presente (prerendered) | Sin rich results en Google post-Aug 2023; valor semántico para IA |
| Service | ✅ Presente (prerendered) | Falta url y offers |
| Person (autores) | ❌ Ausente | Mayor gap de schema |
| BreadcrumbList | ❌ Ausente | |
| speakable | ❌ Ausente | |

### Platform Optimization — 44/100

| Plataforma | Score | Estado |
|---|---|---|
| Bing Copilot | 65/100 | Mejor plataforma técnicamente configurada |
| Google AI Overviews | 54/100 | Fundaciones buenas; falta FAQ en homepage |
| Google Gemini | 50/100 | GBP OK; falta YouTube |
| ChatGPT Web Search | 28/100 | Sin Wikidata, sin contenido 2000+ words |
| Perplexity AI | 22/100 | Sin Reddit, sin investigación propia |

---

## Quick Wins Esta Semana

1. **Fix los 404 de blog posts** — `pnpm build:prerender` completo + re-deploy. Recupera 75% del blog para crawlers. Impacto inmediato en citabilidad.

2. **Crear entidad en Wikidata** — wikidata.org, crear item: instance of (software company), country (Argentina), official website, inception date, LinkedIn ID. 30 minutos, +15 pts en Brand Authority. Agregar URL al `sameAs` en `index.html`.

3. **Agregar FAQ block al homepage** — 4 preguntas/respuestas en H3 (50-60 palabras cada respuesta): "¿Qué hace BApps?", "¿Cuánto cuesta el diseño web en Argentina?", "¿Trabajan con empresas de todo el país?", "¿Cuánto tarda un proyecto?". Mayor impacto en Google AI Overviews.

4. **Nombrar autores en blog posts** — cambiar `@type: Organization` a `@type: Person` en Article schema de `BlogPostPage.tsx`. Una línea de código.

5. **Agregar CSP y Permissions-Policy a .htaccess** — 2 líneas, cierra el único gap de seguridad.

---

## 30-Day Action Plan

### Semana 1: Fix Críticos + Wikidata
- [ ] Correr `pnpm build:prerender` completo, verificar 4 blog posts en dist/, re-deployar
- [ ] Verificar canonical correcto por ruta en prerendered HTML
- [ ] Crear entidad Wikidata + agregar a sameAs en index.html
- [ ] Agregar CSP y Permissions-Policy a .htaccess

### Semana 2: E-E-A-T — Autores y Nosotros
- [ ] Crear página /es/nosotros/ con nombres, roles, fotos, historia
- [ ] Cambiar Article schema: Organization → Person con sameAs a LinkedIn
- [ ] Agregar `image` y `dateModified` al Article schema
- [ ] Agregar bots de IA explícitos en robots.txt + max-snippet:-1

### Semana 3: Schema + Contenido
- [ ] Agregar BreadcrumbList JSON-LD a BlogPostPage.tsx y ServicePage.tsx
- [ ] Agregar FAQ H2/H3 block al homepage (4 preguntas reales)
- [ ] Expandir el post de precios a 2000+ palabras con citas externas (INDEC, CESSI)

### Semana 4: Off-site + Plataformas
- [ ] Crear perfil Clutch.co + pedir 3 reseñas a clientes
- [ ] Activar LinkedIn: descripción larga, banner, primer post
- [ ] Comenzar participación orgánica en r/argentina y r/emprendedoresarg
- [ ] Implementar IndexNow API via Sanity webhook para auto-ping en cada publicación

---

## Appendix: Pages Analyzed

| URL | Title | Issues |
|---|---|---|
| /es/ | BApps \| Diseño Web y Apps a Medida en Argentina | Sin FAQ block |
| /es/servicios/diseno-web/ | Diseño Web Profesional en Argentina | Schema OK si prerender deployado |
| /es/blog/cuanto-cuesta-pagina-web-argentina-2026/ | Cuánto cuesta... | Sin autor Person, sin image en schema |
| /es/blog/por-que-tu-negocio-pierde-clientes-mientras-dormis/ | — | **404 en producción** |
| /es/blog/como-saber-cuanto-vendio-tu-negocio-hoy-sin-estar-presente/ | — | **404 en producción** |
| /es/blog/negocio-no-aparece-en-google-clientes-perdidos/ | — | **404 en producción** |
| /es/privacidad/ | Política de Privacidad | OK |
| /llms.txt | — | Válido pero sin descripciones inline |
| /sitemap.xml | — | 18 URLs, lastmod OK, hreflang OK |
| /robots.txt | — | Permisivo, sin entries explícitos por bot |
