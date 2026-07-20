"use client";

import { useState } from "react";
import { MODE_COMPARISON_RATES } from "@/lib/irctc-rules";

interface ModeResult {
  mode: string;
  hours: number;
  cost: number;
}

export function ModeComparatorClient() {
  const [distance, setDistance] = useState("");
  const [results, setResults] = useState<ModeResult[] | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const km = Number(distance);
    if (!km || km <= 0) return;

    const { train, flight, bus } = MODE_COMPARISON_RATES;

    const trainHours = km / train.speedKmph;
    const trainCost = Math.round(km * train.perKmCost);

    const flightHours = km / flight.speedKmph + flight.fixedOverheadMinutes / 60;
    const flightCost = Math.round(flight.fixedFare + km * flight.perKmCost);

    const busHours = km / bus.speedKmph;
    const busCost = Math.round(km * bus.perKmCost);

    setResults([
      { mode: "Train", hours: trainHours, cost: trainCost },
      { mode: "Flight", hours: flightHours, cost: flightCost },
      { mode: "Bus", hours: busHours, cost: busCost },
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="mc-distance" className="block text-sm font-medium mb-1">Distance (km)</label>
        <input
          id="mc-distance"
          type="number"
          min={1}
          required
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="e.g. 1400"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Compare Modes
      </button>

      {results && (
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {results.map((r) => (
            <div key={r.mode} className="rounded-xl border border-border p-4 text-center">
              <p className="font-semibold">{r.mode}</p>
              <p className="text-xl font-bold text-primary mt-1">₹{r.cost}</p>
              <p className="text-xs text-muted mt-1">≈ {r.hours < 1 ? `${Math.round(r.hours * 60)} min` : `${r.hours.toFixed(1)} hrs`}</p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
