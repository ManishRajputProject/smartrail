"use client";

import type { Dictionary } from "@/i18n/dictionary";

import { useState } from "react";
import { CANCELLATION_SLABS, hoursBetween } from "@/lib/irctc-rules";
import { DatePicker, todayISO } from "@/components/DatePicker";

const CLASSES = ["2S", "SL", "CC", "3A", "2A", "EC", "1A"];

export function RefundClient({
  forms,
  locale,
  datepicker,
}: {
  forms: Dictionary["forms"];
  locale: string;
  datepicker: Dictionary["datepicker"];
}) {
  const [travelClass, setTravelClass] = useState("3A");
  const [fare, setFare] = useState("");
  const [departure, setDeparture] = useState("");
  const [result, setResult] = useState<{ label: string; deduction: number; refund: number } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fareNum = Number(fare);
    if (!fareNum || fareNum <= 0 || !departure) return;

    const hoursLeft = hoursBetween(new Date(), new Date(departure));
    const slab =
      CANCELLATION_SLABS.find((s) => hoursLeft >= s.minHoursBefore) ??
      CANCELLATION_SLABS[CANCELLATION_SLABS.length - 1];

    let deduction = 0;
    if (slab.kind === "flat") {
      deduction = slab.flatByClass?.[travelClass] ?? 60;
    } else if (slab.kind === "percent-of-fare") {
      deduction = Math.round(fareNum * (slab.percent ?? 0));
    } else {
      deduction = fareNum;
    }
    deduction = Math.min(deduction, fareNum);

    setResult({ label: slab.label, deduction, refund: fareNum - deduction });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rf-class" className="block text-sm font-medium mb-1">{forms.travelClass}</label>
        <select
          id="rf-class"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="rf-fare" className="block text-sm font-medium mb-1">{forms.ticketFare}</label>
        <input
          id="rf-fare"
          type="number"
          min={1}
          required
          value={fare}
          onChange={(e) => setFare(e.target.value)}
          placeholder="e.g. 950"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <div>
        <label htmlFor="rf-departure" className="block text-sm font-medium mb-1">{forms.departureDateTime}</label>
        <DatePicker
          id="rf-departure"
          value={departure}
          onChange={setDeparture}
          locale={locale}
          t={datepicker}
          withTime
          required
        />
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">{forms.estimateRefund}</button>

      {result && (
        <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted">{result.label}</p>
          <p className="text-2xl font-bold text-primary mt-1">₹{result.refund} refund</p>
          <p className="text-sm text-muted mt-1">{forms.cancellationCharge}: ₹{result.deduction}</p>
        </div>
      )}
    </form>
  );
}
