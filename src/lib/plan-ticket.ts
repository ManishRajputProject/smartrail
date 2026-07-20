import { addDays, startOfDay, ARP_DAYS, latestBookableJourneyDate } from "@/lib/irctc-rules";
import { holidayOn, toDateKey, type Holiday } from "@/lib/holidays";

export interface PlanTicketDay {
  date: string; // YYYY-MM-DD
  isWeekend: boolean;
  holiday?: Holiday;
  bookingOpen: boolean;
  daysUntilOpen: number; // 0 if already open
}

export function buildPlanTicketDays(from: Date, count = 120): PlanTicketDay[] {
  const start = startOfDay(from);
  const latestBookable = latestBookableJourneyDate(from);
  const days: PlanTicketDay[] = [];

  for (let i = 0; i < count; i++) {
    const date = addDays(start, i);
    const key = toDateKey(date);
    const dow = date.getDay();
    const bookingOpen = date <= latestBookable;
    const daysUntilOpen = bookingOpen ? 0 : Math.round((date.getTime() - latestBookable.getTime()) / 86400000);

    days.push({
      date: key,
      isWeekend: dow === 0 || dow === 6,
      holiday: holidayOn(key),
      bookingOpen,
      daysUntilOpen,
    });
  }
  return days;
}

export { ARP_DAYS };
