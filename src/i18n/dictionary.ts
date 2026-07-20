import type { Locale } from "@/i18n/locales";
import en from "@/i18n/dictionaries/en.json";
import hi from "@/i18n/dictionaries/hi.json";
import bn from "@/i18n/dictionaries/bn.json";
import mr from "@/i18n/dictionaries/mr.json";
import ta from "@/i18n/dictionaries/ta.json";
import te from "@/i18n/dictionaries/te.json";
import gu from "@/i18n/dictionaries/gu.json";
import kn from "@/i18n/dictionaries/kn.json";

/** English is the canonical shape; other locales may be partial. */
export type Dictionary = typeof en;

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

const RAW: Record<Locale, DeepPartial<Dictionary>> = {
  en,
  hi: hi as DeepPartial<Dictionary>,
  bn: bn as DeepPartial<Dictionary>,
  mr: mr as DeepPartial<Dictionary>,
  ta: ta as DeepPartial<Dictionary>,
  te: te as DeepPartial<Dictionary>,
  gu: gu as DeepPartial<Dictionary>,
  kn: kn as DeepPartial<Dictionary>,
};

function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  const out = { ...base } as T;
  for (const key in override) {
    const ov = override[key];
    const bv = (base as Record<string, unknown>)[key];
    if (ov && typeof ov === "object" && !Array.isArray(ov) && bv && typeof bv === "object") {
      (out as Record<string, unknown>)[key] = deepMerge(bv, ov as DeepPartial<typeof bv>);
    } else if (ov !== undefined) {
      (out as Record<string, unknown>)[key] = ov;
    }
  }
  return out;
}

const CACHE = new Map<Locale, Dictionary>();

/** Returns a complete dictionary for the locale — locale strings overlaid on
 *  English, so any untranslated key falls back to English automatically. */
export function getDictionary(locale: Locale): Dictionary {
  const cached = CACHE.get(locale);
  if (cached) return cached;
  const merged = deepMerge(en, RAW[locale] ?? {});
  CACHE.set(locale, merged);
  return merged;
}
