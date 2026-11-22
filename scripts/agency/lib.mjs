/**
 * Piezas compartidas de la prospección: teléfonos, mensaje y mockup por rubro.
 * Funciones puras (sin red ni disco) para poder testearlas.
 */

// ---------- teléfonos ----------

/** Dígitos del número sin el 54 inicial ni el 9 de celular. */
function nationalDigits(phone) {
  let digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.startsWith("54")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

/**
 * "movil" | "fijo" | "desconocido".
 * ponytail: heurística por formato, no una consulta a WhatsApp. Google Places
 * devuelve los celulares como "+54 9 …"; el resto se deduce por la característica
 * de La Plata (221 4xx y 2xx son líneas fijas). Con otras ciudades cae en
 * "desconocido": ampliar la tabla cuando se prospecte fuera de La Plata.
 */
export function phoneKind(phone) {
  const digits = nationalDigits(phone);
  if (!digits) return "desconocido";
  if (digits.startsWith("9")) return "movil";
  if (digits.startsWith("221") && digits.length === 10) return "42".includes(digits[3]) ? "fijo" : "movil";
  return "desconocido";
}

/** Número para wa.me: los celulares argentinos llevan 549 + característica + número. */
export function waNumber(phone) {
  const digits = nationalDigits(phone);
  if (!digits) return "";
  return `54${digits.startsWith("9") ? "" : "9"}${digits}`;
}

/** El "[imagen 👆]" del pitch es una nota para quien envía: no va en el mensaje. */
export function cleanPitch(pitch) {
  return String(pitch ?? "")
    .replace(/\s*\[imagen[^\]]*\]/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ ([.,;:])/g, "$1")
    .trim();
}

export const waLink = (phone, pitch) => `https://wa.me/${waNumber(phone)}?text=${encodeURIComponent(cleanPitch(pitch))}`;

// ---------- mockup por rubro ----------

/**
 * Cada rubro define cómo se vería SU página: qué promete, qué ofrece y qué acción
 * pide. Los servicios son los típicos del rubro, a modo de ejemplo; lo único real
 * del negocio es nombre, dirección y teléfono.
 */
