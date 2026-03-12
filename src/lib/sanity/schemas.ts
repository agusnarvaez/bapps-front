/**
 * Sanity schema definitions for BApps.
 * These are ready to use when connecting to Sanity Studio.
 * For now, data is served from src/lib/data/index.ts
 */

export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: unknown) => Rule },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Description", type: "text" },
    { name: "shortDescription", title: "Short Description", type: "string" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
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
    },
    { name: "url", title: "Live URL", type: "url" },
    {
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      fields: [
        { name: "quote", title: "Quote", type: "text" },
        { name: "author", title: "Author", type: "string" },
        { name: "role", title: "Role", type: "string" },
      ],
    },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "order", title: "Order", type: "number" },
  ],
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
