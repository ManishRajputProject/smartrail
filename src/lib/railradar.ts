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

/**
 * Best-effort shape for the "train details" endpoint. Modeled on a
 * same-class competitor's server-proxied response, since we don't yet have
 * a live key to confirm RailRadar's own /v1/trains/{number} response
 * against its documented shape. VERIFY this against a real response the
 * first time RAILRADAR_API_KEY is set, and adjust field names here if they
 * differ — everything below is defensive (falls back to null / static data)
 * specifically so a shape mismatch degrades safely instead of breaking pages.
 */
interface RailRadarStop {
  stop_sequence?: number;
  station_code: string;
  station_name: string;
  arrival_time: string | null;
  departure_time: string | null;
  day_count: number;
  distance?: number;
}

interface RailRadarTrainDetails {
  train_no: string;
  train_name: string;
  train_type?: string;
  source_station: string;
  source_name: string;
  destination_station: string;
  destination_name: string;
  stops: RailRadarStop[];
}

function apiKey(): string | null {
  const key = process.env.RAILRADAR_API_KEY;
  return key && key.trim() ? key.trim() : null;
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bJn\b/i, "Jn")
    .replace(/\bJunction\b/i, "Junction");
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
    if (!envelope.success || !envelope.data?.stops?.length) return null;

    const d = envelope.data;
    const stops: LiveStop[] = d.stops.map((s) => ({
      code: s.station_code,
      name: titleCase(s.station_name),
      arrival: s.arrival_time,
      departure: s.departure_time,
      day: s.day_count,
    }));
    const origin = stops[0];
    const destination = stops[stops.length - 1];
    if (!origin?.departure || !destination?.arrival) return null;

    const train: LiveTrain = {
      number: d.train_no,
      name: titleCase(d.train_name),
      fromCode: d.source_station,
      fromName: titleCase(d.source_name),
      toCode: d.destination_station,
      toName: titleCase(d.destination_name),
      dep: origin.departure,
      arr: destination.arrival,
      type: d.train_type ?? "",
    };

    return { train, stops };
  } catch {
    return null;
  }
}
