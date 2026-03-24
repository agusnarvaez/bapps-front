# CLAUDE.md

## Snapshot

`bapps-front` es el frontend principal de Bapps y hoy corre sobre React + TypeScript + Vite.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- next-intl con adaptaciones locales
- Sanity
- Vitest

## Paths importantes

- `src/App.tsx`: shell principal y resolucion de rutas
- `src/main.tsx`: bootstrap de la aplicacion
- `src/pages/`: paginas React por vista
- `src/components/layout/`: header, footer y selector de idioma
- `src/components/pages/`: flujos de pagina complejos como el cotizador
- `src/components/sections/`: bloques de la home
- `src/lib/i18n/`: configuracion y mensajes
- `src/lib/sanity/`: cliente, queries y mapeos de contenido
- `src/__tests__/`: tests unitarios e integraciones

## Commands

```bash
npm install
npm run dev
npm run build
npm run test
```

## Reglas de trabajo

- No reintroducir archivos, dependencias ni documentacion del stack anterior.
- Mantener las rutas localizadas consistentes con `src/App.tsx` y `src/lib/router.ts`.
- Si cambia el modelo de contenido, actualizar queries, mapeos y tests relacionados.
- Si se toca el cotizador, validar el contrato con la mailing API.

## Mejoras sugeridas

1. Agregar cobertura para las rutas completas con locales.
2. Revisar el tamano del bundle de produccion y dividir modulos pesados si hace falta.
3. Consolidar la documentacion de variables publicas con ejemplos de `.env`.
