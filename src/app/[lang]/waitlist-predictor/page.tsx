import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WaitlistClient } from "./WaitlistClient";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";
import { estimateWlOutlook, type OutlookBand, type WlType } from "@/lib/irctc-rules";

// Server-rendered so queries like "WL 7 confirmation chances" or "TQWL 40
// confirmation chances" have crawlable content to match, not just an
// interactive form. Uses fixed, disclosed assumptions (Sleeper class, ~15
// days out) — the interactive tool below lets a reader plug in their own.
const WL_TYPES: WlType[] = ["GNWL", "RLWL", "PQWL", "RSWL", "TQWL"];
const SAMPLE_POSITIONS = [5, 10, 15, 20, 25, 30, 40, 50];
const SAMPLE_CLASS = "SL";
const SAMPLE_DAYS = 15;

const STATIC_BAND_STYLES: Record<OutlookBand, string> = {
  "Very Likely": "text-success",
  Likely: "text-success",
  Uncertain: "text-accent-foreground",
  Unlikely: "text-danger",
  "Very Unlikely": "text-danger",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "waitlist-predictor", {
    title: "WL Confirmation Outlook — Indian Railways Waitlist Guide",
    description: "An honest, pattern-based outlook for your waitlisted ticket — five clear bands, no fake percentage. Covers GNWL, RLWL, PQWL, RSWL and TQWL.",
  });
  return buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/waitlist-predictor",
  keywords: ["waitlist confirmation chances", "GNWL RLWL PQWL", "WL predictor IRCTC"],
    locale,
  });
}

const faqs = [
  {
    question: "Why an outlook band instead of a percentage?",
    answer:
      "A specific percentage implies precision we don't actually have. Real confirmation depends on how many passengers cancel on that exact train and date — data no tool can know in advance. The five bands reflect that honestly instead of masking it behind a fake number.",
  },
  {
    question: "What's the difference between GNWL, RLWL and PQWL?",
    answer:
      "GNWL is for passengers boarding at or near the origin and draws from the largest cancellation pool. RLWL is for specific intermediate boarding stations — only cancellations on your exact segment help. PQWL is a smaller quota shared across several intermediate stations and clears more slowly.",
  },
  {
    question: "Does TQWL ever confirm?",
    answer: "Occasionally, but rarely — Tatkal bookings are non-refundable, so there's little cancellation traffic to clear a Tatkal-quota waitlist.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "waitlist-predictor", {
    eyebrow: "WL Confirmation Outlook",
    title: "Waitlist Confirmation Outlook",
    description: "An honest, pattern-based read on your waitlisted ticket — five plain-language bands, not a fabricated percentage.",
    badges: ["GNWL, RLWL, PQWL, RSWL, TQWL", "No fake percentages", "Instant outlook"],
  });

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "WL Confirmation Outlook"}
      breadcrumbHref="/waitlist-predictor"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/chart-preparation-time", label: "Chart Preparation Time", description: "Know the cutoff moment your ticket's fate is decided." },
        { href: "/quota-selector", label: "Quota Selector", description: "See if a different quota would suit your trip better next time." },
        { href: "/journey-reports", label: "Journey Reports", description: "Read real traveller reports on waitlist confirmation." },
      ]}
      explainer={
        <>
          <h2 className="text-xl font-semibold mb-2">This is guidance, not a guarantee</h2>
          <p className="text-muted leading-relaxed">
            Waitlisted tickets confirm as confirmed passengers cancel. The chart is prepared a few hours
            before departure — any ticket still waitlisted at that point is auto-cancelled and refunded.
            Always verify your live PNR status on IRCTC or NTES before travel; this tool is directional
            guidance based on general patterns, not a live prediction.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">Typical outlook by waitlist number</h2>
          <p className="text-muted leading-relaxed mb-3">
            A quick reference for questions like &ldquo;WL 7 confirmation chances&rdquo; or &ldquo;TQWL 40
            confirmation chances&rdquo; — assuming Sleeper class and roughly 15 days to departure. Your own
            class and timing change the outlook, so use the calculator above for a read tailored to your
            actual ticket.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--surface-2,transparent)]">
                  <th className="text-left px-3 py-2 font-semibold">WL Type</th>
                  {SAMPLE_POSITIONS.map((pos) => (
                    <th key={pos} className="text-center px-3 py-2 font-semibold whitespace-nowrap">
                      WL {pos}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WL_TYPES.map((wlType) => (
                  <tr key={wlType} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">{wlType}</td>
                    {SAMPLE_POSITIONS.map((pos) => {
                      const { band } = estimateWlOutlook({
                        wlNumber: pos,
                        wlType,
                        travelClass: SAMPLE_CLASS,
                        daysToDeparture: SAMPLE_DAYS,
                      });
                      return (
                        <td
                          key={pos}
                          className={`text-center px-3 py-2 whitespace-nowrap ${STATIC_BAND_STYLES[band]}`}
                        >
                          {band}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    >
      <WaitlistClient locale={lang} datepicker={dict.datepicker} />
    </CalculatorShell>
  );
}
