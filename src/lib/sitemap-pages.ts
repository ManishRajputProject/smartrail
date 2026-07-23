import type { MetadataRoute } from "next";
import { ALL_TOOL_ROUTES, CONTENT_ROUTES, LEGAL_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";

export interface PageEntry {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
}

/**
 * The hand-built (non-train) pages, once each. Shared between the per-locale
 * page sitemaps and anything that needs to know the page set, so the two can
 * never disagree about which paths exist.
 */
export function pageEntries(now = new Date()): PageEntry[] {
  return [
    { path: "/", changeFrequency: "daily", priority: 1, lastModified: now },
    ...ALL_TOOL_ROUTES.map((r) => ({
      path: r.href,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: now,
    })),
    ...CONTENT_ROUTES.map((r) => ({
      path: r.href,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      lastModified: now,
    })),
    ...GUIDES.map((g) => ({
      path: `/guides/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date(g.updated),
    })),
    ...LEGAL_ROUTES.map((r) => ({
      path: r.href,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      lastModified: now,
    })),
  ];
}
