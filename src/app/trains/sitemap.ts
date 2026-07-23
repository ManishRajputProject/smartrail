import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { sitemapTrains } from "@/lib/rail-data";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/locales";
import { TRAINS_PER_SITEMAP } from "@/lib/sitemap-config";

/**
 * Per-train sitemaps, split because ~5,200 trains x 8 locales is far too many
 * URLs (and far too much hreflang markup) for a single file.
 *
 * Served at /trains/sitemap/0.xml … /trains/sitemap/N.xml and referenced from
 * robots.txt. The root /sitemap.xml continues to cover the hand-built pages.
 */


export async function generateSitemaps() {
  const count = Math.ceil(sitemapTrains().length / TRAINS_PER_SITEMAP);
  return Array.from({ length: count }, (_, id) => ({ id }));
}

export default async function sitemap({
  id,
}: {
  // Next 16 passes id as a promise resolving to a string.
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const index = Number(await id);
  const all = sitemapTrains();
  const start = index * TRAINS_PER_SITEMAP;
  const chunk = all.slice(start, start + TRAINS_PER_SITEMAP);
  const now = new Date();

  const out: MetadataRoute.Sitemap = [];
  for (const train of chunk) {
    const path = `/trains/${train.number}`;
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
    );
    // Trains with class data render a fuller page, so they rank ahead of the
    // timings-only ones rather than all competing at the same weight.
    const base = train.classes?.length ? 0.5 : 0.3;

    for (const locale of LOCALES) {
      out.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: locale === DEFAULT_LOCALE ? base : Math.max(0.1, base - 0.1),
        alternates: { languages },
      });
    }
  }
  return out;
}
