/**
 * One-off transform: converts the datameet/railways schedules dump
 * (data.gov.in mirror, Government Open Data License — India) into a compact
 * per-train halt list the app loads server-side.
 *
 * The source lists every point a train passes, including stations it runs
 * through without stopping (e.g. 12951 Mumbai Rajdhani has 202 rows but only
 * 6 places you can actually board). We keep only real commercial halts:
 * origin, terminus, and any stop with a dwell time greater than zero. That is
 * both far smaller (25% of rows) and the only version that is honest to show
 * a traveller as "stops".
 *
 * Station names come from our own stations.json where possible, since the
 * schedule dump has inconsistent casing ("SURAT" vs "Mumbai Central").
 *
 * Usage: node --max-old-space-size=4096 scripts/process-schedules.mjs <scratchDir>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scratch = process.argv[2];
if (!scratch) {
  console.error("Pass the scratch dir containing schedules.json and trains-raw.json");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "src", "data", "schedules.json");

/** "19:37:00" -> "19:37"; "None"/empty -> null */
function hhmm(v) {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(v ?? ""));
  if (!m) return null;
  const h = String(Number(m[1])).padStart(2, "0");
  return `${h}:${m[2]}`;
}

function toMinutes(v) {
  const t = hhmm(v);
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function toTitle(s) {
  return String(s)
    .toLowerCase()
    .replace(/\b([a-z])/g, (c) => c.toUpperCase())
    .replace(/\bJn\b/g, "Jn")
    .trim();
}

const stations = JSON.parse(readFileSync(join(root, "src", "data", "stations.json"), "utf8"));
const stationName = new Map(stations.map((s) => [s.code, s.name]));

const raw = JSON.parse(readFileSync(join(scratch, "schedules.json"), "utf8"));

/**
 * Route geometry, used to derive "km from origin" per stop.
 *
 * The source publishes a total `distance` per train (authoritative) and a
 * LineString whose vertices follow the route. Cumulative great-circle length
 * along that polyline, scaled so the final vertex equals the official total,
 * gives a per-stop distance. It is an approximation: the polyline cuts corners
 * on curved track, so intermediate stops drift a few percent (measured ~2%
 * typical, ~5% worst on spot checks). Values are therefore rounded to the
 * nearest 5 km and labelled approximate in the UI - the total is exact, the
 * per-stop figure is explicitly not.
 */
const geo = JSON.parse(readFileSync(join(scratch, "trains-raw.json"), "utf8"));
const routeByTrain = new Map();
for (const f of geo.features ?? []) {
  const num = String(f.properties?.number ?? "").trim();
  if (!num) continue;
  routeByTrain.set(num, {
    coords: f.geometry?.coordinates ?? [],
    total: Number(f.properties?.distance) || null,
  });
}

const EARTH_KM = 6371;
function greatCircle(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b[1] - a[1]);
  const dLng = rad(b[0] - a[0]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(s)));
}

/** Cumulative km at each polyline vertex, calibrated to the official total. */
function cumulativeKm(num) {
  const r = routeByTrain.get(num);
  if (!r || r.coords.length < 2 || !r.total) return null;
  const cum = [0];
  for (let i = 1; i < r.coords.length; i++) {
    cum.push(cum[i - 1] + greatCircle(r.coords[i - 1], r.coords[i]));
  }
  const raw = cum[cum.length - 1];
  if (!(raw > 0)) return null;
  const scale = r.total / raw;
  return { cum: cum.map((v) => v * scale), total: r.total };
}

const round5 = (v) => Math.round(v / 5) * 5;

// Group rows per train, preserving source order (the dump is route-ordered).
const byTrain = new Map();
for (const r of raw) {
  const num = String(r.train_number ?? "").trim();
  if (!num) continue;
  let list = byTrain.get(num);
  if (!list) byTrain.set(num, (list = []));
  list.push(r);
}

const out = {};
let keptStops = 0;
let droppedPassing = 0;
let withDistance = 0;
let withoutDistance = 0;

for (const [num, list] of byTrain) {
  // Distances are only emitted when the polyline has one vertex per schedule
  // row; otherwise the index mapping would silently attribute the wrong km to
  // a stop, which is worse than showing none.
  const route = cumulativeKm(num);
  const aligned = route && route.cum.length === list.length;
  if (aligned) withDistance++; else withoutDistance++;

  const stops = [];
  list.forEach((r, i) => {
    const isEnd = i === 0 || i === list.length - 1;
    const a = toMinutes(r.arrival);
    const d = toMinutes(r.departure);

    if (!isEnd) {
      if (a == null || d == null) {
        droppedPassing++;
        return;
      }
      let dwell = d - a;
      if (dwell < 0) dwell += 1440; // crosses midnight
      if (dwell <= 0) {
        droppedPassing++;
        return; // passes through without stopping
      }
    }

    const code = String(r.station_code ?? "").trim().toUpperCase();
    if (!code) return;

    stops.push([
      code,
      stationName.get(code) ?? toTitle(r.station_name ?? code),
      hhmm(r.arrival),
      hhmm(r.departure),
      Number(r.day) || 1,
      aligned ? round5(route.cum[i]) : null,
    ]);
    keptStops++;
  });

  if (stops.length >= 2) {
    out[num] = { d: aligned ? route.total : null, s: stops };
  }
}

writeFileSync(outFile, JSON.stringify(out));

const bytes = readFileSync(outFile).length;
console.log(`trains with schedules : ${Object.keys(out).length.toLocaleString()}`);
console.log(`halts kept            : ${keptStops.toLocaleString()}`);
console.log(`passing points dropped: ${droppedPassing.toLocaleString()}`);
console.log(`with per-stop distance: ${withDistance.toLocaleString()} trains`);
console.log(`without (unaligned)   : ${withoutDistance.toLocaleString()} trains`);
console.log(`output                : ${(bytes / 1024 / 1024).toFixed(2)} MB -> src/data/schedules.json`);
