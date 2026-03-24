import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import PageTransition from "@/components/animations/PageTransition";
import LoadingScreen from "@/components/animations/LoadingScreen";
import JsonLd from "@/components/seo/JsonLd";
import NotFoundContent from "@/components/pages/NotFoundContent";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ProjectsPage from "@/pages/ProjectsPage";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessagesForLocale,
  isSupportedLocale,
  resolveLocale,
} from "@/lib/i18n/messages";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { navigateTo, usePathnameState } from "@/lib/router";

type RouteMatch =
  | { type: "redirect"; href: string }
  | { type: "locale-not-found"; locale: Locale }
  | { type: "home"; locale: Locale }
  | { type: "projects"; locale: Locale }
  | { type: "project-detail"; locale: Locale; slug: string }
  | { type: "contact"; locale: Locale };

function trimSlashes(pathname: string) {
  return pathname.replace(/^\/+|\/+$/g, "");
}

function matchRoute(pathname: string): RouteMatch {
  const normalizedPath = trimSlashes(pathname);
  if (!normalizedPath) {
    return {
      type: "redirect",
      href: `/${defaultLocale}/`,
    };
  }

  const [localeSegment, ...restSegments] = normalizedPath.split("/");
  const locale = resolveLocale(localeSegment);

  if (!isSupportedLocale(localeSegment)) {
    return {
      type: "redirect",
      href: `/${locale}/`,
    };
  }

  if (restSegments.length === 0) {
    return { type: "home", locale };
  }

  if (restSegments.length === 1 && restSegments[0] === "projects") {
    return { type: "projects", locale };
  }

  if (
    restSegments.length === 2 &&
    restSegments[0] === "projects" &&
    restSegments[1]
  ) {
    return {
      type: "project-detail",
      locale,
      slug: restSegments[1],
    };
  }

  if (restSegments.length === 1 && restSegments[0] === "contact") {
    return { type: "contact", locale };
  }

  return { type: "locale-not-found", locale };
}

function LocaleShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={getMessagesForLocale(locale)}
    >
      <JsonLd />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-bapps-purple focus:px-6 focus:py-3 focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      <LoadingScreen />
      <SmoothScroll>
        <CustomCursor />
        <Header />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}

export default function App() {
  const pathname = usePathnameState();
  const route = matchRoute(pathname);

  useEffect(() => {
    if (route.type === "redirect") {
      navigateTo(route.href, { replace: true });
    }
  }, [route]);

  if (route.type === "redirect") {
    return null;
  }

  if (route.type === "home") {
    return (
      <LocaleShell locale={route.locale}>
        <HomePage locale={route.locale} />
      </LocaleShell>
    );
  }

  if (route.type === "projects") {
    return (
      <LocaleShell locale={route.locale}>
        <ProjectsPage locale={route.locale} />
      </LocaleShell>
    );
  }

  if (route.type === "project-detail") {
    return (
      <LocaleShell locale={route.locale}>
        <ProjectDetailPage locale={route.locale} slug={route.slug} />
      </LocaleShell>
    );
  }

  if (route.type === "contact") {
    return (
      <LocaleShell locale={route.locale}>
        <ContactPage />
      </LocaleShell>
    );
  }

  return (
    <LocaleShell locale={route.locale}>
      <NotFoundContent />
    </LocaleShell>
  );
}
