import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FareClient } from "./FareClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
  title: "Indian Railways Train Fare Calculator (Estimate)",
  description:
    "Ballpark estimate of Indian Railways train fare by class and distance, including superfast charge, reservation charge and senior citizen concession.",
  path: "/fare-calculator",
  keywords: ["train fare calculator", "IRCTC fare estimate", "railway fare by distance"],
    locale,
  });
}

const faqs = [
  {
    question: "Is this fare calculator exact?",
    answer:
      "No — it's a ballpark estimate built from approximate per-km rates. There is no live IRCTC fare feed behind it. Actual fare depends on the specific train, quota and any dynamic pricing, and can differ from this estimate. Always confirm the exact fare on IRCTC before booking.",
  },
  {
    question: "Does this include GST?",
    answer: "An approximate GST is added for AC classes, matching the general pattern of how AC fares are taxed.",
  },
  {
    question: "How much is the senior citizen concession?",
    answer: "This estimator applies a representative discount for eligible senior citizens. The exact concession depends on the current scheme and your eligibility — verify on IRCTC.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "fare-calculator", {
    eyebrow: "Fare Calculator",
    title: "Train Fare Calculator",
    description: "A ballpark fare estimate by class and distance — useful for budgeting, not a substitute for the exact fare shown at checkout on IRCTC.",
    badges: ["Class-wise rates", "Superfast & GST factored in", "Illustrative estimate only"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Fare Calculator"}
      breadcrumbHref="/fare-calculator"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/group-fare-calculator", label: "Group Fare Calculator", description: "Estimate total fare for multiple passengers." },
        { href: "/tatkal-charge-calculator", label: "Tatkal Charge Calculator", description: "Add the Tatkal surcharge on top of this estimate." },
        { href: "/trip-cost-estimator", label: "Trip Cost Estimator", description: "Estimate the whole trip, not just the fare." },
      ]}
    >
      <FareClient forms={dict.forms} />
    </CalculatorShell>
  );
}
