import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ChecklistClient } from "./ChecklistClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
  title: "Train Journey Packing Checklist Generator",
  description: "A pre-travel checklist generated for your journey type, class and season.",
  path: "/journey-checklist",
  keywords: ["train journey checklist", "packing list for train travel India"],
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = localizePage(lang, "journey-checklist", {
    eyebrow: "Journey Checklist",
    title: "Train Journey Checklist Generator",
    description: "Answer a few quick questions about your trip and get a tailored pre-travel checklist.",
    badges: ["Tailored to your trip", "Tick items off as you pack"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Journey Checklist"}
      breadcrumbHref="/journey-checklist"
      description={page.description}
      badges={page.badges}
      relatedTools={[
        { href: "/luggage-calculator", label: "Luggage Allowance Calculator", description: "Check your free baggage limit before you pack." },
        { href: "/chart-preparation-time", label: "Chart Preparation Time", description: "Know when your berth is finally confirmed." },
      ]}
    >
      <ChecklistClient />
    </CalculatorShell>
  );
}
