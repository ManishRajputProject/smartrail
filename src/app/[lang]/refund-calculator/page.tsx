import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RefundClient } from "./RefundClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
  title: "IRCTC Train Ticket Refund Calculator",
  description:
    "Estimate your refund after cancelling a confirmed IRCTC ticket, based on how far ahead of departure you cancel.",
  path: "/refund-calculator",
  keywords: ["IRCTC refund calculator", "train cancellation charges", "ticket cancellation refund"],
    locale,
  });
}

const faqs = [
  {
    question: "How are IRCTC cancellation charges calculated?",
    answer:
      "Charges scale with how close to departure you cancel: a flat per-class charge beyond 48 hours before departure, roughly 25% of fare between 48 and 12 hours, roughly 50% between 12 and 4 hours, and no refund inside 4 hours.",
  },
  {
    question: "Do waitlisted tickets follow the same rule?",
    answer:
      "No — a waitlisted ticket that never confirms is auto-cancelled at chart preparation and refunded automatically, minus a small clerkage charge.",
  },
  {
    question: "Is this refund estimate exact?",
    answer:
      "It's a same-day estimate based on standard slabs. Indian Railways revises fare and refund rules periodically — always check the exact amount on the IRCTC cancellation screen before confirming.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "refund-calculator", {
    eyebrow: "Refund Calculator",
    title: "IRCTC Train Ticket Refund Calculator",
    description: "Estimate your refund after cancelling a confirmed ticket, based on standard cancellation-charge slabs. Always verify the exact amount on IRCTC before cancelling.",
    badges: ["Slab-based estimate", "Class-aware", "Instant result"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Refund Calculator"}
      breadcrumbHref="/refund-calculator"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/booking-date-calculator", label: "Booking Date Calculator", description: "Check when to book instead of cancelling and rebooking." },
        { href: "/chart-preparation-time", label: "Chart Preparation Time", description: "Know your real cancellation deadline before the chart locks in." },
        { href: "/waitlist-predictor", label: "WL Confirmation Outlook", description: "Still waitlisted? Check your odds before you cancel." },
      ]}
      explainer={
        <>
          <h2 className="text-xl font-semibold mb-2">Cancellation charge slabs</h2>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>More than 48 hours before departure — flat charge per class, rest refunded.</li>
            <li>Between 48 and 12 hours before departure — about 25% of fare deducted.</li>
            <li>Between 12 and 4 hours before departure — about 50% of fare deducted.</li>
            <li>Less than 4 hours before departure — no refund on a confirmed ticket.</li>
          </ul>
        </>
      }
    >
      <RefundClient forms={dict.forms} />
    </CalculatorShell>
  );
}
