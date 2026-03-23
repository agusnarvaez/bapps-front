import { useMemo } from "react";
import { navigateTo, usePathnameState } from "@/lib/router";

export function usePathname() {
  return usePathnameState();
}

export function useRouter() {
  return useMemo(
    () => ({
      push: (href: string) => navigateTo(href, { replace: false }),
      replace: (href: string) => navigateTo(href, { replace: true }),
      back: () => {
        window.history.back();
      },
      forward: () => {
        window.history.forward();
      },
      prefetch: async () => undefined,
    }),
    []
  );
}

export function notFound() {
  throw new Error("notFound() is only available in Next.js server runtime.");
}
