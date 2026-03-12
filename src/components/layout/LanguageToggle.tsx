"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export default function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] as Locale;

  const switchLocale = (newLocale: Locale) => {
    // Replace the locale segment in the path
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-border p-0.5 text-xs font-medium">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={
            locale === currentLocale
              ? "rounded-full bg-bapps-purple px-3 py-1 text-white transition-all duration-300"
              : "rounded-full px-3 py-1 text-foreground-muted transition-colors duration-300 hover:text-foreground"
          }
          aria-label={`Switch to ${locale === "es" ? "Spanish" : "English"}`}
          aria-current={locale === currentLocale ? "true" : undefined}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
