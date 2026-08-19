"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { handlePageNav, handleSectionNav } from "@/lib/navClick";

const sectionLinks = [
  { key: "servicios" as const, label: "Servicios" },
  { key: "proyectos" as const, label: "Proyectos" },
  { key: "equipo" as const, label: "Equipo" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/bapps.ar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/bappsargentina",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/logo-bapps.png"
              alt="BApps"
              width={100}
              height={30}
              className="h-8 w-auto opacity-80"
            />
            <p className="max-w-xs text-sm leading-relaxed text-foreground-muted">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">
              Links
            </h3>
            <div className="flex flex-col gap-2">
              {sectionLinks.map(({ key, label }) => (
                <a
                  key={key}
                  href={isHome ? `#${key}` : `/${locale}/#${key}`}
                  onClick={(e) => handleSectionNav(e, locale, `#${key}`, isHome)}
                  className="text-sm text-foreground-muted transition-colors hover:text-bapps-purple"
                >
                  {label}
                </a>
              ))}
              <a
                href={`/${locale}/contact`}
                onClick={(e) => handlePageNav(e, `/${locale}/contact`)}
                className="text-sm text-foreground-muted transition-colors hover:text-bapps-purple"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">
              Social
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-300 hover:border-bapps-purple hover:text-bapps-purple hover:shadow-lg hover:shadow-bapps-purple/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-foreground-subtle">
            © {year} BApps. {t("rights")}
          </p>
          <div className="flex gap-6">
            <a
              href={`/${locale}/privacidad`}
              onClick={(e) => handlePageNav(e, `/${locale}/privacidad`)}
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground-muted"
            >
              {t("links.privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
