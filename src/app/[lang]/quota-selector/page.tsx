import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { QuotaSelectorClient } from "./QuotaSelectorClient";
import { QUOTAS } from "@/lib/irctc-rules";

export const metadata: Metadata = buildMetadata({
  title: "Which Railway Quota Should I Book Under?",
  description:
    "Answer a couple of quick questions to find the right Indian Railways booking quota for your situation — General, Tatkal, Ladies, Senior Citizen and more.",
  path: "/quota-selector",
  keywords: ["railway quota selector", "IRCTC quota types", "which quota to book"],
});

const faqs = QUOTAS.map((q) => ({
  question: `Who can book under the ${q.name}?`,
  answer: `${q.description} Eligible: ${q.who}.`,
}));

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Quota Selector"
      title="Which Railway Quota Should I Book Under?"
      breadcrumbLabel="Quota Selector"
      breadcrumbHref="/quota-selector"
      description="Answer a couple of quick questions to find the quota that fits your situation — General, Tatkal, Ladies, Senior Citizen, Defence and more."
      badges={["9 quota types", "2 quick questions", "Instant recommendation"]}
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
