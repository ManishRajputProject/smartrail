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
  // Batch 2, added from Search Console query demand (2026-08-16 export):
  // real "X to Y train" searches with no dedicated landing page yet.
  { slug: "ahmedabad-jammu-tawi", from: "ADI", fromLabel: "Ahmedabad", to: "JAT", toLabel: "Jammu Tawi" },
  { slug: "indore-jodhpur", from: "INDB", fromLabel: "Indore Jn", to: "JU", toLabel: "Jodhpur Jn" },
  { slug: "solapur-kolhapur", from: "SUR", fromLabel: "Solapur Jn", to: "KOP", toLabel: "Kolhapur" },
  { slug: "gwalior-bhind", from: "GWL", fromLabel: "Gwalior Jn", to: "BIX", toLabel: "Bhind" },
  { slug: "ranchi-mumbai", from: "RNC", fromLabel: "Ranchi", to: "BCT", toLabel: "Mumbai Central" },
  { slug: "puri-guwahati", from: "PURI", fromLabel: "Puri", to: "GHY", toLabel: "Guwahati" },
  { slug: "rewari-bhiwani", from: "RE", fromLabel: "Rewari", to: "BNW", toLabel: "Bhiwani" },
  { slug: "dehradun-chennai", from: "DDN", fromLabel: "Dehradun", to: "MAS", toLabel: "Chennai Central" },
  { slug: "nagpur-kolhapur", from: "NGP", fromLabel: "Nagpur", to: "KOP", toLabel: "Kolhapur" },
];

export function findPopularRoute(slug: string): PopularRoute | undefined {
  return POPULAR_ROUTES.find((r) => r.slug === slug);
}
