# CLAUDE.md

## Project Snapshot

`bapps-front` is a small Astro marketing site for Bapps. It currently exposes a home page and a contact page and relies on Astro components plus static assets.

## Stack

- React.ts
- TypeScript
- Static-site build

## Important Paths

- `src/pages/` routes and page entrypoints
- `src/components/Home/` home-specific sections
- `src/components/Header/` and `src/components/Footer/` layout-level UI
- `src/layouts/Layout.astro` shared page shell
- `public/` static public assets

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Working Rules

- Preserve the current route structure unless there is a clear product reason to change it.
- Keep imports case-accurate with the actual filenames so CI works on Linux.
- Favor simple Astro components over introducing unnecessary client-side complexity.
- Treat this repo as a marketing frontend, not as a place for business workflows or API logic.

## Suggested Next Improvements

1. Add automated tests for the main routes and critical content blocks.
2. Add a content checklist for copy, SEO metadata, and accessibility.
3. Introduce a design token layer if the marketing site grows beyond its current scope.
