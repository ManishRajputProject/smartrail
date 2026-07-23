import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { sitemapTrains } from "@/lib/rail-data";
import { TRAINS_PER_SITEMAP } from "@/lib/sitemap-config";

export default function robots(): MetadataRoute.Robots {
  // The per-train sitemaps are split across several files, and each one has to
  // be listed here — crawlers do not discover /trains/sitemap/N.xml on their own.
  const count = Math.ceil(sitemapTrains().length / TRAINS_PER_SITEMAP);
  const trainSitemaps = Array.from(
    { length: count },
    (_, i) => `${SITE_URL}/trains/sitemap/${i}.xml`
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, ...trainSitemaps],
  };
}
