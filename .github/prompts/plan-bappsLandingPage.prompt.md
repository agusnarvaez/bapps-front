## Plan: Landing Page BApps

Construir la landing page de BApps con **Next.js 14+ App Router + exportación estática** para Hostinger. Estética **futurista/tech dark** con violeta `#AD60E1`, amarillo `#E7FB79`, tipografías Delta Gothic One + Commissioner. Animaciones avanzadas (cursor custom, cohete 3D, partículas, scroll horizontal). Bilingüe ES/EN. Enfoque MVP incremental: Home completa primero, luego páginas secundarias.

---

### Fase 1: Setup y Fundación *(debe completarse primero)*

1. **Inicializar proyecto** — `create-next-app` con TypeScript, Tailwind, App Router, `output: 'export'` en config (necesario para Hostinger shared hosting)
2. **Identidad visual** — Variables CSS con los colores BApps, configurar Tailwind theme, importar fonts (Delta Gothic One + Commissioner), optimizar logo
3. **i18n con `next-intl`** — Routing por `[locale]`, archivos `messages/es.json` + `messages/en.json`, toggle en header
4. **Preparar Sanity (sin deploy)** — Schemas para Proyecto, Equipo, Testimonio, Servicio. Capa de datos abstracta que lee de archivos locales, lista para switchear a Sanity

### Fase 2: Layout Global y Navegación

5. **Header** — Fixed con backdrop blur, logo, nav links (scroll-to secciones), toggle idioma, menú hamburguesa mobile con animación cinematográfica
6. **Footer** — Links, redes, CTA final
7. **Custom cursor** — Trail/glow violeta, efecto magnético en interactivos, cambio de forma en hover, desactivado en touch *(parallel con 5-6)*
8. **Page transitions** — Framer Motion `AnimatePresence`, fade + slide entre páginas *(parallel con 7)*

### Fase 3: Home Page — Secciones

9. **Hero** — Fondo oscuro + partículas interactivas (tsparticles/canvas), headline en Delta Gothic One, CTA → cotizador, **cohete 3D flotante** con React Three Fiber (sin-wave Y, rotación lenta, parallax con mouse), scroll indicator *(depende de 1-4)*
10. **Servicios** — Bento grid, íconos animados, reveal staggered on scroll *(parallel con 11-14)*
11. **Proyectos Destacados** — Scroll horizontal con snap, cards con parallax, 4-5 proyectos, botón "Ver todos"
12. **Sobre Nosotros / Equipo** — Misión + grid de miembros con hover reveal
13. **Testimonios / Social Proof** — Carousel + counters animados (proyectos, clientes)
14. **CTA Final** — Sección impacto visual, gradiente animado violeta→amarillo, botón al cotizador

### Fase 4: Páginas Secundarias

15. **Projects Page** — Grid filtrable por categoría, hover zoom + overlay *(depende de 11)*
16. **Project Detail** (`/projects/[slug]`) — Galería, descripción, tecnologías, link live, testimonial cliente — página dedicada para SEO
17. **Contact/Cotizador** — Wizard multi-step (tipo proyecto → detalles → timeline/budget → datos contacto), React Hook Form + Zod, envío con **EmailJS** (client-side, no hay API routes en static export), background con astronauta
18. **Página 404** — Basada en wireframes existentes, animación de cohete perdido

### Fase 5: Animaciones Avanzadas

19. **Smooth scrolling** con Lenis *(integrar desde Fase 2)*
20. **Loading screen** — Animación inicial con logo BApps
21. **Micro-interacciones** — Botones con ripple/glow, links con underline animado, cards con tilt effect, counters
22. **`prefers-reduced-motion`** — Respetar preferencia de accesibilidad en TODAS las animaciones

### Fase 6: SEO, Performance y Accesibilidad

23. **SEO** — `generateMetadata`, Open Graph, Twitter Cards, Schema.org (Organization), sitemap.xml, robots.txt
24. **Performance** — `next/image`, lazy load de Three.js y partículas con `next/dynamic`, font preload, bundle analysis. Targets: LCP < 2.5s, CLS < 0.1
25. **Accesibilidad** — Contraste 4.5:1+, focus rings, alt text, keyboard nav, aria-labels, skip-to-content

### Fase 7: Build y Deploy

26. **Build estático** — `next build` genera `out/`, verificar con `npx serve out`
27. **Deploy Hostinger** — Subir `out/` a `public_html`, `.htaccess` para routing SPA, SSL, cache headers

---

### Archivos relevantes existentes

- `logo-bapps.png` — Logo
- `rocket.svg` — Cohete (imagen raster embebida, no vectorial)
- `home-background-astronaut.jpg` — Background hero/contacto
- Wireframes: `page-home-desktop.jpg`, `page-home-mobile.jpg`, `page-contact-desktop.jpg`, `page-contact-mobile.jpg`, `page-project-desktop.jpg`, `page-404-desktop.png`, `page-404-mobile.jpg`

### Dependencias principales

| Paquete | Propósito |
|---------|-----------|
| `next` 14+ | Framework con App Router |
| `tailwindcss` | Estilos |
| `framer-motion` | Animaciones componentes/página |
| `@react-three/fiber` + `drei` + `three` | Cohete 3D |
| `next-intl` | i18n ES/EN |
| `lenis` | Smooth scroll |
| `react-hook-form` + `zod` | Forms + validación |
| `@emailjs/browser` | Email client-side |
| `@sanity/client` | Preparación CMS |
| `tsparticles` | Partículas interactivas |

### Decisiones

- **Static export** (no SSR) — Hostinger no soporta Node.js
- **EmailJS** para formulario — no hay server-side
- **Página dedicada por proyecto** en vez de popup — mejor SEO
- **Datos hardcodeados con abstracción** — listos para migrar a Sanity
- **MVP**: Fases 1-3 primero (Home completa funcional), luego 4-7

### Consideraciones

1. **Cohete 3D**: El rocket.svg es raster embebido. **Recomiendo usar un modelo .glb low-poly** (free de Sketchfab/Poly.pizza) pintado con colores BApps, más impactante que un plano con textura.
2. **Analytics**: Conviene agregar GA4 o Plausible para trackear conversiones del cotizador.
3. **Blog**: La estructura con Sanity facilita agregarlo post-MVP para SEO orgánico.
