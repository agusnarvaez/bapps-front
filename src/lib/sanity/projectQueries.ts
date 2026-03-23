export const PROJECTS_QUERY = `
  *[_type == "project" && defined(publishedAt)] | order(order asc, _createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    slug,
    title,
    description,
    shortDescription,
    image,
    technologies,
    category,
    url,
    testimonial,
    featured,
    order,
    publishedAt,
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    slug,
    title,
    description,
    shortDescription,
    image,
    technologies,
    category,
    url,
    testimonial,
    featured,
    order,
    publishedAt,
  }
`;

export const PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(publishedAt)] { slug }
`;
