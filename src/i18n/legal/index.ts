import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import type { LegalDoc, LegalDocs, LegalSlug } from "@/i18n/legal/types";
import { en } from "@/i18n/legal/en";
import { hi } from "@/i18n/legal/hi";
import { bn } from "@/i18n/legal/bn";
import { mr } from "@/i18n/legal/mr";
import { ta } from "@/i18n/legal/ta";
import { te } from "@/i18n/legal/te";

/**
 * Legal/about documents per locale. A locale absent from this registry falls
 * back to the English document, so a partially translated site still renders
 * complete, legally coherent pages.
 */
const DOCS: Partial<Record<Locale, LegalDocs>> = { en, hi, bn, mr, ta, te };

export function legalDoc(locale: Locale, slug: LegalSlug): LegalDoc {
  return DOCS[locale]?.[slug] ?? DOCS[DEFAULT_LOCALE]![slug];
}

/** True when this locale is showing a translation rather than the source text. */
export function isTranslatedLegal(locale: Locale, slug: LegalSlug): boolean {
  return locale !== DEFAULT_LOCALE && Boolean(DOCS[locale]?.[slug]);
}

export type { LegalDoc, LegalSlug } from "@/i18n/legal/types";
