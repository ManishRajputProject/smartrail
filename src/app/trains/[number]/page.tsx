import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { JsonLd } from "@/components/JsonLd";
import { getTrainByNumber, popularTrains } from "@/lib/rail-data";

export const dynamicParams = true;

// SSG only the popular trains at build; everything else renders on demand.
export function generateStaticParams() {
  return popularTrains().map((t) => ({ number: t.number }));
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const train = getTrainByNumber(number);
  if (!train) return buildMetadata({ title: "Train Not Found", description: "No such train number.", path: `/trains/${number}`, noIndex: true });
  return buildMetadata({
    title: `${train.number} ${train.name} — Route, Timings & Classes`,
    description: `${train.number} ${train.name} runs from ${train.fromName} to ${train.toName}. Departure ${train.dep}, arrival ${train.arr}. Check timings, duration and classes.`,
    path: `/trains/${train.number}`,
    keywords: [train.number, train.name, "train timings", "train route"],
  });
}

const CLASS_LABEL: Record<string, string> = {
  "1A": "First AC", "2A": "Second AC", "3A": "Third AC", CC: "Chair Car", SL: "Sleeper",
};

export default async function Page({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const train = getTrainByNumber(number);
  if (!train) notFound();

  const durationText = train.durH != null ? `${train.durH}h${train.durM ? ` ${train.durM}m` : ""}` : "—";

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Trip",
          name: `${train.number} ${train.name}`,
          description: `${train.name} from ${train.fromName} to ${train.toName}`,
          departureTime: train.dep,
          arrivalTime: train.arr,
        }}
      />
      <Breadcrumb items={[{ name: "Train Finder", href: "/trains" }, { name: `${train.number}`, href: `/trains/${train.number}` }]} />

      <p className="font-mono font-bold text-primary tabular-nums">{train.number}</p>
      <h1 className="text-[24px] md:text-[30px] font-extrabold tracking-tight leading-tight mt-0.5">{train.name}</h1>

      <div className="card mt-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted">From</p>
            <p className="font-semibold truncate">{train.fromName}</p>
            <p className="text-[12px] text-muted font-mono">{train.fromCode}</p>
            <p className="text-lg font-bold mt-1 tabular-nums">{train.dep || "—"}</p>
          </div>
          <div className="text-center shrink-0 text-muted">
            <p className="text-[11px]">{durationText}</p>
            <p className="text-xl" aria-hidden="true">→</p>
            <p className="text-[11px]">{train.type}</p>
          </div>
          <div className="min-w-0 text-right">
            <p className="text-[11px] uppercase tracking-wide text-muted">To</p>
            <p className="font-semibold truncate">{train.toName}</p>
            <p className="text-[12px] text-muted font-mono">{train.toCode}</p>
            <p className="text-lg font-bold mt-1 tabular-nums">{train.arr || "—"}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted">Zone</span><br /><span className="font-medium">{train.zone || "—"}</span></div>
          <div><span className="text-muted">Type</span><br /><span className="font-medium">{train.type || "—"}</span></div>
        </div>

        {train.classes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[11px] uppercase tracking-wide text-muted mb-1.5">Classes available</p>
            <div className="flex flex-wrap gap-1.5">
              {train.classes.map((c) => (
                <span key={c} className="chip bg-primary-soft text-primary">{c} · {CLASS_LABEL[c] ?? c}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Link href="/booking-date-calculator" className="btn-primary">Check Booking Date</Link>
        <Link href="/reminders" className="btn-secondary">🔔 Set a Reminder</Link>
      </div>

      <DataDisclaimer />
    </div>
  );
}
