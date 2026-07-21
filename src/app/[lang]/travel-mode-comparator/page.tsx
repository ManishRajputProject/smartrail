import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ModeComparatorClient } from "./ModeComparatorClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
  title: "Train vs Flight vs Bus — Cost & Time Comparator",
  description: "Compare rough travel time and cost across train, flight and bus for a given distance.",
  path: "/travel-mode-comparator",
  keywords: ["train vs flight vs bus", "travel mode comparison India", "cheapest way to travel India"],
    locale,
  });
}

const faqs = [
  {
    question: "How accurate are these numbers?",
    answer:
      "They're directional, not quotes — built from rough average speeds and per-km costs for each mode. Actual fares vary a lot by specific route, operator, class and how far ahead you book. Use this to compare modes at a glance, then check exact fares before deciding.",
  },
  {
    question: "Does the flight estimate include airport time?",
    answer: "Yes — a fixed overhead for check-in, security and boarding is added on top of flight time in the air.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = localizePage(lang, "travel-mode-comparator", {
    eyebrow: "Train vs Flight vs Bus",
    title: "Travel Mode Comparator",
    description: "A rough side-by-side of cost and time across train, flight and bus for your route distance — useful for a first-pass decision, not a fare quote.",
    badges: ["3 modes compared", "Directional estimate"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Travel Mode Comparator"}
      breadcrumbHref="/travel-mode-comparator"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/fare-calculator", label: "Train Fare Calculator", description: "Get a more detailed train fare estimate." },
        { href: "/trip-cost-estimator", label: "Trip Cost Estimator", description: "Budget the whole trip, not just transport." },
      ]}
    >
      <ModeComparatorClient />
    </CalculatorShell>
  );
}
