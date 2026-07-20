import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WaitlistClient } from "./WaitlistClient";

export const metadata: Metadata = buildMetadata({
  title: "WL Confirmation Outlook — Indian Railways Waitlist Guide",
  description:
    "An honest, pattern-based outlook for your waitlisted ticket — five clear bands, no fake percentage. Covers GNWL, RLWL, PQWL, RSWL and TQWL.",
  path: "/waitlist-predictor",
  keywords: ["waitlist confirmation chances", "GNWL RLWL PQWL", "WL predictor IRCTC"],
});

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

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="WL Confirmation Outlook"
      title="Waitlist Confirmation Outlook"
      breadcrumbLabel="WL Confirmation Outlook"
      breadcrumbHref="/waitlist-predictor"
      description="An honest, pattern-based read on your waitlisted ticket — five plain-language bands, not a fabricated percentage."
      badges={["GNWL, RLWL, PQWL, RSWL, TQWL", "No fake percentages", "Instant outlook"]}
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
        </>
      }
    >
      <WaitlistClient />
    </CalculatorShell>
  );
}
