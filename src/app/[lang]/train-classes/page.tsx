import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TRAIN_CLASSES } from "@/lib/train-classes";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "train-classes", {
    title: "Indian Train Classes Explained — 1A, 2A, 3A, SL, CC, EC, 2S",
    description: "Compare every Indian Railways travel class — First AC, 2A, 3A, Sleeper, Chair Car, Executive and Second Sitting — by comfort, berth layout, amenities and cost.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/train-classes",
    keywords: ["train classes explained", "1A 2A 3A SL difference", "which train class to book", "chair car vs sleeper"],
    locale,
  });
}

const faqs = [
  { question: "What does SL mean in a train?", answer: "SL stands for Sleeper class — the standard non-AC overnight class with open windows, the most economical and widely available sleeper option on Indian Railways." },
  { question: "What does 2A mean in a train ticket?", answer: "2A means Second AC — an air-conditioned class with open bays of 6 berths, privacy curtains, and fewer passengers per coach than 3A." },
  { question: "What does 3A mean in a train?", answer: "3A means Third AC — air-conditioned bays of 8 berths (three tiers) with no curtains on most coaches, at a lower fare than 2A. It's the most popular overnight AC class." },
  { question: "What is the difference between 2A and 3A?", answer: "Both are air-conditioned. 2A has open bays of 6 berths with privacy curtains and fewer passengers per coach; 3A has bays of 8 berths (three tiers) and no curtains on most coaches, at a lower fare." },
  { question: "Is Sleeper class air-conditioned?", answer: "No. Sleeper (SL) is non-AC with open windows. For air-conditioning on an overnight train, choose 3A, 2A or 1A." },
  { question: "What is 2S and CC in a train?", answer: "2S is Second Sitting — a non-AC, budget day-journey seating class. CC is AC Chair Car — an air-conditioned seating class used on fast day trains like Shatabdi. Neither has berths; both are seats only." },
  { question: "Which class is best for a day journey?", answer: "AC Chair Car (CC) or Executive Chair Car (EC) on fast trains like Shatabdi and Vande Bharat. Second Sitting (2S) is the budget day option." },
  { question: "What is the most popular class?", answer: "3A (Third AC) is the value sweet spot for overnight AC travel, and Sleeper (SL) is the most economical and widely available sleeper option." },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8 pb-20 md:pb-12">
      <Breadcrumb items={[{ name: "Train Classes", href: "/train-classes" }]} />
      <p className="eyebrow mb-1">Reference</p>
      <h1 className="text-[26px] md:text-[34px] font-extrabold tracking-tight leading-tight">Indian Train Classes Explained</h1>
      <p className="mt-2.5 text-muted text-[15px] leading-relaxed max-w-2xl">
        1A, 2A, 3A, SL, CC, EC and 2S — what each class means, how the berths are laid out, and which to
        choose for your journey.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {TRAIN_CLASSES.map((c) => (
            <div key={c.code} className="card p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft font-mono font-bold text-primary text-[13px]">{c.code}</span>
                <div>
                  <h2 className="font-semibold text-[15px]">{c.name}</h2>
                  <p className="text-[11px] text-muted">{c.ac ? "Air-conditioned" : "Non-AC"} · {c.fareHint} fare</p>
                </div>
              </div>
              <p className="text-[13px] mt-2.5"><span className="font-semibold">{c.code}</span> means <span className="font-semibold">{c.name}</span>.</p>
              <p className="text-[13px] text-muted mt-1">{c.layout}</p>
              <p className="text-[13px] mt-2"><span className="font-semibold">Best for:</span> {c.bestFor}</p>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {c.amenities.slice(0, 4).map((a) => (
                  <span key={a} className="chip bg-success-soft text-success !text-[11px] !py-0.5">✓ {a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">Class comparison table</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-[13px] min-w-[560px]">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="px-3 py-2 font-semibold">Class</th>
                <th className="px-3 py-2 font-semibold">AC?</th>
                <th className="px-3 py-2 font-semibold">Berth / seat</th>
                <th className="px-3 py-2 font-semibold">Relative fare</th>
              </tr>
            </thead>
            <tbody>
              {TRAIN_CLASSES.map((c) => (
                <tr key={c.code} className="border-b border-border last:border-0 align-top">
                  <td className="px-3 py-2 whitespace-nowrap"><span className="font-mono font-bold text-primary">{c.code}</span> {c.name}</td>
                  <td className="px-3 py-2">{c.ac ? "Yes" : "No"}</td>
                  <td className="px-3 py-2 text-muted">{c.berth}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{c.fareHint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 card p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[15px]">Not sure which class fits your trip?</p>
            <p className="text-[13px] text-muted mt-0.5">Estimate the fare for any class and distance.</p>
          </div>
          <Link href="/fare-calculator" className="btn-primary shrink-0">Fare Calculator →</Link>
        </div>

        <FaqAccordion items={faqs} />
    </div>
  );
}
