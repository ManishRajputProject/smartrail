import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { TatkalTimeClient } from "./TatkalTimeClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";
import { calcFaqs } from "@/i18n/calculator-faq-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "tatkal-time-calculator", {
    title: "IRCTC Tatkal Booking Time Calculator — AC & Non-AC",
    description: "Find the exact Tatkal booking opening time for your journey and class. AC classes open at 10 AM IST, non-AC at 11 AM IST, one day before travel.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/tatkal-time-calculator",
  keywords: ["tatkal time", "tatkal booking time AC", "tatkal booking time sleeper", "IRCTC tatkal timing"],
    locale,
  });
}

const faqs = [
  {
    question: "What time does Tatkal booking open for AC classes?",
    answer: "Tatkal booking for AC classes (1A, 2A, 3A, CC, EC) opens at 10:00 AM IST, one day before the journey date.",
  },
  {
    question: "What time does Tatkal booking open for Sleeper class?",
    answer: "Tatkal booking for non-AC classes (Sleeper, Second Sitting) opens at 11:00 AM IST, one day before the journey date.",
  },
  {
    question: "Is Tatkal opening time based on the source station?",
    answer: "Yes — Tatkal opens one day before the journey date counted from the train's source station, the same as advance booking.",
  },
  {
    question: "Can Tatkal tickets be cancelled for a refund?",
    answer: "Confirmed Tatkal tickets are generally not eligible for a refund on cancellation, unlike regular confirmed tickets. Waitlisted Tatkal tickets that never confirm are refunded automatically.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "tatkal-time-calculator", {
    eyebrow: "Tatkal Time Calculator",
    title: "IRCTC Tatkal Booking Time Calculator",
    description: "Check exactly when Tatkal booking opens for your journey and class — AC classes open at 10 AM IST, non-AC at 11 AM IST, one day before travel.",
    badges: ["10 AM for AC classes", "11 AM for Non-AC", "Opens 1 day before travel"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Tatkal Time Calculator"}
      breadcrumbHref="/tatkal-time-calculator"
      description={page.description}
      badges={page.badges}
      faqs={calcFaqs(lang, "tatkal-time-calculator", faqs)}
      relatedTools={[
        { href: "/reminders", label: "Set a Tatkal Reminder", description: "Get pinged minutes before Tatkal opens." },
        { href: "/tatkal-charge-calculator", label: "Tatkal Charge Calculator", description: "Estimate the Tatkal surcharge for your class." },
        { href: "/booking-date-calculator", label: "Booking Date Calculator", description: "Check the 60-day advance booking window instead." },
        { href: "/waitlist-predictor", label: "WL Confirmation Outlook", description: "If you land on the Tatkal waitlist, see your odds." },
      ]}
      explainer={
        <>
          <h2 className="text-xl font-semibold mb-2">Why the exact minute matters</h2>
          <p className="text-muted leading-relaxed">
            High-demand Tatkal quotas on popular routes can sell out within a couple of minutes of opening.
            Being logged in with your passenger details pre-filled and payment method ready before the clock
            hits the opening second is the single biggest factor in getting a confirmed Tatkal seat. A
            reminder set a few minutes ahead of time is the simplest way to make sure you&apos;re not still
            logging in when the quota opens.
          </p>
        </>
      }
    >
      <TatkalTimeClient forms={dict.forms} locale={lang} datepicker={dict.datepicker} />
    </CalculatorShell>
  );
}
