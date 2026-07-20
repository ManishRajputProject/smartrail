import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RemindersClient } from "./RemindersClient";

export const metadata: Metadata = buildMetadata({
  title: "Train Booking Reminders — Tatkal & Advance Booking Alerts",
  description: "Free email and calendar reminders for Tatkal and 60-day advance booking windows, so you never miss the moment booking opens.",
  path: "/reminders",
  keywords: ["tatkal reminder", "IRCTC booking reminder", "advance booking alert"],
});

const faqs = [
  {
    question: "Are these reminders free?",
    answer: "Yes, completely free, with no login or app install required.",
  },
  {
    question: "When will I get the reminder?",
    answer: "About 15 minutes before your booking window opens, so you have time to log into IRCTC and get ready.",
  },
  {
    question: "Do you book the ticket for me?",
    answer: "No — this only reminds you. You still need to log into IRCTC yourself and complete the booking.",
  },
  {
    question: "Is WhatsApp reminder available?",
    answer: "Not yet — email and downloadable calendar reminders are available now, WhatsApp is planned for a future update.",
  },
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Booking Reminders"
      title="Train Booking Reminders"
      breadcrumbLabel="Reminders"
      breadcrumbHref="/reminders"
      description="Free email and calendar alerts before your Tatkal or 60-day advance booking window opens, so you're never caught logging in after the rush starts."
      badges={["Email & calendar", "Free · No login", "Advance booking & Tatkal"]}
      faqs={faqs}
      relatedTools={[
        { href: "/booking-date-calculator", label: "Booking Date Calculator", description: "Find your exact advance booking date first." },
        { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator", description: "Check the exact Tatkal opening time for your class." },
        { href: "/long-weekend-planner", label: "Long Weekend Planner", description: "Spot high-demand dates worth setting a reminder for." },
      ]}
    >
      <RemindersClient />
    </CalculatorShell>
  );
}
