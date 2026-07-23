import "server-only";
import { getStationByCode, trainsBetween, type Train } from "@/lib/rail-data";

/**
 * Facts derived from the static open-government dataset, used to give each
 * train page real substance instead of a bare timings card.
 *
 * Everything here is computed from data we actually ship. We deliberately do
 * not invent route distance, average speed, punctuality or live status — the
 * dataset has no stop-level schedule, so any such number would be fabricated.
 */

/** "16:35" -> 995 minutes past midnight. Returns null for missing/odd values. */
export function parseHhMm(v: string | null | undefined): number | null {
  if (!v) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(v.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

export type DayPart = "earlyMorning" | "morning" | "afternoon" | "evening" | "night";

/** Coarse time-of-day bucket, used to describe departure/arrival in words. */
export function dayPart(mins: number | null): DayPart | null {
  if (mins == null) return null;
  const h = Math.floor(mins / 60);
  if (h < 5) return "night";
  if (h < 9) return "earlyMorning";
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 21) return "evening";
  return "night";
}

/** Great-circle km between two stations. Straight-line only — the rail route
 *  is always longer, so this is presented as "as the crow flies", never as
 *  route distance and never used to derive an average speed. */
export function straightLineKm(fromCode: string, toCode: string): number | null {
  const a = getStationByCode(fromCode);
  const b = getStationByCode(toCode);
  if (!a?.lat || !a?.lng || !b?.lat || !b?.lng) return null;
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  const km = 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
  return km < 1 ? null : Math.round(km);
}

export interface TrainFacts {
  durationMins: number | null;
  /** Whole midnights crossed between departure and scheduled arrival. */
  nights: number;
  isOvernight: boolean;
  depPart: DayPart | null;
  arrPart: DayPart | null;
  straightLineKm: number | null;
  hasAc: boolean;
  hasNonAc: boolean;
  hasSleeperBerths: boolean;
  /** Direct trains on the same source→destination pair, excluding this one. */
  sameRoute: Train[];
  /** The direct service running the opposite way, if the dataset has one. */
  returnTrain: Train | undefined;
}

const AC_CLASSES = new Set(["1A", "2A", "3A", "CC", "EC", "EA", "3E"]);
const BERTH_CLASSES = new Set(["1A", "2A", "3A", "3E", "SL"]);

export function trainFacts(train: Train): TrainFacts {
  const dep = parseHhMm(train.dep);
  const arr = parseHhMm(train.arr);
  const durationMins =
    train.durH != null ? train.durH * 60 + (train.durM ?? 0) : null;

  // Crossing a midnight is the only defensible definition of "overnight" from
  // departure time + duration alone.
  const nights =
    dep != null && durationMins != null ? Math.floor((dep + durationMins) / 1440) : 0;

  const classes = train.classes ?? [];
  const hasAc = classes.some((c) => AC_CLASSES.has(c));
  const hasNonAc = classes.some((c) => !AC_CLASSES.has(c));

  const sameRoute = trainsBetween(train.fromCode, train.toCode, 8).filter(
    (t) => t.number !== train.number
  );
  const returnTrain = trainsBetween(train.toCode, train.fromCode, 1)[0];

  return {
    durationMins,
    nights,
    isOvernight: nights > 0,
    depPart: dayPart(dep),
    arrPart: dayPart(arr),
    straightLineKm: straightLineKm(train.fromCode, train.toCode),
    hasAc,
    hasNonAc,
    hasSleeperBerths: classes.some((c) => BERTH_CLASSES.has(c)),
    sameRoute,
    returnTrain,
  };
}

/** "15h 35m" / "8h" / null */
export function formatDuration(mins: number | null): string | null {
  if (mins == null) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
