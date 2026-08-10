/**
 * Central source of truth for every IRCTC / Indian Railways rule used across
 * the calculators. Every constant is date-stamped with when it was last
 * checked against public rules. Re-verify all of these against the live
 * IRCTC rules before each production deploy — these are the kind of numbers
 * that get revised periodically without much notice.
 *
 * LAST_VERIFIED applies to the whole file unless a section overrides it.
 */

export const LAST_VERIFIED = "2026-07-20";

// ---------------------------------------------------------------------------
// Advance Reservation Period (ARP)
// ---------------------------------------------------------------------------

/** Days before the journey date that booking opens (journey day itself excluded). */
export const ARP_DAYS = 60;
/** Hour (IST, 24h) at which the ARP window opens on the opening date. */
export const ARP_OPEN_HOUR_IST = 8;

// ---------------------------------------------------------------------------
// Tatkal
// ---------------------------------------------------------------------------

export type TatkalClassGroup = "ac" | "non-ac";

/** Tatkal opens exactly 1 day before the journey date, from the source station. */
export const TATKAL_DAYS_BEFORE = 1;

export const TATKAL_OPEN_HOUR_IST: Record<TatkalClassGroup, number> = {
  ac: 10,
  "non-ac": 11,
};

export const TATKAL_CLASS_GROUP: Record<string, TatkalClassGroup> = {
  "1A": "ac",
  "2A": "ac",
  "3A": "ac",
  CC: "ac",
  EC: "ac",
  SL: "non-ac",
  "2S": "non-ac",
};

/**
 * Tatkal surcharge rules: percentage of base fare, bounded by a min/max flat
 * amount. 1A generally does not carry a Tatkal quota on most trains — kept
 * here for completeness with a null charge and a UI-level note.
 */
export const TATKAL_CHARGE: Record<
  string,
  { percent: number; min: number; max: number } | null
> = {
  "2S": { percent: 0.1, min: 10, max: 15 },
  SL: { percent: 0.1, min: 100, max: 200 },
  CC: { percent: 0.3, min: 125, max: 500 },
  "3A": { percent: 0.3, min: 300, max: 600 },
  "2A": { percent: 0.3, min: 400, max: 500 },
  EC: { percent: 0.3, min: 400, max: 500 },
  "1A": null,
};

// ---------------------------------------------------------------------------
// Cancellation / refund slabs (confirmed tickets)
// ---------------------------------------------------------------------------

export interface CancellationSlab {
  /** Cancel MORE than this many hours before departure to fall in this slab. */
  minHoursBefore: number;
  label: string;
  /** Flat charge per passenger by class, OR a percentage-of-fare rule. */
  kind: "flat" | "percent-of-fare" | "no-refund";
  flatByClass?: Record<string, number>;
  percent?: number;
}

/**
 * Standard confirmed-ticket cancellation charge slabs. Flat charges apply
 * outside 48h; inside 48h it becomes a percentage of fare (subject to the
 * flat charge as a floor), and inside 4h there is no refund on a confirmed
 * ticket. Verify against current IRCTC refund rules before launch.
 */
export const CANCELLATION_SLABS: CancellationSlab[] = [
  {
    minHoursBefore: 48,
    label: "More than 48 hours before departure",
    kind: "flat",
    flatByClass: {
      "2S": 30,
      SL: 60,
      CC: 60,
      "3A": 120,
      "2A": 120,
      EC: 120,
      "1A": 240,
    },
  },
  {
    minHoursBefore: 12,
    label: "Between 48 and 12 hours before departure",
    kind: "percent-of-fare",
    percent: 0.25,
  },
  {
    minHoursBefore: 4,
    label: "Between 12 and 4 hours before departure",
    kind: "percent-of-fare",
    percent: 0.5,
  },
  {
    minHoursBefore: 0,
    label: "Less than 4 hours before departure",
    kind: "no-refund",
  },
];

// ---------------------------------------------------------------------------
// Chart preparation
// ---------------------------------------------------------------------------

/** First chart is prepared this many hours before scheduled departure. */
export const CHART_HOURS_BEFORE_DEPARTURE = 4;
/** For trains departing in this early-morning window, the chart is instead
 *  prepared the previous evening. */
export const EARLY_MORNING_DEPARTURE_END_HOUR = 8; // 00:00–08:00
export const PREVIOUS_NIGHT_CHART_HOUR_IST = 21; // ~9 PM the day before
/** A second, final chart is typically prepared this many minutes before departure. */
export const SECOND_CHART_MINUTES_BEFORE = 30;

