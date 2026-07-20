"use client";

import { useState } from "react";
import { LUGGAGE_FREE_ALLOWANCE_KG } from "@/lib/irctc-rules";

const CLASSES = Object.keys(LUGGAGE_FREE_ALLOWANCE_KG);

export function LuggageClient() {
  const [travelClass, setTravelClass] = useState("3A");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ free: number; excess: number; overLimit: boolean } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const kg = Number(weight);
    if (!kg || kg <= 0) return;
    const allowance = LUGGAGE_FREE_ALLOWANCE_KG[travelClass];
    const excess = Math.max(0, kg - allowance.free);
    setResult({ free: allowance.free, excess, overLimit: kg > allowance.maxWithCharge });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="lg-class" className="block text-sm font-medium mb-1">Travel Class</label>
        <select
          id="lg-class"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="lg-weight" className="block text-sm font-medium mb-1">Total Luggage Weight (kg)</label>
        <input
          id="lg-weight"
          type="number"
          min={1}
          required
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Check Luggage Allowance
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Free allowance for {travelClass}: {result.free} kg</p>
          {result.excess === 0 ? (
            <p className="text-lg font-bold text-success mt-1">Within free allowance</p>
          ) : (
            <p className="text-lg font-bold text-primary mt-1">{result.excess} kg over — excess charges apply</p>
          )}
          {result.overLimit && (
            <p className="text-sm text-danger mt-2">This exceeds the maximum permitted for {travelClass}, even with excess charges — you may need to book it as parcel luggage.</p>
          )}
        </div>
      )}
    </form>
  );
}
