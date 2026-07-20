"use client";

import { useState } from "react";
import {
  CHART_HOURS_BEFORE_DEPARTURE,
  EARLY_MORNING_DEPARTURE_END_HOUR,
  PREVIOUS_NIGHT_CHART_HOUR_IST,
} from "@/lib/irctc-rules";

export function ChartPrepClient() {
  const [departure, setDeparture] = useState("");
  const [result, setResult] = useState<{ text: string; note: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!departure) return;
    const dep = new Date(departure);
    const hour = dep.getHours();

    if (hour < EARLY_MORNING_DEPARTURE_END_HOUR) {
      const prevNight = new Date(dep);
      prevNight.setDate(prevNight.getDate() - 1);
      prevNight.setHours(PREVIOUS_NIGHT_CHART_HOUR_IST, 0, 0, 0);
      setResult({
        text: prevNight.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }),
        note: "Early-morning departure — chart is typically prepared the previous evening instead of 4 hours ahead.",
      });
    } else {
      const chartTime = new Date(dep.getTime() - CHART_HOURS_BEFORE_DEPARTURE * 60 * 60 * 1000);
      setResult({
        text: chartTime.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }),
        note: `Roughly ${CHART_HOURS_BEFORE_DEPARTURE} hours before scheduled departure.`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cp-departure" className="block text-sm font-medium mb-1">Scheduled Departure Date &amp; Time</label>
        <input
          id="cp-departure"
          type="datetime-local"
          required
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
        <p className="mt-1 text-xs text-muted">Use the train&apos;s scheduled departure from its source station.</p>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
        Check Chart Time
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Estimated chart preparation time</p>
          <p className="text-2xl font-bold text-primary mt-1">{result.text}</p>
          <p className="text-sm text-muted mt-1">{result.note}</p>
        </div>
      )}
    </form>
  );
}
