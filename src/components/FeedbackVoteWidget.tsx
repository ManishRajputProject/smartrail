"use client";

import { useState } from "react";

const OPTIONS: { key: string; label: string }[] = [
  { key: "better_wl_predictor", label: "Better WL Predictor" },
  { key: "more_regional_languages", label: "More Regional Languages" },
  { key: "whatsapp_reminders", label: "WhatsApp Reminders" },
  { key: "mobile_app", label: "Mobile App" },
  { key: "fare_trend_analysis", label: "Fare Trend Analysis" },
  { key: "other", label: "Other" },
];

export function FeedbackVoteWidget() {
  const [voted, setVoted] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function vote(key: string) {
    if (voted || pending) return;
    setPending(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option: key }),
      });
      setVoted(key);
    } finally {
      setPending(false);
    }
  }

  if (voted) {
    return <p className="text-sm text-success">Thanks — your vote is in.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          type="button"
          disabled={pending}
          onClick={() => vote(o.key)}
          className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:bg-surface-2 disabled:opacity-60"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
