import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { ALL_TOOL_ROUTES, CONTENT_ROUTES, LEGAL_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const tools: MetadataRoute.Sitemap = ALL_TOOL_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const content: MetadataRoute.Sitemap = CONTENT_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legal: MetadataRoute.Sitemap = LEGAL_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.href}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...home, ...tools, ...content, ...guides, ...legal];
}
