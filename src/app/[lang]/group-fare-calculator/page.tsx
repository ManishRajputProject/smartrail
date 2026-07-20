import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GroupFareClient } from "./GroupFareClient";

export const metadata: Metadata = buildMetadata({
  title: "Group / Multi-Passenger Train Fare Calculator",
  description: "Estimate the total fare for a group booking multiple passengers on one PNR.",
  path: "/group-fare-calculator",
  keywords: ["group fare calculator", "multi passenger train fare", "family train booking cost"],
});

const faqs = [
  {
    question: "How many passengers can be on one PNR?",
    answer: "Up to 6 passengers (or a mix limited to 2 children under 5 without a separate berth) can generally be booked on a single PNR.",
  },
  {
    question: "Is the per-passenger fare the same for everyone in a group?",
    answer: "In this estimate, yes — actual IRCTC fares can vary slightly with berth allocation, concessions and quota, so treat this as a planning figure.",
  },
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Group Fare Calculator"
      title="Group Fare Calculator"
      breadcrumbLabel="Group Fare Calculator"
      breadcrumbHref="/group-fare-calculator"
      description="Estimate the total fare for your group travelling together on one PNR — useful for splitting costs or budgeting a family trip."
      badges={["Up to 6 passengers", "Instant estimate"]}
      faqs={faqs}
      relatedTools={[
        { href: "/fare-calculator", label: "Single Passenger Fare", description: "Estimate fare for one traveller." },
        { href: "/trip-cost-estimator", label: "Trip Cost Estimator", description: "Add hotel, food and local transport to the trip budget." },
      ]}
    >
      <GroupFareClient />
    </CalculatorShell>
  );
}