export const RUBROS = {
  veterinary_care: {
    label: "Veterinaria",
    colors: ["#064e3b", "#10b981", "#ecfdf5"],
    promise: "Cuidamos a tu mascota como si fuera nuestra",
    cta: "Pedir turno",
    services: [
      ["🩺", "Consultas y vacunación", "Controles, plan sanitario y libreta al día."],
      ["🚑", "Urgencias", "Atención sin turno para lo que no puede esperar."],
      ["✂️", "Peluquería y baño", "Corte, baño y uñas con turno."],
      ["🔬", "Análisis y cirugía", "Laboratorio, ecografías y quirófano."],
    ],
  },
  hair_salon: {
    label: "Peluquería",
    colors: ["#18181b", "#e11d74", "#fdf2f8"],
    promise: "Reservá tu turno y mirá nuestros trabajos",
    cta: "Reservar turno",
    services: [
      ["✂️", "Corte y peinado", "Para todos los estilos, con turno."],
      ["🎨", "Color y mechas", "Balayage, reflejos y tintura."],
      ["💆", "Tratamientos", "Alisado, nutrición y botox capilar."],
      ["📸", "Galería de trabajos", "Antes y después de nuestros clientes."],
    ],
  },
  beauty_salon: {
    label: "Estética",
    colors: ["#4a2c2a", "#c08457", "#fdf6ee"],
    promise: "Tu momento, con turno y sin esperas",
    cta: "Reservar turno",
    services: [
      ["💅", "Manos y pies", "Semipermanente, esculpidas y spa."],
      ["✨", "Tratamientos faciales", "Limpieza profunda e hidratación."],
      ["🌿", "Depilación", "Definitiva y tradicional."],
      ["🎁", "Gift cards", "Regalá un turno."],
    ],
  },
  hardware_store: {
    label: "Ferretería",
    colors: ["#1f2937", "#f97316", "#fff7ed"],
    promise: "Todo para tu obra, tu casa y tu taller",
    cta: "Consultar stock",
    services: [
      ["🔧", "Herramientas", "Manuales y eléctricas, primeras marcas."],
      ["🚿", "Sanitarios y gas", "Caños, griferías y accesorios."],
      ["💡", "Electricidad", "Cables, térmicas e iluminación."],
      ["🚚", "Pedidos por WhatsApp", "Te lo preparamos y lo retirás."],
    ],
  },
  accounting: {
    label: "Estudio contable",
    colors: ["#0f172a", "#2563eb", "#eff6ff"],
    promise: "Tus números en orden, sin sorpresas",
    cta: "Agendar consulta",
    services: [
      ["📊", "Monotributo y autónomos", "Altas, recategorización y vencimientos."],
      ["🏢", "Sociedades y pymes", "Balances, sueldos y liquidaciones."],
      ["🧾", "Impuestos", "Ganancias, IVA e Ingresos Brutos."],
      ["🤝", "Asesoramiento", "Te explicamos todo en criollo."],
    ],
  },
  consultant: {
    label: "Consultoría",
    colors: ["#111827", "#0ea5e9", "#f0f9ff"],
    promise: "Asesoramiento claro para decidir mejor",
    cta: "Agendar consulta",
    services: [
      ["🧭", "Diagnóstico", "Dónde estás y qué conviene hacer."],
      ["📈", "Plan de acción", "Pasos concretos y medibles."],
      ["🤝", "Acompañamiento", "Seguimiento durante la implementación."],
      ["📞", "Primera consulta", "Contanos tu caso por WhatsApp."],
    ],
  },
  restaurant: {
    label: "Restaurante",
    colors: ["#431407", "#ea580c", "#fff7ed"],
    promise: "Mirá la carta y reservá tu mesa",
    cta: "Reservar mesa",
    services: [
      ["🍽️", "Carta online", "Platos y precios siempre actualizados."],
      ["📅", "Reservas", "Asegurá tu mesa en un minuto."],
      ["🛵", "Pedidos directos", "Sin comisión de las apps de delivery."],
      ["🎉", "Eventos", "Cumpleaños y reuniones con menú a medida."],
    ],
  },
  gym: {
    label: "Gimnasio",
    colors: ["#0a0a0a", "#f59e0b", "#fffbeb"],
    promise: "Entrená a tu ritmo, con horarios a la vista",
    cta: "Probar una clase",
    services: [
      ["🏋️", "Musculación", "Sala equipada y rutina personalizada."],
      ["🤸", "Clases grupales", "Funcional, spinning y más."],
      ["🗓️", "Horarios online", "Mirá la grilla y reservá tu lugar."],
      ["💳", "Planes y pases", "Mensual, trimestral y pase libre."],
    ],
  },
};
RUBROS.gastropub = RUBROS.restaurant;

const FALLBACK = {
  label: "Comercio",
  colors: ["#1e1b4b", "#7c3aed", "#f5f3ff"],
  promise: "Todo lo que ofrecemos, en un solo lugar",
  cta: "Escribinos",
  services: [
    ["🛍️", "Productos y servicios", "Lo que hacemos, explicado simple."],
    ["🕐", "Horarios", "Cuándo encontrarnos abiertos."],
    ["📍", "Cómo llegar", "Mapa y datos de contacto."],
    ["💬", "Consultas por WhatsApp", "Te respondemos en el día."],
  ],
};

export const rubroOf = (lead) => RUBROS[lead?.rubro] ?? FALLBACK;

