import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { StationLiveBoard } from "@/components/StationLiveBoard";
import { getStationByCode } from "@/lib/rail-data";
import { STATIONS as POPULAR_STATIONS } from "@/lib/stations";
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { fill } from "@/i18n/train-page-strings";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    POPULAR_STATIONS.map((s) => ({ lang, code: s.code.toLowerCase() }))
  );
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; code: string }>;
}): Promise<Metadata> {
  const { lang, code: raw } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const code = raw.toUpperCase();
  const station = getStationByCode(code);
  const name = station?.name ?? code;

  return buildMetadata({
    title: fill(dict.live.stationPageTitle, { name, code }),
    description: fill(dict.live.stationPageDescription, { name, code }),
    path: `/stations/${code.toLowerCase()}`,
    keywords: [code, `${name} station code`, `${name} live status`, "station departures"],
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; code: string }>;
}) {
  const { lang: rawLang, code: rawCode } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const code = rawCode.toUpperCase();
  const dict = getDictionary(lang);
  const station = getStationByCode(code);
  const name = station?.name ?? code;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb
        items={[
          { name: "Station Directory", href: "/stations" },
          { name: code, href: `/stations/${rawCode}` },
        ]}
      />

      <p className="font-mono font-bold text-primary tabular-nums">{code}</p>
      <h1 className="text-[24px] md:text-[30px] font-extrabold tracking-tight leading-tight mt-0.5">
        {name}
      </h1>
      {station && (
        <p className="mt-1 text-[13px] text-muted">
          {station.state || "—"}{station.zone ? ` · ${station.zone} zone` : ""}
        </p>
      )}

      <section className="mt-5">
        <h2 className="text-[17px] font-bold tracking-tight">{dict.live.viewLiveBoard}</h2>
        <StationLiveBoard stationCode={code} locale={lang} t={dict.live} />
      </section>

      <DataDisclaimer />
    </div>
  );
}
