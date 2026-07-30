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
  /** Total scheduled journey time in minutes, straight from RailRadar. */
  durationMin: number | null;
  /**
   * Dash-separated coach codes in physical order, e.g.
   * "ENG-EOG-B1-B2-...-H1-A1-...-HCP" — straight from RailRadar, verbatim.
   * We deliberately do NOT expand individual codes (B1, H1, A1...) into full
   * class names or berth counts: those vary by rake/coach variant and we
   * have no verified source for them, so showing the raw code is the
   * honest option. Only the handful of universally-standard non-passenger
   * codes (engine, power car, pantry, general, brake van) get expanded.
   */
  coachPosition: string | null;
}

export interface LiveStop {
  code: string;
  name: string;
  arrival: string | null;
  departure: string | null;
  day: number;
  distanceKm: number | null;
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
    coachPosition?: string;
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

/** RailRadar's live-status timestamps are full ISO datetimes in IST
 *  (e.g. "2026-07-30T17:00:00+05:30"); the rest of the site works in
 *  "HH:MM" strings, so pull just the clock time out. */
function isoTimeOnly(iso: string): string {
  const m = /T(\d{2}:\d{2})/.exec(iso);
  return m ? m[1] : iso;
}

/** Shared fetch: auth header, Next cache TTL, and the fails-closed contract
 *  every RailRadar call in this module follows. Returns null on anything
 *  that isn't a clean, successful envelope — callers never see a partial
 *  or malformed response. */
async function fetchRailRadar<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  const key = apiKey();
  if (!key) return null;

