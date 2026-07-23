import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { TatkalChargeClient } from "./TatkalChargeClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";
import { calcFaqs } from "@/i18n/calculator-faq-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "tatkal-charge-calculator", {
    title: "Tatkal Charge Calculator — Estimate the Tatkal Surcharge",
    description: "Estimate the Tatkal surcharge on top of the base fare for Sleeper, 3A, 2A, CC and other classes.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/tatkal-charge-calculator",
  keywords: ["tatkal charge calculator", "tatkal surcharge", "tatkal fare"],
    locale,
  });
}

const faqs = [
  {
    question: "How is the Tatkal charge calculated?",
    answer:
      "Tatkal charge is a percentage of the base fare, bounded by a minimum and maximum amount that varies by class. This tool applies that same percent-with-floor-and-ceiling rule.",
  },
  {
    question: "Does 1A have a Tatkal charge?",
    answer: "1A generally does not carry a Tatkal quota on most trains, so there's no standard Tatkal charge for it.",
  },
  {
    question: "Is the Tatkal charge refundable if I cancel?",
    answer: "No — the Tatkal surcharge, like the rest of a confirmed Tatkal fare, is generally non-refundable on cancellation.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "tatkal-charge-calculator", {
    eyebrow: "Tatkal Charge Calculator",
    title: "Tatkal Charge Calculator",
    description: "Estimate the Tatkal surcharge on top of your base fare, by class. Figures are illustrative — always confirm the exact charge on the IRCTC payment screen.",
    badges: ["Class-wise rates", "Instant estimate"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Tatkal Charge Calculator"}
      breadcrumbHref="/tatkal-charge-calculator"
      description={page.description}
      badges={page.badges}
      faqs={calcFaqs(lang, "tatkal-charge-calculator", faqs)}
      relatedTools={[
        { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator", description: "Check exactly when Tatkal opens for your class." },
        { href: "/fare-calculator", label: "Train Fare Calculator", description: "Estimate the base fare first." },
        { href: "/refund-calculator", label: "Refund Calculator", description: "See what you'd get back if you cancel a regular ticket." },
      ]}
    >
      <TatkalChargeClient forms={dict.forms} />
    </CalculatorShell>
  );
}
