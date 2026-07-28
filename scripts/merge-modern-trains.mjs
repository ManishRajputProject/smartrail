/**
 * Merge a supplement of modern trains (Vande Bharat etc.) onto the open-data
 * train base. Only factual, non-copyrightable fields are used: train number,
 * name, and origin/destination — compiled from public reference data because
 * the open-government dump predates these services (it is a 2016 snapshot).
 *
 * Each service has two numbers (up and down direction); we emit one train
 * entry per number, with endpoints swapped for the return direction. Timings
 * are left null — we do not have reliable public departure/arrival data for
 * these, and inventing it would be worse than omitting it.
 *
 * Usage: node scripts/merge-modern-trains.mjs <scratchDir>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scratch = process.argv[2];
if (!scratch) {
  console.error("Pass the scratch dir containing vb-extracted.json");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const trainsFile = join(root, "src", "data", "trains.json");

const trains = JSON.parse(readFileSync(trainsFile, "utf8"));
const stations = JSON.parse(readFileSync(join(root, "src", "data", "stations.json"), "utf8"));
const stationByCode = new Map(stations.map((s) => [s.code, s.name]));

const existing = new Set(trains.map((t) => t.number));

// Each modern category is compiled into its own extracted file; merge them all.
const SUPPLEMENT_FILES = [
  "vb-extracted.json",
  "hs-extracted.json",
  "ab-extracted.json",
  "tj-extracted.json",
];
const supplement = SUPPLEMENT_FILES.flatMap((f) => {
  try {
    return JSON.parse(readFileSync(join(scratch, f), "utf8"));
  } catch {
    return [];
  }
});

const CLASSES_BY_CATEGORY = {
  "Vande Bharat": ["EC", "CC"],
  Humsafar: ["3A"],
  "Amrit Bharat": ["SL", "2S"],
  Tejas: ["CC", "EC"],
};

let added = 0;
let skippedDup = 0;
let skippedBadCode = 0;
const unknownCodes = new Set();

for (const svc of supplement) {
  const { numbers, fromCode, toCode, category } = svc;
  if (!fromCode || !toCode) {
    skippedBadCode++;
    continue;
  }
  // Prefer our canonical station name; fall back to the reference name.
  const fromName = stationByCode.get(fromCode) ?? svc.fromName;
  const toName = stationByCode.get(toCode) ?? svc.toName;
  if (!stationByCode.has(fromCode)) unknownCodes.add(fromCode);
  if (!stationByCode.has(toCode)) unknownCodes.add(toCode);

  const base = `${fromName} - ${toName} ${category} Express`;
  const classes = CLASSES_BY_CATEGORY[category] ?? [];

  numbers.forEach((num, i) => {
    if (existing.has(num)) {
      skippedDup++;
      return;
    }
    // Second number is the return working: swap origin and destination.
    const reverse = i === 1;
    trains.push({
      number: num,
      name: base,
      fromCode: reverse ? toCode : fromCode,
      fromName: reverse ? toName : fromName,
      toCode: reverse ? fromCode : toCode,
      toName: reverse ? fromName : toName,
      dep: "",
      arr: "",
      durH: null,
      durM: null,
      type: category,
      zone: "",
      classes,
    });
    existing.add(num);
    added++;
  });
}

trains.sort((a, b) => a.number.localeCompare(b.number));
writeFileSync(trainsFile, JSON.stringify(trains));

console.log(`added        : ${added} train entries`);
console.log(`skipped dup  : ${skippedDup}`);
console.log(`skipped(code): ${skippedBadCode}`);
console.log(`total trains : ${trains.length}`);
if (unknownCodes.size) {
  console.log(`codes not in station directory: ${[...unknownCodes].join(", ")}`);
}
