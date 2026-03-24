# bapps-front

Este repositorio alberga el codigo fuente del frontend para nuestro negocio de servicios de paginas web. Nuestra mision es crear experiencias web excepcionales que cautiven a nuestros clientes y optimicen su presencia en linea.

## Variables de entorno publicas

- `NEXT_PUBLIC_SHOW_TEAM_PHOTOS`: controla si la seccion de equipo muestra fotos reales (`true`) o placeholders con iniciales (`false`).
- Valor por defecto: `true` si la variable no esta definida.
- Ejemplo local: `NEXT_PUBLIC_SHOW_TEAM_PHOTOS=false` en `.env.local`.
- Ejemplo de produccion: definir `NEXT_PUBLIC_SHOW_TEAM_PHOTOS=false` en el entorno del deploy para ocultar rostros sin tocar codigo.

[![Build](https://github.com/agusnarvaez/bapps-front/actions/workflows/build.yml/badge.svg)](https://github.com/agusnarvaez/bapps-front/actions/workflows/build.yml)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Astro](https://img.shields.io/badge/Astro-3.x-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Coverage](https://img.shields.io/badge/Coverage-pending-lightgrey)](#quality)

Marketing website for Bapps, focused on presenting web development services with a simple routing structure.

Sitio institucional de Bapps, orientado a presentar servicios de desarrollo web con una estructura de rutas simple.

## Overview

### ES

Este proyecto contiene el frontend del sitio de Bapps. Hoy incluye una home principal y una pagina de contacto, con componentes Astro reutilizables y assets estaticos.

### EN

This project contains the frontend for the Bapps website. It currently includes a main landing page and a contact page, with reusable Astro components and static assets.

## Stack

- Astro 3
- TypeScript
- Static assets served from `public/` and `src/assets/`
- GitHub Actions for build validation

## Getting Started

```bash
npm install
npm run dev
```

The local development server runs on Astro's default port and supports live reload.

## Available Scripts

```bash
npm run dev
npm run start
npm run build
npm run preview
```

## Project Structure

```text
src/
  assets/
  components/
    Footer/
    Header/
    Home/
  layouts/
  pages/
    index.astro
    contacto.astro
public/
```

## Quality

- GitHub Actions validates the production build on every push to `main`, `dev`, and every pull request.
- A case-sensitive import mismatch was corrected so the project can build reliably on Linux runners.
- Coverage is still pending and should be added when the project gets its first automated test suite.

## Notes

- Keep component imports aligned with the real file casing. Linux-based CI is stricter than the local Windows environment.
- Prefer keeping this repo focused on static marketing content, leaving application logic outside of the Astro frontend.

## License

MIT. See [LICENSE](./LICENSE).