export interface ChartTimes {
  firstChart: Date;
  finalChart: Date;
  /** True if departure falls in the early-morning window, so the first chart
   *  moves to the previous evening instead of 4 hours before departure. */
  earlyMorning: boolean;
}

/** First and final chart preparation times for a given scheduled departure. */
export function computeChartTimes(departure: Date): ChartTimes {
  const earlyMorning = departure.getHours() < EARLY_MORNING_DEPARTURE_END_HOUR;
  const firstChart = earlyMorning
    ? (() => {
        const prevNight = new Date(departure);
        prevNight.setDate(prevNight.getDate() - 1);
        prevNight.setHours(PREVIOUS_NIGHT_CHART_HOUR_IST, 0, 0, 0);
        return prevNight;
      })()
    : new Date(departure.getTime() - CHART_HOURS_BEFORE_DEPARTURE * 60 * 60 * 1000);
  const finalChart = new Date(departure.getTime() - SECOND_CHART_MINUTES_BEFORE * 60 * 1000);
  return { firstChart, finalChart, earlyMorning };
}

// ---------------------------------------------------------------------------
// Waitlist
// ---------------------------------------------------------------------------

export type WlType = "GNWL" | "RLWL" | "PQWL" | "RSWL" | "TQWL";

export const WL_TYPE_INFO: Record<WlType, { label: string; description: string; baseWeight: number }> = {
  GNWL: {
    label: "General Waiting List",
    description:
      "Allotted to passengers boarding at or near the train's origin station. Draws from the largest cancellation pool — generally the best confirmation odds.",
    baseWeight: 1,
  },
  RLWL: {
    label: "Remote Location Waiting List",
    description:
      "For passengers boarding at specific intermediate stations. Only cancellations on the same boarding-to-destination segment help you.",
    baseWeight: 0.65,
  },
  PQWL: {
    label: "Pooled Quota Waiting List",
    description:
      "A quota shared across several intermediate stations. Clears more slowly than GNWL since it draws from a smaller, shared pool.",
    baseWeight: 0.45,
  },
  RSWL: {
    label: "Road Side Waiting List",
    description:
      "Allotted at smaller intermediate stations with a very small quota. Historically the slowest-clearing waitlist type.",
    baseWeight: 0.3,
  },
  TQWL: {
    label: "Tatkal Quota Waiting List",
    description:
      "Waitlist within the Tatkal quota itself. Tatkal bookings are rarely cancelled since they're non-refundable, so TQWL confirms only occasionally.",
    baseWeight: 0.25,
  },
};

/** Rough seat-capacity weighting by class — larger classes clear WL better. */
export const WL_CLASS_CAPACITY_WEIGHT: Record<string, number> = {
  SL: 1,
  "3A": 0.85,
  "2A": 0.6,
  CC: 0.75,
  "1A": 0.3,
  EC: 0.5,
  "2S": 0.9,
};

export type OutlookBand =
  | "Very Likely"
  | "Likely"
  | "Uncertain"
  | "Unlikely"
  | "Very Unlikely";

export interface WlOutlookInput {
  wlNumber: number;
  wlType: WlType;
  travelClass: string;
  daysToDeparture: number;
}

/**
 * Deterministic, transparent scoring — deliberately NOT a fake precision
 * percentage. Combines WL type, class capacity, current WL position, and
 * days remaining (more days = more time for cancellations to clear it).
 */
export function estimateWlOutlook({
  wlNumber,
  wlType,
  travelClass,
  daysToDeparture,
}: WlOutlookInput): { band: OutlookBand; score: number } {
  const typeWeight = WL_TYPE_INFO[wlType].baseWeight;
  const classWeight = WL_CLASS_CAPACITY_WEIGHT[travelClass] ?? 0.6;
  const positionPenalty = Math.min(1, wlNumber / 60); // higher WL# = worse
  const timeBonus = Math.min(1, daysToDeparture / 20); // more days = better

  const score =
    typeWeight * 0.4 + classWeight * 0.2 + (1 - positionPenalty) * 0.3 + timeBonus * 0.1;

  let band: OutlookBand;
  if (score >= 0.75) band = "Very Likely";
  else if (score >= 0.58) band = "Likely";
  else if (score >= 0.4) band = "Uncertain";
  else if (score >= 0.25) band = "Unlikely";
  else band = "Very Unlikely";

  return { band, score };
}

