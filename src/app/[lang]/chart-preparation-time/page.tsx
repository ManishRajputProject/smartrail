import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ChartPrepClient } from "./ChartPrepClient";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizePage } from "@/i18n/page-translations";
import { calcFaqs } from "@/i18n/calculator-faq-translations";
import { LAST_VERIFIED } from "@/lib/irctc-rules";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "chart-preparation-time", {
    title: "Chart Preparation Time — When the IRCTC Train Chart Is Prepared",
    description:
      "Chart preparation time for any Indian Railways train: the first chart is prepared about 4 hours before departure, the final chart closer to it. See exactly when waitlisted tickets confirm or auto-cancel, the early-morning exception, and how to check IRCTC chart status.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/chart-preparation-time",
    keywords: [
      "chart preparation time",
      "final chart preparation time",
      "chart preparation time for irctc",
      "irctc chart status",
      "when is train chart prepared",
      "train chart time",
    ],
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
  {
    question: "What is the final chart, and when is it prepared?",
    answer: "There are usually two charts. The first chart is prepared about 4 hours before departure. The final chart is prepared much closer to departure — often around 30 minutes before — to take in last-minute cancellations. Seats freed between the two can be bought as current booking.",
  },
  {
    question: "How do I check chart preparation status on IRCTC?",
    answer: "Once the chart is prepared, IRCTC shows a 'Chart Prepared' status and lets you view the vacant-berth position for the train. Until then it reads 'Chart Not Prepared'. Your live PNR status also updates at chart preparation — that is the moment a waitlisted or RAC ticket reaches its final state.",
  },
  {
    question: "Does chart preparation time change for my boarding station if it's not the origin?",
    answer: "No — the chart is always prepared relative to the train's departure from its originating station, not from wherever you board. If you board partway along the route, use the calculator's optional boarding-station field to see your own arrival time; the chart timing itself stays anchored to the origin.",
  },
  {
    question: "How do I check the chart preparation time for my train by train number?",
    answer: "Search your train by number or name in the calculator above, optionally pick your boarding station, and choose your journey date — it looks up the train's actual scheduled origin departure and works out both the first and final chart times for you.",
  },
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "chart-preparation-time", {
    eyebrow: "Chart Preparation Time",
    title: "Chart Preparation Time Calculator",
    description:
      "Enter your train's departure and get its chart preparation time — the point at which waitlisted tickets are confirmed or auto-cancelled. Handles the early-morning exception and the final chart.",
    badges: ["First chart ~4 hours before", "Final chart near departure", "Early-morning exception handled"],
  });
  const lp = (href: string) => localePath(lang, href);

  return (
    <CalculatorShell
      eyebrow={page.eyebrow}
      title={page.title}
      breadcrumbLabel={page.eyebrow ?? "Chart Preparation Time"}
      breadcrumbHref="/chart-preparation-time"
      description={page.description}
      badges={page.badges}
      faqs={calcFaqs(lang, "chart-preparation-time", faqs)}
      explainer={
        <div className="leading-relaxed">
          <h2 className="text-xl font-semibold mb-2">What chart preparation time means</h2>
          <p className="text-muted mb-3">
            The chart is the train&apos;s final passenger and berth list. Chart preparation time is the moment it
            is drawn up — and it is the single most important cut-off in Indian Railways booking. Once the chart
            is prepared, seat and berth allotment is fixed, confirmed and RAC passengers get their final position,
            and any ticket still on the waiting list is automatically cancelled and refunded.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">When is the chart prepared?</h2>
          <p className="text-muted mb-3">
            As a general rule, the <strong>first chart is prepared about 4 hours before</strong> the train&apos;s
            scheduled departure from its originating station. This is what the calculator above works out for your
            train.
          </p>
          <p className="text-muted mb-3">
            There is one common exception. For trains that leave <strong>early in the morning</strong> — roughly
            between midnight and 8 AM — preparing the chart four hours earlier would mean the middle of the night,
            so the chart is instead prepared the <strong>previous evening, usually around 9 PM</strong>.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">The final chart preparation time</h2>
          <p className="text-muted mb-3">
            Most trains actually have two charts. After the first chart, a <strong>final chart</strong> is
            prepared much closer to departure — often around 30 minutes before — to take in last-minute
            cancellations. Berths that fall vacant between the first and final chart are released for{" "}
            <strong>current booking</strong>, bookable online or at the station counter at the normal fare right
            up to the final chart preparation time.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">What chart preparation means for your ticket</h2>
          <ul className="list-disc list-inside text-muted space-y-1 mb-3">
            <li><strong>Waitlisted (WL):</strong> if still waitlisted at chart preparation, the ticket is auto-cancelled and refunded. You cannot board on a fully waitlisted e-ticket.</li>
            <li><strong>RAC:</strong> you can travel, sharing a berth; RAC often upgrades to a full berth at or after the chart as confirmed passengers cancel.</li>
            <li><strong>Confirmed:</strong> your coach and berth are locked in at chart preparation.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">How to check chart status on IRCTC</h2>
          <p className="text-muted mb-3">
            Until the chart is drawn up, IRCTC shows <strong>&quot;Chart Not Prepared&quot;</strong>. Once it is
            ready, the status changes to <strong>&quot;Chart Prepared&quot;</strong> and you can view the
            vacant-berth position for the train. Your live PNR status also updates at chart preparation — that is
            the moment a waitlisted or RAC ticket reaches its final state, so it is the last realistic point to
            know whether you have a confirmed seat.
          </p>

          <p className="text-muted mb-2">
            For the full walk-through, see our guide on{" "}
            <Link href={lp("/guides/chart-preparation-time-explained")} className="text-primary underline underline-offset-2">
              when the train chart is prepared
            </Link>
            , or check your{" "}
            <Link href={lp("/pnr-status")} className="text-primary underline underline-offset-2">
              PNR status codes
            </Link>{" "}
            and{" "}
            <Link href={lp("/waitlist-predictor")} className="text-primary underline underline-offset-2">
              waitlist confirmation outlook
            </Link>
            .
          </p>
          <p className="text-[12px] text-muted">
            Rules last verified {LAST_VERIFIED}. Chart timing can vary by train and is set by Indian Railways —
            always confirm live status on IRCTC before you travel.
          </p>
        </div>
      }
      relatedTools={[
        { href: "/waitlist-predictor", label: "WL Confirmation Outlook", description: "See your odds of confirming before the chart locks in." },
        { href: "/pnr-status", label: "PNR Status Decoder", description: "Understand CNF, RAC, WL and every code on your ticket." },
        { href: "/refund-calculator", label: "Refund Calculator", description: "Know your cancellation deadline relative to chart time." },
      ]}
    >
      <ChartPrepClient forms={dict.forms} locale={lang} datepicker={dict.datepicker} />
    </CalculatorShell>
  );
}
