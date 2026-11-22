import { describe, expect, it } from "vitest";
import { buildCaptions, buildSlides, clip, extractSections } from "../../../scripts/social/content.mjs";

const block = (style: string, text: string, extra = {}) => ({
  _type: "block",
  style,
  children: [{ text }],
  ...extra,
});

const post = {
  slug: "nota-demo",
  title: "Título de la nota",
  excerpt: "Bajada de la nota.",
  tags: ["sistema de gestión", "pymes"],
  content: [
    block("normal", "Intro que no pertenece a ninguna sección."),
    block("h2", "Primera sección"),
    block("normal", "Primer párrafo."),
    block("normal", "Segundo párrafo, que no se usa."),
    block("h2", "Sección sin texto"),
    block("h2", "Sección con lista"),
    block("normal", "Ítem de lista", { listItem: "bullet" }),
    block("normal", "Párrafo después de la lista."),
    { _type: "image" },
  ],
};

describe("contenido de redes", () => {
  it("toma cada H2 con su primer párrafo y descarta secciones vacías", () => {
    expect(extractSections(post.content)).toEqual([
      { heading: "Primera sección", body: "Primer párrafo.", items: [] },
      { heading: "Sección con lista", body: "Párrafo después de la lista.", items: [] },
    ]);
  });

  it("suma los ítems cuando el párrafo presenta una lista", () => {
    const sections = extractSections([
      block("h2", "Hacé la cuenta"),
      block("normal", "El número asusta:"),
      ...["Uno", "Dos", "Tres", "Cuatro"].map((text) => block("normal", text, { listItem: "bullet" })),
      block("normal", "Cierre."),
      block("normal", "Lista ajena", { listItem: "bullet" }),
    ]);
    expect(sections).toEqual([{ heading: "Hacé la cuenta", body: "El número asusta:", items: ["Uno", "Dos", "Tres"] }]);
  });

  it("corta el texto largo en el final de una oración", () => {
    const text = `${"Una oración corta. ".repeat(20)}`.trim();
    const clipped = clip(text, 100);
    expect(clipped.length).toBeLessThanOrEqual(100);
    expect(clipped.endsWith(".")).toBe(true);
  });

  it("arma portada, una placa por sección y cierre", () => {
    const slides = buildSlides(post);
    expect(slides.map((slide: { kind: string }) => slide.kind)).toEqual(["cover", "section", "section", "cta"]);
    expect(slides[0]).toMatchObject({ kicker: "sistema de gestión", title: "Título de la nota" });
    expect(slides[1]).toMatchObject({ number: "01", heading: "Primera sección" });
  });

  it("arma los textos con link en LinkedIn y hashtags sin acentos ni espacios", () => {
    const captions = buildCaptions(post);
    expect(captions.linkedin).toContain("https://bapps.com.ar/es/blog/nota-demo");
    expect(captions.linkedin).toContain("→ Primera sección");
    expect(captions.instagram).toContain("#sistemadegestion #pymes #bapps");
    expect(captions.instagram).not.toContain("https://");
  });
});
