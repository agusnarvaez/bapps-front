---
name: BApps — El Plano (Home)
description: The Home page's own blueprint/technical-drafting world — the rest of the site still runs on the prior BApps purple/yellow system.
colors:
  cyanotype-blue: "#0e2f5a"
  cyanotype-blue-deep: "#081d3c"
  blueline: "#1e4c86"
  ruled-line: "rgba(210, 227, 250, 0.35)"
  ruled-line-strong: "rgba(210, 227, 250, 0.6)"
  vellum-paper: "#f2ecdc"
  paper-rule: "rgba(14, 47, 90, 0.14)"
  drafting-ink: "#1c2126"
  graphite-muted: "#4a5568"
  stamp-red: "#b5432e"
  stamp-red-dark: "#8c3120"
  workshop-black: "#0A0A0F"
  workshop-black-secondary: "#111118"
  sheet-foreground: "#EDEDED"
  sheet-foreground-muted: "#A0A0B0"
  sheet-foreground-subtle: "#6A6A7A"
  sheet-border: "rgba(255, 255, 255, 0.08)"
typography:
  display:
    fontFamily: "Architects Daughter, cursive"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  section-y: "8rem"
  group-gap: "3.5rem"
  item-gap: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.stamp-red}"
    textColor: "{colors.vellum-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "16px 40px"
  mark-tag:
    backgroundColor: "transparent"
    textColor: "{colors.blueline}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
---

# Design System: BApps — El Plano (Home)

## Overview

**Creative North Star: "The Approved Set"**

This DESIGN.md documents "El Plano," the blueprint/technical-drafting world built for the Home page's own section components only (`HeroSection`, `ServicesSection`, `ProcessSection`, `WhyUsSection`, `ProjectsSection`, `TeamSection`, `CTASection`, and the shared primitives in `src/components/plano/`). The shared site chrome (`Header`, `Footer`, `LoadingScreen`) and every other page (Services, Projects, Contact, Blog, etc.) still run on the prior BApps purple/yellow system (Delta Gothic One + Commissioner) — that system remains authoritative everywhere outside Home until it gets its own redesign pass.

El Plano reads Home as a set of drawing sheets rather than marketing cards: a hero drawn like a cyanotype cover sheet, a services "schedule" instead of icon cards, a process phasing strip with dimension brackets, an inspection checklist standing in for a benefits grid, and project cards carrying their own title block. It refuses the gradient-hero-and-blob agency default on purpose. Two sheet materials carry the built page: the deep cyanotype-blue ground (hero and the closing CTA — the world's cover-sheet bookends) and warm vellum paper (WhyUs's "inspection checklist" panel). The middle content sections (Services, Process, Projects, Team) are actually built on the site's existing dark neutral tokens (`--background`, `--background-secondary`, `--foreground`), not on the cyanotype blue — they read as the workshop floor between the two drafted sheets, carrying El Plano's type, mono labels, mark tags, and blueline/stamp-red accents on top of that shared dark ground. This is a deliberate divergence from the original direction contract's "blue as dominant ground across hero and section dividers" language; the build's actual distribution is documented here as shipped.

**Key Characteristics:**
- Hand-drafted display lettering (Architects Daughter) paired with a plain, legible body face (Archivo) and a mono register (JetBrains Mono) reserved for labels, codes, and measurements.
- Flat at rest — no box-shadows anywhere in the built system; depth comes from ruled lines, ink-grain texture, and layered stroke rings.
- Square-cornered by default (grids, cards, tags, dividers); the one exception is anything "certified" — stamps, seals, registration marks — which is always fully round.
- A single reused signature motion (the self-drawing ink line) instead of scattered fade/slide entrances.

## Colors

Two drafted grounds (cyanotype blue, vellum paper) bookend and interrupt what is otherwise the site's own dark neutral palette, tied together by one rare, saturated accent (stamp red) and one workhorse "working" blue (blueline) that carries interactive and annotation color on every ground.

