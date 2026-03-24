"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/bapps",
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
    href: "https://linkedin.com/company/bapps",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/bapps",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("footer");
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">
              Links
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="#servicios"
                className="text-sm text-foreground-muted transition-colors hover:text-bapps-purple"
              >
                Servicios
              </a>
              <a
                href="#proyectos"
                className="text-sm text-foreground-muted transition-colors hover:text-bapps-purple"
              >
                Proyectos
              </a>
              <a
                href="#equipo"
                className="text-sm text-foreground-muted transition-colors hover:text-bapps-purple"
              >
                Equipo
              </a>
              <a
                href="#contacto"
                className="text-sm text-foreground-muted transition-colors hover:text-bapps-purple"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">
              Social
            </h4>
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
              href="#"
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground-muted"
            >
              {t("links.privacy")}
            </a>
            <a
              href="#"
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground-muted"
            >
              {t("links.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
