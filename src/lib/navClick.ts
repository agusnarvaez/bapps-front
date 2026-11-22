import type { MouseEvent } from "react";
import type Lenis from "lenis";
import { navigateTo, setScrollReset } from "@/lib/router";

// Lenis (SmoothScroll.tsx) drives the scroll position on every frame, so a
// native scrollIntoView gets overwritten. Route section scrolls through it.
let lenis: Lenis | null = null;
export function setLenis(instance: Lenis | null) {
  lenis = instance;
  setScrollReset(instance ? () => instance.scrollTo(0, { immediate: true, force: true }) : null);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

// ponytail: plain internal <a> tags trigger full browser reloads. These
// keep same-site navigation client-side, mirroring what the next/link
// shim (src/shims/next-link.tsx) already does for the rest of the app.

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function handlePageNav(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (isModifiedClick(event)) return;
  event.preventDefault();
  navigateTo(href);
}

// Cross-page links to a homepage section (e.g. "#servicios" from /projects)
// hand off via sessionStorage — see HomePage.tsx's scrollTarget effect —
// since a fresh navigation can't know the target element exists yet.
export function handleSectionNav(
  event: MouseEvent<HTMLAnchorElement>,
  locale: string,
  hash: string,
  isHome: boolean
) {
  if (isModifiedClick(event)) return;
  event.preventDefault();
  const id = hash.replace("#", "");
  if (isHome) {
    scrollToSection(id);
    return;
  }
  sessionStorage.setItem("scrollTarget", id);
  navigateTo(`/${locale}/`);
}
