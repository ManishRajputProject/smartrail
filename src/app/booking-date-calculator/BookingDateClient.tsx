"use client";

import { useState } from "react";
import Link from "next/link";
import { bookingOpenDate, formatDateLong, ARP_DAYS, ARP_OPEN_HOUR_IST } from "@/lib/irctc-rules";

export function BookingDateClient() {
  const [journeyDate, setJourneyDate] = useState("");
  const [result, setResult] = useState<Date | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!journeyDate) return;
    const [y, m, d] = journeyDate.split("-").map(Number);
    const journey = new Date(y, m - 1, d);
    setResult(bookingOpenDate(journey));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="journey-date" className="block text-sm font-medium mb-1">
          Journey Date
        </label>
        <input
          id="journey-date"
          type="date"
          required
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
        <p className="mt-1 text-xs text-muted">
          Select your planned travel date. Booking opens {ARP_DAYS} days before.
        </p>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity"
      >
        Calculate Booking Date
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">Advance booking opens</p>
          <p className="text-2xl font-bold text-primary mt-1">{formatDateLong(result)}</p>
          <p className="text-sm text-muted mt-1">at {ARP_OPEN_HOUR_IST}:00 AM IST</p>
          <Link
            href="/reminders"
            className="inline-block mt-3 text-sm font-medium text-primary underline underline-offset-2"
          >
            Set a free reminder for this date →
          </Link>
        </div>
      )}
    </form>
  );
}
