import { ARP_DAYS, ARP_OPEN_HOUR_IST } from "@/lib/irctc-rules";

export interface FaqCategory {
  id: string;
  title: string;
  items: { question: string; answer: string }[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "booking-dates",
    title: "Booking Dates",
    items: [
      {
        question: "How many days in advance can I book a train ticket in India?",
        answer: `You can book an IRCTC train ticket up to ${ARP_DAYS} days before your journey date (not counting the journey day itself). Booking opens at ${ARP_OPEN_HOUR_IST}:00 AM IST on that date.`,
      },
      {
        question: "What is the Advance Reservation Period (ARP)?",
        answer: `ARP is the official name for the ${ARP_DAYS}-day advance booking window Indian Railways allows for reserved tickets.`,
      },
      {
        question: "Can I book a ticket for more than 60 days in advance?",
        answer: "No — IRCTC will not accept a booking for a journey date beyond the current advance reservation period.",
      },
      {
        question: "Is IRCTC booking available 24 hours a day?",
        answer: "Yes, the booking system itself is generally available around the clock, though there can be short scheduled maintenance windows, typically overnight.",
      },
    ],
  },
  {
    id: "tatkal",
    title: "Tatkal",
    items: [
      {
        question: "What time does Tatkal booking start?",
        answer: "AC classes open at 10:00 AM IST and non-AC classes at 11:00 AM IST, both exactly one day before the journey date.",
      },
      {
        question: "What is the Tatkal charge?",
        answer: "A percentage of the base fare, bounded by a minimum and maximum that varies by class — use the Tatkal Charge Calculator for an estimate.",
      },
      {
        question: "Can Tatkal tickets be cancelled for a refund?",
        answer: "Confirmed Tatkal tickets are generally non-refundable on cancellation. Waitlisted Tatkal tickets that never confirm are refunded automatically.",
      },
    ],
  },
  {
    id: "cancellation-refunds",
    title: "Cancellation & Refunds",
    items: [
      {
        question: "What are the standard cancellation charges?",
        answer: "Charges scale with how close to departure you cancel — a flat charge beyond 48 hours, about 25% of fare between 48–12 hours, about 50% between 12–4 hours, and no refund inside 4 hours.",
      },
      {
        question: "What is a TDR and when do I need to file one?",
        answer: "A Ticket Deposit Receipt (TDR) is filed when you're unable to travel on a confirmed ticket after chart preparation, or in cases like train cancellation — it's a separate process from a normal online cancellation.",
      },
      {
        question: "Can I get a refund on a waitlisted ticket?",
        answer: "A waitlisted ticket that never confirms is auto-cancelled at chart preparation and refunded automatically, minus a small clerkage charge.",
      },
    ],
  },
  {
    id: "waiting-list",
    title: "Waiting List",
    items: [
      {
        question: "What does GNWL, RLWL, PQWL and TQWL mean?",
        answer: "They're different waitlist pools — GNWL (general, best odds), RLWL (remote-location, segment-specific), PQWL (pooled quota, slower), and TQWL (Tatkal quota, rarely clears). See the Waitlist Types guide for details.",
      },
      {
        question: "What is chart preparation time and why does it matter?",
        answer: "It's when the final passenger list is locked in, usually about 4 hours before departure. Any ticket still waitlisted at that point is auto-cancelled and refunded.",
      },
    ],
  },
  {
    id: "counter-prs",
    title: "Counter & PRS",
    items: [
      {
        question: "What are PRS counter timings at railway stations?",
        answer: "Passenger Reservation System counters at major stations are generally open through the day, though exact hours vary by station — check with your local station.",
      },
      {
        question: "How many tickets can I book per month on IRCTC?",
        answer: "There are monthly booking limits per user ID that depend on whether the account is Aadhaar-linked — check your account status on IRCTC for the exact limit that applies to you.",
      },
    ],
  },
  {
    id: "travel-day",
    title: "On the Day of Travel",
    items: [
      {
        question: "Do I need a printout of my e-ticket?",
        answer:
          "No — showing the e-ticket (or even the SMS with PNR details) on your phone is sufficient, along with the original photo ID of any one passenger on the PNR.",
      },
      {
        question: "Can I board at a later station than the one on my ticket?",
        answer:
          "Only if you've changed your boarding point in advance through IRCTC (allowed up to a cutoff before departure). Boarding later without changing it risks your seat being marked vacant and reallocated by the TTE.",
      },
      {
        question: "What happens if I miss my train?",
        answer:
          "Your ticket is not valid on the next train. For a confirmed ticket you may be able to claim a partial refund by filing a TDR within the allowed window, but you cannot simply board a later train with the same ticket.",
      },
      {
        question: "Can I upgrade my class after booking?",
        answer:
          "If you opted in to the auto-upgrade scheme at booking, the system may upgrade you free of charge at chart preparation when higher-class berths go unsold. There's no self-service paid upgrade after booking — the alternative is booking afresh in the higher class.",
      },
      {
        question: "How do I find my coach position on the platform?",
        answer:
          "After the chart is prepared, your coach number is fixed. Most stations display coach positions on electronic boards; coach-position apps and the station enquiry desk can also tell you where your coach will stop.",
      },
    ],
  },
];
