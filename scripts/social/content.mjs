/**
 * Arma el contenido de redes a partir de una nota del blog (documento de Sanity).
 * Funciones puras: sin red ni disco, para poder testearlas.
 *
 * ponytail: no hay IA. Los títulos y H2 de las notas ya están escritos como
 * ganchos, así que se reusan tal cual. Si hace falta reescribir por red, se
 * agrega un paso de redacción antes de render.mjs.
 */

const SITE = "https://bapps.com.ar";
const MAX_SECTIONS = 6;
const MAX_BODY = 230;

const blockText = (block) =>
  (block.children ?? [])
    .map((child) => child.text ?? "")
    .join("")
    .trim();

/** Corta en el final de una oración; si no entra ninguna, en una palabra. */
export function clip(text, max = MAX_BODY) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (sentenceEnd > max * 0.4) return cut.slice(0, sentenceEnd + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

const MAX_ITEMS = 3;
const MAX_ITEM = 150;

/**
 * Cada H2 con el primer párrafo que le sigue. Si ese párrafo presenta una lista
 * (termina en ":"), se suman sus primeros ítems: sin ellos la placa queda trunca.
 */
export function extractSections(content = []) {
  const sections = [];
  for (const block of content) {
    if (block._type !== "block") continue;
    const text = blockText(block);
    if (!text) continue;
    const current = sections[sections.length - 1];
    if (block.style === "h2") {
      sections.push({ heading: text, body: "", items: [], open: true });
    } else if (!current || block.style !== "normal") {
      continue;
    } else if (block.listItem) {
      if (current.open && current.body.endsWith(":") && current.items.length < MAX_ITEMS) {
        current.items.push(clip(text, MAX_ITEM));
      }
    } else if (!current.body) {
      current.body = clip(text);
    } else {
      current.open = false; // otro párrafo: la lista que venga ya no es de la bajada
    }
  }
  return sections
    .filter((section) => section.body)
    .slice(0, MAX_SECTIONS)
    // Sin ítems, una bajada que termina en ":" promete algo que la placa no muestra.
    .map(({ heading, body, items }) => ({
      heading,
      body: !items.length && body.endsWith(":") ? `${body.slice(0, -1)}.` : body,
      items,
    }));
}

export const postUrl = (slug) => `${SITE}/es/blog/${slug}`;

export function buildSlides(post) {
  const sections = extractSections(post.content);
  return [
    { kind: "cover", kicker: post.tags?.[0] ?? "blog", title: post.title },
    ...sections.map((section, i) => ({
      kind: "section",
      number: String(i + 1).padStart(2, "0"),
      heading: section.heading,
      body: section.body,
      items: section.items,
    })),
    { kind: "cta", title: "Leé la nota completa", url: "bapps.com.ar/blog" },
  ];
}

const hashtag = (tag) =>
  `#${tag
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()}`;

export function buildCaptions(post) {
  const sections = extractSections(post.content);
  const tags = [...new Set((post.tags ?? []).map(hashtag))].filter((tag) => tag.length > 1);
  const points = sections
    .slice(0, 4)
    .map((section) => `→ ${section.heading}`)
    .join("\n");

  return {
    // LinkedIn muestra ~3 líneas antes del "ver más": título y bajada van primero.
    linkedin: [post.title, post.excerpt, `En la nota:\n${points}`, `Nota completa: ${postUrl(post.slug)}`, tags.slice(0, 3).join(" ")]
      .filter(Boolean)
      .join("\n\n"),
    // Instagram no hace clic en links del texto: se manda a la bio.
    instagram: [post.excerpt, "Deslizá para ver el detalle 👉", "Nota completa en el link de la bio.", [...tags, "#bapps"].join(" ")]
      .filter(Boolean)
      .join("\n\n"),
  };
}
