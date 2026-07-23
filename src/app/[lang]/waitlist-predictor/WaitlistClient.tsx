"use client";

import { useState } from "react";
import { estimateWlOutlook, WL_TYPE_INFO, WL_CLASS_CAPACITY_WEIGHT, daysBetween, type WlType, type OutlookBand } from "@/lib/irctc-rules";

const WL_TYPES = Object.keys(WL_TYPE_INFO) as WlType[];
const CLASSES = Object.keys(WL_CLASS_CAPACITY_WEIGHT);

const BAND_STYLES: Record<OutlookBand, string> = {
  "Very Likely": "text-success",
  Likely: "text-success",
  Uncertain: "text-accent-foreground",
  Unlikely: "text-danger",
  "Very Unlikely": "text-danger",
};

export function WaitlistClient() {
  const [wlNumber, setWlNumber] = useState("");
  const [wlType, setWlType] = useState<WlType>("GNWL");
  const [travelClass, setTravelClass] = useState("SL");
  const [journeyDate, setJourneyDate] = useState("");
  const [result, setResult] = useState<{ band: OutlookBand } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = Number(wlNumber);
    if (!num || num <= 0 || !journeyDate) return;
    const days = Math.max(0, daysBetween(new Date(), new Date(journeyDate)));
    const { band } = estimateWlOutlook({ wlNumber: num, wlType, travelClass, daysToDeparture: days });
    setResult({ band });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="wl-number" className="block text-sm font-medium mb-1">Current WL Number</label>
        <input
          id="wl-number"
          type="number"
          min={1}
          required
          value={wlNumber}
          onChange={(e) => setWlNumber(e.target.value)}
          placeholder="e.g. 15"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
        <p className="mt-1 text-xs text-muted">Use your latest status, not the original booking number.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="wl-type" className="block text-sm font-medium mb-1">Waitlist Type</label>
          <select
            id="wl-type"
            value={wlType}
            onChange={(e) => setWlType(e.target.value as WlType)}
            className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
          >
            {WL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="wl-class" className="block text-sm font-medium mb-1">Class</label>
          <select
            id="wl-class"
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
          >
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="wl-date" className="block text-sm font-medium mb-1">Journey Date</label>
        <input
          id="wl-date"
          type="date"
          required
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Check Outlook
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Confirmation Outlook</p>
          <p className={`text-2xl font-bold mt-1 ${BAND_STYLES[result.band]}`}>{result.band}</p>
          <p className="text-xs text-muted mt-2 max-w-sm mx-auto">{WL_TYPE_INFO[wlType].description}</p>
        </div>
      )}
    </form>
  );
}
