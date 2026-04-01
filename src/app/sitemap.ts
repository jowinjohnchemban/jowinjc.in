import { getBlogPosts } from "@/lib/api/hashnode";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Revalidate sitemap every 5 minutes
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  
  // Fetch blog posts dynamically
  const posts = await getBlogPosts(100);

  // Blog posts with Hashnode publish date
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Extract unique tag pages from posts
  const tagSlugs = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tag.slug) {
        tagSlugs.add(tag.slug);
      } else if (tag.name) {
        // Convert tag name to slug format
        const slugified = tag.name
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        if (slugified) {
          tagSlugs.add(slugified);
        }
      }
    });
  });

  // Tag pages without lastModified (no specific date)
  const tagPages = Array.from(tagSlugs).map((slug) => ({
    url: `${baseUrl}/blog/tag/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Static pages without lastModified (no specific date)
  const staticPages = [
    {
      url: baseUrl,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/connect`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  return [
    ...staticPages,
    ...blogPosts,
    ...tagPages,
  ];
}

/* Sitemap Generation

1. Define the base URL from site configuration.
2. Fetch the latest 100 blog posts from Hashnode using getBlogPosts.
3. Map blog posts to sitemap entries with Hashnode publishedAt as lastModified date.
4. Extract unique tag pages (without lastModified since they change dynamically).
5. Define static pages (without lastModified since they don't have specific meaningful dates).
6. Combine all entries into a single sitemap array and return it.

Date Strategy:
- Blog posts: Use Hashnode publishedAt timestamp
- Tag pages: Omit lastModified (dynamic content date)
- Static pages: Omit lastModified (no meaningful date for these pages)
*/