// ---------------------------------------------------------------------------
// Quota types
// ---------------------------------------------------------------------------

export interface QuotaInfo {
  code: string;
  name: string;
  description: string;
  who: string;
}

export const QUOTAS: QuotaInfo[] = [
  {
    code: "GN",
    name: "General Quota",
    description: "The largest seat pool, open to every passenger. Opens 60 days before the journey.",
    who: "All passengers",
  },
  {
    code: "TQ",
    name: "Tatkal Quota",
    description: "Last-minute booking 1 day before departure, at a surcharge. Non-refundable on cancellation.",
    who: "Anyone needing urgent, unplanned travel",
  },
  {
    code: "PT",
    name: "Premium Tatkal",
    description: "Dynamic-priced Tatkal available on select trains. No fixed quota size, no refund.",
    who: "Anyone willing to pay a variable premium for near-certain availability",
  },
  {
    code: "LD",
    name: "Senior Citizen / Lower Berth Quota",
    description: "Lower berths reserved for senior citizens (men 60+, women 58+), with a fare concession.",
    who: "Senior citizens",
  },
  {
    code: "LQ",
    name: "Ladies Quota",
    description: "Lower berths reserved for women travelling alone or in a group, in Sleeper and 3A.",
    who: "Women travelling alone or in an all-women group",
  },
  {
    code: "DF",
    name: "Defence Quota",
    description: "Reserved seats for serving Defence and Central Armed Police Force personnel.",
    who: "Active defence / CAPF personnel",
  },
  {
    code: "SS",
    name: "Students / Concession Quota",
    description: "Fare concession for students holding a valid institution concession certificate.",
    who: "Students with a bonafide certificate",
  },
  {
    code: "CK",
    name: "Current Booking",
    description: "Seats released shortly before departure at the originating station.",
    who: "Passengers physically at the originating station",
  },
  {
    code: "EQ",
    name: "Emergency Quota",
    description: "Allocated case-by-case by railway officials for genuine emergencies. Not bookable via IRCTC directly.",
    who: "Genuine emergencies, allocated by Railways",
  },
];

// ---------------------------------------------------------------------------
// Luggage allowance (free allowance by class, in kg)
// ---------------------------------------------------------------------------

export const LUGGAGE_FREE_ALLOWANCE_KG: Record<string, { free: number; marginal: number; maxWithCharge: number }> = {
  "1A": { free: 70, marginal: 15, maxWithCharge: 150 },
  "2A": { free: 50, marginal: 10, maxWithCharge: 100 },
  "3A": { free: 40, marginal: 10, maxWithCharge: 40 },
  CC: { free: 40, marginal: 10, maxWithCharge: 40 },
  SL: { free: 40, marginal: 10, maxWithCharge: 80 },
  "2S": { free: 35, marginal: 10, maxWithCharge: 70 },
};

// ---------------------------------------------------------------------------
// Fare estimate (ballpark only — no licensed fare/distance feed backs this)
// ---------------------------------------------------------------------------

export interface FareRateRule {
  perKm: number;
  reservationCharge: number;
  superfastCharge: number;
  minFare: number;
}

/**
 * Deliberately approximate per-km rates. There is no licensed IRCTC fare API
 * behind this — it's a ballpark estimator, and the UI must say so clearly.
 */
export const FARE_RATES: Record<string, FareRateRule> = {
  "2S": { perKm: 0.18, reservationCharge: 20, superfastCharge: 0, minFare: 30 },
  SL: { perKm: 0.32, reservationCharge: 20, superfastCharge: 30, minFare: 100 },
  "3A": { perKm: 0.9, reservationCharge: 40, superfastCharge: 45, minFare: 350 },
  CC: { perKm: 0.75, reservationCharge: 40, superfastCharge: 45, minFare: 300 },
  "2A": { perKm: 1.3, reservationCharge: 50, superfastCharge: 45, minFare: 550 },
  EC: { perKm: 1.8, reservationCharge: 50, superfastCharge: 75, minFare: 700 },
  "1A": { perKm: 2.2, reservationCharge: 60, superfastCharge: 75, minFare: 900 },
};

export const GST_RATE = 0.05; // applies to AC classes only, ballpark
export const SENIOR_CITIZEN_DISCOUNT = 0.4; // ~40% for eligible senior citizens (varies by class/scheme)

