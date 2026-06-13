# BApps Front — Guía para Claude

## Stack
- **Framework**: React 19 + Vite 7 (refactorizado desde Next.js — rama `refactor-react`)
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **CMS**: Sanity (datos de proyectos)
- **i18n**: next-intl con shims para Vite (`src/shims/`)
- **Testing**: Vitest + Testing Library
- **Package manager**: pnpm (NO usar npm/yarn)

## Comandos
```bash
pnpm dev        # desarrollo local — SIEMPRE testear acá antes de build
pnpm build      # genera dist/ para deploy
pnpm test       # correr tests unitarios
pnpm preview    # previsualizar el build de dist/
```

## Deploy
- Hosting compartido en **Hostinger** — deploy manual por **FTP**
- Subir contenido de `dist/` al directorio raíz del hosting
- El `.htaccess` en `public/` se copia al `dist/` automáticamente en el build

## Reglas obligatorias antes de cada cambio

1. **Testear en dev** (`pnpm dev`) antes de hacer build
2. **Correr tests** (`pnpm test`) — no mergear si hay tests rotos
3. **Buildear** (`pnpm build`) y confirmar que no hay errores de TypeScript/build
4. **Nunca tocar** `out/` — es el build legacy de Next.js, ya no se usa

## Arquitectura de routing
Router custom en `src/lib/router.ts` + `src/App.tsx` — NO usa React Router.
Para agregar una ruta nueva:
1. Agregar tipo en `RouteMatch` (App.tsx)
2. Agregar caso en `matchRoute()` (App.tsx)
3. Agregar render en `App()` (App.tsx)
4. Agregar URL en `public/sitemap.xml`

## Estructura clave
```
src/
  pages/          # Páginas (una por ruta)
  components/
    sections/     # Secciones del home
    layout/       # Header, Footer
    seo/          # JsonLd schema markup
    ui/           # Componentes reutilizables
  lib/
    data/         # Datos estáticos + tipos
    seo/          # Helpers de metadata
    sanity/       # Queries y cliente de Sanity
    i18n/         # Config de idiomas
  messages/       # Traducciones es.json / en.json
  shims/          # Adaptadores Next.js → Vite
public/
  sitemap.xml     # Actualizar al agregar rutas
  robots.txt
  .htaccess       # Reglas Apache (HTTPS, SPA fallback, redirect /)
```

## SEO — siempre al agregar páginas nuevas
- Agregar `updateDocumentMetadata({ title, description })` en el useEffect de la página
- Agregar la URL en `public/sitemap.xml`
- Agregar schema JSON-LD relevante (FAQ, Service, etc.) si aplica
- Usar keywords reales en H1, title y meta description

## Shims (importante)
Los archivos en `src/shims/` reemplazan imports de Next.js para que funcionen en Vite.
Al importar `next-intl`, `next/link`, `next/image`, etc. — Vite los resuelve a estos shims.
NO eliminar ni cambiar los aliases en `vite.config.ts`.

## Tests
Los tests están en `src/__tests__/`. Al agregar componentes nuevos, agregar test mínimo de render.
No mergear con tests rotos.
