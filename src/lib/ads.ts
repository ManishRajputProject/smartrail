/**
 * Ad configuration.
 *
 * The publisher ID comes from NEXT_PUBLIC_ADSENSE_CLIENT (e.g. "ca-pub-…").
 * Until it is set, ad slots render nothing at all — no empty boxes, no
 * reserved gaps — so the live site never shows placeholder holes. Set the env
 * var and the slots activate; nothing else needs changing.
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export function adsConfigured(): boolean {
  return ADSENSE_CLIENT.startsWith("ca-pub-");
}

/**
 * Reserved heights per placement, in px. Space is reserved *before* the ad
 * loads so filling it causes no layout shift — the single biggest way ad
 * scripts wreck Core Web Vitals.
 */
export const AD_SIZES = {
  /** Between content sections; responsive leaderboard/rectangle. */
  inline: { minHeight: 280, maxHeight: 280 },
  /** Below the fold, end of article/tool. */
  footer: { minHeight: 250, maxHeight: 250 },
} as const;

export type AdPlacement = keyof typeof AD_SIZES;
