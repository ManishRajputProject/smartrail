import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { LuggageClient } from "./LuggageClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "luggage-calculator", {
    title: "Train Luggage Allowance Calculator",
    description: "Check your free luggage allowance by class and estimate whether you'll face excess baggage charges.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/luggage-calculator",
  keywords: ["train luggage allowance", "IRCTC baggage rules", "railway luggage limit"],
    locale,
  });
}

const faqs = [
  {
    question: "What is the free luggage allowance on Indian Railways?",
    answer: "It varies by class — roughly 70 kg in 1A, 50 kg in 2A, 40 kg in 3A/CC/Sleeper, and 35 kg in Second Sitting. Verify current limits on IRCTC as these can be revised.",
  },
  {
    question: "What happens if I exceed the free allowance?",
    answer: "You can usually carry additional weight up to a marginal allowance by paying an excess charge, up to a maximum permitted weight per class. Beyond that, luggage needs to be booked separately as parcel.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "luggage-calculator", {
    eyebrow: "Luggage Calculator",
    title: "Train Luggage Allowance Calculator",
    description: "Check your free baggage allowance by class and whether your luggage weight is likely to attract an excess charge.",
    badges: ["Class-wise limits", "Instant check"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Luggage Calculator"}
      breadcrumbHref="/luggage-calculator"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/journey-checklist", label: "Journey Checklist", description: "A full pre-travel checklist, not just luggage." },
        { href: "/fare-calculator", label: "Fare Calculator", description: "Estimate your ticket fare." },
      ]}
    >
      <LuggageClient forms={dict.forms} />
    </CalculatorShell>
  );
}
