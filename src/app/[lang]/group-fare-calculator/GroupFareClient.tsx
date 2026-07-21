"use client";

import type { Dictionary } from "@/i18n/dictionary";

import { useState } from "react";
import { estimateFare, FARE_RATES } from "@/lib/irctc-rules";

const CLASSES = Object.keys(FARE_RATES);

export function GroupFareClient({ forms }: { forms: Dictionary["forms"] }) {
  const [travelClass, setTravelClass] = useState("3A");
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("4");
  const [superfast, setSuperfast] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof estimateFare>>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const km = Number(distance);
    const pax = Number(passengers);
    if (!km || km <= 0 || !pax || pax <= 0) return;
    setResult(estimateFare({ travelClass, distanceKm: km, isSuperfast: superfast, passengers: pax }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="gf-class" className="block text-sm font-medium mb-1">{forms.travelClass}</label>
        <select
          id="gf-class"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="gf-distance" className="block text-sm font-medium mb-1">{forms.distanceKm}</label>
          <input
            id="gf-distance"
            type="number"
            min={1}
            required
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
          />
        </div>
        <div>
          <label htmlFor="gf-pax" className="block text-sm font-medium mb-1">{forms.passengers}</label>
          <input
            id="gf-pax"
            type="number"
            min={1}
            max={6}
            required
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
          />
          <p className="mt-1 text-xs text-muted">Max 6 on one PNR.</p>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={superfast} onChange={(e) => setSuperfast(e.target.checked)} />{forms.superfast}</label>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">{forms.estimateGroupFare}</button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Estimated total for {passengers} passengers</p>
          <p className="text-2xl font-bold text-primary mt-1">₹{result.total}</p>
          <p className="text-sm text-muted mt-1">≈ ₹{result.perPassenger} per passenger</p>
        </div>
      )}
    </form>
  );
}
