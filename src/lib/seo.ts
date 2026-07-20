import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

/**
 * Placeholder brand name/domain — deliberately NOT reusing any existing
 * product's name. Swap SITE_NAME and SITE_URL (via env var) before launch.
 */
export const SITE_NAME = "RailSetu";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://railsetu.in";
export const SITE_DESCRIPTION =
  "Free IRCTC booking date, Tatkal timing, refund and waitlist calculators for Indian Railways travellers — no login, always current.";

/** hreflang alternates for a given path across every supported locale. */
export function hreflangAlternates(path: string): Record<string, string> {
  const clean = path === "/" ? "" : path;
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[l] = `${SITE_URL}/${l}${clean}`;
  map["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${clean}`;
  return map;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  locale = DEFAULT_LOCALE,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  locale?: Locale;
}): Metadata {
  const clean = path === "/" ? "" : path;
  const url = `${SITE_URL}/${locale}${clean}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Absolute URL for a path in a given locale (default English). */
export function absoluteUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${clean}`;
}
