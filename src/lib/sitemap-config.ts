/**
 * Shared between src/app/trains/sitemap.ts (which splits the per-train URLs
 * into files) and src/app/robots.ts (which must list every one of those files).
 * Keeping the number here means the two can never disagree about how many
 * sitemaps exist.
 *
 * 650 trains x 8 locales = 5,200 URLs per file, comfortably inside Google's
 * 50,000-URL / 50 MB limits even with full hreflang blocks on every entry.
 */
export const TRAINS_PER_SITEMAP = 650;

/** Same reasoning as TRAINS_PER_SITEMAP, for src/app/stations/sitemap.ts. */
export const STATIONS_PER_SITEMAP = 650;