export function estimateFare({
  travelClass,
  distanceKm,
  isSuperfast,
  passengers = 1,
  seniorCitizen = false,
}: {
  travelClass: string;
  distanceKm: number;
  isSuperfast: boolean;
  passengers?: number;
  seniorCitizen?: boolean;
}) {
  const rate = FARE_RATES[travelClass];
  if (!rate || distanceKm <= 0) return null;

  let base = Math.max(rate.minFare, rate.perKm * distanceKm) + rate.reservationCharge;
  if (isSuperfast) base += rate.superfastCharge;

  const isAc = ["1A", "2A", "3A", CC_LABEL, "EC"].includes(travelClass) || travelClass === "CC";
  const gst = isAc ? base * GST_RATE : 0;

  let perPassenger = base + gst;
  if (seniorCitizen) perPassenger *= 1 - SENIOR_CITIZEN_DISCOUNT;

  return {
    perPassenger: Math.round(perPassenger),
    total: Math.round(perPassenger * passengers),
    breakdown: {
      base: Math.round(base - (isSuperfast ? rate.superfastCharge : 0) - rate.reservationCharge),
      reservationCharge: rate.reservationCharge,
      superfastCharge: isSuperfast ? rate.superfastCharge : 0,
      gst: Math.round(gst),
    },
  };
}
const CC_LABEL = "CC";

// ---------------------------------------------------------------------------
// Trip cost estimator (ballpark daily rates — clearly illustrative)
// ---------------------------------------------------------------------------

export const TRIP_COST_DAILY_ESTIMATES = {
  budget: { hotel: 900, food: 400, localTransport: 150 },
  midRange: { hotel: 2500, food: 900, localTransport: 350 },
  comfort: { hotel: 5500, food: 1800, localTransport: 700 },
};

// ---------------------------------------------------------------------------
// Mode comparator (very rough ballpark figures, for directional comparison only)
// ---------------------------------------------------------------------------

export const MODE_COMPARISON_RATES = {
  train: { speedKmph: 55, perKmCost: 1.1 },
  flight: { speedKmph: 500, perKmCost: 5.5, fixedOverheadMinutes: 150, fixedFare: 1800 },
  bus: { speedKmph: 45, perKmCost: 1.6 },
};

// ---------------------------------------------------------------------------
// Date/time helpers (IST is UTC+5:30, no DST)
// ---------------------------------------------------------------------------

export const IST_OFFSET_MINUTES = 5.5 * 60;

/** Current date/time as an IST-shifted Date object (safe for date-only math). */
export function nowIST(): Date {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + IST_OFFSET_MINUTES * 60000);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/** e.g. "Thu, 8 Aug, 4:30 PM" — date and clock time together. */
export function formatDateTime(date: Date): string {
  return date.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Parse an "HH:MM" clock time and return the next occurrence of that time —
 *  today if it hasn't passed yet, otherwise tomorrow. Used to give a train's
 *  chart-preparation section a concrete upcoming date rather than just an
 *  abstract "4 hours before departure" rule. */
export function nextOccurrence(hhmm: string, from: Date = nowIST()): Date | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!m) return null;
  const candidate = new Date(from);
  candidate.setHours(Number(m[1]), Number(m[2]), 0, 0);
  if (candidate.getTime() <= from.getTime()) candidate.setDate(candidate.getDate() + 1);
  return candidate;
}

/** The booking-opens date for a given journey date, per the ARP rule. */
export function bookingOpenDate(journeyDate: Date): Date {
  return addDays(startOfDay(journeyDate), -ARP_DAYS);
}

/** The last journey date that can be booked "today" (IST). */
export function latestBookableJourneyDate(today: Date = nowIST()): Date {
  return addDays(startOfDay(today), ARP_DAYS);
}

/** Tatkal opening datetime for a given journey date + class. */
export function tatkalOpenDateTime(journeyDate: Date, travelClass: string): Date {
  const openDay = addDays(startOfDay(journeyDate), -TATKAL_DAYS_BEFORE);
  const group = TATKAL_CLASS_GROUP[travelClass] ?? "non-ac";
  openDay.setHours(TATKAL_OPEN_HOUR_IST[group], 0, 0, 0);
  return openDay;
}

export function hoursBetween(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / (1000 * 60 * 60);
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round(hoursBetween(startOfDay(a), startOfDay(b)) / 24);
}
