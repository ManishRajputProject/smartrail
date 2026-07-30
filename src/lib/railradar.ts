import "server-only";

/**
 * Server-only client for the RailRadar API (https://railradar.in) — a live,
 * continuously-updated third-party Indian Railways data source. Used to
 * supplement our static 2016 data.gov.in snapshot (src/data/trains.json,
 * schedules.json), which drifts from real IRCTC timetables over time (see
 * the train 12951 fix and the follow-up spot-check batch).
 *
 * Every call is cached 24h via Next's fetch cache, so a given train number
 * is fetched from RailRadar at most once per day regardless of visitor
 * traffic — keeps us well inside any plan's daily quota.
 *
 * Fails closed: returns null on a missing key, network error, non-2xx,
 * rate limit, or an unexpected response shape. Callers must fall back to
 * the static dataset — this must never be the only path to a working page.
 */

const RAILRADAR_BASE_URL = "https://api.railradar.in/v1";

export interface LiveTrain {
  number: string;
  name: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  dep: string;
  arr: string;
  type: string;
}

export interface LiveStop {
  code: string;
  name: string;
  arrival: string | null;
  departure: string | null;
  day: number;
}

interface RailRadarEnvelope<T> {
  success: boolean;
  data: T;
  meta?: { traceId?: string; timestamp?: string; executionTime?: number; source?: string };
}

// The shapes below are confirmed against a live GET /v1/trains/{number}
// response (2026-07-30) — not a guess.
interface RailRadarStation {
  code: string;
  name: string;
  lat?: number;
  lng?: number;
}

interface RailRadarRouteStop {
  sequence: number;
  station: RailRadarStation;
  isHalt: boolean;
  platform?: string;
  speedToNextStationKmph?: number;
  arrival?: string;
  arrivalDay?: number;
  departure?: string;
  departureDay?: number;
  distance: number;
}

interface RailRadarTrainDetails {
  train: {
    number: string;
    name: string;
    type?: string;
    category?: string;
    source: RailRadarStation;
    destination: RailRadarStation;
    runDays?: string[];
    distance?: number;
    duration?: number;
    totalHalts?: number;
  };
  route: RailRadarRouteStop[];
}

function apiKey(): string | null {
  const key = process.env.RAILRADAR_API_KEY;
  return key && key.trim() ? key.trim() : null;
}

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getLiveTrainDetails(
  trainNumber: string
): Promise<{ train: LiveTrain; stops: LiveStop[] } | null> {
  const key = apiKey();
  if (!key) return null;

  try {
    const res = await fetch(`${RAILRADAR_BASE_URL}/trains/${encodeURIComponent(trainNumber)}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const envelope = (await res.json()) as RailRadarEnvelope<RailRadarTrainDetails>;
    if (!envelope.success || !envelope.data?.route?.length) return null;

    const d = envelope.data;
    const stops: LiveStop[] = d.route
      .filter((s) => s.isHalt)
      .map((s) => ({
        code: s.station.code,
        name: titleCase(s.station.name),
        arrival: s.arrival ?? null,
        departure: s.departure ?? null,
        day: s.departureDay ?? s.arrivalDay ?? 1,
      }));
    const origin = stops[0];
    const destination = stops[stops.length - 1];
    if (!origin?.departure || !destination?.arrival) return null;

    const train: LiveTrain = {
      number: d.train.number,
      name: titleCase(d.train.name),
      fromCode: d.train.source.code,
      fromName: titleCase(d.train.source.name),
      toCode: d.train.destination.code,
      toName: titleCase(d.train.destination.name),
      dep: origin.departure,
      arr: destination.arrival,
      type: d.train.type ?? "",
    };

    return { train, stops };
  } catch {
    return null;
  }
}
