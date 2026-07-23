/**
 * Legal and about pages as structured data rather than hardcoded JSX, so the
 * same document can be rendered in any language.
 *
 * Translated legal text carries risk: a mistranslated liability clause is
 * worse than an English one. Every non-English rendering therefore shows a
 * prevailing-language notice (see LegalPage) stating that the English version
 * governs in case of discrepancy — the standard way to localise these pages
 * without changing their legal effect.
 */

export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  /** Page <h1>. */
  title: string;
  /** Small label above the title, where the design uses one. */
  eyebrow?: string;
  /** Rendered under the title, e.g. "Last updated: 20 July 2026". */
  updated?: string;
  /** Lead paragraphs before the first heading. */
  intro?: string[];
  sections: LegalSection[];
  /** Shown in the notice box; omitted for English. */
  prevailingNotice?: string;
}

export type LegalSlug =
  | "terms"
  | "privacy-policy"
  | "disclaimer"
  | "about"
  | "contact"
  | "data-deletion";

export type LegalDocs = Record<LegalSlug, LegalDoc>;
