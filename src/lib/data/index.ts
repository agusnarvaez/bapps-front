import type { Project, TeamMember, Testimonial, Service } from "./types";

export const projects: Project[] = [
  {
    slug: "proyecto-ejemplo-1",
    title: "App de Gestión",
    description:
      "Sistema completo de gestión empresarial con dashboard en tiempo real, reportes y automatizaciones.",
    shortDescription: "Sistema de gestión empresarial con dashboard en tiempo real.",
    image: "/images/projects/project-1.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    category: "webapp",
    featured: true,
  },
  {
    slug: "proyecto-ejemplo-2",
    title: "E-Commerce Premium",
    description:
      "Tienda online con pasarela de pagos integrada, gestión de inventario y panel de administración.",
    shortDescription: "Tienda online con pasarela de pagos y admin panel.",
    image: "/images/projects/project-2.jpg",
    technologies: ["Next.js", "Stripe", "Sanity", "Vercel"],
    category: "ecommerce",
    featured: true,
  },
  {
    slug: "proyecto-ejemplo-3",
    title: "App Móvil Fitness",
    description:
      "Aplicación iOS y Android para seguimiento de rutinas, nutrición y progreso personal.",
    shortDescription: "App móvil para fitness y nutrición.",
    image: "/images/projects/project-3.jpg",
    technologies: ["React Native", "Firebase", "Node.js"],
    category: "mobile",
    featured: true,
  },
  {
    slug: "proyecto-ejemplo-4",
    title: "Landing SaaS",
    description:
      "Landing page de alto impacto para producto SaaS con animaciones y formulario de conversión.",
    shortDescription: "Landing page de alto impacto para SaaS.",
    image: "/images/projects/project-4.jpg",
    technologies: ["Next.js", "Framer Motion", "Tailwind"],
    category: "landing",
    featured: true,
  },
  {
    slug: "proyecto-ejemplo-5",
    title: "Portal Inmobiliario",
    description:
      "Plataforma de búsqueda y publicación de propiedades con mapas interactivos y filtros avanzados.",
    shortDescription: "Portal inmobiliario con mapas y filtros avanzados.",
    image: "/images/projects/project-5.jpg",
    technologies: ["React", "Express", "MongoDB", "Mapbox"],
    category: "webapp",
    featured: false,
  },
];

export const team: TeamMember[] = [
  {
    name: "Agustín Narvaez",
    role: "Full Stack Developer",
    image: "/images/team/member-1.jpg",
    linkedin: "https://www.linkedin.com/in/narvaezagustin",
  },
  {
    name: "Julián Gibelli",
    role: "Backend Developer",
    image: "/images/team/member-2.jpg",
    linkedin: "https://www.linkedin.com/in/jgibelli/",
  },
  {
    name: "Franco Nicotra",
    role: "Backend Developer",
    image: "/images/team/member-3.jpg",
    linkedin: "https://www.linkedin.com/in/franco-nicotra-a83a84156/",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "BApps transformó nuestra idea en una plataforma increíble. El equipo fue profesional y entregó antes del deadline.",
    author: "Cliente 1",
    role: "CEO",
    company: "Empresa A",
  },
  {
    quote:
      "La calidad del código y el diseño superaron nuestras expectativas. Excelente comunicación durante todo el proyecto.",
    author: "Cliente 2",
    role: "CTO",
    company: "Empresa B",
  },
  {
    quote:
      "Trabajar con BApps fue una experiencia excepcional. Recomendamos su trabajo sin dudarlo.",
    author: "Cliente 3",
    role: "Founder",
    company: "Empresa C",
  },
];

export const services: Service[] = [
  { key: "webApps", icon: "globe" },
  { key: "mobileApps", icon: "smartphone" },
  { key: "landingPages", icon: "rocket" },
  { key: "ecommerce", icon: "shopping-cart" },
  { key: "uiux", icon: "palette" },
  { key: "consulting", icon: "lightbulb" },
];

export const stats = {
  projects: 10,
  clients: 8,
  years: 2,
};
