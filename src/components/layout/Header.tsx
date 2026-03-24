"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import LanguageToggle from "@/components/layout/LanguageToggle";

const navLinks = [
  { key: "services", hash: "#servicios", page: null },
  { key: "process", hash: "#proceso", page: null },
  { key: "projects", hash: "#proyectos", page: "/projects" },
  { key: "team", hash: "#equipo", page: null },
  { key: "contact", hash: "#contacto", page: "/contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on the home page
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a href={`/${locale}`} className="relative z-50 shrink-0">
            <Image
              src="/images/logo-bapps.png"
              alt="BApps"
              width={120}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const href = isHome
                ? link.hash
                : link.page
                ? `/${locale}${link.page}`
                : `/${locale}/${link.hash}`;
              return (
                <a
                  key={link.key}
                  href={href}
                  className="group relative px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                >
                  {t(link.key)}
                  <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-bapps-purple transition-all duration-300 group-hover:w-3/4" />
                </a>
              );
            })}
            <div className="mx-3 h-5 w-px bg-border" />
            <LanguageToggle />
            <a
              href={isHome ? "#contacto" : `/${locale}/contact`}
              className="ml-2 rounded-full bg-bapps-purple px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-bapps-purple-dark hover:shadow-lg hover:shadow-bapps-purple/25"
            >
              {t("quoteProject")}
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#fff" }
                  : { rotate: 0, y: 0, backgroundColor: "#fff" }
              }
              className="block h-0.5 w-6 rounded-full bg-white"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="block h-0.5 w-6 rounded-full bg-white"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#fff" }
                  : { rotate: 0, y: 0, backgroundColor: "#fff" }
              }
              className="block h-0.5 w-6 rounded-full bg-white"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-2"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => {
                const href = isHome
                  ? link.hash
                  : link.page
                  ? `/${locale}${link.page}`
                  : `/${locale}/${link.hash}`;
                return (
                  <motion.a
                    key={link.key}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                    className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground transition-colors hover:text-bapps-purple"
                  >
                    {t(link.key)}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navLinks.length * 0.08, duration: 0.4 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <LanguageToggle />
                <a
                  href={isHome ? "#contacto" : `/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-bapps-purple px-10 py-3 text-lg font-semibold text-white transition-all hover:bg-bapps-purple-dark"
                >
                  {t("quoteProject")}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
