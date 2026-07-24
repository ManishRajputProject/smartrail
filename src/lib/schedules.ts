import "server-only";
import schedulesData from "@/data/schedules.json";

/**
 * Server-only access to per-train halt schedules, derived from the
 * datameet/railways open-government dump (data.gov.in, Government Open Data
 * License — India). See scripts/process-schedules.mjs for the transform.
 *
 * IMPORTANT: these are commercial halts only — places a passenger can
 * actually board or alight. The source lists every point a train passes; we
 * deliberately drop run-throughs, because presenting them as "stops" would
 * mislead (12951 passes 202 points but stops at 6).
 *
 * This is a static reference snapshot, NOT a live feed. Timings change and
 * must be verified on IRCTC/NTES before travel.
 */

/** Compact on-disk tuple: [code, name, arrival, departure, day] */
type RawStop = [string, string, string | null, string | null, number];

export interface ScheduleStop {
  code: string;
  name: string;
  /** "HH:MM", or null at the originating station. */
  arrival: string | null;
  /** "HH:MM", or null at the terminating station. */
  departure: string | null;
  /** 1-based day of the journey this stop falls on. */
  day: number;
  /** Minutes the train waits here; null where it cannot be derived. */
  haltMinutes: number | null;
  /** Distance from the previous stop is not in the source data — see note in
   *  the page copy. Kept out of the type rather than faked. */
}

const SCHEDULES = schedulesData as unknown as Record<string, RawStop[]>;

function toMinutes(t: string | null): number | null {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

/** Minutes between arrival and departure, handling a midnight crossing. */
export function haltMinutes(arrival: string | null, departure: string | null): number | null {
  const a = toMinutes(arrival);
  const d = toMinutes(departure);
  if (a == null || d == null) return null;
  let diff = d - a;
  if (diff < 0) diff += 1440;
  return diff;
}

export function getSchedule(trainNumber: string): ScheduleStop[] {
  const raw = SCHEDULES[trainNumber];
  if (!raw) return [];
  return raw.map(([code, name, arrival, departure, day]) => ({
    code,
    name,
    arrival,
    departure,
    day,
    haltMinutes: haltMinutes(arrival, departure),
  }));
}

export function hasSchedule(trainNumber: string): boolean {
  return Array.isArray(SCHEDULES[trainNumber]);
}

export function scheduledTrainCount(): number {
  return Object.keys(SCHEDULES).length;
}

/** Total journey time in minutes, from first departure to last arrival,
 *  using the day counters so overnight runs are correct. */
export function journeyMinutes(stops: ScheduleStop[]): number | null {
  if (stops.length < 2) return null;
  const start = toMinutes(stops[0].departure ?? stops[0].arrival);
  const end = toMinutes(stops[stops.length - 1].arrival ?? stops[stops.length - 1].departure);
  if (start == null || end == null) return null;
  const days = (stops[stops.length - 1].day ?? 1) - (stops[0].day ?? 1);
  return days * 1440 + end - start;
}

/** "15h 50m" */
export function formatDurationMins(mins: number | null): string | null {
  if (mins == null || mins < 0) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
