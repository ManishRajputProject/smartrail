import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Only the index needs listing — crawlers follow it to every child sitemap
  // (per-language pages and the split train files).
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
