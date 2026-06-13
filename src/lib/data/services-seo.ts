export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceSeoData = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  badge: string;
  benefits: ServiceBenefit[];
  audienceTitle: string;
  audienceItems: string[];
  faq: ServiceFaq[];
  ctaText: string;
  relatedServices: string[];
};

export const servicePages: ServiceSeoData[] = [
  {
    slug: "diseno-web",
    title: "Diseño Web Profesional en Argentina | BApps",
    metaDescription:
      "Diseñamos páginas web profesionales para empresas en Argentina. Rápidas, optimizadas para Google y hechas para convertir visitantes en clientes. Cotizá gratis.",
    h1: "Diseño web profesional para empresas que quieren crecer",
    subtitle:
      "Una página web no es solo un sitio en internet — es tu vendedor disponible las 24hs. La diseñamos para que trabaje para vos.",
    badge: "Diseño Web · Argentina",
    benefits: [
      {
        title: "Optimizada para Google desde el día 1",
        description:
          "SEO técnico incorporado en cada página: velocidad, estructura semántica, meta tags y schema markup. Salís a producción ya posicionable.",
      },
      {
        title: "Diseño que convierte visitas en consultas",
        description:
          "Cada sección está pensada para que el visitante tome acción. No es solo estética — es estrategia de conversión aplicada al diseño.",
      },
      {
        title: "Perfecta en celular y escritorio",
        description:
          "El 70% de tus clientes entra desde el celular. Tu web se ve y funciona perfecta en cualquier pantalla, sin compromisos.",
      },
      {
        title: "Entrega en plazos reales",
        description:
          "Sin promesas vacías. Acordamos un plazo antes de arrancar y lo cumplimos. Ves el avance en vivo durante todo el proceso.",
      },
    ],
    audienceTitle: "¿Quién necesita un diseño web profesional?",
    audienceItems: [
      "Negocios sin presencia online que pierden clientes todos los días",
      "Empresas con web vieja que no genera consultas ni confianza",
      "Profesionales independientes que quieren transmitir seriedad",
      "Pymes que quieren competir visualmente con empresas más grandes",
      "Emprendedores que quieren validar su negocio con una presencia digital sólida",
    ],
    faq: [
      {
        question: "¿Cuánto cuesta una página web profesional en Argentina?",
        answer:
          "Depende del alcance. Una web institucional básica parte desde USD 350. Una web con múltiples páginas, animaciones y SEO completo está entre USD 800 y USD 2.000. En BApps el presupuesto es claro desde el día 1 — sin costos ocultos ni sorpresas.",
      },
      {
        question: "¿Cuánto tiempo tarda en estar lista?",
        answer:
          "Una landing page o web básica tarda entre 1 y 3 semanas. Una web institucional completa tarda entre 3 y 6 semanas. Acordamos el plazo antes de empezar y lo cumplimos.",
      },
      {
        question: "¿Puedo editar mi web después sin saber programar?",
        answer:
          "Sí. Configuramos un CMS (sistema de gestión de contenido) que te permite editar textos, imágenes y secciones desde un panel simple, sin tocar código. También ofrecemos planes de mantenimiento mensual si preferís que lo manejemos nosotros.",
      },
      {
        question: "¿La web incluye hosting y dominio?",
        answer:
          "El desarrollo es independiente del hosting. Te asesoramos en la mejor opción según tu presupuesto. La mayoría de nuestros clientes usa Hostinger con planes desde USD 3/mes, que incluye dominio y correo profesional.",
      },
    ],
    ctaText: "Cotizá tu diseño web",
    relatedServices: ["landing-pages", "consultoria"],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages de Alta Conversión en Argentina | BApps",
    metaDescription:
      "Landing pages profesionales para empresas en Argentina. Diseñadas para convertir visitas en clientes, optimizadas para Google Ads y SEO. Cotizá gratis.",
    h1: "Landing pages que convierten visitas en clientes",
    subtitle:
      "Cada visita que rebota es plata que perdés. Diseñamos landing pages enfocadas en un solo objetivo: que el visitante contacte, compre o se registre.",
    badge: "Landing Pages · Alta Conversión",
    benefits: [
      {
        title: "Un objetivo, cero distracciones",
        description:
          "Sin menús complejos ni links que se llevan al visitante. Toda la página empuja hacia una sola acción: contactar, comprar o registrarse.",
      },
      {
        title: "Optimizada para Google Ads",
        description:
          "Una landing page bien hecha baja el costo por click de tus campañas. Google premia las páginas relevantes con mejor Quality Score.",
      },
      {
        title: "Carga ultra rápida",
        description:
          "Cada segundo de carga extra cuesta conversiones. Nuestras landing pages cargan en menos de 2 segundos — medido y garantizado.",
      },
      {
        title: "Formularios que funcionan",
        description:
          "Integración con WhatsApp, email y CRM. Cada lead llega directo a donde vos lo necesitás, en tiempo real.",
      },
    ],
    audienceTitle: "¿Cuándo necesitás una landing page?",
    audienceItems: [
      "Cuando lanzás un producto o servicio nuevo y querés captar leads",
      "Cuando corrés campañas de Google Ads o Meta Ads y necesitás una página de destino",
      "Cuando tu web principal tiene demasiadas opciones y confunde al visitante",
      "Cuando querés medir el resultado de una campaña específica",
      "Cuando necesitás algo listo y efectivo en poco tiempo",
    ],
    faq: [
      {
        question: "¿Qué diferencia hay entre una landing page y una página web?",
        answer:
          "Una página web institucional tiene múltiples secciones y objetivos. Una landing page tiene un único objetivo y está diseñada para que el visitante tome una acción específica. Son complementarias — muchas empresas tienen ambas.",
      },
      {
        question: "¿Cuánto cuesta una landing page en Argentina?",
        answer:
          "Una landing page básica parte desde USD 350. Una con animaciones, formulario avanzado y optimización para Ads puede estar entre USD 500 y USD 800. En BApps entregamos en 1 a 2 semanas.",
      },
      {
        question: "¿Puedo usar la landing page con mis campañas de Meta Ads?",
        answer:
          "Sí. La diseñamos especialmente para el objetivo de tu campaña. Si venís con la campaña activa o por armar, la adaptamos para maximizar la tasa de conversión.",
      },
      {
        question: "¿Incluye integración con WhatsApp?",
        answer:
          "Sí. Podemos integrar un botón de WhatsApp, formulario de contacto, o ambos. El lead llega directamente a tu teléfono o al canal que uses para responder consultas.",
      },
    ],
    ctaText: "Cotizá tu landing page",
    relatedServices: ["diseno-web", "consultoria"],
  },
  {
    slug: "aplicaciones-a-medida",
    title: "Aplicaciones Web y Móviles a Medida en Argentina | BApps",
    metaDescription:
      "Desarrollamos aplicaciones web y móviles a medida para empresas en Argentina. Tu solución exacta, no una genérica. Asesoramiento real durante todo el proceso.",
    h1: "Aplicaciones a medida para los procesos reales de tu negocio",
    subtitle:
      "Tu competencia usa herramientas genéricas que no encajan en su operación. Vos podés tener algo construido exactamente para cómo trabajás.",
    badge: "Desarrollo a Medida · Web & Mobile",
    benefits: [
      {
        title: "Construido para tu proceso, no al revés",
        description:
          "No adaptás tu negocio a un software enlatado. El software se adapta a tu negocio — con la lógica, los roles y los flujos que ya tenés.",
      },
      {
        title: "Escalable desde el día 1",
        description:
          "Arquitectura pensada para crecer. Lo que arranca con 10 usuarios puede manejar 10.000 sin reescribir todo desde cero.",
      },
      {
        title: "Código propio, sin dependencias de terceros",
        description:
          "No dependés de una plataforma SaaS que puede cerrar o subir precios. El código es tuyo y lo podés auditar, modificar o continuar con quien quieras.",
      },
      {
        title: "Asesoramiento antes de escribir una línea",
        description:
          "Antes de arrancar, analizamos tu problema real y validamos que lo que querés construir sea la mejor solución. Una hora de esto puede ahorrarte meses.",
      },
    ],
    audienceTitle: "¿Cuándo tiene sentido desarrollar a medida?",
    audienceItems: [
      "Cuando ningún SaaS disponible hace exactamente lo que necesitás",
      "Cuando tenés procesos internos que querés automatizar",
      "Cuando tu negocio maneja datos sensibles y no podés usar plataformas externas",
      "Cuando querés lanzar un producto digital propio (marketplace, plataforma, app)",
      "Cuando los costos de licencias SaaS empiezan a ser mayores que el desarrollo",
    ],
    faq: [
      {
        question: "¿Cuánto cuesta desarrollar una aplicación a medida?",
        answer:
          "Varía mucho según la complejidad. Una app web básica con autenticación y gestión de datos puede estar entre USD 2.000 y USD 5.000. Una plataforma compleja puede superar los USD 15.000. Hacemos una estimación detallada gratis antes de cualquier compromiso.",
      },
      {
        question: "¿Cuánto tiempo tarda un desarrollo a medida?",
        answer:
          "Un MVP (versión inicial funcional) tarda entre 4 y 12 semanas. Trabajamos en sprints de 2 semanas con entregas parciales — ves el avance real en todo momento, sin cajas negras.",
      },
      {
        question: "¿Qué pasa cuando termina el proyecto?",
        answer:
          "No desaparecemos. Ofrecemos planes de soporte y mantenimiento mensual. Si aparece un bug, lo resolvemos ese mismo día. Si querés agregar funcionalidades, las planificamos juntos.",
      },
      {
        question: "¿Hacen aplicaciones móviles también?",
        answer:
          "Sí. Desarrollamos apps para iOS y Android desde una sola base de código (React Native). Esto reduce el costo a casi la mitad comparado con hacer dos apps separadas sin sacrificar calidad.",
      },
    ],
    ctaText: "Contanos tu idea",
    relatedServices: ["consultoria", "diseno-web"],
  },
  {
    slug: "ecommerce",
    title: "Tienda Online Profesional para tu Negocio en Argentina | BApps",
    metaDescription:
      "Desarrollamos tiendas online profesionales para empresas en Argentina. Pagos, inventario y gestión de pedidos en un solo lugar. Vendé las 24hs sin complicaciones.",
    h1: "Tu tienda online lista para vender en Argentina",
    subtitle:
      "Tu tienda no cierra a las 18hs. Con un e-commerce bien hecho vendés mientras dormís, escalás cuando estés listo y controlás todo desde un panel simple.",
    badge: "E-Commerce · Tienda Online",
    benefits: [
      {
        title: "Pagos integrados desde el día 1",
        description:
          "MercadoPago, tarjetas, transferencia. El cliente paga como prefiere y vos recibís el dinero sin complicaciones técnicas.",
      },
      {
        title: "Gestión de stock en tiempo real",
        description:
          "Control de inventario integrado. Cuando un producto se agota, la tienda se actualiza sola. Sin actualizaciones manuales, sin ventas de lo que no tenés.",
      },
      {
        title: "Panel de administración sin tecnicismos",
        description:
          "Agregás productos, cambiás precios y revisás pedidos desde un panel que cualquiera entiende. No necesitás llamarnos para cada cambio.",
      },
      {
        title: "Optimizada para posicionarse en Google",
        description:
          "Cada producto tiene su página con SEO. Los clientes que buscan lo que vendés en Google llegan directo a tu tienda.",
      },
    ],
    audienceTitle: "¿Para qué tipo de negocio es un e-commerce?",
    audienceItems: [
      "Tiendas físicas que quieren extender sus ventas al canal online",
      "Marcas de producto que venden directamente al consumidor",
      "Negocios con catálogo de productos que gestionan pedidos manualmente",
      "Emprendedores que quieren lanzar un negocio 100% digital",
      "Empresas que ya tienen tienda en Tiendanube o MercadoLibre y quieren independencia",
    ],
    faq: [
      {
        question: "¿Cuánto cuesta hacer una tienda online en Argentina?",
        answer:
          "Un e-commerce básico con hasta 50 productos, MercadoPago y panel de administración parte desde USD 800. Un e-commerce completo con múltiples categorías, descuentos y gestión avanzada está entre USD 1.500 y USD 4.000.",
      },
      {
        question: "¿Qué diferencia tiene con Tiendanube o Shopify?",
        answer:
          "Las plataformas SaaS cobran comisión por cada venta y tienen límites en la personalización. Con una tienda propia no pagás comisiones, el diseño es 100% tuyo y podés agregar cualquier funcionalidad. A mediano plazo es más rentable.",
      },
      {
        question: "¿Incluye integración con MercadoPago?",
        answer:
          "Sí. Integramos MercadoPago, que es el estándar en Argentina. También podemos integrar otras pasarelas de pago según tus necesidades.",
      },
      {
        question: "¿Puedo gestionar la tienda solo después?",
        answer:
          "Sí. El panel de administración está diseñado para que puedas agregar productos, gestionar stock y revisar pedidos sin conocimientos técnicos. Te capacitamos antes de la entrega.",
      },
    ],
    ctaText: "Cotizá tu tienda online",
    relatedServices: ["diseno-web", "aplicaciones-a-medida"],
  },
  {
    slug: "apps-moviles",
    title: "Desarrollo de Apps Móviles iOS y Android en Argentina | BApps",
    metaDescription:
      "Desarrollamos apps móviles para iOS y Android en Argentina. Una sola base de código, la mitad del costo. Asesoramiento real y entrega en plazos concretos.",
    h1: "Apps móviles para iOS y Android desde una sola base de código",
    subtitle:
      "No pagás el doble por dos apps separadas. Desarrollamos en React Native: una sola base de código que funciona perfectamente en iOS y Android.",
    badge: "Apps Móviles · iOS · Android",
    benefits: [
      {
        title: "iOS y Android sin pagar el doble",
        description:
          "React Native permite compartir el 90% del código entre plataformas. Tus usuarios de iPhone y Android tienen la misma experiencia — vos pagás un solo desarrollo.",
      },
      {
        title: "Publicación en App Store y Google Play",
        description:
          "Nos encargamos de todo el proceso de publicación en ambas tiendas. Desde la configuración de cuentas hasta la aprobación final.",
      },
      {
        title: "Integración con cualquier backend",
        description:
          "La app se conecta a tu sistema existente, a APIs externas o construimos el backend desde cero. Todo en el mismo equipo, sin terceros.",
      },
      {
        title: "Actualizaciones sin pasar por las tiendas",
        description:
          "Con hot updates podés corregir bugs y lanzar mejoras sin esperar la aprobación de Apple o Google. Velocidad de respuesta real.",
      },
    ],
    audienceTitle: "¿Para qué tipo de proyecto sirve una app móvil?",
    audienceItems: [
      "Negocios que quieren dar a sus clientes una app propia (reservas, pedidos, fidelización)",
      "Startups que quieren lanzar un producto digital en iOS y Android",
      "Empresas con operaciones internas que necesitan acceso móvil (logística, campo, ventas)",
      "Proyectos que ya tienen web y quieren extender la experiencia al celular",
      "Emprendedores con una idea de app y sin equipo técnico propio",
    ],
    faq: [
      {
        question: "¿Cuánto cuesta desarrollar una app móvil en Argentina?",
        answer:
          "Una app móvil básica (autenticación, pantallas informativas, notificaciones) parte desde USD 3.000. Una app con lógica de negocio compleja, pagos y backend dedicado puede estar entre USD 8.000 y USD 20.000. Hacemos una estimación detallada gratis antes de cualquier compromiso.",
      },
      {
        question: "¿Qué diferencia hay entre React Native y una app nativa?",
        answer:
          "Una app nativa se desarrolla dos veces (una para iOS en Swift, otra para Android en Kotlin). React Native permite desarrollarla una vez y correr en ambas plataformas con performance casi idéntica a nativa. Para el 95% de los proyectos, React Native es la opción correcta por costo y tiempo.",
      },
      {
        question: "¿Cuánto tiempo tarda en publicarse en las tiendas?",
        answer:
          "El desarrollo del MVP tarda entre 6 y 16 semanas. La revisión de Apple tarda 1-3 días. La de Google Play tarda entre unas horas y 3 días. Te acompañamos en todo el proceso de publicación.",
      },
      {
        question: "¿Puedo ver el avance durante el desarrollo?",
        answer:
          "Sí. Usamos Expo Go para que puedas probar la app en tu propio celular durante el desarrollo, sin necesidad de publicarla. Ves el avance en tiempo real desde la primera semana.",
      },
    ],
    ctaText: "Contanos tu idea de app",
    relatedServices: ["aplicaciones-a-medida", "consultoria"],
  },
  {
    slug: "consultoria",
    title: "Consultoría Tecnológica para Empresas en Argentina | BApps",
    metaDescription:
      "Consultoría tecnológica para empresas en Argentina. Te ayudamos a decidir qué construir antes de invertir. Una hora puede ahorrarte meses de desarrollo mal orientado.",
    h1: "Consultoría tecnológica antes de gastar en desarrollo",
    subtitle:
      "La mayoría de los proyectos que fracasan no lo hacen por falta de presupuesto — lo hacen porque nadie validó que la idea era la correcta. Nosotros lo hacemos.",
    badge: "Consultoría · Arquitectura · Roadmap",
    benefits: [
      {
        title: "Validamos antes de construir",
        description:
          "Analizamos tu problema real, revisamos si existe una solución más simple y confirmamos que lo que querés construir sea la inversión correcta.",
      },
      {
        title: "Roadmap técnico claro",
        description:
          "Salís con un plan concreto: qué construir primero, qué tecnologías usar, cuánto va a costar y cuánto tiempo va a llevar — sin ambigüedades.",
      },
      {
        title: "Sin conflicto de interés",
        description:
          "Si la mejor solución para vos es un SaaS barato en lugar de un desarrollo a medida, te lo decimos. Preferimos ser honestos y ganarte como cliente a largo plazo.",
      },
      {
        title: "Orientado a tu negocio, no a la tecnología",
        description:
          "No vendemos tecnología por vender. Buscamos la solución que mejor resuelve tu problema de negocio, sea simple o compleja.",
      },
    ],
    audienceTitle: "¿Cuándo tiene sentido una consultoría?",
    audienceItems: [
      "Antes de invertir en un desarrollo a medida importante",
      "Cuando recibiste varios presupuestos muy diferentes y no sabés cuál creer",
      "Cuando tenés una idea de producto digital y querés validar si es viable",
      "Cuando tu sistema actual tiene problemas y no sabés si conviene migrar o mejorar",
      "Cuando querés una segunda opinión técnica antes de tomar una decisión",
    ],
    faq: [
      {
        question: "¿Cuánto cuesta una consultoría con BApps?",
        answer:
          "La primera consulta es sin costo y sin compromiso. Para proyectos más complejos que requieren análisis detallado, armamos un presupuesto específico. El objetivo es que salgas con claridad, no con una factura.",
      },
      {
        question: "¿La consultoría es presencial o remota?",
        answer:
          "100% remota vía videollamada. Somos una empresa remota y trabajamos con clientes de toda Argentina y el exterior. Coordinamos en el horario que mejor te convenga.",
      },
      {
        question: "¿Qué pasa si después de la consultoría quiero que desarrollen el proyecto?",
        answer:
          "La consultoría no genera ningún compromiso. Si decidís avanzar con nosotros, el tiempo de consultoría se descuenta del presupuesto de desarrollo. Si no, te vas con el plan y podés ejecutarlo con quien quieras.",
      },
      {
        question: "¿En cuánto tiempo me dan un diagnóstico?",
        answer:
          "Para proyectos estándar, en la misma reunión o dentro de las 48hs. Para proyectos complejos que requieren análisis técnico profundo, en menos de una semana.",
      },
    ],
    ctaText: "Agendá una consulta gratis",
    relatedServices: ["diseno-web", "aplicaciones-a-medida"],
  },
];

export function getServiceBySlug(slug: string): ServiceSeoData | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export const serviceSlugToKey: Record<string, string> = {
  "diseno-web": "landingPages",
  "landing-pages": "landingPages",
  "aplicaciones-a-medida": "webApps",
  ecommerce: "ecommerce",
  consultoria: "consulting",
};
