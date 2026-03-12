export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  category: "webapp" | "mobile" | "landing" | "ecommerce";
  url?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured: boolean;
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
