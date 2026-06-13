export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    slug,
    title,
    excerpt,
    metaDescription,
    coverImage,
    publishedAt,
    readTime,
    tags,
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    excerpt,
    metaDescription,
    content,
    coverImage,
    publishedAt,
    readTime,
    tags,
  }
`;

export const BLOG_POST_SLUGS_QUERY = `
  *[_type == "blogPost" && defined(publishedAt)] { slug }
`;
