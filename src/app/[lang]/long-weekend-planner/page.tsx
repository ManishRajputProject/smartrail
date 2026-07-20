import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { computeLongWeekends } from "@/lib/holidays";
import { nowIST, bookingOpenDate, formatDateLong } from "@/lib/irctc-rules";

export const metadata: Metadata = buildMetadata({
  title: "Long Weekend Planner — Upcoming Indian Holidays",
  description: "See upcoming Indian long weekends and exactly when advance booking opens for each.",
  path: "/long-weekend-planner",
  keywords: ["long weekend India 2026", "long weekend calendar", "holiday planner train booking"],
});

export default function Page() {
  const longWeekends = computeLongWeekends(nowIST());

  return (
    <CalculatorShell
      eyebrow="Long Weekend Planner"
      title="Upcoming Long Weekends"
      breadcrumbLabel="Long Weekend Planner"
      breadcrumbHref="/long-weekend-planner"
      description="Every upcoming Indian holiday that lines up with a weekend, with the exact IRCTC booking-opens date so you can book before the rush."
      badges={["Holiday-aware", "Booking date included"]}
      relatedTools={[
        { href: "/plan-ticket", label: "Plan Ticket Calendar", description: "Day-by-day booking status for the next several months." },
        { href: "/reminders", label: "Set a Reminder", description: "Get pinged the moment booking opens for a long weekend date." },
      ]}
    >
      <div className="space-y-3">
        {longWeekends.length === 0 && (
          <p className="text-muted text-sm">No long weekends found in the current holiday data window.</p>
        )}
        {longWeekends.map((lw) => {
          const start = new Date(`${lw.start}T00:00:00`);
          const opens = bookingOpenDate(start);
          return (
            <div key={lw.holiday.date} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {lw.holiday.name}
                    {lw.holiday.approximate && <span className="text-xs text-muted font-normal"> (date may vary ±1 day by region)</span>}
                  </p>
                  <p className="text-sm text-muted">{lw.days}-day weekend: {lw.start} → {lw.end}</p>
                  {lw.bridgeTip && <p className="text-xs text-accent mt-1">{lw.bridgeTip}</p>}
                </div>
                <Link
                  href="/reminders"
                  className="shrink-0 rounded-lg border border-primary text-primary text-sm font-medium px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Remind me
                </Link>
              </div>
              <p className="text-xs text-muted mt-2">Booking for {lw.start} opens {formatDateLong(opens)}.</p>
            </div>
          );
        })}
      </div>
    </CalculatorShell>
  );
}
