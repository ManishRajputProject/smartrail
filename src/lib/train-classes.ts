export interface TrainClass {
  code: string;
  name: string;
  ac: boolean;
  berth: string;
  layout: string;
  fareHint: string; // relative, not a quote
  amenities: string[];
  notIncluded: string[];
  bestFor: string;
}

/** Static, encyclopedic reference on Indian Railways travel classes. */
export const TRAIN_CLASSES: TrainClass[] = [
  {
    code: "1A",
    name: "First AC",
    ac: true,
    berth: "Lower / Upper (lockable cabins)",
    layout: "2-berth coupé & 4-berth cabins with doors",
    fareHint: "Highest",
    amenities: ["Air-conditioned", "Lockable private cabins", "Bedding & towels provided", "Most privacy", "Meals often included on premium trains"],
    notIncluded: ["Cheapest option — far from it", "Not on every train"],
    bestFor: "Long overnight journeys where privacy and comfort matter most.",
  },
  {
    code: "2A",
    name: "Second AC",
    ac: true,
    berth: "Lower / Upper + Side Lower / Side Upper",
    layout: "Open bays of 6 + side berths, with privacy curtains",
    fareHint: "High",
    amenities: ["Air-conditioned", "Privacy curtains per bay", "Bedding provided", "Reading light per berth", "Fewer passengers per coach"],
    notIncluded: ["Private cabins (that's 1A)"],
    bestFor: "Comfortable overnight travel with a good balance of privacy and cost.",
  },
  {
    code: "3A",
    name: "Third AC",
    ac: true,
    berth: "Lower / Middle / Upper + Side Lower / Side Upper",
    layout: "Open bays of 8 (3 tiers) + side berths",
    fareHint: "Medium-high",
    amenities: ["Air-conditioned", "Bedding provided", "Reading light per berth", "Most popular AC class"],
    notIncluded: ["Privacy curtains on most coaches"],
    bestFor: "The value sweet spot for overnight AC travel.",
  },
  {
    code: "SL",
    name: "Sleeper Class",
    ac: false,
    berth: "Lower / Middle / Upper + Side Lower / Side Upper",
    layout: "Open bays of 8 (3 tiers) + side berths, windows open",
    fareHint: "Low",
    amenities: ["Most economical sleeper option", "Open windows & natural air", "Widely available on almost every train"],
    notIncluded: ["Air-conditioning", "Bedding"],
    bestFor: "Budget overnight travel, especially in cooler months.",
  },
  {
    code: "CC",
    name: "AC Chair Car",
    ac: true,
    berth: "Reclining seats (no berths)",
    layout: "Aircraft-style rows, 3+2 seating",
    fareHint: "Medium (day trains)",
    amenities: ["Air-conditioned", "Reclining seats", "Meals often served on Shatabdi-type trains"],
    notIncluded: ["Sleeping berths", "Overnight comfort"],
    bestFor: "Daytime intercity journeys on fast trains.",
  },
  {
    code: "EC",
    name: "Executive Chair Car",
    ac: true,
    berth: "Wide reclining seats (no berths)",
    layout: "Spacious 2+2 seating",
    fareHint: "High (day trains)",
    amenities: ["Air-conditioned", "Extra-wide reclining seats", "More legroom", "Premium day-train comfort"],
    notIncluded: ["Sleeping berths"],
    bestFor: "Premium daytime travel on Shatabdi / Vande Bharat-type trains.",
  },
  {
    code: "2S",
    name: "Second Sitting",
    ac: false,
    berth: "Upright seats (no berths)",
    layout: "3+3 bench-style seating, windows open",
    fareHint: "Lowest",
    amenities: ["Cheapest reserved option", "Open windows", "Fine for short day trips"],
    notIncluded: ["Air-conditioning", "Reclining seats", "Berths"],
    bestFor: "Short, budget daytime journeys.",
  },
];
