/** Curated "premium" train categories for dedicated landing pages
 *  (/trains/category/[slug]). Names are proper nouns and stay in English
 *  across all locales, matching how individual train names are handled
 *  elsewhere on the site. */
export interface TrainCategory {
  slug: string;
  /** Raw `type` value as stored in trains.json. */
  typeCode: string;
  name: string;
  description: string;
}

export const TRAIN_CATEGORIES: TrainCategory[] = [
  {
    slug: "vande-bharat",
    typeCode: "Vande Bharat",
    name: "Vande Bharat Express",
    description: "India's semi-high-speed chair-car trains, running on the busiest intercity routes.",
  },
  {
    slug: "rajdhani",
    typeCode: "Raj",
    name: "Rajdhani Express",
    description: "Premium fully air-conditioned trains connecting state capitals to New Delhi.",
  },
  {
    slug: "shatabdi",
    typeCode: "Shtb",
    name: "Shatabdi Express",
    description: "Same-day return, fully air-conditioned intercity trains.",
  },
  {
    slug: "jan-shatabdi",
    typeCode: "JShtb",
    name: "Jan Shatabdi Express",
    description: "A more affordable, part-AC version of the Shatabdi Express.",
  },
  {
    slug: "duronto",
    typeCode: "Drnt",
    name: "Duronto Express",
    description: "Non-stop, point-to-point trains between major cities.",
  },
  {
    slug: "garib-rath",
    typeCode: "GR",
    name: "Garib Rath Express",
    description: "Budget fully air-conditioned trains, priced closer to standard 3A/CC fares.",
  },
];

export function getTrainCategory(slug: string): TrainCategory | undefined {
  return TRAIN_CATEGORIES.find((c) => c.slug === slug);
}
