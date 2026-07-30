import { SITE_URL } from "@/lib/seo";
import { LOCALES } from "@/i18n/locales";
import { sitemapTrains, sitemapStations } from "@/lib/rail-data";
import { TRAINS_PER_SITEMAP, STATIONS_PER_SITEMAP } from "@/lib/sitemap-config";

/**
 * Sitemap index served at /sitemap.xml — the single file to submit to Search
 * Console. Next has no built-in index, so this route handler emits one that
 * points at every child sitemap:
 *
 *   - one page sitemap per language   (/pages/sitemap/<locale>.xml)
 *   - the split train sitemaps        (/trains/sitemap/<n>.xml)
 *   - the split station sitemaps      (/stations/sitemap/<n>.xml)
 *
 * Child sitemaps are the actual <urlset> files with the URLs and hreflang.
 */
export function GET() {
  const now = new Date().toISOString();

  const pageSitemaps = LOCALES.map((l) => `${SITE_URL}/pages/sitemap/${l}.xml`);

  const trainCount = Math.ceil(sitemapTrains().length / TRAINS_PER_SITEMAP);
  const trainSitemaps = Array.from(
    { length: trainCount },
    (_, i) => `${SITE_URL}/trains/sitemap/${i}.xml`
  );

  const stationCount = Math.ceil(sitemapStations().length / STATIONS_PER_SITEMAP);
  const stationSitemaps = Array.from(
    { length: stationCount },
    (_, i) => `${SITE_URL}/stations/sitemap/${i}.xml`
  );

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...pageSitemaps, ...trainSitemaps, ...stationSitemaps]
      .map(
        (loc) =>
          `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
      )
      .join("\n") +
    `\n</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
