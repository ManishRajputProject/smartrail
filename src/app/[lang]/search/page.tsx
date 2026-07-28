import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { Breadcrumb } from "@/components/Breadcrumb";
import { searchSite, type SearchItem } from "@/lib/search-index";
import { searchStationsFull } from "@/lib/rail-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "search", {
    title: "Search",
    description: "Search RailSetu's calculators, guides and station directory.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/search",
    noIndex: true,
    locale,
  });
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
  const { q = "" } = await searchParams;

  // Tools, guides and pages from the static index...
  const siteResults = q ? searchSite(q, 12) : [];
  // ...plus stations from the full 8,900-entry directory (server-only), which
  // the static index deliberately omits. Each links into the directory
  // pre-filtered to that station.
  const stationResults: SearchItem[] = q
    ? searchStationsFull(q, 12).map((s) => ({
        title: `${s.name} (${s.code})`,
        href: `/stations?q=${encodeURIComponent(s.code)}`,
        group: "Station" as const,
        keywords: "",
        hint: s.state || undefined,
      }))
    : [];
  const results = [...siteResults, ...stationResults];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "Search", href: "/search" }]} />
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight">
        {q ? <>Results for &quot;{q}&quot;</> : "Search"}
      </h1>

      <form action="/search" method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search tools, guides, stations…"
          aria-label="Search"
          className="input"
        />
        <button type="submit" className="btn-primary shrink-0">Search</button>
      </form>

      <p className="mt-3 text-[12px] text-muted">Tip: press ⌘K / Ctrl+K anywhere for instant search.</p>

      <div className="mt-5 space-y-2">
        {q && results.length === 0 && <p className="text-muted">No matches. Try a broader term.</p>}
        {results.map((item) => (
          <Link key={`${item.group}-${item.href}-${item.title}`} href={localePath(lang, item.href)} className="card card-hover flex items-center gap-3 p-3.5">
            <span className="flex-1">
              <span className="font-semibold text-[15px]">{item.title}</span>
              {item.hint && <span className="text-[12px] text-muted ml-2">{item.hint}</span>}
            </span>
            <span className="chip bg-surface-2 text-muted">{item.group}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
