import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { searchTrains, popularTrains, allTrainsCount, trainIndexLetters } from "@/lib/rail-data";
import { localePath } from "@/i18n/locales";
import { trainIndexStrings } from "@/i18n/train-index-strings";
import { TRAIN_CATEGORIES } from "@/lib/train-categories";
import { HowItWorks } from "@/components/HowItWorks";
import { howItWorksStrings } from "@/i18n/how-it-works-strings";
import { RecentTrainChips } from "@/components/RecentTrainChips";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "trains", {
    title: "Train Finder — Search Indian Railways Trains by Number or Name",
    description: "Search over 5,000 Indian Railways trains by number or name. See source, destination, departure, arrival, duration and class availability.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/trains",
    keywords: ["train finder", "train number search", "indian railways train list", "train by name"],
    locale,
  });
}

function fmtDuration(h: number | null, m: number | null) {
  if (h == null) return "—";
  return `${h}h${m ? ` ${m}m` : ""}`;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const lp = (href: string) => localePath(lang, href);
  const { q = "" } = await searchParams;
  const results = q ? searchTrains(q, 50) : [];
  const popular = popularTrains();
  const letters = trainIndexLetters();
  const idx = trainIndexStrings(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "Train Finder", href: "/trains" }]} />
      <p className="eyebrow mb-1">Train Finder</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">
        Find any Indian Railways train
      </h1>
      <p className="mt-2 text-muted text-[15px] max-w-2xl">
        Search {allTrainsCount().toLocaleString("en-IN")}+ trains by number or name to see the route, timings,
        duration and which classes run.
      </p>

      <form action="/trains" method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="e.g. 12951 or Rajdhani"
          aria-label="Search trains"
          className="input"
        />
        <button type="submit" className="btn-primary shrink-0">Search</button>
      </form>

      {!q && <RecentTrainChips lang={lang} />}

      {q && (
        <p className="mt-3 text-sm text-muted">{results.length} result{results.length === 1 ? "" : "s"} for &quot;{q}&quot;</p>
      )}

      <div className="mt-4 space-y-2">
        {(q ? results : popular).map((t) => (
          <Link key={t.number} href={`/trains/${t.number}`} className="card card-hover flex items-center gap-3 p-3.5">
            <span className="font-mono font-bold text-primary text-[15px] shrink-0 tabular-nums">{t.number}</span>
            <span className="flex-1 min-w-0">
              <span className="font-semibold text-[14px] block truncate">{t.name}</span>
              <span className="text-[12px] text-muted">{t.fromName} → {t.toName}</span>
            </span>
            <span className="text-[12px] text-muted shrink-0 text-right">
              {t.dep || "—"}<br />{fmtDuration(t.durH, t.durM)}
            </span>
          </Link>
        ))}
        {q && results.length === 0 && (
          <p className="text-muted text-sm py-4">No trains matched. Try a train number or a name like &quot;Shatabdi&quot;.</p>
        )}
      </div>

      {!q && <p className="mt-2 text-[12px] text-muted">Showing popular trains — search above for any of {allTrainsCount().toLocaleString("en-IN")}.</p>}

      <DataDisclaimer />

      <HowItWorks variant={howItWorksStrings(lang).track} />

      {/* Premium train categories — Vande Bharat, Rajdhani, Shatabdi, etc. */}
      <section className="mt-8" aria-labelledby="browse-by-type">
        <h2 id="browse-by-type" className="text-lg font-bold tracking-tight mb-3">Browse by train type</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {TRAIN_CATEGORIES.map((c) => (
            <Link key={c.slug} href={lp(`/trains/category/${c.slug}`)} className="card card-hover p-3.5">
              <p className="font-semibold text-[14px]">{c.name}</p>
              <p className="text-[12px] text-muted mt-0.5">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* A–Z browse index — every train is one hop from here, for crawlers and browsing. */}
      <section className="mt-8" aria-labelledby="browse-az">
        <h2 id="browse-az" className="text-lg font-bold tracking-tight mb-1">{idx.browseAZ}</h2>
        <p className="text-[13px] text-muted mb-3">
          {idx.hubSubtitle.replace("{count}", allTrainsCount().toLocaleString("en-IN"))}
        </p>
        <nav aria-label={idx.jumpToLetter} className="flex flex-wrap gap-1.5">
          {letters.map(({ letter, count }) => {
            const slug = letter === "#" ? "0-9" : letter.toLowerCase();
            return (
              <Link
                key={letter}
                href={lp(`/trains/browse/${slug}`)}
                title={`${count.toLocaleString("en-IN")}`}
                className="inline-grid place-items-center h-9 min-w-9 px-2 rounded-lg text-[14px] font-semibold bg-surface-2 hover:bg-primary-soft hover:text-primary transition-colors"
              >
                {letter === "#" ? "0–9" : letter}
              </Link>
            );
          })}
        </nav>
      </section>

      <div className="mt-8">
        <h2 className="text-lg font-bold tracking-tight mb-2.5">Related</h2>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Link href="/stations" className="card card-hover p-3.5">
            <p className="font-semibold text-[14px]">Station Directory</p>
            <p className="text-[12px] text-muted mt-0.5">Look up any station code and zone.</p>
          </Link>
          <Link href="/booking-date-calculator" className="card card-hover p-3.5">
            <p className="font-semibold text-[14px]">Booking Date Calculator</p>
            <p className="text-[12px] text-muted mt-0.5">Find when booking opens for your journey.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
