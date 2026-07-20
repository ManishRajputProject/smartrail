import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ModeComparatorClient } from "./ModeComparatorClient";

export const metadata: Metadata = buildMetadata({
  title: "Train vs Flight vs Bus — Cost & Time Comparator",
  description: "Compare rough travel time and cost across train, flight and bus for a given distance.",
  path: "/travel-mode-comparator",
  keywords: ["train vs flight vs bus", "travel mode comparison India", "cheapest way to travel India"],
});

const faqs = [
  {
    question: "How accurate are these numbers?",
    answer:
      "They're directional, not quotes — built from rough average speeds and per-km costs for each mode. Actual fares vary a lot by specific route, operator, class and how far ahead you book. Use this to compare modes at a glance, then check exact fares before deciding.",
  },
  {
    question: "Does the flight estimate include airport time?",
    answer: "Yes — a fixed overhead for check-in, security and boarding is added on top of flight time in the air.",
  },
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Train vs Flight vs Bus"
      title="Travel Mode Comparator"
      breadcrumbLabel="Travel Mode Comparator"
      breadcrumbHref="/travel-mode-comparator"
      description="A rough side-by-side of cost and time across train, flight and bus for your route distance — useful for a first-pass decision, not a fare quote."
      badges={["3 modes compared", "Directional estimate"]}
      faqs={faqs}
      relatedTools={[
        { href: "/fare-calculator", label: "Train Fare Calculator", description: "Get a more detailed train fare estimate." },
        { href: "/trip-cost-estimator", label: "Trip Cost Estimator", description: "Budget the whole trip, not just transport." },
      ]}
    >
      <ModeComparatorClient />
    </CalculatorShell>
  );
}
