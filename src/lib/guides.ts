export interface GuideSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "Booking" | "Tatkal" | "Waitlist" | "Cancellation" | "Chart" | "Quota";
  readMins: number;
  updated: string;
  sections: GuideSection[];
  relatedTool?: { href: string; label: string };
}

export const GUIDES: Guide[] = [
  {
    slug: "advance-reservation-period-explained",
    title: "What Is the 60-Day Advance Reservation Period (ARP)?",
    description:
      "How IRCTC's 60-day advance booking window works, when it opens each day, and what changed when it was cut down from 120 days.",
    category: "Booking",
    readMins: 5,
    updated: "2026-07-20",
    sections: [
      {
        paragraphs: [
          "Indian Railways lets you book a reserved ticket up to 60 days before your journey date, not counting the day of travel itself. This window is called the Advance Reservation Period, or ARP, and it opens at 08:00 IST on the ARP date.",
          "So if you're travelling on 30 September, the booking window for that date opens at 8 AM IST on 1 August — exactly 60 days earlier.",
        ],
      },
      {
        heading: "Why 60 days and not 120?",
        paragraphs: [
          "Until late 2024, Indian Railways allowed booking up to 120 days in advance. The window was shortened to 60 days to reduce the number of stale bookings, no-shows, and touting linked to very long booking horizons. If you see an old guide or calculator quoting a 120-day window, it's out of date.",
        ],
      },
      {
        heading: "What counts as the journey date?",
        paragraphs: [
          "The ARP is calculated from the train's departure date at its source station, not from the station where you're boarding. If you're boarding at an intermediate station a day after the train actually starts its journey, the booking window still opens based on the source-station departure date.",
        ],
      },
    ],
    relatedTool: { href: "/booking-date-calculator", label: "Booking Date Calculator" },
  },
  {
    slug: "tatkal-timing-ac-vs-non-ac",
    title: "Tatkal Booking Time: AC vs Non-AC Classes",
    description:
      "Tatkal opens at two different times depending on class — here's exactly when, and why timing to the second matters.",
    category: "Tatkal",
    readMins: 4,
    updated: "2026-07-20",
    sections: [
      {
        paragraphs: [
          "Tatkal booking opens exactly one day before the journey date, but the opening time depends on the class of travel.",
        ],
        list: [
          "AC classes (1A, 2A, 3A, Chair Car, Executive Chair) — Tatkal opens at 10:00 AM IST.",
          "Non-AC classes (Sleeper, Second Sitting) — Tatkal opens at 11:00 AM IST.",
        ],
      },
      {
        heading: "Why does it matter to the second?",
        paragraphs: [
          "High-demand Tatkal quotas on popular routes can sell out within a couple of minutes of opening. Being logged in, with your passenger details pre-filled and payment method ready, before the clock hits the opening second is the single biggest factor in whether you get a confirmed Tatkal seat.",
          "A reminder set for a few minutes before your class's opening time is the simplest way to make sure you're not still logging in when the quota opens.",
        ],
      },
    ],
    relatedTool: { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator" },
  },
  {
    slug: "cancellation-refund-rules",
    title: "IRCTC Ticket Cancellation Charges, Explained",
    description:
      "How much you get back when you cancel a confirmed ticket, broken down by how close to departure you cancel.",
    category: "Cancellation",
    readMins: 6,
    updated: "2026-07-20",
    sections: [
      {
        paragraphs: [
          "Cancellation charges on a confirmed ticket scale with how close to departure you cancel. The later you cancel, the more you lose.",
        ],
        list: [
          "More than 48 hours before departure — a flat cancellation charge per class is deducted, the rest is refunded.",
          "Between 48 and 12 hours before departure — roughly 25% of the fare is deducted as cancellation charge.",
          "Between 12 and 4 hours before departure — roughly 50% of the fare is deducted.",
          "Less than 4 hours before departure — no refund on a confirmed ticket.",
        ],
      },
      {
        heading: "RAC and waitlisted tickets",
        paragraphs: [
          "RAC and waitlisted tickets follow a different, generally more lenient, refund path than confirmed tickets, and a waitlisted ticket that never confirms by chart preparation is cancelled automatically with a refund (minus a small clerkage charge).",
        ],
      },
      {
        heading: "Rules change — verify before you rely on a number",
        paragraphs: [
          "Indian Railways revises fare and refund rules from time to time. Use the calculator for a same-day estimate, but always check the cancellation screen on IRCTC for the exact amount before you confirm.",
        ],
      },
    ],
    relatedTool: { href: "/refund-calculator", label: "Refund Calculator" },
  },
  {
    slug: "waiting-list-types-explained",
    title: "GNWL, RLWL, PQWL, TQWL — What Do They Mean?",
    description:
      "The waiting-list code on your ticket tells you a lot about your real confirmation odds. Here's what each one means.",
    category: "Waitlist",
    readMins: 6,
    updated: "2026-07-20",
    sections: [
      {
        paragraphs: [
          "When you book a waitlisted ticket, IRCTC assigns it to one of several waiting-list pools depending on where you're boarding and which quota you booked under. The pool matters more than the raw number — a GNWL/20 and a PQWL/20 have very different odds.",
        ],
        list: [
          "GNWL (General Waiting List) — for passengers boarding at or near the train's origin. Draws from the largest cancellation pool, generally the best odds.",
          "RLWL (Remote Location Waiting List) — for specific intermediate boarding stations. Only cancellations on your exact segment help.",
          "PQWL (Pooled Quota Waiting List) — a quota shared across several intermediate stations, clears more slowly than GNWL.",
          "RSWL (Road Side Waiting List) — a very small quota at smaller intermediate stations, historically the slowest to clear.",
          "TQWL (Tatkal Quota Waiting List) — waitlist within the Tatkal quota. Since Tatkal tickets are non-refundable, they're rarely cancelled, so TQWL confirms only occasionally.",
        ],
      },
      {
        heading: "What actually clears a waitlist",
        paragraphs: [
          "Waitlisted tickets confirm as confirmed passengers cancel. Chart preparation, usually a few hours before departure, is the cutoff — any ticket still waitlisted at that point is auto-cancelled and refunded. You cannot board on a waitlisted ticket.",
        ],
      },
    ],
    relatedTool: { href: "/waitlist-predictor", label: "WL Confirmation Outlook" },
  },
  {
    slug: "chart-preparation-time-explained",
    title: "When Is the Train Chart Prepared?",
    description:
      "Chart preparation is the moment your waitlisted ticket's fate is decided. Here's roughly when it happens.",
    category: "Chart",
    readMins: 4,
    updated: "2026-07-20",
    sections: [
      {
        paragraphs: [
          "The 'chart' is the final passenger list and berth allocation for a train. Once it's prepared, seat/berth assignments are locked in, and any ticket still on the waiting list is automatically cancelled and refunded.",
          "As a general rule, the first chart is prepared about 4 hours before the train's scheduled departure from its source station.",
        ],
      },
      {
        heading: "The early-morning exception",
        paragraphs: [
          "For trains scheduled to depart in the early morning (roughly midnight to 8 AM), preparing the chart 4 hours ahead would mean doing it in the middle of the night — so railways instead prepare the chart the previous evening, typically around 9 PM.",
          "A second, final chart is usually prepared closer to departure (around 30 minutes before) to account for any very last cancellations.",
        ],
      },
    ],
    relatedTool: { href: "/chart-preparation-time", label: "Chart Preparation Time Calculator" },
  },
  {
    slug: "railway-quota-types-guide",
    title: "Every Indian Railways Booking Quota, Explained",
    description:
      "General, Tatkal, Ladies, Senior Citizen, Defence and more — what each quota is for and who's eligible.",
    category: "Quota",
    readMins: 5,
    updated: "2026-07-20",
    sections: [
      {
        paragraphs: [
          "Indian Railways reserves seats across several distinct quotas, each meant for a different kind of traveller or situation. Booking under the right quota can meaningfully change your odds of getting a confirmed seat.",
        ],
      },
    ],
    relatedTool: { href: "/quota-selector", label: "Quota Selector" },
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
