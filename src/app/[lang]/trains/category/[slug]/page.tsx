import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { trainsByType } from "@/lib/rail-data";
import { TRAIN_CATEGORIES, getTrainCategory } from "@/lib/train-categories";
import { DEFAULT_LOCALE, isLocale, localePath, LOCALES, type Locale } from "@/i18n/locales";
import { trainStrings, fill } from "@/i18n/train-page-strings";
import { trainCategoryStrings } from "@/i18n/train-category-strings";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => TRAIN_CATEGORIES.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const category = getTrainCategory(slug);
  if (!category) {
    return buildMetadata({ title: "Not found", description: "", path: `/trains/category/${slug}`, noIndex: true, locale });
  }
  const cs = trainCategoryStrings(locale);
  const count = trainsByType(category.typeCode).length;
  return buildMetadata({
    title: `${category.name} — Trains, Routes & Live Status`,
    description: fill(cs.subtitle, { count, name: category.name }),
    path: `/trains/category/${category.slug}`,
    keywords: [category.name.toLowerCase(), `${category.name.toLowerCase()} live status`, "indian railways train list"],
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const lp = (href: string) => localePath(lang, href);

  const category = getTrainCategory(slug);
  if (!category) notFound();

  const trains = trainsByType(category.typeCode);
  const ts = trainStrings(lang);
  const cs = trainCategoryStrings(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb
        items={[
          { name: ts.trainFinder, href: "/trains" },
          { name: cs.browseByType, href: "/trains" },
          { name: category.name, href: `/trains/category/${category.slug}` },
        ]}
      />

      <h1 className="text-[24px] md:text-[30px] font-extrabold tracking-tight leading-tight">{category.name}</h1>
      <p className="mt-2 text-muted text-[15px]">{category.description}</p>
      <p className="mt-1 text-[13px] text-muted">
        {fill(cs.subtitle, { count: trains.length.toLocaleString("en-IN"), name: category.name })}
      </p>

      {/* Category jump nav */}
      <nav aria-label={cs.otherCategories} className="mt-4 flex flex-wrap gap-1.5">
        {TRAIN_CATEGORIES.map((c) => {
          const active = c.slug === category.slug;
          return (
            <Link
              key={c.slug}
              href={lp(`/trains/category/${c.slug}`)}
              aria-current={active ? "page" : undefined}
              className={`inline-grid place-items-center px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                active ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground hover:bg-primary-soft"
              }`}
            >
              {c.name}
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
                <span className="block text-[15px] leading-tight truncate">{tr.name}</span>
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
          ← {cs.backToFinder}
        </Link>
      </div>

      <DataDisclaimer />
    </div>
  );
}
