import "server-only";
import stationsData from "@/data/stations.json";
import trainsData from "@/data/trains.json";

/**
 * Server-only access to the open-government rail dataset (data.gov.in via the
 * datameet/railways mirror, Government Open Data License — India). These files
 * are ~2 MB combined and must never be imported into a Client Component — keep
 * all access behind Server Components / Route Handlers.
 *
 * This is a static reference snapshot, NOT a live feed: timings and routes can
 * change and should always be verified on IRCTC/NTES before travel.
 */

export interface Station {
  code: string;
  name: string;
  state: string;
  zone: string;
  lat: number | null;
  lng: number | null;
}

export interface Train {
  number: string;
  name: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  dep: string;
  arr: string;
  durH: number | null;
  durM: number | null;
  type: string;
  zone: string;
  classes: string[];
}

const STATIONS = stationsData as Station[];
const TRAINS = trainsData as Train[];

export function allStationsCount() {
  return STATIONS.length;
}
export function allTrainsCount() {
  return TRAINS.length;
}

export function searchStationsFull(query: string, limit = 40): Station[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts: Station[] = [];
  const includes: Station[] = [];
  for (const s of STATIONS) {
    const name = s.name.toLowerCase();
    const code = s.code.toLowerCase();
    if (code === q || name === q || name.startsWith(q) || code.startsWith(q)) starts.push(s);
    else if (name.includes(q) || code.includes(q)) includes.push(s);
    if (starts.length >= limit) break;
  }
  return [...starts, ...includes].slice(0, limit);
}

export function searchTrains(query: string, limit = 40): Train[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts: Train[] = [];
  const includes: Train[] = [];
  for (const t of TRAINS) {
    const name = t.name.toLowerCase();
    if (t.number === q || t.number.startsWith(q) || name.startsWith(q)) starts.push(t);
    else if (name.includes(q) || `${t.fromName} ${t.toName}`.toLowerCase().includes(q)) includes.push(t);
    if (starts.length >= limit) break;
  }
  return [...starts, ...includes].slice(0, limit);
}

export function getTrainByNumber(number: string): Train | undefined {
  return TRAINS.find((t) => t.number === number);
}

/** Direct source→destination matches only. We deliberately do NOT claim to
 *  find every train passing through two stations — that needs full stop-level
 *  schedule data we don't ship. Honest, narrow, and accurate. */
export function trainsBetween(fromCode: string, toCode: string, limit = 60): Train[] {
  const f = fromCode.trim().toUpperCase();
  const t = toCode.trim().toUpperCase();
  if (!f || !t) return [];
  return TRAINS.filter((tr) => tr.fromCode === f && tr.toCode === t).slice(0, limit);
}

/**
 * Trains complete enough to deserve their own indexable page: we need both
 * timings and a scheduled duration to render a real journey profile. Anything
 * missing those would be a thin page, so it stays reachable via search but is
 * kept out of the sitemap.
 */
export function sitemapTrains(): Train[] {
  return TRAINS.filter((t) => t.dep && t.arr && t.durH != null);
}

/**
 * A–Z browse index, keyed by the first letter of the train name (uppercased).
 * Trains whose name doesn't start with A–Z are bucketed under "#". Built once
 * and cached, since the browse pages are generated for every letter x locale.
 */
let LETTER_INDEX: Map<string, Train[]> | null = null;
function letterIndex(): Map<string, Train[]> {
  if (LETTER_INDEX) return LETTER_INDEX;
  const map = new Map<string, Train[]>();
  for (const t of TRAINS) {
    const first = (t.name.trim()[0] ?? "").toUpperCase();
    const key = /[A-Z]/.test(first) ? first : "#";
    const bucket = map.get(key);
    if (bucket) bucket.push(t);
    else map.set(key, [t]);
  }
  for (const bucket of map.values()) {
    bucket.sort((a, b) => a.name.localeCompare(b.name) || a.number.localeCompare(b.number));
  }
  LETTER_INDEX = map;
  return map;
}

/** Letters that actually have trains, in order, with counts — for the A–Z nav. */
export function trainIndexLetters(): { letter: string; count: number }[] {
  const map = letterIndex();
  return [...map.keys()]
    .sort((a, b) => (a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b)))
    .map((letter) => ({ letter, count: map.get(letter)!.length }));
}

/** All trains whose name starts with the given letter ("#" for non-alpha). */
export function trainsByLetter(letter: string): Train[] {
  return letterIndex().get(letter.toUpperCase()) ?? [];
}

/** Small curated set for landing-page grids (not the whole 5,000+). */
export function popularTrains(): Train[] {
  const wanted = ["12951", "12301", "12259", "12002", "12009", "12019", "12627", "12621", "12723", "22691"];
  return wanted.map((n) => getTrainByNumber(n)).filter((t): t is Train => Boolean(t));
}

export function getStationByCode(code: string): Station | undefined {
  const c = code.trim().toUpperCase();
  return STATIONS.find((s) => s.code === c);
}
