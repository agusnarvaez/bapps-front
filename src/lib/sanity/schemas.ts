/**
 * Sanity schema definitions for BApps.
 * These are ready to use when connecting to Sanity Studio.
 * Projects now support bilingual content (ES/EN) in a single document.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    // Bilingual title
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string", validation: (Rule: any) => Rule.required() },
        { name: "en", title: "English", type: "string", validation: (Rule: any) => Rule.required() },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.es" }, // Generate from Spanish title
      validation: (Rule: any) => Rule.required(),
    },
    // Bilingual short description
    {
      name: "shortDescription",
      title: "Short Description",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string", validation: (Rule: any) => Rule.required() },
        { name: "en", title: "English", type: "string", validation: (Rule: any) => Rule.required() },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    // Bilingual full description
    {
      name: "description",
      title: "Full Description",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", validation: (Rule: any) => Rule.required() },
        { name: "en", title: "English", type: "text", validation: (Rule: any) => Rule.required() },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Project cover image. If not provided, a fallback will be used.",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web App", value: "webapp" },
          { title: "Mobile", value: "mobile" },
          { title: "Landing", value: "landing" },
          { title: "E-Commerce", value: "ecommerce" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "url",
      title: "Live URL",
      type: "url",
      description: "External link to the deployed project (optional)",
    },
    // Bilingual testimonial
    {
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text", validation: (Rule: any) => Rule.required() },
            { name: "author", title: "Author", type: "string", validation: (Rule: any) => Rule.required() },
            { name: "role", title: "Role", type: "string", validation: (Rule: any) => Rule.required() },
          ],
        },
        {
          name: "en",
          title: "English",
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text", validation: (Rule: any) => Rule.required() },
            { name: "author", title: "Author", type: "string", validation: (Rule: any) => Rule.required() },
            { name: "role", title: "Role", type: "string", validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
      description: "Optional testimonial from client. Include both ES and EN or leave empty.",
    },
    {
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
      description: "Show this project in the featured carousel on homepage",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Used for featured carousel and next project navigation.",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title.es",
      subtitle: "category",
      image: "image",
    },
  },
};

export const teamMemberSchema = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "linkedin", title: "LinkedIn URL", type: "url" },
    { name: "order", title: "Order", type: "number" },
  ],
};

export const testimonialSchema = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "quote", title: "Quote", type: "text" },
    { name: "author", title: "Author", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "order", title: "Order", type: "number" },
  ],
};

export const schemas = [projectSchema, teamMemberSchema, testimonialSchema];
