import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BookingDateClient } from "./BookingDateClient";
import { JsonLd, howToJsonLd } from "@/components/JsonLd";
import { ARP_DAYS, ARP_OPEN_HOUR_IST } from "@/lib/irctc-rules";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "booking-date-calculator", {
    title: "IRCTC 60-Day Advance Booking Date Calculator",
    description: "Find the exact date IRCTC advance train ticket booking opens for your journey date. Booking opens 60 days before departure at 8 AM IST.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/booking-date-calculator",
    keywords: ["IRCTC booking date calculator", "60 day advance booking", "ARP calculator", "train booking date"],
    locale,
  });
}

const faqs = [
  {
    question: "When does IRCTC advance booking open?",
    answer: `IRCTC advance booking opens ${ARP_DAYS} days before the journey date (excluding the day of travel), at ${ARP_OPEN_HOUR_IST}:00 AM IST.`,
  },
  {
    question: "Was the advance booking window reduced from 120 days to 60 days?",
    answer:
      "Yes. Until late 2024, Indian Railways allowed booking up to 120 days ahead. The window was shortened to 60 days — any tool or guide quoting 120 days is now out of date.",
  },
  {
    question: "Is the booking date based on my boarding station or the train's source station?",
    answer:
      "It's based on the train's departure date from its source station, not your boarding station. If you board partway through the route, the window can open a day earlier or later than you'd expect from your own boarding date.",
  },
  {
    question: "Can I book a ticket for more than 60 days in the future?",
    answer:
      "No — IRCTC will not accept a booking for a journey date beyond the current 60-day advance reservation period.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "booking-date-calculator", {
    eyebrow: "Booking Date Calculator",
    title: "IRCTC 60-Day Advance Booking Date Calculator",
    description: `Find the exact date advance booking opens for your journey. Indian Railways opens booking ${ARP_DAYS} days before the journey date at ${ARP_OPEN_HOUR_IST}:00 AM IST.`,
    badges: ["Accurate as per IRCTC rules", `Booking opens at ${ARP_OPEN_HOUR_IST} AM IST`, "Instant result", "Free forever"],
  });

  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: "How to find your IRCTC advance booking date",
          description: "Calculate the exact date advance train ticket booking opens on IRCTC.",
          steps: [
            "Enter your planned journey date.",
            `Subtract ${ARP_DAYS} days to find the advance booking opening date.`,
            `Booking opens at ${ARP_OPEN_HOUR_IST}:00 AM IST on that date.`,
          ],
        })}
      />
      <CalculatorShell
        eyebrow={page.eyebrow}
        title={page.title}
        breadcrumbLabel={page.eyebrow ?? "Booking Date Calculator"}
        breadcrumbHref="/booking-date-calculator"
        description={page.description}
        badges={page.badges}
        faqs={faqs}
        relatedTools={[
          { href: "/reminders", label: "Set a Booking Reminder", description: "Free email & calendar alert before your window opens." },
          { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator", description: "Check the exact Tatkal opening time for your class." },
          { href: "/plan-ticket", label: "Plan Ticket Calendar", description: "See booking status across the next several months." },
          { href: "/refund-calculator", label: "Refund Calculator", description: "Estimate your refund if you need to cancel." },
        ]}
        explainer={
          <>
            <h2 className="text-xl font-semibold mb-2">How advance booking works</h2>
            <p className="text-muted leading-relaxed mb-3">
              IRCTC allows booking up to {ARP_DAYS} days in advance of the journey date (excluding the
              journey day itself). Booking opens at {ARP_OPEN_HOUR_IST}:00 AM IST on the opening date. For
              example, if your journey date is 30 August, the window opens exactly {ARP_DAYS} days earlier,
              at {ARP_OPEN_HOUR_IST} AM IST.
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-6">60 days, not 120 — what changed</h2>
            <p className="text-muted leading-relaxed">
              Indian Railways used to allow booking up to 120 days ahead. That window was cut to 60 days to
              reduce stale bookings and no-shows. If an old calculator or guide quotes 120 days, it&apos;s
              outdated — this tool uses the current 60-day rule.
            </p>
          </>
        }
      >
        <BookingDateClient forms={dict.forms} lang={lang} />
      </CalculatorShell>
    </>
  );
}
