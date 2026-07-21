"use client";

import type { Dictionary } from "@/i18n/dictionary";

import { useState } from "react";
import { TATKAL_CHARGE } from "@/lib/irctc-rules";

const CLASSES = ["2S", "SL", "CC", "3A", "2A", "EC", "1A"];

export function TatkalChargeClient({ forms }: { forms: Dictionary["forms"] }) {
  const [travelClass, setTravelClass] = useState("3A");
  const [baseFare, setBaseFare] = useState("");
  const [result, setResult] = useState<{ charge: number; total: number } | null | "none">(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fare = Number(baseFare);
    if (!fare || fare <= 0) return;
    const rule = TATKAL_CHARGE[travelClass];
    if (!rule) {
      setResult("none");
      return;
    }
    const raw = fare * rule.percent;
    const charge = Math.min(rule.max, Math.max(rule.min, raw));
    setResult({ charge: Math.round(charge), total: Math.round(fare + charge) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="tc-class" className="block text-sm font-medium mb-1">{forms.travelClass}</label>
        <select
          id="tc-class"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="tc-fare" className="block text-sm font-medium mb-1">{forms.baseFare}</label>
        <input
          id="tc-fare"
          type="number"
          min={1}
          required
          value={baseFare}
          onChange={(e) => setBaseFare(e.target.value)}
          placeholder="e.g. 850"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
        <p className="mt-1 text-xs text-muted">Enter the normal (non-Tatkal) fare shown for this class.</p>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">{forms.estimateTatkalCharge}</button>

      {result === "none" && (
        <div className="mt-2 rounded-xl border border-border bg-surface p-4 text-center text-sm text-muted">
          1A generally does not carry a Tatkal quota on most trains.
        </div>
      )}
      {result && result !== "none" && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">{forms.estimatedSurcharge}</p>
          <p className="text-2xl font-bold text-primary mt-1">₹{result.charge}</p>
          <p className="text-sm text-muted mt-1">Estimated total fare: ₹{result.total}</p>
        </div>
      )}
    </form>
  );
}
