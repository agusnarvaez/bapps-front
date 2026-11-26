/** HTML de una placa del carrusel (1080x1350, formato 4:5 de Instagram y LinkedIn). */

const escape = (text) =>
  String(text).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

// El título de portada va de 14 a 110 caracteres: el cuerpo se achica para que entre.
const coverSize = (length) => (length > 90 ? 84 : length > 60 ? 98 : 116);
const headingSize = (length) => (length > 60 ? 64 : 76);

const CSS = `
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1080px; height: 1350px; padding: 96px 88px 80px;
    background: #0A0A0F; color: #EDEDED;
    font-family: "Commissioner", system-ui, sans-serif;
    display: flex; flex-direction: column; position: relative; overflow: hidden;
  }
  body::before {
    content: ""; position: absolute; width: 900px; height: 900px; right: -380px; top: -380px;
    background: radial-gradient(circle, rgba(173, 96, 225, .38), transparent 68%);
  }
  main { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; position: relative; }
  /* ponytail: títulos en Commissioner 800. La "Delta Gothic One" del sitio apunta a una URL que da 404. */
  h1 { font-weight: 800; line-height: 1.06; letter-spacing: -.025em; text-wrap: balance; }
  .kicker { color: #E7FB79; font-size: 30px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 40px; }
  .number { color: #AD60E1; font-size: 150px; font-weight: 800; letter-spacing: -.04em; line-height: 1; margin-bottom: 28px; }
  .body { color: #A0A0B0; font-size: 44px; line-height: 1.38; margin-top: 44px; text-wrap: pretty; }
  ul { list-style: none; padding: 0; margin-top: 32px; }
  /* Placa con lista: todo más chico para que entren los ítems completos. */
  .dense .number { font-size: 96px; margin-bottom: 16px; }
  .dense .body { font-size: 36px; margin-top: 28px; }
  li { color: #EDEDED; font-size: 33px; line-height: 1.32; padding: 20px 0 20px 30px; border-left: 6px solid #AD60E1; margin-bottom: 18px; background: rgba(255,255,255,.04); border-radius: 0 16px 16px 0; padding-right: 28px; }
  .url { color: #E7FB79; font-size: 54px; font-weight: 700; margin-top: 48px; }
  .pill { align-self: flex-start; margin-top: 56px; padding: 22px 44px; border-radius: 999px; background: #E7FB79; color: #0A0A0F; font-size: 36px; font-weight: 800; }
  footer { display: flex; justify-content: space-between; align-items: center; position: relative; color: #6A6A7A; font-size: 30px; font-weight: 600; }
  footer img { height: 62px; }
`;

function body(slide) {
  if (slide.kind === "cover") {
    return `<p class="kicker">${escape(slide.kicker)}</p>
      <h1 style="font-size:${coverSize(slide.title.length)}px">${escape(slide.title)}</h1>`;
  }
  if (slide.kind === "cta") {
    return `<h1 style="font-size:108px">${escape(slide.title)}</h1>
      <p class="url">${escape(slide.url)}</p>
      <p class="pill">¿Hablamos de tu negocio?</p>`;
  }
  const dense = slide.items.length > 0;
  return `<p class="number">${escape(slide.number)}</p>
    <h1 style="font-size:${headingSize(slide.heading.length) - (dense ? 14 : 0)}px">${escape(slide.heading)}</h1>
    <p class="body">${escape(slide.body)}</p>
    ${slide.items.length ? `<ul>${slide.items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>` : ""}`;
}

export function slideHtml(slide, index, total, logoDataUrl) {
  const hint = index === 0 ? "Deslizá →" : index === total - 1 ? "bapps.com.ar" : `${index + 1} / ${total}`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>${CSS}</style></head>
    <body><main class="${slide.items?.length ? "dense" : ""}">${body(slide)}</main>
    <footer><img src="${logoDataUrl}" alt="BApps"><span>${hint}</span></footer></body></html>`;
}
