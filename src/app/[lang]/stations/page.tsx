import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { searchStationsFull, allStationsCount, stationIndexLetters, type Station } from "@/lib/rail-data";
import { STATIONS as POPULAR } from "@/lib/stations";
import { stationIndexStrings } from "@/i18n/station-index-strings";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "stations", {
    title: "Indian Railway Station Code Directory — Search 8,900+ Stations",
    description: "Search over 8,900 Indian Railways stations by name or code. See the station code, railway zone and state for any station.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/stations",
    keywords: ["railway station code list", "IRCTC station code lookup", "station code finder", "railway zone"],
    locale,
  });
}

function Row({ s, href }: { s: Station; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm hover:bg-primary-soft transition-colors">
      <div className="min-w-0">
        <span className="font-mono font-bold text-primary">{s.code}</span>
        <span className="ml-2">{s.name}</span>
      </div>
      <span className="text-[12px] text-muted shrink-0 text-right">
        {s.state || "—"}{s.zone ? ` · ${s.zone}` : ""}
      </span>
    </Link>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const lp = (href: string) => localePath(lang, href);
  const { q = "" } = await searchParams;
  const results = q ? searchStationsFull(q, 60) : [];
  const idx = stationIndexStrings(lang);
  const letters = stationIndexLetters();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "Station Directory", href: "/stations" }]} />
      <p className="eyebrow mb-1">Station Directory</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">Station Code Directory</h1>
      <p className="mt-2 text-muted text-[15px] max-w-2xl">
        Search {allStationsCount().toLocaleString("en-IN")}+ Indian Railways stations by name or code — with
        the railway zone and state for each.
      </p>

      <form action="/stations" method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by station name or code (e.g. NDLS, Chennai)…"
          aria-label="Search stations"
          className="input"
        />
        <button type="submit" className="btn-primary shrink-0">Search</button>
      </form>

      {q ? (
        <>
          <p className="mt-3 text-sm text-muted">{results.length} station{results.length === 1 ? "" : "s"} for &quot;{q}&quot;</p>
          <div className="mt-2 card divide-y divide-border overflow-hidden">
            {results.map((s) => <Row key={s.code} s={s} href={lp(`/stations/${s.code.toLowerCase()}`)} />)}
            {results.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted">No matching stations.</p>}
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">Major stations</p>
          <div className="mt-1.5 card divide-y divide-border overflow-hidden">
            {POPULAR.slice(0, 30).map((s) => (
              <Link
                key={s.code}
                href={lp(`/stations/${s.code.toLowerCase()}`)}
                className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm hover:bg-primary-soft transition-colors"
              >
                <div><span className="font-mono font-bold text-primary">{s.code}</span><span className="ml-2">{s.name}</span></div>
                <span className="text-[12px] text-muted shrink-0">{s.city}, {s.state}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <DataDisclaimer />

      {/* A–Z station code glossary — every station is one hop from here, for crawlers and browsing. */}
      <section className="mt-8" aria-labelledby="browse-station-az">
        <h2 id="browse-station-az" className="text-lg font-bold tracking-tight mb-1">{idx.browseAZ}</h2>
        <p className="text-[13px] text-muted mb-3">
          {idx.hubSubtitle.replace("{count}", allStationsCount().toLocaleString("en-IN"))}
        </p>
        <nav aria-label={idx.jumpToLetter} className="flex flex-wrap gap-1.5">
          {letters.map(({ letter, count }) => {
            const slug = letter === "#" ? "0-9" : letter.toLowerCase();
            return (
              <Link
                key={letter}
                href={lp(`/stations/browse/${slug}`)}
                title={`${count.toLocaleString("en-IN")}`}
                className="inline-grid place-items-center h-9 min-w-9 px-2 rounded-lg text-[14px] font-semibold bg-surface-2 hover:bg-primary-soft hover:text-primary transition-colors"
              >
                {letter === "#" ? "0–9" : letter}
              </Link>
            );
          })}
        </nav>
      </section>

      <div className="mt-6">
        <Link href="/trains" className="card card-hover p-3.5 block">
          <p className="font-semibold text-[14px]">🚆 Train Finder</p>
          <p className="text-[12px] text-muted mt-0.5">Search any train by number or name.</p>
        </Link>
      </div>
    </div>
  );
}
