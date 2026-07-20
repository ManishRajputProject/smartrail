import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { ALL_TOOL_ROUTES, CONTENT_ROUTES, LEGAL_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/locales";

interface Entry {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
}

/** Every path once, then expanded to one sitemap URL per locale with full
 *  hreflang alternates (Google reads hreflang from the sitemap). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Entry[] = [
    { path: "/", changeFrequency: "daily", priority: 1, lastModified: now },
    ...ALL_TOOL_ROUTES.map((r) => ({ path: r.href, changeFrequency: "weekly" as const, priority: 0.9, lastModified: now })),
    ...CONTENT_ROUTES.map((r) => ({ path: r.href, changeFrequency: "weekly" as const, priority: 0.7, lastModified: now })),
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.6, lastModified: new Date(g.updated) })),
    ...LEGAL_ROUTES.map((r) => ({ path: r.href, changeFrequency: "yearly" as const, priority: 0.3, lastModified: now })),
  ];

  const out: MetadataRoute.Sitemap = [];
  for (const e of entries) {
    const clean = e.path === "/" ? "" : e.path;
    const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${clean}`]));
    for (const locale of LOCALES) {
      out.push({
        url: `${SITE_URL}/${locale}${clean}`,
        lastModified: e.lastModified,
        changeFrequency: e.changeFrequency,
        priority: locale === DEFAULT_LOCALE ? e.priority : Math.max(0.1, e.priority - 0.1),
        alternates: { languages },
      });
    }
  }
  return out;
}
