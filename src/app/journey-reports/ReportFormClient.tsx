"use client";

import { useState } from "react";

const CATEGORIES = [
  { key: "tatkal_experience", label: "Tatkal Experience" },
  { key: "delay", label: "Delay" },
  { key: "coach_comfort", label: "Coach Comfort" },
  { key: "waitlist_confirmation", label: "Waitlist Confirmation" },
  { key: "other", label: "Other" },
];

export function ReportFormClient() {
  const [category, setCategory] = useState("tatkal_experience");
  const [trainRef, setTrainRef] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [rating, setRating] = useState(4);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/journey-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          trainRef: trainRef || undefined,
          journeyDate: journeyDate || undefined,
          rating,
          body: body || undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("saved");
      setBody("");
      setTrainRef("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "saved") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-4 text-center text-sm">
        Thanks for sharing! Your report is queued for moderation and will appear once approved.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-5">
      <div>
        <label htmlFor="jr-category" className="block text-sm font-medium mb-1">Category</label>
        <select
          id="jr-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        >
          {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="jr-train" className="block text-sm font-medium mb-1">Train Number (optional)</label>
          <input id="jr-train" type="text" value={trainRef} onChange={(e) => setTrainRef(e.target.value)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base" />
        </div>
        <div>
          <label htmlFor="jr-date" className="block text-sm font-medium mb-1">Journey Date (optional)</label>
          <input id="jr-date" type="date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base" />
        </div>
      </div>
      <div>
        <label htmlFor="jr-rating" className="block text-sm font-medium mb-1">Rating: {rating}/5</label>
        <input id="jr-rating" type="range" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full" />
      </div>
      <div>
        <label htmlFor="jr-body" className="block text-sm font-medium mb-1">Your Report</label>
        <textarea
          id="jr-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="What happened? e.g. 'GNWL 24 confirmed 6 hours before departure.'"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === "saving" ? "Submitting…" : "Submit Report"}
      </button>
      {status === "error" && <p className="text-sm text-danger text-center">Something went wrong — please try again.</p>}
      <p className="text-xs text-muted text-center">Submissions are moderated before appearing publicly. No login required.</p>
    </form>
  );
}
