import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { pageEntries } from "@/lib/sitemap-pages";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";

/**
 * One page sitemap per language, served at /pages/sitemap/<locale>.xml and
 * listed in the root sitemap index. Splitting by language lets Search Console
 * report indexation separately for each locale ("Hindi: 12 of 38 indexed"),
 * which a single mixed-locale file cannot show.
 *
 * Every URL still carries the full hreflang alternate set — hreflang must be
 * reciprocal across all locales regardless of which file a URL lives in.
 */
export async function generateSitemaps() {
  return LOCALES.map((id) => ({ id }));
}

export default async function sitemap({
  id,
}: {
  // Next 16 passes the generateSitemaps id as a promise resolving to a string.
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const raw = await id;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return pageEntries().map((e) => {
    const clean = e.path === "/" ? "" : e.path;
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${clean}`])
    );
    return {
      url: `${SITE_URL}/${locale}${clean}`,
      lastModified: e.lastModified,
      changeFrequency: e.changeFrequency,
      priority:
        locale === DEFAULT_LOCALE ? e.priority : Math.max(0.1, e.priority - 0.1),
      alternates: { languages },
    };
  });
}
