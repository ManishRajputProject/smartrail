import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ChartPrepClient } from "./ChartPrepClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "chart-preparation-time", {
    title: "Train Chart Preparation Time Calculator",
    description: "Find roughly when the chart is prepared before your train departs — the moment waitlisted tickets are confirmed or auto-cancelled.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/chart-preparation-time",
  keywords: ["chart preparation time", "train chart time", "IRCTC chart status"],
    locale,
  });
}

const faqs = [
  {
    question: "When is the train chart usually prepared?",
    answer: "As a general rule, the first chart is prepared about 4 hours before the train's scheduled departure from its source station.",
  },
  {
    question: "What about early-morning trains?",
    answer: "For trains departing between roughly midnight and 8 AM, the chart is typically prepared the previous evening instead, around 9 PM.",
  },
  {
    question: "What happens to my waitlisted ticket at chart preparation?",
    answer: "Any ticket still on the waiting list when the chart is prepared is automatically cancelled and refunded — you cannot board on a waitlisted ticket.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "chart-preparation-time", {
    eyebrow: "Chart Preparation Time",
    title: "Train Chart Preparation Time Calculator",
    description: "Estimate when the chart will be prepared for your train — the point at which waitlisted tickets are either confirmed or auto-cancelled.",
    badges: ["~4 hours before departure", "Early-morning exception handled"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Chart Preparation Time"}
      breadcrumbHref="/chart-preparation-time"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/waitlist-predictor", label: "WL Confirmation Outlook", description: "See your odds of confirming before the chart locks in." },
        { href: "/refund-calculator", label: "Refund Calculator", description: "Know your cancellation deadline relative to chart time." },
      ]}
    >
      <ChartPrepClient forms={dict.forms} />
    </CalculatorShell>
  );
}
