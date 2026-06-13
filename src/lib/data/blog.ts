import type { BlogPost } from "./types";

function span(text: string, key: string, marks: string[] = []) {
  return { _type: "span" as const, _key: key, text, marks };
}

function block(key: string, style: string, text: string) {
  return { _type: "block" as const, _key: key, style, children: [span(text, `${key}s`)] };
}

function li(key: string, text: string, listItem: "bullet" | "number" = "bullet") {
  return {
    _type: "block" as const,
    _key: key,
    style: "normal",
    listItem,
    level: 1,
    children: [span(text, `${key}s`)],
  };
}

const ARTICLE_1_CONTENT = [
  block("i1", "normal", "Si estás buscando hacer una página web en Argentina, probablemente ya recibiste cotizaciones muy distintas: desde 30.000 pesos hasta varios miles de dólares. La diferencia es real y tiene una explicación lógica. En esta guía te contamos cuánto cuesta una página web en Argentina en 2026, qué incluye cada opción y cuál conviene según tu situación."),
  block("i2", "normal", "Antes de darte números, una aclaración importante: \"una página web\" no es una sola cosa. Un sitio institucional de 5 secciones, un e-commerce de 500 productos y un sistema de gestión de turnos son proyectos completamente distintos. Los precios varían porque los problemas son diferentes."),

  block("h_opciones", "h2", "Cuánto cuesta una página web en Argentina: opciones y precios 2026"),
  block("p_opciones", "normal", "Según el tipo de proyecto y el proveedor, los precios en Argentina para 2026 se dividen en cuatro grandes categorías:"),

  block("h_constructores", "h3", "1. Constructores web (Wix, Tiendanube, Webflow)"),
  block("p_constructores", "normal", "Son la opción más accesible para negocios que recién arrancan. Ofrecen plantillas prefabricadas y herramientas drag & drop que permiten tener un sitio en pocas horas, sin programar."),
  li("lc1", "Precio inicial: $0 (plan gratuito limitado) a $50 USD de setup"),
  li("lc2", "Costo mensual: $15 a $80 USD por la plataforma"),
  li("lc3", "Ideal para: negocios locales, portfolios personales, tiendas pequeñas"),
  li("lc4", "Limitación: SEO acotado, poco flexible para escalar, dependés de la plataforma"),

  block("h_wp", "h3", "2. WordPress con template premium"),
  block("p_wp", "normal", "WordPress es el CMS más usado del mundo. Con un template de pago y un desarrollador que lo configure, podés tener un sitio visualmente atractivo a precio razonable."),
  li("lw1", "Precio inicial: $200 a $800 USD (diseño + configuración + desarrollo)"),
  li("lw2", "Hosting mensual: $10 a $30 USD en hostings compartidos"),
  li("lw3", "Ideal para: blogs, sitios informativos, empresas medianas"),
  li("lw4", "Limitación: requiere mantenimiento constante, vulnerable a plugins desactualizados"),

  block("h_agencia", "h3", "3. Agencia profesional (diseño + desarrollo desde cero)"),
  block("p_agencia1", "normal", "Una agencia diseña y desarrolla tu sitio desde cero, adaptado a tu marca y objetivos. El proceso incluye análisis, diseño UX/UI, desarrollo, integración de herramientas y soporte post-entrega."),
  li("la1", "Sitio institucional (hasta 8 secciones): desde $350 USD"),
  li("la2", "Landing page de alta conversión: $350 a $800 USD"),
  li("la3", "E-commerce profesional: $800 a $3.000 USD"),
  li("la4", "Sistema web a medida complejo: $2.000 a $10.000 USD según funcionalidad"),

  block("h_medida", "h3", "4. Desarrollo a medida (sistema propio)"),
  block("p_medida", "normal", "Si tu negocio tiene procesos complejos, integraciones específicas o necesita escalar técnicamente, el desarrollo a medida es la inversión correcta a largo plazo. No hay plantillas: cada línea de código existe por una razón."),
  li("lm1", "Precio: desde $2.000 hasta $20.000 USD o más"),
  li("lm2", "Timeframe: 6 semanas a 6 meses según alcance"),
  li("lm3", "Ideal para: plataformas SaaS, marketplaces, sistemas de gestión, integraciones con APIs externas"),

  block("h_incluye", "h2", "¿Qué incluye una página web profesional?"),
  block("p_incluye", "normal", "Cuando una agencia te cotiza un proyecto, estos son los elementos que deberían estar incluidos en cualquier propuesta seria:"),
  li("li1", "Diseño adaptado a tu marca: no un template genérico, sino identidad visual coherente"),
  li("li2", "Código optimizado: sitio rápido, sin dependencias innecesarias que frenen la carga"),
  li("li3", "SEO técnico básico: URLs amigables, meta tags, sitemap.xml, robots.txt"),
  li("li4", "Analytics configurado: para medir visitas, comportamiento y conversiones"),
  li("li5", "Versión mobile: el 70% del tráfico en Argentina llega desde celular"),
  li("li6", "HTTPS (certificado SSL): obligatorio para rankear en Google y generar confianza"),

  block("h_real", "h2", "El costo total: más allá del precio inicial"),
  block("p_real", "normal", "Muchos negocios se sorprenden cuando descubren que el precio inicial es solo el comienzo. Estos son los costos recurrentes que debés contemplar al calcular el presupuesto total:"),
  li("lr1", "Hosting: entre $5 y $50 USD/mes según tráfico y tipo de sitio"),
  li("lr2", "Dominio: entre $10 y $25 USD/año (el .com.ar suele ser más accesible)"),
  li("lr3", "Mantenimiento: actualizaciones de seguridad, contenido nuevo, correcciones menores"),
  li("lr4", "SEO continuo: posicionarse en Google requiere trabajo sostenido en el tiempo"),
  li("lr5", "Publicidad digital (opcional): Google Ads o Meta Ads si querés resultados rápidos"),
  block("q_real", "blockquote", "Un sitio web bien hecho debería generar clientes. Si el tuyo no lo hace, no es un gasto: es un mal negocio."),

  block("h_cuando", "h2", "¿Cuándo conviene contratar una agencia?"),
  block("p_cuando", "normal", "No siempre es necesario contratar una agencia. Pero hay situaciones donde la diferencia en resultados es significativa:"),
  li("lca1", "Tu negocio depende de la imagen profesional (estudio jurídico, clínica, consultora)"),
  li("lca2", "Querés posicionarte en Google y necesitás SEO técnico bien implementado desde el inicio"),
  li("lca3", "Tenés un proceso de venta o consulta que se puede automatizar online"),
  li("lca4", "Ya tuviste un sitio que no convirtió y querés hacerlo bien esta vez"),
  li("lca5", "Tu competencia tiene una web mejor y te está ganando clientes"),

  block("h_barato", "h2", 'Lo que nadie te dice sobre el precio "barato"'),
  block("p_barato", "normal", 'Hay una diferencia importante entre "precio bajo" y "buena relación precio-valor". Una web de $80 USD puede ser perfecta para un negocio pequeño que recién arranca. Pero puede ser un problema si:'),
  li("lb1", "Google no la indexa bien por problemas técnicos de SEO"),
  li("lb2", "Tarda más de 3 segundos en cargar y la mitad de los visitantes se va"),
  li("lb3", "El diseño no transmite confianza y los visitantes no contactan"),
  li("lb4", "No podés integrarla con tu CRM, sistema de turnos o carrito de compras"),
  li("lb5", "Cuando querés escalarla, hay que tirarla y empezar de cero"),
  block("q_barato", "blockquote", "El costo real de una mala web no es lo que pagaste por hacerla. Es lo que dejaste de ganar por no convertir visitantes en clientes."),

  block("h_conclusion", "h2", "Conclusión: ¿cuánto debería gastar en una página web?"),
  block("p_c1", "normal", "Hacer una página web en Argentina en 2026 puede costar desde $0 hasta decenas de miles de dólares. Lo que más importa no es cuánto pagás, sino qué resultado obtenés. Una web que genera un cliente por mes con una inversión de $400 USD es infinitamente mejor que una gratuita que no genera nada."),
  block("p_c2", "normal", "En BApps trabajamos desde $350 USD con procesos claros, plazos reales y código propio. Sin plantillas genéricas, sin presupuestos inflados. Si querés saber cuánto costaría tu proyecto específico, escribinos: te respondemos en menos de 24 horas."),
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "post-cuanto-cuesta",
    slug: "cuanto-cuesta-pagina-web-argentina-2026",
    title: "Cuánto cuesta hacer una página web en Argentina en 2026",
    excerpt: "Precios reales de agencias, freelancers y constructores. Qué incluye cada opción y cómo elegir la correcta para tu negocio.",
    metaDescription: "Guía de precios actualizada 2026: cuánto cuesta hacer una página web en Argentina. Comparamos agencias, freelancers y constructores web para que elijas bien.",
    publishedAt: "2026-06-01T00:00:00Z",
    readTime: 8,
    tags: ["diseño web", "precios", "argentina"],
    content: ARTICLE_1_CONTENT,
  },
];
