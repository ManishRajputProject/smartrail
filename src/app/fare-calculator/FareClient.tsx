"use client";

import { useState } from "react";
import { estimateFare, FARE_RATES } from "@/lib/irctc-rules";

const CLASSES = Object.keys(FARE_RATES);

export function FareClient() {
  const [travelClass, setTravelClass] = useState("3A");
  const [distance, setDistance] = useState("");
  const [superfast, setSuperfast] = useState(true);
  const [senior, setSenior] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof estimateFare>>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const km = Number(distance);
    if (!km || km <= 0) return;
    setResult(estimateFare({ travelClass, distanceKm: km, isSuperfast: superfast, seniorCitizen: senior }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fc-class" className="block text-sm font-medium mb-1">Travel Class</label>
        <select
          id="fc-class"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="fc-distance" className="block text-sm font-medium mb-1">Distance (km)</label>
        <input
          id="fc-distance"
          type="number"
          min={1}
          required
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="e.g. 1200"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
        <p className="mt-1 text-xs text-muted">Check the distance between stations on your ticket or IRCTC.</p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={superfast} onChange={(e) => setSuperfast(e.target.checked)} />
          Superfast train
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={senior} onChange={(e) => setSenior(e.target.checked)} />
          Senior citizen concession
        </label>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Estimate Fare
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Estimated fare</p>
          <p className="text-2xl font-bold text-primary mt-1">₹{result.perPassenger}</p>
          <p className="text-xs text-muted mt-2">
            Base ₹{result.breakdown.base} + reservation ₹{result.breakdown.reservationCharge}
            {result.breakdown.superfastCharge ? ` + superfast ₹${result.breakdown.superfastCharge}` : ""}
            {result.breakdown.gst ? ` + GST ₹${result.breakdown.gst}` : ""}
          </p>
        </div>
      )}
    </form>
  );
}
