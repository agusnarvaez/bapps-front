import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

const MESSAGE_CATALOG = {
  es: esMessages,
  en: enMessages,
} as const;

export function isSupportedLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined): Locale {
  if (!value) {
    return defaultLocale;
  }

  return isSupportedLocale(value) ? value : defaultLocale;
}

export function getMessagesForLocale(locale: Locale) {
  return MESSAGE_CATALOG[locale];
}
