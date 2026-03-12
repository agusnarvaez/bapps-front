import { describe, it, expect } from "vitest";
import { locales, defaultLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

describe("i18n config", () => {
  it("has at least two locales", () => {
    expect(locales.length).toBeGreaterThanOrEqual(2);
  });

  it("includes es and en", () => {
    expect(locales).toContain("es");
    expect(locales).toContain("en");
  });

  it("defaultLocale is es", () => {
    expect(defaultLocale).toBe("es");
  });

  it("defaultLocale is a valid locale", () => {
    expect(locales).toContain(defaultLocale);
  });

  it("Locale type matches locales array", () => {
    const testLocale: Locale = "es";
    expect(locales).toContain(testLocale);
  });
});