### Primary
- **Cyanotype Blue** (#0e2f5a): The hero and closing-CTA ground — the "cover sheet" of the drawing set. Also the deep variant (**Cyanotype Blue Deep**, #081d3c) used in the hero's edge vignette.

### Secondary
- **Stamp Red** (#b5432e): The rubber-stamp accent — primary CTA fill, the hero highlight word, hover states on marks and links, the "certified" seal ring. Its darker twin (**Stamp Red Dark**, #8c3120) appears only in the stamp's ink-grain filter, never as a flat fill.

### Tertiary
- **Blueline** (#1e4c86): The "working" accent reused across every ground — mark-tag borders/text (S-01, P-01), the process section's dimension brackets, the projects scroll-progress rule, hover states on service/team accents. This is the color that does the most day-to-day work in the system, even though it's not the loudest one.

### Neutral
- **Vellum Paper** (#f2ecdc): The WhyUs panel ground and the margin-note card background.
- **Drafting Ink** (#1c2126): Body text and headings on the vellum ground.
- **Graphite Muted** (#4a5568): Secondary/supporting text on the vellum ground.
- **Ruled Line** (rgba(210,227,250,0.35)) / **Ruled Line Strong** (rgba(210,227,250,0.6)): The drafting grid and schematic connector lines on the blue ground.
- **Paper Rule** (rgba(14,47,90,0.14)): The drafting grid lines on the vellum ground.
- **Workshop Black** (#0A0A0F) / **Workshop Black Secondary** (#111118): The dark ground for Services, Process, Projects, and Team — the site's own base neutral, reused as El Plano's "workshop floor" between the two drafted sheets.
- **Sheet Foreground** (#EDEDED) / **Sheet Foreground Muted** (#A0A0B0) / **Sheet Foreground Subtle** (#6A6A7A): Text hierarchy on the workshop-black ground.
- **Sheet Border** (rgba(255,255,255,0.08)): Dividers and card outlines on the workshop-black ground.

### Named Rules
**The Rare Stamp Rule.** Stamp Red appears only on primary CTAs, the hero's highlighted word, and status/seal marks — never as a background fill or body text color. Its rarity is what keeps it reading as an authority mark rather than decoration.

## Typography

**Display Font:** Architects Daughter (with cursive fallback)
**Body Font:** Archivo (with sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** A hand-drafted architect's headline lettering over a plain, businesslike body face, annotated throughout by a mono register that reads as measurements and revision codes rather than as a "tech" costume.

### Hierarchy
- **Display** (400, `text-4xl` → `text-7xl` / clamp ~2.25rem–4.5rem, line-height 1.15): Every H1/H2 in the Home sections — hero headline, each section title, the closing CTA headline. Never used for body copy or labels.
- **Body** (400, `text-lg`/`text-xl`, relaxed line-height): Subtitles, service/step/reason descriptions, project card copy.
- **Label** (500, `text-xs`/`text-sm`, uppercase, tracking-wide-to-widest): CTA button text, mark tags (S-01, P-01), category tags, timeframe/dimension brackets, title-block fields, nav annotations. Reserved exclusively for measurement-like, codified content — never substituted for body copy.

### Named Rules
**The One Voice, Three Registers Rule.** Architects Daughter is reserved for headlines only; Archivo carries every sentence of body copy; JetBrains Mono is the exclusive register for labels, marks, codes, and annotations. The three never swap roles, and mono is never reached for merely to look "technical."

## Layout

Home sections run at `py-32` (128px) vertical rhythm with a `max-w-5xl`–`max-w-7xl` content container depending on section density. Content that would default to a card grid is instead built as a ruled schedule: Services is a single-column list of accordion rows separated by `border-t`/`border-b` dividers (a "spec sheet," not cards); Process is a 4-column phasing strip on a shared horizontal rule; WhyUs is a 2-column checklist with shared dividers between items, not bordered boxes; Projects is a horizontally-scrolling snap carousel, not a static grid. Section-to-section, the ground alternates between cyanotype blue (hero, closing CTA), the shared dark workshop neutral (Services, Process, Projects, Team), and vellum paper (WhyUs) — see Overview for the built distribution versus the original direction contract.

## Elevation & Depth

The system is flat by construction: no `box-shadow` appears anywhere in the built section components or primitives. Depth is conveyed instead through overlapping ruled lines (the drafting grid, dimension brackets, dashed dividers), an ink-grain SVG-filter texture on stamp badges, and layered stroke rings (the stamp's outer ring, the team seal ring, the CTA's double faint circle) — never through cast shadow.

### Named Rules
**The Flat Sheet Rule.** No box-shadow, anywhere. If an element needs to feel "raised" or "certified," it gets a ruled line, a stroke ring, or ink-grain texture — never a shadow.

## Shapes

Everything drafted is hard-cornered: mark tags, project cards, the service schedule's dividers, the WhyUs margin note, section containers — all `0` radius. The one deliberate exception is anything that reads as certified or sealed: the stamp CTA buttons, the stamp's outer ring, registration-mark circles, and the team's circular avatar/seal ring are all fully round (`rounded-full`). Borders are hairline (1px) throughout except the stamp CTA's `2px` ring border.

## Components

### Buttons
- **Shape:** Fully round pill (`rounded-full`), wrapped in the Stamp primitive's own ring + ink-grain layers — never a plain rounded rectangle.
- **Primary:** Stamp Red fill (#b5432e), Vellum Paper text, `2px` Vellum-Paper-at-35%-opacity border, uppercase JetBrains Mono label, `px-7 py-3` (hero) or `px-10 py-4` (closing CTA). Lands with a single scale+rotate "thunk" entrance (`plano-stamp-hit`), never a generic fade.
- **Secondary / Ghost:** Plain text link with a dashed bottom border (schedule-call link, "view all" links) — no fill, no pill shape; reads as an annotation, not a button.

### Cards / Containers
- **Corner Style:** Square (`0` radius) for project cards and the WhyUs margin note.
- **Background:** Workshop-black-secondary for project cards; Vellum Paper for the WhyUs margin note.
- **Shadow Strategy:** None — see Elevation & Depth. Hover state changes border color (to Blueline), not elevation.
- **Border:** 1px `Sheet Border` at rest, brightening to Blueline-at-50%-opacity on hover; project cards add a title-block strip (mark tag + category label) instead of a caption overlay.
- **Internal Padding:** `p-5` body padding, `py-3` title-block strip.

### Navigation
- **Style:** Plain mono-labeled text links with a leading `→`, no pill/chip treatment; active/hover state shifts opacity/color only. Mobile treatment is out of this file's scope (Header is not part of El Plano).

### Signature Component: The Stamp
A ring-bordered, ink-grained circular badge (`src/components/plano/Stamp.tsx`) that wraps every primary CTA. It carries an outer loose ring, a `feTurbulence`-based ink-grain texture at low opacity, and a fixed slight rotation (`-3°`/`-4°`) so it never sits perfectly level — the one place in the system a "hand-applied" imperfection is deliberate rather than sloppy.

### Signature Component: MarkTag
A bordered, monospace code chip (`src/components/plano/MarkTag.tsx`) giving each service (S-01…) and project (P-01…) its own drawing-sheet mark. Square-cornered, Blueline border and text, never filled.

### Signature Component: DrawLine
A self-drawing SVG stroke (`src/components/plano/DrawLine.tsx`, `pathLength` animation) — the system's one reused motion primitive, standing in for underlines, leader-lines, dimension lines, and progress/connector strokes everywhere a fade or slide would otherwise be used.

## Do's and Don'ts

### Do:
- **Do** reserve Architects Daughter for headlines only; Archivo for body; JetBrains Mono for labels/marks/measurements — never mix registers.
- **Do** use the DrawLine self-drawing stroke for underlines, leader-lines, and progress indicators instead of a generic fade/slide entrance.
- **Do** keep Stamp Red rare — CTAs and seals only, never a background or body-text color.
- **Do** keep drafted elements square-cornered and reserve `rounded-full` for anything meant to read as certified/sealed (stamps, seals, registration marks, avatars).

### Don't:
- **Don't** carry `--plano-*` tokens, Architects Daughter, or the stamp/mark-tag components into `Header`, `Footer`, `LoadingScreen`, or any non-Home page without a deliberate follow-on redesign of that surface — they still run on the BApps purple/yellow system and mixing the two palettes on one surface is not a supported state.
- **Don't** add a box-shadow anywhere in El Plano; depth is ruled lines, ink-grain, and stroke rings only.
- **Don't** use a colored `border-left`/`border-right` above 1px on cards, list items, callouts, or alerts — a craft-floor default this system avoids; dividers and nesting read through plain `border` (1px, neutral) instead.
