"use client";

import { useState } from "react";
import { estimateFare, FARE_RATES, TRIP_COST_DAILY_ESTIMATES } from "@/lib/irctc-rules";

const CLASSES = Object.keys(FARE_RATES);
const TIERS = Object.keys(TRIP_COST_DAILY_ESTIMATES) as (keyof typeof TRIP_COST_DAILY_ESTIMATES)[];
const TIER_LABELS: Record<string, string> = { budget: "Budget", midRange: "Mid-Range", comfort: "Comfort" };

export function TripCostClient() {
  const [travelClass, setTravelClass] = useState("3A");
  const [distance, setDistance] = useState("");
  const [nights, setNights] = useState("2");
  const [tier, setTier] = useState<keyof typeof TRIP_COST_DAILY_ESTIMATES>("midRange");
  const [passengers, setPassengers] = useState("2");
  const [result, setResult] = useState<{ fare: number; stay: number; total: number } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const km = Number(distance);
    const n = Number(nights);
    const pax = Number(passengers);
    if (!km || !pax) return;
    const fareResult = estimateFare({ travelClass, distanceKm: km, isSuperfast: true, passengers: pax * 2 }); // round trip
    if (!fareResult) return;
    const daily = TRIP_COST_DAILY_ESTIMATES[tier];
    const stay = (daily.hotel + (daily.food + daily.localTransport) * pax) * n;
    setResult({ fare: fareResult.total, stay: Math.round(stay), total: fareResult.total + Math.round(stay) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="tc-class" className="block text-sm font-medium mb-1">Travel Class</label>
          <select id="tc-class" value={travelClass} onChange={(e) => setTravelClass(e.target.value)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base">
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tc-distance" className="block text-sm font-medium mb-1">Distance (km, one-way)</label>
          <input id="tc-distance" type="number" min={1} required value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="tc-nights" className="block text-sm font-medium mb-1">Nights at destination</label>
          <input id="tc-nights" type="number" min={0} value={nights} onChange={(e) => setNights(e.target.value)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base" />
        </div>
        <div>
          <label htmlFor="tc-pax" className="block text-sm font-medium mb-1">Travellers</label>
          <input id="tc-pax" type="number" min={1} value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base" />
        </div>
      </div>
      <div>
        <label htmlFor="tc-tier" className="block text-sm font-medium mb-1">Comfort Level</label>
        <select id="tc-tier" value={tier} onChange={(e) => setTier(e.target.value as typeof tier)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base">
          {TIERS.map((t) => <option key={t} value={t}>{TIER_LABELS[t]}</option>)}
        </select>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Estimate Trip Cost
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Estimated total trip cost</p>
          <p className="text-2xl font-bold text-primary mt-1">₹{result.total}</p>
          <p className="text-xs text-muted mt-2">Round-trip fare ≈ ₹{result.fare} · Stay, food &amp; local transport ≈ ₹{result.stay}</p>
        </div>
      )}
    </form>
  );
}
