import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { PlanTicketClient } from "./PlanTicketClient";
import { buildPlanTicketDays } from "@/lib/plan-ticket";
import { nowIST, ARP_DAYS } from "@/lib/irctc-rules";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
  title: "Plan Ticket — Train Booking Calendar with Holidays",
  description:
    "A calendar of upcoming journey dates with Indian holidays, weekends and IRCTC booking status marked, so you can plan around the rush.",
  path: "/plan-ticket",
  keywords: ["train booking calendar", "Indian holiday calendar train booking", "when does booking open"],
    locale,
  });
}

const faqs = [
  {
    question: "How many days in advance can I book a train ticket on IRCTC?",
    answer: `You can book up to ${ARP_DAYS} days in advance (excluding the journey date). Booking opens at 8:00 AM IST on that date.`,
  },
  {
    question: "Are the holiday dates on this calendar exact?",
    answer:
      "Fixed national holidays (Republic Day, Independence Day, Gandhi Jayanti, Christmas) are exact. Festival dates follow lunar/regional calendars and can shift by a day depending on the almanac and region — treat them as best-effort and verify locally for anything you're planning around closely.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = localizePage(lang, "plan-ticket", {
    eyebrow: "Plan Ticket",
    title: "Plan Your Train Journey Around Holidays",
    description: "A day-by-day view of the next 120 journey dates, with holidays, weekends and booking status marked, so you can spot high-demand dates early.",
    badges: [`${ARP_DAYS}-day booking window`, "Indian holidays highlighted", "Long weekends marked"],
  });

  const days = buildPlanTicketDays(nowIST(), 120);

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Plan Ticket"}
      breadcrumbHref="/plan-ticket"
      description={page.description}
      badges={page.badges}
      faqs={faqs}
      relatedTools={[
        { href: "/long-weekend-planner", label: "Long Weekend Planner", description: "Just the upcoming long weekends, distilled." },
        { href: "/booking-date-calculator", label: "Booking Date Calculator", description: "Check one specific journey date." },
      ]}
    >
      <PlanTicketClient days={days} />
    </CalculatorShell>
  );
}