  try {
    const res = await fetch(`${RAILRADAR_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;

    const envelope = (await res.json()) as RailRadarEnvelope<T>;
    if (!envelope.success || envelope.data == null) return null;
    return envelope.data;
  } catch {
    return null;
  }
}

export async function getLiveTrainDetails(
  trainNumber: string
): Promise<{ train: LiveTrain; stops: LiveStop[] } | null> {
  try {
    const d = await fetchRailRadar<RailRadarTrainDetails>(
      `/trains/${encodeURIComponent(trainNumber)}`,
      86400 // train timings change rarely — 24h cache
    );
    if (!d?.route?.length) return null;
    const stops: LiveStop[] = d.route
      .filter((s) => s.isHalt)
      .map((s) => ({
        code: s.station.code,
        name: titleCase(s.station.name),
        arrival: s.arrival ?? null,
        departure: s.departure ?? null,
        day: s.departureDay ?? s.arrivalDay ?? 1,
        distanceKm: s.distance ?? null,
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
      durationMin: d.train.duration ?? null,
      coachPosition: d.train.coachPosition ?? null,
    };

    return { train, stops };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Live status — GET /v1/trains/{number}/live
// ---------------------------------------------------------------------------

interface RailRadarLiveRouteStop {
  sequence: number;
  stationCode: string;
  stationName: string;
  isHalt: boolean;
  status: string;
  scheduledArrival?: string;
  scheduledDeparture?: string;
  actualArrival?: string;
  actualDeparture?: string;
  delayArrival?: number;
  delayDeparture?: number;
  platform?: string;
  distance: number;
}

interface RailRadarLiveStatus {
  status: string;
  isLive: boolean;
  lastUpdatedAt: string;
  delayMinutes?: number;
  currentLocation?: {
    stationCode: string;
    status: string;
    isHalt: boolean;
    segmentProgress?: number;
  };
  previousHalt?: { stationCode: string; stationName: string; distance: number };
  nextHalt?: { stationCode: string; stationName: string; distance: number };
  route: RailRadarLiveRouteStop[];
}

export interface LiveStopStatus {
  code: string;
  name: string;
  status: string;
  scheduledArrival: string | null;
  scheduledDeparture: string | null;
  actualArrival: string | null;
  actualDeparture: string | null;
  delayArrivalMin: number | null;
  delayDepartureMin: number | null;
  platform: string | null;
}

export interface LiveTrainStatus {
  status: string;
  isLive: boolean;
  lastUpdatedAt: string;
  delayMinutes: number;
  currentLocation: { stationCode: string; status: string; segmentProgress: number | null } | null;
  previousHalt: { code: string; name: string; distanceKm: number } | null;
  nextHalt: { code: string; name: string; distanceKm: number } | null;
  stops: LiveStopStatus[];
}

/** Live position/delay tracking. Cached only 60s — unlike scheduled
 *  timings, a train's actual position is exactly the kind of thing that
 *  must stay fresh, so this trades quota for currency deliberately. */
export async function getLiveTrainStatus(trainNumber: string): Promise<LiveTrainStatus | null> {
  try {
    const d = await fetchRailRadar<RailRadarLiveStatus>(
      `/trains/${encodeURIComponent(trainNumber)}/live`,
      60
    );
    if (!d?.route) return null;

    const stops: LiveStopStatus[] = d.route
      .filter((s) => s.isHalt)
      .map((s) => ({
        code: s.stationCode,
        name: titleCase(s.stationName),
        status: s.status,
        scheduledArrival: s.scheduledArrival ? isoTimeOnly(s.scheduledArrival) : null,
        scheduledDeparture: s.scheduledDeparture ? isoTimeOnly(s.scheduledDeparture) : null,
        actualArrival: s.actualArrival ? isoTimeOnly(s.actualArrival) : null,
        actualDeparture: s.actualDeparture ? isoTimeOnly(s.actualDeparture) : null,
        delayArrivalMin: s.delayArrival ?? null,
        delayDepartureMin: s.delayDeparture ?? null,
        platform: s.platform ?? null,
      }));

    return {
      status: d.status,
      isLive: d.isLive,
      lastUpdatedAt: d.lastUpdatedAt,
      delayMinutes: d.delayMinutes ?? 0,
      currentLocation: d.currentLocation
        ? {
            stationCode: d.currentLocation.stationCode,
            status: d.currentLocation.status,
            segmentProgress: d.currentLocation.segmentProgress ?? null,
          }
        : null,
      previousHalt: d.previousHalt
        ? { code: d.previousHalt.stationCode, name: titleCase(d.previousHalt.stationName), distanceKm: d.previousHalt.distance }
        : null,
      nextHalt: d.nextHalt
        ? { code: d.nextHalt.stationCode, name: titleCase(d.nextHalt.stationName), distanceKm: d.nextHalt.distance }
        : null,
      stops,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Trains between stations — GET /v1/trains/between/{from}/{to}
// ---------------------------------------------------------------------------

interface RailRadarBetweenResponse {
  trains: Array<{
    train: { number: string; name: string; type?: string };
    from: { code: string; name: string; city?: string; departure: string; day: number };
    to: { code: string; name: string; city?: string; arrival: string; day: number };
    distance: number;
    duration: number;
    totalHaltsBetween: number;
  }>;
}

export interface LiveTrainBetween {
  number: string;
  name: string;
  type: string;
  fromCode: string;
  fromName: string;
  dep: string;
  toCode: string;
  toName: string;
  arr: string;
  distanceKm: number;
  durationMin: number;
  haltsBetween: number;
}

/** Hourly cache — a schedule listing, not a live position, so it doesn't
 *  need 60s freshness, but should feel current across a browsing session. */
export async function getLiveTrainsBetween(
  fromCode: string,
  toCode: string
): Promise<LiveTrainBetween[] | null> {
  try {
    const d = await fetchRailRadar<RailRadarBetweenResponse>(
      `/trains/between/${encodeURIComponent(fromCode)}/${encodeURIComponent(toCode)}`,
      3600
    );
    if (!d?.trains) return null;
    return d.trains.map((t) => ({
      number: t.train.number,
      name: titleCase(t.train.name),
      type: t.train.type ?? "",
      fromCode: t.from.code,
      fromName: titleCase(t.from.name),
      dep: t.from.departure,
      toCode: t.to.code,
      toName: titleCase(t.to.name),
      arr: t.to.arrival,
      distanceKm: t.distance,
      durationMin: t.duration,
      haltsBetween: t.totalHaltsBetween,
    }));
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Station live board — GET /v1/stations/{code}/trains
// ---------------------------------------------------------------------------

interface RailRadarStationBoardResponse {
  station: { code: string; name: string; city?: string; lat?: number; lng?: number };
  trains: Array<{
    train: {
      number: string;
      name: string;
      type?: string;
      source: { code: string; name: string };
      destination: { code: string; name: string };
    };
    stop: { arrival: string | null; departure: string | null; stopType: string };
  }>;
}

export interface LiveStationInfo {
  code: string;
  name: string;
  city?: string;
  lat?: number;
  lng?: number;
}

export interface LiveStationTrain {
  number: string;
  name: string;
  type: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  arrival: string | null;
  departure: string | null;
  stopType: string;
}

/** 30-minute cache — a departures board should feel current without
 *  spending a request on every single visitor. */
export async function getLiveStationBoard(
  stationCode: string
): Promise<{ station: LiveStationInfo; trains: LiveStationTrain[] } | null> {
  try {
    const d = await fetchRailRadar<RailRadarStationBoardResponse>(
      `/stations/${encodeURIComponent(stationCode)}/trains`,
      1800
    );
    if (!d?.station) return null;
    return {
      station: {
        code: d.station.code,
        name: titleCase(d.station.name),
        city: d.station.city,
        lat: d.station.lat,
        lng: d.station.lng,
      },
      trains: (d.trains ?? []).map((t) => ({
        number: t.train.number,
        name: titleCase(t.train.name),
        type: t.train.type ?? "",
        fromCode: t.train.source.code,
        fromName: titleCase(t.train.source.name),
        toCode: t.train.destination.code,
        toName: titleCase(t.train.destination.name),
        arrival: t.stop.arrival,
        departure: t.stop.departure,
        stopType: t.stop.stopType,
      })),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Route geometry — GET /v1/trains/{number}/route
// ---------------------------------------------------------------------------

interface RailRadarRouteGeometryResponse {
  geojson: { geometry: { coordinates: [number, number][] } };
}

/** [lat, lng] pairs (flipped from GeoJSON's [lng, lat] to match what
 *  Leaflet expects, so callers never have to remember the convention). 7-day
 *  cache — a train's track geometry doesn't change day to day. */
export async function getLiveRouteGeometry(trainNumber: string): Promise<[number, number][] | null> {
  try {
    const d = await fetchRailRadar<RailRadarRouteGeometryResponse>(
      `/trains/${encodeURIComponent(trainNumber)}/route`,
      604800
    );
    const coords = d?.geojson?.geometry?.coordinates;
    if (!coords?.length) return null;
    return coords.map(([lng, lat]) => [lat, lng]);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Station lookup — GET /v1/lookup/stations
// ---------------------------------------------------------------------------

/**
 * IMPORTANT: RailRadar's own station codes don't always match our static
 * dataset's codes for the same physical station — e.g. Mumbai Central is
 * "BCT" in our 2016 snapshot but only indexed under "MMCT" in RailRadar's
 * live trains-between/station-board data (both codes resolve to the same
 * name in this lookup, but only one is actually wired to live results).
 * So: for any UI that feeds a station code into a live endpoint, search
 * *this* lookup, not the static station directory, or the code you get back
 * may silently return zero live results even though trains genuinely exist.
 */
export interface LiveStationLookup {
  code: string;
  name: string;
}

// In-memory, in addition to Next's own fetch cache: avoids re-parsing a
// ~230KB JSON payload on every keystroke of every autocomplete search within
// this server process's lifetime. Only a *successful* result is memoized —
// a transient failure must not poison every search until the next restart.
let stationLookupCache: Record<string, string> | null = null;

async function getLiveStationLookup(): Promise<Record<string, string> | null> {
  if (stationLookupCache) return stationLookupCache;
  const map = await fetchRailRadar<Record<string, string>>("/lookup/stations", 604800);
  if (map) stationLookupCache = map;
  return map;
}

export async function searchLiveStations(query: string, limit = 8): Promise<LiveStationLookup[]> {
  const map = await getLiveStationLookup();
  if (!map) return [];
  const q = query.trim().toUpperCase();
  if (!q) return [];

  const starts: LiveStationLookup[] = [];
  const includes: LiveStationLookup[] = [];
  for (const [code, name] of Object.entries(map)) {
    if (code === q || name.startsWith(q) || code.startsWith(q)) starts.push({ code, name: titleCase(name) });
    else if (name.includes(q)) includes.push({ code, name: titleCase(name) });
    if (starts.length >= limit) break;
  }
  return [...starts, ...includes].slice(0, limit);
}
