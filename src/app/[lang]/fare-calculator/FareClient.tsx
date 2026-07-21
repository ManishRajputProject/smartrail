"use client";

import type { Dictionary } from "@/i18n/dictionary";

import { useState } from "react";
import { estimateFare, FARE_RATES } from "@/lib/irctc-rules";

const CLASSES = Object.keys(FARE_RATES);

export function FareClient({ forms }: { forms: Dictionary["forms"] }) {
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
        <label htmlFor="fc-class" className="block text-sm font-medium mb-1">{forms.travelClass}</label>
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
        <label htmlFor="fc-distance" className="block text-sm font-medium mb-1">{forms.distanceKm}</label>
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
          <input type="checkbox" checked={superfast} onChange={(e) => setSuperfast(e.target.checked)} />{forms.superfast}</label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={senior} onChange={(e) => setSenior(e.target.checked)} />{forms.seniorCitizen}</label>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">{forms.estimateFare}</button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">{forms.estimatedFare}</p>
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
