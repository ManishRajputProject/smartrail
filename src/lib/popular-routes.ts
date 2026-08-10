export interface PopularRoute {
  /** URL segment under /trains-between/[route]. */
  slug: string;
  from: string;
  fromLabel: string;
  to: string;
  toLabel: string;
  /** Alternate spellings/transliterations real searchers use for this
   *  corridor (e.g. "Ferozepur" vs "Firozpur") — woven into the landing
   *  page's body copy to catch long-tail spelling variants. */
  variants?: string[];
}

// Real station codes only — every route here gets its own static, indexable
// landing page (see trains-between/[route]/page.tsx) in addition to the
// homepage shortcut grid, both pointing at the live search as the source of
// truth rather than a fabricated preview.
export const POPULAR_ROUTES: PopularRoute[] = [
  { slug: "new-delhi-mumbai-central", from: "NDLS", fromLabel: "New Delhi", to: "BCT", toLabel: "Mumbai Central" },
  { slug: "mumbai-central-pune", from: "BCT", fromLabel: "Mumbai Central", to: "PUNE", toLabel: "Pune Jn" },
  { slug: "chennai-bengaluru", from: "MAS", fromLabel: "Chennai Central", to: "SBC", toLabel: "Bengaluru" },
  { slug: "howrah-new-delhi", from: "HWH", fromLabel: "Howrah", to: "NDLS", toLabel: "New Delhi" },
  { slug: "secunderabad-chennai", from: "SC", fromLabel: "Secunderabad", to: "MAS", toLabel: "Chennai Central" },
  { slug: "ahmedabad-mumbai-central", from: "ADI", fromLabel: "Ahmedabad", to: "BCT", toLabel: "Mumbai Central" },
  { slug: "jaipur-new-delhi", from: "JP", fromLabel: "Jaipur", to: "NDLS", toLabel: "New Delhi" },
  { slug: "lucknow-new-delhi", from: "LKO", fromLabel: "Lucknow", to: "NDLS", toLabel: "New Delhi" },
  // Added from real Search Console demand: "firozpur/ferozepur/fzr to
  // chandigarh train time" — several spelling variants, real search volume.
  {
    slug: "firozpur-chandigarh",
    from: "FZR",
    fromLabel: "Firozpur Cantt",
    to: "CDG",
    toLabel: "Chandigarh",
    variants: ["Ferozepur", "Ferozpur", "FZR"],
  },
];

export function findPopularRoute(slug: string): PopularRoute | undefined {
  return POPULAR_ROUTES.find((r) => r.slug === slug);
}
