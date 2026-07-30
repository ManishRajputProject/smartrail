import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { sitemapStations } from "@/lib/rail-data";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/locales";
import { STATIONS_PER_SITEMAP } from "@/lib/sitemap-config";

/**
 * Per-station sitemaps, split for the same reason as trains/sitemap.ts —
 * ~8,900 stations x 8 locales is too many URLs for one file.
 *
 * Served at /stations/sitemap/0.xml … /stations/sitemap/N.xml.
 */

export async function generateSitemaps() {
  const count = Math.ceil(sitemapStations().length / STATIONS_PER_SITEMAP);
  return Array.from({ length: count }, (_, id) => ({ id }));
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const index = Number(await id);
  const all = sitemapStations();
  const start = index * STATIONS_PER_SITEMAP;
  const chunk = all.slice(start, start + STATIONS_PER_SITEMAP);
  const now = new Date();

  const out: MetadataRoute.Sitemap = [];
  for (const station of chunk) {
    const path = `/stations/${station.code.toLowerCase()}`;
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
    );

    for (const locale of LOCALES) {
      out.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: locale === DEFAULT_LOCALE ? 0.4 : 0.3,
        alternates: { languages },
      });
    }
  }
  return out;
}
