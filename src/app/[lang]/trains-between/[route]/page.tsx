import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { JsonLd } from "@/components/JsonLd";
import { POPULAR_ROUTES, findPopularRoute } from "@/lib/popular-routes";
import { getLiveTrainsBetween } from "@/lib/railradar";
import { DEFAULT_LOCALE, isLocale, localePath, LOCALES, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { routePageStrings } from "@/i18n/route-page-strings";
import { fill } from "@/i18n/train-page-strings";

export const dynamicParams = false; // only the known popular routes exist as static pages
export const revalidate = 3600; // matches getLiveTrainsBetween's own 1h cache

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => POPULAR_ROUTES.map((r) => ({ lang, route: r.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; route: string }>;
}): Promise<Metadata> {
  const { lang, route } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const r = findPopularRoute(route);
  if (!r) return { robots: { index: false, follow: false } };
  const s = routePageStrings(locale);

  const title = fill(s.heading, { fromLabel: r.fromLabel, toLabel: r.toLabel });
  const description =
    fill(s.intro, { fromLabel: r.fromLabel, from: r.from, toLabel: r.toLabel, to: r.to }) +
    (r.variants ? ` ${fill(s.alsoSearchedAs, { variants: r.variants.join(", ") })}` : "");

  return buildMetadata({
    title,
    description,
    path: `/trains-between/${route}`,
    keywords: [
      `${r.fromLabel} to ${r.toLabel} train`,
      `${r.from} to ${r.to} train time table`,
      `trains from ${r.fromLabel} to ${r.toLabel}`,
      ...(r.variants ?? []).map((v) => `${v} to ${r.toLabel} train`),
    ],
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; route: string }>;
}) {
  const { lang: raw, route } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const lp = (href: string) => localePath(lang, href);
  const dict = getDictionary(lang);
  const r = findPopularRoute(route);
  if (!r) notFound();

  const s = routePageStrings(lang);
  const trains = await getLiveTrainsBetween(r.from, r.to).catch(() => null);

  const heading = fill(s.heading, { fromLabel: r.fromLabel, toLabel: r.toLabel });
  const intro = fill(s.intro, { fromLabel: r.fromLabel, from: r.from, toLabel: r.toLabel, to: r.to });

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: heading,
          itemListElement: (trains ?? []).map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "TrainTrip", name: `${t.number} ${t.name}` },
          })),
        }}
      />
      <Breadcrumb
        items={[
          { name: dict.live.trainsBetweenEyebrow, href: "/trains-between" },
          { name: `${r.fromLabel} → ${r.toLabel}`, href: `/trains-between/${route}` },
        ]}
      />
      <p className="eyebrow mb-1">{dict.live.trainsBetweenEyebrow}</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">{heading}</h1>
      <p className="mt-2 text-muted text-[15px] max-w-2xl">
        {intro}
        {r.variants && r.variants.length > 0 && (
          <span className="block mt-1 text-[13px]">{fill(s.alsoSearchedAs, { variants: r.variants.join(", ") })}</span>
        )}
      </p>

      <div className="mt-5 space-y-2">
        {trains && trains.length > 0 ? (
          trains.map((t) => (
            <Link
              key={t.number}
              href={lp(`/trains/${t.number}`)}
              className="card card-hover flex items-center gap-3 p-3.5"
            >
              <span className="font-mono font-bold text-primary text-[15px] shrink-0 tabular-nums">{t.number}</span>
              <span className="flex-1 min-w-0">
                <span className="font-semibold text-[14px] block truncate">{t.name}</span>
                <span className="text-[12px] text-muted">{t.fromName} → {t.toName}</span>
              </span>
              <span className="text-[12px] text-muted shrink-0 text-right tabular-nums">
                {t.dep || "—"}<br />{t.arr || "—"}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-muted text-sm py-4 text-center">{s.noTrainsFound}</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          href={lp(
            `/trains-between?from=${r.from}&to=${r.to}&fromLabel=${encodeURIComponent(r.fromLabel)}&toLabel=${encodeURIComponent(r.toLabel)}`
          )}
          className="btn-secondary"
        >
          {s.searchDifferentRoute} →
        </Link>
      </div>

      <DataDisclaimer />
    </div>
  );
}
