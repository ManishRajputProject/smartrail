import type { Locale } from "@/i18n/locales";
import type { GuideSection } from "@/lib/guides";
import { hi } from "@/i18n/guide-bodies/hi";
import { bn } from "@/i18n/guide-bodies/bn";
import { mr } from "@/i18n/guide-bodies/mr";
import { ta } from "@/i18n/guide-bodies/ta";

/**
 * Translated guide article bodies, keyed by guide slug.
 *
 * Bodies are translated one language at a time; a locale absent from this
 * registry simply falls back to the English sections in src/lib/guides.ts,
 * so a partially translated site always renders coherently.
 */
export type GuideBodyMap = Record<string, GuideSection[]>;

const BODIES: Partial<Record<Locale, GuideBodyMap>> = { hi, bn, mr, ta };

export function guideBody(locale: Locale, slug: string): GuideSection[] | undefined {
  return BODIES[locale]?.[slug];
}

/** Locales whose article bodies are fully translated (used for UI hints). */
export function hasTranslatedBodies(locale: Locale): boolean {
  return Boolean(BODIES[locale]);
}
