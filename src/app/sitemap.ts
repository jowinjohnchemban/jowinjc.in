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
  ];
}

/* Sitemap Generation

1. Define the base URL from site configuration.
2. Fetch the latest 100 blog posts from Hashnode using getBlogPosts.
3. Map blog posts to sitemap entries with Hashnode publishedAt as lastModified date.
4. Define static pages with their respective sitemap entries.
5. Combine static pages and blog posts into sitemap array (tag pages excluded).

Date Strategy:
- Blog posts: Use Hashnode publishedAt timestamp
- Static pages: Omit lastModified (no meaningful date for these pages)
- Tag pages: Excluded from sitemap to reduce crawl depth
*/