const escapeHtml = (text) =>
  String(text ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

/** "Diag. 75 149, B1900 La Plata, Provincia de Buenos Aires" → "Diag. 75 149, La Plata" */
export function shortAddress(address) {
  const parts = String(address ?? "").split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? "";
  return `${parts[0]}, ${parts[1].replace(/^[A-Z]?\d{4}[A-Z]{0,3}\s+/, "")}`;
}

/** Página de muestra del negocio, pensada para verse en el chat de WhatsApp (1080x1350). */
export function mockupHtml(lead) {
  const rubro = rubroOf(lead);
  const [dark, accent, soft] = rubro.colors;
  const name = escapeHtml(lead.name);
  const titleSize = lead.name.length > 34 ? 62 : lead.name.length > 22 ? 76 : 92;
  const services = rubro.services
    .map(([icon, title, text]) => `<li><span>${icon}</span><div><b>${escapeHtml(title)}</b><p>${escapeHtml(text)}</p></div></li>`)
    .join("");

  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1350px; overflow: hidden; display: flex; flex-direction: column;
    font-family: "Commissioner", system-ui, sans-serif; color: #111827; background: #fff; }
  nav { display: flex; align-items: center; justify-content: space-between; padding: 30px 64px; background: #fff; border-bottom: 1px solid #e5e7eb; }
  nav b { font-size: 30px; font-weight: 800; color: ${dark}; max-width: 560px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  nav div { white-space: nowrap; flex-shrink: 0; }
  nav b { max-width: 480px; }
  nav span { font-size: 24px; color: #4b5563; margin-left: 34px; }
  .hero { background: linear-gradient(140deg, ${dark} 0%, ${dark} 45%, ${accent} 140%); color: #fff; padding: 84px 64px 92px; }
  .kicker { font-size: 24px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; opacity: .82; }
  h1 { font-size: ${titleSize}px; font-weight: 800; line-height: 1.03; letter-spacing: -.025em; margin: 20px 0 22px; text-wrap: balance; }
  .promise { font-size: 38px; line-height: 1.25; opacity: .92; max-width: 22ch; }
  .cta { display: inline-block; margin-top: 44px; padding: 24px 46px; border-radius: 999px; background: #fff; color: ${dark}; font-size: 30px; font-weight: 800; }
  ul { flex: 1; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 22px; padding: 46px 64px; background: ${soft}; align-content: center; }
  li { display: flex; gap: 20px; align-items: flex-start; background: #fff; border-radius: 22px; padding: 26px; box-shadow: 0 2px 10px rgba(17, 24, 39, .06); }
  li span { font-size: 44px; line-height: 1; }
  li b { font-size: 27px; font-weight: 800; color: ${dark}; }
  li p { font-size: 22px; line-height: 1.35; color: #4b5563; margin-top: 6px; }
  .where { display: flex; justify-content: space-between; align-items: center; gap: 30px; background: ${dark}; color: #fff; padding: 34px 64px; }
  .where b { font-size: 21px; letter-spacing: .14em; text-transform: uppercase; opacity: .7; }
  .where p { font-size: 28px; font-weight: 600; margin-top: 6px; }
  .wa { flex-shrink: 0; background: #25d366; color: #06210f; font-size: 26px; font-weight: 800; padding: 20px 34px; border-radius: 999px; }
  footer { text-align: center; padding: 16px; font-size: 19px; color: #6b7280; background: #fff; }
</style></head><body>
  <nav><b>${name}</b><div><span>Servicios</span><span>Dónde estamos</span><span>Contacto</span></div></nav>
  <section class="hero">
    <p class="kicker">${escapeHtml(rubro.label)}</p>
    <h1 class="fit">${name}</h1>
    <p class="promise">${escapeHtml(rubro.promise)}</p>
    <span class="cta">${escapeHtml(rubro.cta)} →</span>
  </section>
  <ul>${services}</ul>
  <section class="where">
    <div><b>Dónde estamos</b><p>${escapeHtml(shortAddress(lead.address))}</p></div>
    <span class="wa">WhatsApp ${escapeHtml(lead.phone)}</span>
  </section>
  <footer>Muestra de diseño para ${name} · textos de ejemplo · hecha por BApps</footer>
</body></html>`;
}
