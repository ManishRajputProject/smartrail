/**
 * National holidays are fixed-date and high-confidence. Festival dates
 * follow lunar/regional calendars and can shift by a day depending on the
 * almanac and region — cross-checked against public calendar sources as of
 * 2026-07-20, but flagged so the UI can show a "verify locally" note.
 */
export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  kind: "national" | "festival";
  approximate?: boolean;
}

export const HOLIDAYS: Holiday[] = [
  { date: "2026-08-15", name: "Independence Day", kind: "national" },
  { date: "2026-08-28", name: "Raksha Bandhan", kind: "festival", approximate: true },
  { date: "2026-09-04", name: "Janmashtami", kind: "festival", approximate: true },
  { date: "2026-09-14", name: "Ganesh Chaturthi", kind: "festival", approximate: true },
  { date: "2026-10-02", name: "Gandhi Jayanti", kind: "national" },
  { date: "2026-10-11", name: "Navratri Begins", kind: "festival", approximate: true },
  { date: "2026-10-20", name: "Dussehra", kind: "festival", approximate: true },
  { date: "2026-11-08", name: "Diwali", kind: "festival", approximate: true },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", kind: "festival", approximate: true },
  { date: "2026-12-25", name: "Christmas", kind: "national" },
  { date: "2027-01-26", name: "Republic Day", kind: "national" },
  { date: "2027-08-15", name: "Independence Day", kind: "national" },
  { date: "2027-08-25", name: "Janmashtami", kind: "festival", approximate: true },
  { date: "2027-09-04", name: "Ganesh Chaturthi", kind: "festival", approximate: true },
  { date: "2027-10-02", name: "Gandhi Jayanti", kind: "national" },
  { date: "2027-10-09", name: "Dussehra", kind: "festival", approximate: true },
  { date: "2027-10-29", name: "Diwali", kind: "festival", approximate: true },
];

export function holidayOn(dateStr: string): Holiday | undefined {
  return HOLIDAYS.find((h) => h.date === dateStr);
}

/**
 * Builds a YYYY-MM-DD key from LOCAL getters, not toISOString() (which is
 * UTC). All the date math in this codebase (nowIST, addDays, startOfDay)
 * relies on local getters producing IST wall-clock values, so the key
 * builder has to match — using toISOString here would silently shift dates
 * by a day whenever this runs on a non-UTC machine (e.g. local dev on a
 * machine set to IST).
 */
export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export interface LongWeekend {
  holiday: Holiday;
  start: string;
  end: string;
  days: number;
  bridgeTip?: string;
}

/**
 * Simple heuristic: a holiday landing on Fri/Mon creates a straightforward
 * 3-day weekend; one landing on Thu/Tue can become a 4-day weekend with a
 * single bridge day off. Doesn't attempt multi-holiday clusters.
 */
export function computeLongWeekends(fromDate: Date): LongWeekend[] {
  const results: LongWeekend[] = [];
  const startFrom = new Date(fromDate);
  startFrom.setHours(0, 0, 0, 0);

  for (const h of HOLIDAYS) {
    const d = new Date(`${h.date}T00:00:00`);
    if (d < startFrom) continue;
    const dow = d.getDay();

    if (dow === 5) {
      results.push({ holiday: h, start: toDateKey(d), end: toDateKey(shift(d, 2)), days: 3 });
    } else if (dow === 1) {
      results.push({ holiday: h, start: toDateKey(shift(d, -2)), end: toDateKey(d), days: 3 });
    } else if (dow === 4) {
      results.push({
        holiday: h,
        start: toDateKey(d),
        end: toDateKey(shift(d, 3)),
        days: 4,
        bridgeTip: "Take Friday off to stretch this into a 4-day weekend.",
      });
    } else if (dow === 2) {
      results.push({
        holiday: h,
        start: toDateKey(shift(d, -3)),
        end: toDateKey(d),
        days: 4,
        bridgeTip: "Take Monday off to stretch this into a 4-day weekend.",
      });
    }
  }
  return results;
}

function shift(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}
