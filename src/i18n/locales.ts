/** Supported locales — English plus India's most-spoken languages. */
export const LOCALES = ["en", "hi", "bn", "mr", "ta", "te", "gu", "kn"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Native + English name for the language switcher. */
export const LOCALE_META: Record<Locale, { native: string; english: string; short: string }> = {
  en: { native: "English", english: "English", short: "EN" },
  hi: { native: "हिन्दी", english: "Hindi", short: "हि" },
  bn: { native: "বাংলা", english: "Bengali", short: "বাং" },
  mr: { native: "मराठी", english: "Marathi", short: "मरा" },
  ta: { native: "தமிழ்", english: "Tamil", short: "தமி" },
  te: { native: "తెలుగు", english: "Telugu", short: "తెలు" },
  gu: { native: "ગુજરાતી", english: "Gujarati", short: "ગુજ" },
  kn: { native: "ಕನ್ನಡ", english: "Kannada", short: "ಕನ್" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefix a root-relative href with the locale. */
export function localePath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}
