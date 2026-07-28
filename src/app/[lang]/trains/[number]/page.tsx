import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { ScheduleTable } from "@/components/ScheduleTable";
import { getSchedule, routeDistanceKm } from "@/lib/schedules";
import { scheduleStrings } from "@/i18n/schedule-strings";
import { JsonLd } from "@/components/JsonLd";
import { getTrainByNumber, popularTrains } from "@/lib/rail-data";
import { trainFacts, formatDuration } from "@/lib/train-facts";
import { ARP_DAYS } from "@/lib/irctc-rules";
import { DEFAULT_LOCALE, isLocale, localePath, LOCALES, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { trainStrings, fill } from "@/i18n/train-page-strings";

export const dynamicParams = true;

// SSG the popular trains at build; the rest render on demand and are cached.
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    popularTrains().map((t) => ({ lang, number: t.number }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; number: string }>;
}): Promise<Metadata> {
  const { lang, number } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const train = getTrainByNumber(number);
  if (!train) {
    return buildMetadata({
      title: "Train Not Found",
      description: "No such train number.",
      path: `/trains/${number}`,
      noIndex: true,
      locale,
    });
  }

  const s = trainStrings(locale);
  const f = trainFacts(train);
  const dur = formatDuration(f.durationMins);
  const desc = [
    `${train.number} ${train.name}:`,
    fill(s.metaRoute, { from: train.fromName, to: train.toName }),
    train.dep && train.arr && dur
      ? fill(s.metaTimes, { dep: train.dep, arr: train.arr, duration: dur })
      : "",
    train.classes.length ? fill(s.metaClasses, { classes: train.classes.join(", ") }) : "",
    s.metaTail,
  ]
    .filter(Boolean)
    .join(" ");

  return buildMetadata({
    title: `${train.number} ${train.name} — ${s.metaTitleSuffix}`,
    description: desc,
    path: `/trains/${train.number}`,
    keywords: [
      train.number,
      train.name,
      `${train.fromName} to ${train.toName} train`,
      "train timings",
      "train route",
    ],
    locale,
  });
}

