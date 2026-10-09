# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Argentine SMEs and founders in three recurring situations:
- Businesses with no in-house dev, needing a first real system or site (currently running on spreadsheets, WhatsApp, or generic templated tools).
- Businesses that already have a site/system built by a freelancer or agency that underdelivered or disappeared, now needing it redone reliably.
- Non-technical founders with a product idea who need someone to scope and build it (landing, app, or MVP).

## Product Purpose

BApps builds custom web and software systems (web apps, mobile apps, landing pages, e-commerce, UI/UX, consulting) for Argentine businesses. Success is software the client actually uses and that moves their business metrics ("software que vende") — not just a delivered project.

## Positioning

Two confirmed differentiators, not generic agency claims:
- **Speed + directness.** Small team, 24h response, the client talks directly to whoever builds it — no account-manager layers.
- **Business-first consulting.** BApps pushes back on a bad idea before building it; a consulting step confirms the right thing gets built rather than billing hours against whatever was asked.

## Operating Context

Client journey: free quote request ("cotización gratis") → discovery/consulting → build → delivery, with a contact/schedule-call path and a blog used for SEO/content. Site currently ships in Spanish (`es`) and English (`en`) via next-intl shims.

## Capabilities and Constraints

Confirmed service lines (see `src/messages/es.json` → `services.items`):
- Custom web apps / dashboards / internal systems
- Mobile apps, iOS + Android from one codebase
- Landing pages built for SEO/conversion
- E-commerce (payments, stock, shipping)
- UI/UX design
- Consulting (scope/architecture/roadmap before building)

## Brand Commitments

- Name: **BApps**. Tagline: "Convertimos ideas en software que vende."
- Voice: direct, informal Argentine Spanish (voseo), benefit-first, no corporate hedging — matches the existing `es.json` copy tone.

## Evidence on Hand

- Real shipped projects exist and are used as proof (`ProjectsSection`, Sanity-backed project data with fallback).
- **No real client testimonials yet** — `TestimonialsSection` is commented out in `HomePage.tsx` on purpose. Do not fabricate quotes; keep it out until real testimonials exist.
- The `testimonials.stats` counters (projects delivered / happy clients / years) are **not confirmed as real figures** — treat as unverified; don't present them as hard proof without checking with the user first.

## Product Principles

1. Ship fast, talk directly — no bureaucracy between the client and the person building.
2. Confirm the right thing before building it — consulting is a filter, not an upsell.
3. Serve three distinct entry moments (first system / second chance after a bad provider / new idea) rather than one generic pitch.
4. Lead with real project proof, not manufactured social proof, until testimonials are real.
