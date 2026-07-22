import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { QuotaSelectorClient } from "./QuotaSelectorClient";
import { QUOTAS } from "@/lib/irctc-rules";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "quota-selector", {
    title: "Which Railway Quota Should I Book Under?",
    description: "Answer a couple of quick questions to find the right Indian Railways booking quota for your situation — General, Tatkal, Ladies, Senior Citizen and more.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/quota-selector",
  keywords: ["railway quota selector", "IRCTC quota types", "which quota to book"],
    locale,
  });
}

const faqs = QUOTAS.map((q) => ({
  question: `Who can book under the ${q.name}?`,
  answer: `${q.description} Eligible: ${q.who}.`,
}));

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = localizePage(lang, "quota-selector", {
    eyebrow: "Quota Selector",
    title: "Which Railway Quota Should I Book Under?",
    description: "Answer a couple of quick questions to find the quota that fits your situation — General, Tatkal, Ladies, Senior Citizen, Defence and more.",
    badges: ["9 quota types", "2 quick questions", "Instant recommendation"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Quota Selector"}
      breadcrumbHref="/quota-selector"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator", description: "If Tatkal is right for you, check the exact opening time." },
        { href: "/waitlist-predictor", label: "WL Confirmation Outlook", description: "See your odds if you end up waitlisted." },
      ]}
    >
      <QuotaSelectorClient />
    </CalculatorShell>
  );
}
