import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RemindersClient } from "./RemindersClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "reminders", {
    title: "Train Booking Reminders — Tatkal & Advance Booking Alerts",
    description: "Free email and calendar reminders for Tatkal and 60-day advance booking windows, so you never miss the moment booking opens.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/reminders",
  keywords: ["tatkal reminder", "IRCTC booking reminder", "advance booking alert"],
    locale,
  });
}

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

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = localizePage(lang, "reminders", {
    eyebrow: "Booking Reminders",
    title: "Train Booking Reminders",
    description: "Free email and calendar alerts before your Tatkal or 60-day advance booking window opens, so you're never caught logging in after the rush starts.",
    badges: ["Email & calendar", "Free · No login", "Advance booking & Tatkal"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Reminders"}
      breadcrumbHref="/reminders"
      description={page.description}
      badges={page.badges}
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
