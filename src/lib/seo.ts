import type { Metadata } from "next";

/**
 * Placeholder brand name/domain — deliberately NOT reusing any existing
 * product's name. Swap SITE_NAME and SITE_URL (via env var) before launch.
 */
export const SITE_NAME = "RailSetu";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://railsetu.in";
export const SITE_DESCRIPTION =
  "Free IRCTC booking date, Tatkal timing, refund and waitlist calculators for Indian Railways travellers — no login, always current.";

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
