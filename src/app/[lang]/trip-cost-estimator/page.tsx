import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { TripCostClient } from "./TripCostClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
  title: "Train Trip Cost Estimator — Fare + Stay + Food",
  description: "Estimate your total trip cost — round-trip train fare plus stay, food and local transport at your destination.",
  path: "/trip-cost-estimator",
  keywords: ["trip cost calculator India", "train travel budget estimator"],
    locale,
  });
}

const faqs = [
  {
    question: "What's included in this estimate?",
    answer: "Round-trip train fare (using our ballpark fare rates) plus a per-night stay, food and local-transport estimate based on your chosen comfort tier.",
  },
  {
    question: "How accurate is this?",
    answer: "It's a planning estimate, not a quote — actual hotel and food costs vary widely by city and season. Use it to compare comfort tiers and budget roughly, not as a firm number.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = localizePage(lang, "trip-cost-estimator", {
    eyebrow: "Trip Cost Estimator",
    title: "Trip Cost Estimator",
    description: "Budget your whole trip — round-trip fare plus stay, food and local transport — not just the ticket.",
    badges: ["Budget / Mid-range / Comfort tiers", "Round-trip fare included"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Trip Cost Estimator"}
      breadcrumbHref="/trip-cost-estimator"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/fare-calculator", label: "Fare Calculator", description: "Just the train fare, one-way." },
        { href: "/travel-mode-comparator", label: "Train vs Flight vs Bus", description: "Compare cost and time across modes." },
      ]}
    >
      <TripCostClient />
    </CalculatorShell>
  );
}