const CLASS_LABEL: Record<string, string> = {
  "1A": "First AC",
  "2A": "Second AC",
  "3A": "Third AC",
  "3E": "Third AC Economy",
  CC: "Chair Car",
  EC: "Executive Chair Car",
  SL: "Sleeper",
  "2S": "Second Sitting",
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; number: string }>;
}) {
  const { lang: raw, number } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const t = trainStrings(lang);
  const lp = (href: string) => localePath(lang, href);

  const train = getTrainByNumber(number);
  if (!train) notFound();

  const f = trainFacts(train);
  const durationText = formatDuration(f.durationMins);
  const stops = getSchedule(train.number);
  const totalKm = routeDistanceKm(train.number);
  const sched = scheduleStrings(lang);

  const summary =
    train.dep && train.arr && durationText
      ? fill(t.summary, {
          number: train.number,
          name: train.name,
          fromName: train.fromName,
          dep: train.dep,
          toName: train.toName,
          arr: train.arr,
          duration: durationText,
        })
      : fill(t.summaryNoTimes, {
          number: train.number,
          name: train.name,
          fromName: train.fromName,
          toName: train.toName,
        });

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Trip",
          name: `${train.number} ${train.name}`,
          description: summary,
          departureTime: train.dep || undefined,
          arrivalTime: train.arr || undefined,
          itinerary: [
            { "@type": "Place", name: train.fromName, identifier: train.fromCode },
            { "@type": "Place", name: train.toName, identifier: train.toCode },
          ],
        }}
      />
      <Breadcrumb
        items={[
          { name: t.trainFinder, href: "/trains" },
          { name: train.number, href: `/trains/${train.number}` },
        ]}
      />

      <p className="font-mono font-bold text-primary tabular-nums">{train.number}</p>
      <h1 className="text-[24px] md:text-[30px] font-extrabold tracking-tight leading-tight mt-0.5">
        {train.name}
      </h1>

      {/* Quick answer — the one paragraph an AI summariser or a hurried reader needs. */}
      <div className="mt-4 rounded-xl border border-primary/25 bg-primary-soft/60 p-4">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-primary">
          {t.quickAnswer}
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed">{summary}</p>
      </div>

      <div className="card mt-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted">{t.from}</p>
            <p className="font-semibold truncate">{train.fromName}</p>
            <p className="text-[12px] text-muted font-mono">{train.fromCode}</p>
            <p className="text-lg font-bold mt-1 tabular-nums">{train.dep || "—"}</p>
          </div>
          <div className="text-center shrink-0 text-muted">
            <p className="text-[11px]">{durationText ?? "—"}</p>
            <p className="text-xl" aria-hidden="true">→</p>
            <p className="text-[11px]">{train.type}</p>
          </div>
          <div className="min-w-0 text-right">
            <p className="text-[11px] uppercase tracking-wide text-muted">{t.to}</p>
            <p className="font-semibold truncate">{train.toName}</p>
            <p className="text-[12px] text-muted font-mono">{train.toCode}</p>
            <p className="text-lg font-bold mt-1 tabular-nums">{train.arr || "—"}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted">{t.zone}</span>
            <br />
            <span className="font-medium">{train.zone || "—"}</span>
          </div>
          <div>
            <span className="text-muted">{t.trainType}</span>
            <br />
            <span className="font-medium">{train.type || "—"}</span>
          </div>
        </div>

        {train.classes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[11px] uppercase tracking-wide text-muted mb-1.5">
              {t.classesAvailable}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {train.classes.map((c) => (
                <span key={c} className="chip bg-primary-soft text-primary">
                  {c} · {CLASS_LABEL[c] ?? c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Journey profile — derived from departure time + scheduled duration. */}
      <section className="mt-7">
        <h2 className="text-[19px] font-bold tracking-tight">{t.journeyProfile}</h2>
        <h3 className="mt-2 font-semibold text-[15px]">
          {f.isOvernight ? t.overnightTitle : t.dayTitle}
        </h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
          {f.isOvernight
            ? f.nights > 1
              ? fill(t.overnightBodyMulti, { nights: f.nights })
              : t.overnightBody
            : t.dayBody}
        </p>
        {f.straightLineKm != null && (
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
            <span className="font-medium text-foreground">
              {fill(t.straightLine, { km: f.straightLineKm.toLocaleString() })}
            </span>{" "}
            {t.straightLineNote}
          </p>
        )}
      </section>

      {train.classes.length > 0 && (
        <section className="mt-7">
          <h2 className="text-[19px] font-bold tracking-tight">{t.classesHeading}</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
            {t.classesBody}{" "}
            <Link href={lp("/train-classes")} className="underline underline-offset-2">
              {t.compareClasses}
            </Link>
          </p>
          <ul className="mt-2.5 space-y-1.5 text-[15px]">
            {train.classes.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="font-mono font-semibold text-primary shrink-0">{c}</span>
                <span className="text-muted">{CLASS_LABEL[c] ?? c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
            {f.hasAc ? t.acNote : ""} {f.hasNonAc ? t.nonAcNote : ""}
          </p>
        </section>
      )}

      <section className="mt-7">
        <h2 className="text-[19px] font-bold tracking-tight">{t.bookingHeading}</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
          {fill(t.bookingArp, { days: ARP_DAYS })}
        </p>
        <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-muted list-disc pl-5">
          {f.hasAc && <li>{t.tatkalAc}</li>}
          {f.hasNonAc && <li>{t.tatkalNonAc}</li>}
        </ul>
      </section>

      <ScheduleTable stops={stops} totalKm={totalKm} t={sched} />

      {f.sameRoute.length > 0 && (
        <section className="mt-7">
          <h2 className="text-[19px] font-bold tracking-tight">
            {fill(t.otherTrains, { fromName: train.fromName, toName: train.toName })}
          </h2>
          <div className="mt-2.5 grid gap-2">
            {f.sameRoute.map((o) => (
              <Link
                key={o.number}
                href={lp(`/trains/${o.number}`)}
                className="card card-hover p-3 flex items-center justify-between gap-3"
              >
                <span className="min-w-0">
                  <span className="font-mono font-bold text-primary">{o.number}</span>
                  <span className="ml-2 text-[15px]">{o.name}</span>
                </span>
                <span className="text-[12px] text-muted shrink-0 tabular-nums">
                  {o.dep || "—"} → {o.arr || "—"}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{t.otherTrainsNote}</p>
        </section>
      )}

      {f.returnTrain && (
        <section className="mt-7">
          <h2 className="text-[19px] font-bold tracking-tight">{t.returnDirection}</h2>
          <Link
            href={lp(`/trains/${f.returnTrain.number}`)}
            className="card card-hover p-3 mt-2.5 flex items-center justify-between gap-3"
          >
            <span className="min-w-0">
              <span className="font-mono font-bold text-primary">{f.returnTrain.number}</span>
              <span className="ml-2 text-[15px]">{f.returnTrain.name}</span>
            </span>
            <span className="text-[12px] text-muted shrink-0 tabular-nums">
              {f.returnTrain.dep || "—"} → {f.returnTrain.arr || "—"}
            </span>
          </Link>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{t.returnDirectionNote}</p>
        </section>
      )}

      <div className="mt-7 flex flex-wrap gap-2.5">
        <Link href={lp("/booking-date-calculator")} className="btn-primary">
          {t.checkBookingDate}
        </Link>
        <Link href={lp("/reminders")} className="btn-secondary">
          {t.setReminder}
        </Link>
        <Link href={lp("/trains")} className="btn-secondary">
          {t.browseAllTrains}
        </Link>
      </div>

      <DataDisclaimer />
    </div>
  );
}
