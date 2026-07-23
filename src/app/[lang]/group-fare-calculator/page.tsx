import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GroupFareClient } from "./GroupFareClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";
import { calcFaqs } from "@/i18n/calculator-faq-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "group-fare-calculator", {
    title: "Group / Multi-Passenger Train Fare Calculator",
    description: "Estimate the total fare for a group booking multiple passengers on one PNR.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/group-fare-calculator",
  keywords: ["group fare calculator", "multi passenger train fare", "family train booking cost"],
    locale,
  });
}

const faqs = [
  {
    question: "How many passengers can be on one PNR?",
    answer: "Up to 6 passengers (or a mix limited to 2 children under 5 without a separate berth) can generally be booked on a single PNR.",
  },
  {
    question: "Is the per-passenger fare the same for everyone in a group?",
    answer: "In this estimate, yes — actual IRCTC fares can vary slightly with berth allocation, concessions and quota, so treat this as a planning figure.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "group-fare-calculator", {
    eyebrow: "Group Fare Calculator",
    title: "Group Fare Calculator",
    description: "Estimate the total fare for your group travelling together on one PNR — useful for splitting costs or budgeting a family trip.",
    badges: ["Up to 6 passengers", "Instant estimate"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Group Fare Calculator"}
      breadcrumbHref="/group-fare-calculator"
      description={page.description}
      badges={page.badges}
      faqs={calcFaqs(lang, "group-fare-calculator", faqs)}
      relatedTools={[
        { href: "/fare-calculator", label: "Single Passenger Fare", description: "Estimate fare for one traveller." },
        { href: "/trip-cost-estimator", label: "Trip Cost Estimator", description: "Add hotel, food and local transport to the trip budget." },
      ]}
    >
      <GroupFareClient forms={dict.forms} />
    </CalculatorShell>
  );
}
