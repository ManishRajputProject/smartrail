import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ChecklistClient } from "./ChecklistClient";

export const metadata: Metadata = buildMetadata({
  title: "Train Journey Packing Checklist Generator",
  description: "A pre-travel checklist generated for your journey type, class and season.",
  path: "/journey-checklist",
  keywords: ["train journey checklist", "packing list for train travel India"],
});

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Journey Checklist"
      title="Train Journey Checklist Generator"
      breadcrumbLabel="Journey Checklist"
      breadcrumbHref="/journey-checklist"
      description="Answer a few quick questions about your trip and get a tailored pre-travel checklist."
      badges={["Tailored to your trip", "Tick items off as you pack"]}
      relatedTools={[
        { href: "/luggage-calculator", label: "Luggage Allowance Calculator", description: "Check your free baggage limit before you pack." },
        { href: "/chart-preparation-time", label: "Chart Preparation Time", description: "Know when your berth is finally confirmed." },
      ]}
    >
      <ChecklistClient />
    </CalculatorShell>
  );
}
