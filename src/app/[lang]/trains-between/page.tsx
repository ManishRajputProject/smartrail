import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { getDictionary } from "@/i18n/dictionary";
import { TrainsBetweenClient } from "./TrainsBetweenClient";
import { HowItWorks } from "@/components/HowItWorks";
import { howItWorksStrings } from "@/i18n/how-it-works-strings";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "trains-between", {
    title: "Trains Between Stations — Find Every Train on a Route",
    description: "Search all Indian Railways trains running between any two stations, with live departure and arrival timings where available.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/trains-between",
    keywords: ["trains between stations", "trains from to", "train route finder", "which trains run between"],
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const page = localizePage(lang, "trains-between", {
    eyebrow: "Trains Between Stations",
    title: dict.live.trainsBetweenTitle,
    description: dict.live.trainsBetweenSubtitle,
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: page.eyebrow ?? "Trains Between Stations", href: "/trains-between" }]} />
      <p className="eyebrow mb-1">{page.eyebrow}</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">{page.title}</h1>
      <p className="mt-2 text-muted text-[15px] max-w-2xl">{page.description}</p>

      <div className="mt-5">
        <TrainsBetweenClient locale={lang} t={dict.live} />
      </div>

      <HowItWorks variant={howItWorksStrings(lang).between} />

      <DataDisclaimer />
    </div>
  );
}
