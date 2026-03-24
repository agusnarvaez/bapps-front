# bapps-front

Frontend institucional de Bapps construido con React, TypeScript y Vite.

[![Build](https://github.com/agusnarvaez/bapps-front/actions/workflows/build.yml/badge.svg)](https://github.com/agusnarvaez/bapps-front/actions/workflows/build.yml)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

## Resumen

La app resuelve el sitio principal de Bapps con soporte multi-idioma, secciones de presentacion, proyectos, detalle de proyecto y un flujo de contacto con cotizador.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- next-intl con shims de cliente
- Sanity para contenido
- Vitest para testing

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:watch
```

## Rutas principales

- `/:locale/`
- `/:locale/projects`
- `/:locale/projects/:slug`
- `/:locale/contact`

Locales soportados:

- `es`
- `en`

## Variables publicas

- `NEXT_PUBLIC_SHOW_TEAM_PHOTOS`
- `NEXT_PUBLIC_MAILING_API_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SANITY_USE_CDN`

## Estructura

```text
src/
  components/
    animations/
    layout/
    pages/
    sections/
    seo/
    ui/
  lib/
    config/
    data/
    i18n/
    sanity/
    seo/
  messages/
  pages/
  shims/
```

## Calidad

- El workflow de GitHub Actions ejecuta instalacion y build.
- El repo ya no depende del stack anterior y no conserva archivos legacy de ese setup.
- Hay cobertura unitaria e integraciones con Vitest en `src/__tests__/`.

## Notas

- El enrutado se resuelve desde `src/App.tsx`.
- La app usa componentes y utilidades compatibles con un runtime cliente basado en Vite.
- Si se cambia contenido o estructura de proyectos, revisar tambien `src/lib/data/` y `src/lib/sanity/`.

## Licencia

MIT. Ver [LICENSE](./LICENSE).
