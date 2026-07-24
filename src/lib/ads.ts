/**
 * Ad configuration.
 *
 * Two independent switches, both of which must be on for any ad to render:
 *
 *  1. ADS_ENABLED  — an explicit master switch (NEXT_PUBLIC_ADS_ENABLED).
 *                    Defaults to OFF. This is the flag to flip when you want
 *                    ads back; it exists so ads are hidden deliberately rather
 *                    than by accident of missing config.
 *  2. ADSENSE_CLIENT — the publisher ID (NEXT_PUBLIC_ADSENSE_CLIENT,
 *                    "ca-pub-…"), which AdSense only issues after approval.
 *
 * With either off, ad slots render nothing at all — no empty boxes, no
 * reserved gaps, and no ad script is ever fetched. Consent is a separate,
 * additional gate enforced in AdSlot.
 *
 * To turn ads on:
 *   NEXT_PUBLIC_ADS_ENABLED=true
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 * then rebuild (both are inlined at build time).
 */

/** Master switch. Off unless explicitly set to "true". */
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export function adsConfigured(): boolean {
  return ADS_ENABLED && ADSENSE_CLIENT.startsWith("ca-pub-");
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
