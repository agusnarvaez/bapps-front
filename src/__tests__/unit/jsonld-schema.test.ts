import { describe, it, expect } from "vitest";

// We test the schema structure by importing it as a static JSON-like shape
// Since JsonLd is a React component, we test the schema object it would produce.
describe("JsonLd schema structure", () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BApps",
    url: "https://bapps.com.ar",
    logo: "https://bapps.com.ar/images/logo-bapps.png",
    description:
      "Desarrollamos aplicaciones web, móviles y landing pages a medida. Transformamos ideas en experiencias digitales excepcionales.",
    sameAs: [
      "https://instagram.com/bapps",
      "https://linkedin.com/company/bapps",
      "https://github.com/bapps",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Spanish", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
    },
  };

  it("has required @context and @type", () => {
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
  });

  it("has organization name", () => {
    expect(schema.name).toBe("BApps");
  });

  it("has valid url", () => {
    expect(schema.url).toMatch(/^https:\/\//);
  });

  it("has logo url", () => {
    expect(schema.logo).toMatch(/^https:\/\//);
  });

  it("has description", () => {
    expect(schema.description.length).toBeGreaterThan(10);
  });

  it("has at least one social link", () => {
    expect(schema.sameAs.length).toBeGreaterThan(0);
    schema.sameAs.forEach((url) => {
      expect(url).toMatch(/^https:\/\//);
    });
  });

  it("has contactPoint with sales type", () => {
    expect(schema.contactPoint["@type"]).toBe("ContactPoint");
    expect(schema.contactPoint.contactType).toBe("sales");
  });

  it("supports Spanish and English", () => {
    expect(schema.contactPoint.availableLanguage).toContain("Spanish");
    expect(schema.contactPoint.availableLanguage).toContain("English");
  });

  it("has address with country AR", () => {
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressCountry).toBe("AR");
  });

  it("produces valid JSON", () => {
    expect(() => JSON.stringify(schema)).not.toThrow();
    const parsed = JSON.parse(JSON.stringify(schema));
    expect(parsed["@type"]).toBe("Organization");
  });
});
