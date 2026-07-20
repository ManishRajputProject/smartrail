"use client";

import { useState } from "react";

const BASE_ITEMS = [
  "Printed or digital ticket / PNR ready",
  "Valid photo ID matching the name on the ticket",
  "Phone charger / power bank",
  "Water bottle",
  "Light snacks for the journey",
];

const OVERNIGHT_ITEMS = ["Light blanket or shawl (AC coaches run cold)", "Neck pillow", "Eye mask & earplugs", "Slip-on footwear for the berth"];
const AC_ITEMS = ["A light jacket — AC coaches are often cold", "Bedroll if not provided (check your class entitlement)"];
const NON_AC_ITEMS = ["Hand fan or small towel", "Insect repellent"];
const SUMMER_ITEMS = ["Extra drinking water", "ORS / electrolyte sachets"];
const WINTER_ITEMS = ["Warm layers for platform waiting", "Thermos for hot water/tea"];
const LONG_JOURNEY_ITEMS = ["Entertainment downloaded offline (patchy signal en route)", "A second phone charging cable/adapter", "Basic first-aid items"];

export function ChecklistClient() {
  const [overnight, setOvernight] = useState(true);
  const [acClass, setAcClass] = useState(true);
  const [season, setSeason] = useState<"summer" | "winter" | "mild">("mild");
  const [longJourney, setLongJourney] = useState(true);
  const [items, setItems] = useState<string[] | null>(null);

  function generate(e: React.FormEvent) {
    e.preventDefault();
    let list = [...BASE_ITEMS];
    if (overnight) list = [...list, ...OVERNIGHT_ITEMS];
    list = [...list, ...(acClass ? AC_ITEMS : NON_AC_ITEMS)];
    if (season === "summer") list = [...list, ...SUMMER_ITEMS];
    if (season === "winter") list = [...list, ...WINTER_ITEMS];
    if (longJourney) list = [...list, ...LONG_JOURNEY_ITEMS];
    setItems(list);
  }

  return (
    <form onSubmit={generate} className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={overnight} onChange={(e) => setOvernight(e.target.checked)} />Overnight journey</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={acClass} onChange={(e) => setAcClass(e.target.checked)} />AC class</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={longJourney} onChange={(e) => setLongJourney(e.target.checked)} />12+ hour journey</label>
      </div>
      <div>
        <label htmlFor="jc-season" className="block text-sm font-medium mb-1">Season</label>
        <select
          id="jc-season"
          value={season}
          onChange={(e) => setSeason(e.target.value as typeof season)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          <option value="mild">Mild</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
        </select>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Generate Checklist
      </button>

      {items && (
        <ul className="mt-2 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
