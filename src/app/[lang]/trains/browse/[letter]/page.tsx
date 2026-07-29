import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { trainsByLetter, trainIndexLetters } from "@/lib/rail-data";
import { DEFAULT_LOCALE, isLocale, localePath, LOCALES, type Locale } from "@/i18n/locales";
import { trainIndexStrings } from "@/i18n/train-index-strings";
import { trainStrings, fill } from "@/i18n/train-page-strings";

// One page per letter that actually has trains, for every locale.
export function generateStaticParams() {
  const letters = trainIndexLetters().map((l) => l.letter.toLowerCase());
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
  const t = trainIndexStrings(locale);
  const trains = trainsByLetter(letter);
  if (trains.length === 0) {
    return buildMetadata({ title: "Not found", description: "", path: `/trains/browse/${raw}`, noIndex: true, locale });
  }
  const shown = label(letter, t.numberBucket);
  return buildMetadata({
    title: fill(t.letterHeading, { letter: shown }),
    description: fill(t.letterSubtitle, { letter: shown, count: trains.length }),
    path: `/trains/browse/${letter === "#" ? "0-9" : letter.toLowerCase()}`,
    keywords: [`indian railways trains ${shown}`, "train list", "train number by name"],
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

  const trains = trainsByLetter(letter);
  if (trains.length === 0) notFound();

  const t = trainIndexStrings(lang);
  const ts = trainStrings(lang);
  const letters = trainIndexLetters();
  const shown = label(letter, t.numberBucket);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb
        items={[
          { name: ts.trainFinder, href: "/trains" },
          { name: t.browseAZ, href: "/trains/browse/a" },
          { name: shown, href: `/trains/browse/${rawLetter}` },
        ]}
      />

      <h1 className="text-[24px] md:text-[30px] font-extrabold tracking-tight leading-tight">
        {fill(t.letterHeading, { letter: shown })}
      </h1>
      <p className="mt-2 text-muted text-[15px]">
        {fill(t.letterSubtitle, { letter: shown, count: trains.length.toLocaleString("en-IN") })}
      </p>

      {/* A–Z jump nav */}
      <nav aria-label={t.jumpToLetter} className="mt-4 flex flex-wrap gap-1.5">
        {letters.map(({ letter: L }) => {
          const slug = L === "#" ? "0-9" : L.toLowerCase();
          const active = L === letter;
          return (
            <Link
              key={L}
              href={lp(`/trains/browse/${slug}`)}
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
        {trains.map((tr) => (
          <li key={tr.number}>
            <Link
              href={lp(`/trains/${tr.number}`)}
              className="flex items-center gap-3 px-3.5 py-3 hover:bg-primary-soft transition-colors"
            >
              <span className="font-mono font-bold text-primary text-[14px] tabular-nums min-w-[52px]">
                {tr.number}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[15px] leading-tight">{tr.name}</span>
                <span className="block text-[12px] text-muted mt-0.5 truncate">
                  {tr.fromName} → {tr.toName}
                </span>
              </span>
              <span className="text-muted shrink-0" aria-hidden="true">›</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href={lp("/trains")} className="text-[14px] text-primary font-medium underline underline-offset-2">
          ← {t.backToFinder}
        </Link>
      </div>

      <DataDisclaimer />
    </div>
  );
}
