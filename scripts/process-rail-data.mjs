/**
 * One-off transform: converts the datameet/railways open-government GeoJSON
 * dumps (data.gov.in, Government Open Data License — India) into compact,
 * bundle-friendly JSON the app loads server-side. Geometry/route coordinates
 * are dropped — we only keep the tabular facts the tools display.
 *
 * Usage: node scripts/process-rail-data.mjs <scratchDir>
 * Source files (stations.json, trains.json) must already be downloaded there.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scratch = process.argv[2];
if (!scratch) {
  console.error("Pass the scratch dir containing stations.json and trains.json");
  process.exit(1);
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
mkdirSync(outDir, { recursive: true });

// ---- Stations ----
const rawStations = JSON.parse(readFileSync(join(scratch, "stations.json"), "utf8"));
const stationFeatures = Array.isArray(rawStations) ? rawStations : rawStations.features ?? Object.values(rawStations);
const stations = stationFeatures
  .map((f) => {
    const p = f.properties ?? f;
    const coords = f.geometry?.coordinates ?? [];
    if (!p.code || !p.name) return null;
    return {
      code: p.code,
      name: toTitle(p.name),
      state: p.state ?? "",
      zone: p.zone ?? "",
      lat: round(coords[1]),
      lng: round(coords[0]),
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(join(outDir, "stations.json"), JSON.stringify(stations));
console.log(`stations: ${stations.length}`);

// ---- Trains ----
const rawTrains = JSON.parse(readFileSync(join(scratch, "trains.json"), "utf8"));
const trainFeatures = Array.isArray(rawTrains) ? rawTrains : rawTrains.features ?? Object.values(rawTrains);
const trains = trainFeatures
  .map((f) => {
    const p = f.properties ?? f;
    if (!p.number || !p.name) return null;
    const classes = [];
    if (p.first_class) classes.push("1A");
    if (p.second_ac) classes.push("2A");
    if (p.third_ac) classes.push("3A");
    if (p.chair_car) classes.push("CC");
    if (p.sleeper) classes.push("SL");
    return {
      number: String(p.number),
      name: toTitle(p.name),
      fromCode: p.from_station_code ?? "",
      fromName: toTitle(p.from_station_name ?? ""),
      toCode: p.to_station_code ?? "",
      toName: toTitle(p.to_station_name ?? ""),
      dep: (p.departure ?? "").slice(0, 5),
      arr: (p.arrival ?? "").slice(0, 5),
      durH: p.duration_h ?? null,
      durM: p.duration_m ?? null,
      type: p.type ?? "",
      zone: p.zone ?? "",
      classes,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.number.localeCompare(b.number));

writeFileSync(join(outDir, "trains.json"), JSON.stringify(trains));
console.log(`trains: ${trains.length}`);

function round(n) {
  return typeof n === "number" ? Math.round(n * 10000) / 10000 : null;
}

function toTitle(s) {
  if (!s) return "";
  return String(s)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAc\b/g, "AC")
    .replace(/\bSf\b/g, "SF")
    .replace(/\bJn\b/g, "Jn")
    .trim();
}
