"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PlanTicketDay } from "@/lib/plan-ticket";

type Filter = "all" | "open" | "opening-soon" | "holidays" | "weekends";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open Now" },
  { key: "opening-soon", label: "Opening Soon (7d)" },
  { key: "holidays", label: "Holidays" },
  { key: "weekends", label: "Weekends" },
];

export function PlanTicketClient({ days }: { days: PlanTicketDay[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(30);

  const filtered = useMemo(() => {
    return days.filter((d) => {
      if (filter === "open") return d.bookingOpen;
      if (filter === "opening-soon") return !d.bookingOpen && d.daysUntilOpen <= 7;
      if (filter === "holidays") return !!d.holiday;
      if (filter === "weekends") return d.isWeekend;
      return true;
    });
  }, [days, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => { setFilter(f.key); setVisible(30); }}
            className={`rounded-full px-3 py-1.5 text-sm border ${
              filter === f.key ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-surface-2"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted mb-3">Showing {Math.min(visible, filtered.length)} of {filtered.length} journey dates</p>

      <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
        {filtered.slice(0, visible).map((d) => {
          const dateObj = new Date(`${d.date}T00:00:00`);
          const label = dateObj.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
          return (
            <div key={d.date} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
              <div>
                <span className="font-medium">{label}</span>
                {d.holiday && <span className="ml-2 text-xs rounded-full bg-accent/15 text-accent-foreground px-2 py-0.5">{d.holiday.name}</span>}
                {d.isWeekend && <span className="ml-2 text-xs rounded-full bg-surface-2 px-2 py-0.5">Weekend</span>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {d.bookingOpen ? (
                  <span className="text-xs font-medium text-success">Open now</span>
                ) : (
                  <span className="text-xs text-muted">{d.daysUntilOpen === 1 ? "Opens tomorrow" : `Opens in ${d.daysUntilOpen}d`}</span>
                )}
                <Link href="/reminders" className="text-xs font-medium text-primary underline underline-offset-2">Remind</Link>
              </div>
            </div>
          );
        })}
      </div>

      {visible < filtered.length && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + 30)}
          className="mt-4 w-full rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-surface-2"
        >
          Show more dates ({visible}/{filtered.length})
        </button>
      )}
    </div>
  );
}
