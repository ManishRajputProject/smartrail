"use client";

import { useState } from "react";
import Link from "next/link";
import { bookingOpenDate, formatDateLong, ARP_DAYS, ARP_OPEN_HOUR_IST } from "@/lib/irctc-rules";
import { localePath, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionary";

export function BookingDateClient({
  forms,
  lang = DEFAULT_LOCALE,
}: {
  forms: Dictionary["forms"];
  lang?: Locale;
}) {
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
          {forms.journeyDate}
        </label>
        <input
          id="journey-date"
          type="date"
          required
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          className="input"
        />
        <p className="mt-1 text-xs text-muted">{forms.journeyDateHint}</p>
      </div>
      <button type="submit" className="btn-primary w-full">
        {forms.calcBookingDate}
      </button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary-soft p-4 text-center">
          <p className="text-sm text-muted">{forms.bookingOpensOn}</p>
          <p className="text-2xl font-bold text-primary mt-1">{formatDateLong(result)}</p>
          <p className="text-sm text-muted mt-1">{ARP_OPEN_HOUR_IST}:00 AM IST · {ARP_DAYS} days</p>
          <Link
            href={localePath(lang, "/reminders")}
            className="inline-block mt-3 text-sm font-medium text-primary underline underline-offset-2"
          >
            {forms.setFreeReminder} →
          </Link>
        </div>
      )}
    </form>
  );
}
