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
  console.error("Pass the scratch dir containing schedules.json");
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

for (const [num, list] of byTrain) {
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
    ]);
    keptStops++;
  });

  if (stops.length >= 2) out[num] = stops;
}

writeFileSync(outFile, JSON.stringify(out));

const bytes = readFileSync(outFile).length;
console.log(`trains with schedules : ${Object.keys(out).length.toLocaleString()}`);
console.log(`halts kept            : ${keptStops.toLocaleString()}`);
console.log(`passing points dropped: ${droppedPassing.toLocaleString()}`);
console.log(`output                : ${(bytes / 1024 / 1024).toFixed(2)} MB -> src/data/schedules.json`);
