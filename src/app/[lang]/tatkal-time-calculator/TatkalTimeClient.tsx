"use client";

import { useState } from "react";
import { tatkalOpenDateTime, formatDateLong, TATKAL_CLASS_GROUP } from "@/lib/irctc-rules";

const CLASSES = ["1A", "2A", "3A", "CC", "EC", "SL", "2S"];

export function TatkalTimeClient() {
  const [journeyDate, setJourneyDate] = useState("");
  const [travelClass, setTravelClass] = useState("3A");
  const [result, setResult] = useState<Date | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!journeyDate) return;
    const [y, m, d] = journeyDate.split("-").map(Number);
    const journey = new Date(y, m - 1, d);
    setResult(tatkalOpenDateTime(journey, travelClass));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="journey-date" className="block text-sm font-medium mb-1">Journey Date</label>
        <input
          id="journey-date"
          type="date"
          required
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <div>
        <label htmlFor="travel-class" className="block text-sm font-medium mb-1">Travel Class</label>
        <select
          id="travel-class"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CLASSES.map((c) => (
            <option key={c} value={c}>
              {c} — {TATKAL_CLASS_GROUP[c] === "ac" ? "AC (opens 10 AM)" : "Non-AC (opens 11 AM)"}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity"
      >
        Check Tatkal Time
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Tatkal booking opens</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {result.getHours()}:00 IST, {formatDateLong(result)}
          </p>
          <p className="text-sm text-muted mt-1">for class {travelClass}</p>
        </div>
      )}
    </form>
  );
}
