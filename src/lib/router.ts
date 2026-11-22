import { useEffect, useState } from "react";

const NAVIGATION_EVENT = "bapps:navigation";

function canUseDom() {
  return typeof window !== "undefined";
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function getCurrentPathname() {
  if (!canUseDom()) {
    return "/";
  }

  return window.location.pathname || "/";
}

// Una navegación nueva arranca arriba de todo, como una carga de página. Con
// Lenis activo window.scrollTo no alcanza (pisa la posición en cada frame):
// SmoothScroll registra acá cómo resetear. El botón "atrás" (popstate) no pasa
// por navigateTo, así que el navegador sigue restaurando la posición anterior.
const nativeScrollReset = () => window.scrollTo(0, 0);
let scrollReset = nativeScrollReset;
export function setScrollReset(reset: (() => void) | null) {
  scrollReset = reset ?? nativeScrollReset;
}

export function navigateTo(
  href: string,
  options: { replace?: boolean } = {}
) {
  if (!canUseDom()) {
    return;
  }

  if (href === getCurrentPathname()) {
    return;
  }

  const method = options.replace ? "replaceState" : "pushState";
  window.history[method](null, "", href);
  scrollReset();
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

export function usePathnameState() {
  const [pathname, setPathname] = useState(getCurrentPathname);

  useEffect(() => {
    if (!canUseDom()) {
      return;
    }

    const syncPathname = () => {
      setPathname(getCurrentPathname());
    };

    window.addEventListener("popstate", syncPathname);
    window.addEventListener(NAVIGATION_EVENT, syncPathname);

    return () => {
      window.removeEventListener("popstate", syncPathname);
      window.removeEventListener(NAVIGATION_EVENT, syncPathname);
    };
  }, []);

  return pathname;
}
