import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { stationsByLetter, stationIndexLetters } from "@/lib/rail-data";
import { DEFAULT_LOCALE, isLocale, localePath, LOCALES, type Locale } from "@/i18n/locales";
import { stationIndexStrings } from "@/i18n/station-index-strings";
import { fill } from "@/i18n/train-page-strings";

// One page per letter that actually has stations, for every locale.
export function generateStaticParams() {
  const letters = stationIndexLetters().map((l) => l.letter.toLowerCase());
  return LOCALES.flatMap((lang) => letters.map((letter) => ({ lang, letter })));
}

function label(letter: string, numberBucket: string): string {
  return letter === "#" ? numberBucket : letter.toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; letter: string }>;
}): Promise<Metadata> {
  const { lang, letter: raw } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const letter = raw === "0-9" ? "#" : raw.toUpperCase();
  const t = stationIndexStrings(locale);
  const stations = stationsByLetter(letter);
  if (stations.length === 0) {
    return buildMetadata({ title: "Not found", description: "", path: `/stations/browse/${raw}`, noIndex: true, locale });
  }
  const shown = label(letter, t.numberBucket);
  return buildMetadata({
    title: fill(t.letterHeading, { letter: shown }),
    description: fill(t.letterSubtitle, { letter: shown, count: stations.length }),
    path: `/stations/browse/${letter === "#" ? "0-9" : letter.toLowerCase()}`,
    keywords: [`railway station codes ${shown}`, "station code list", "station code by letter"],
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; letter: string }>;
}) {
  const { lang: rawLang, letter: rawLetter } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const letter = rawLetter === "0-9" ? "#" : rawLetter.toUpperCase();
  const lp = (href: string) => localePath(lang, href);

  const stations = stationsByLetter(letter);
  if (stations.length === 0) notFound();

  const t = stationIndexStrings(lang);
  const letters = stationIndexLetters();
  const shown = label(letter, t.numberBucket);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb
        items={[
          { name: "Station Directory", href: "/stations" },
          { name: t.browseAZ, href: "/stations/browse/a" },
          { name: shown, href: `/stations/browse/${rawLetter}` },
        ]}
      />

      <h1 className="text-[24px] md:text-[30px] font-extrabold tracking-tight leading-tight">
        {fill(t.letterHeading, { letter: shown })}
      </h1>
      <p className="mt-2 text-muted text-[15px]">
        {fill(t.letterSubtitle, { letter: shown, count: stations.length.toLocaleString("en-IN") })}
      </p>

      {/* A–Z jump nav */}
      <nav aria-label={t.jumpToLetter} className="mt-4 flex flex-wrap gap-1.5">
        {letters.map(({ letter: L }) => {
          const slug = L === "#" ? "0-9" : L.toLowerCase();
          const active = L === letter;
          return (
            <Link
              key={L}
              href={lp(`/stations/browse/${slug}`)}
              aria-current={active ? "page" : undefined}
              className={`inline-grid place-items-center h-8 min-w-8 px-2 rounded-lg text-[13px] font-semibold transition-colors ${
                active ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground hover:bg-primary-soft"
              }`}
            >
              {L === "#" ? "0–9" : L}
            </Link>
          );
        })}
      </nav>

      <ul className="mt-5 divide-y divide-border rounded-xl border border-border overflow-hidden">
        {stations.map((s) => (
          <li key={s.code}>
            <Link
              href={lp(`/stations/${s.code.toLowerCase()}`)}
              className="flex items-center gap-3 px-3.5 py-3 hover:bg-primary-soft transition-colors"
            >
              <span className="font-mono font-bold text-primary text-[14px] tabular-nums min-w-[52px]">
                {s.code}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[15px] leading-tight">{s.name}</span>
                <span className="block text-[12px] text-muted mt-0.5 truncate">
                  {s.state || "—"}{s.zone ? ` · ${s.zone}` : ""}
                </span>
              </span>
              <span className="text-muted shrink-0" aria-hidden="true">›</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href={lp("/stations")} className="text-[14px] text-primary font-medium underline underline-offset-2">
          ← {t.backToDirectory}
        </Link>
      </div>

      <DataDisclaimer />
    </div>
  );
}
