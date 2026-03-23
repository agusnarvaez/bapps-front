export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string; // Nunca null después del mapper - usa fallback si falta
  technologies: string[];
  category: "webapp" | "mobile" | "landing" | "ecommerce";
  url?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured: boolean;
  order?: number; // Para ordenamiento editorial
}

/**
 * Documento bruto de Sanity con campos bilingües.
 * Los strings pueden ser localizados ES/EN en el mismo documento.
 */
export interface SanityProjectDocument {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  slug?: {
    current: string;
  };
  title?: Record<"es" | "en", string>; // { es: "...", en: "..." }
  description?: Record<"es" | "en", string>;
  shortDescription?: Record<"es" | "en", string>;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    crop?: Record<string, unknown>;
    hotspot?: Record<string, unknown>;
  };
  technologies?: string[];
  category?: "webapp" | "mobile" | "landing" | "ecommerce";
  url?: string;
  testimonial?: Record<"es" | "en", {
    quote: string;
    author: string;
    role: string;
  }>;
  featured?: boolean;
  order?: number;
  publishedAt?: string; // Para filtrar solo publicados
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export interface Service {
  key: string;
  icon: string;
}
