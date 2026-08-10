import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, SITE_NAME, absoluteUrl } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizeGuide, categoryLabel } from "@/i18n/guide-translations";
import { guideBody } from "@/i18n/guide-bodies";
import { AdSlot } from "@/components/AdSlot";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const base = getGuideBySlug(slug);
  const guide = base ? localizeGuide(locale, base) : undefined;
  if (!guide) return buildMetadata({ title: "Guide Not Found", description: "This guide doesn't exist.", path: `/guides/${slug}`, noIndex: true });

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [guide.category, "IRCTC", "Indian Railways"],
    locale,
  });
}

function articleJsonLd(guide: NonNullable<ReturnType<typeof getGuideBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.published,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/about") },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const base = getGuideBySlug(slug);
  if (!base) notFound();
  const localized = localizeGuide(lang, base);
  const translatedBody = guideBody(lang, slug);
  const guide = translatedBody ? { ...localized, sections: translatedBody } : localized;

  const related = GUIDES.filter((g) => g.slug !== guide.slug && g.category === guide.category)
    .slice(0, 2)
    .map((g) => localizeGuide(lang, g));

  return (
    <article className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <JsonLd data={articleJsonLd(guide)} />
      <Breadcrumb items={[{ name: dict.nav.guides, href: "/guides" }, { name: guide.title, href: `/guides/${guide.slug}` }]} />

      <div className="flex items-center gap-2 flex-wrap">
        <span className="chip bg-primary-soft text-primary">{categoryLabel(lang, guide.category)}</span>
        <span className="text-[12px] text-muted">{guide.readMins} {dict.common.minRead}</span>
        <span className="text-[12px] text-muted">· Updated <time dateTime={guide.updated}>{guide.updated}</time></span>
      </div>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight mt-2">{guide.title}</h1>

      {guide.bannerSvg && (
        <div
          className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface-2 [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: guide.bannerSvg }}
        />
      )}

      {/* Quick answer — direct, quotable summary (GEO) */}
      <div className="card mt-4 p-4 border-l-4" style={{ borderLeftColor: "var(--primary)" }}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">{dict.common.quickAnswer}</p>
        <p className="text-[15px] leading-relaxed font-medium">{guide.quickAnswer}</p>
      </div>

      <div className="mt-6 space-y-6">
        {guide.sections.map((section, i) => (
          <section key={i}>
            {section.heading && <h2 className="text-xl font-bold tracking-tight mb-2">{section.heading}</h2>}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-muted leading-relaxed mb-2.5 text-[15px]">{p}</p>
            ))}
            {section.list && (
              <ul className="space-y-1.5 mt-1">
                {section.list.map((item, k) => (
                  <li key={k} className="flex gap-2 text-[15px] text-muted leading-relaxed">
                    <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.illustrationSvg && (
              <div
                className="mt-3 overflow-hidden rounded-xl border border-border bg-surface-2 p-2 [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: section.illustrationSvg }}
              />
            )}
          </section>
        ))}
      </div>

      <AdSlot placement="footer" />

      {guide.relatedTool && (
        <Link href={localePath(lang, guide.relatedTool.href)} className="btn-primary mt-6 inline-flex">
          Open {guide.relatedTool.label} →
        </Link>
      )}

      {guide.sources && guide.sources.length > 0 && (
        <div className="mt-8 rounded-xl bg-surface-2/60 border border-border p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">{dict.common.verifiedAgainst}</p>
          <ul className="space-y-1 text-[13px]">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="nofollow noopener" className="text-primary underline underline-offset-2">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-muted">
            Published <time dateTime={guide.published}>{guide.published}</time> · Last reviewed{" "}
            <time dateTime={guide.updated}>{guide.updated}</time> · Independent guide — see{" "}
            <Link href={localePath(lang, "/about")} className="underline underline-offset-2">our methodology</Link>.
          </p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold tracking-tight mb-2.5">{dict.common.keepReading}</h2>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {related.map((g) => (
              <Link key={g.slug} href={localePath(lang, `/guides/${g.slug}`)} className="card card-hover p-3.5">
                <p className="font-semibold text-[14px] leading-snug">{g.title}</p>
                <p className="text-[12px] text-muted mt-1">{g.readMins} min read</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
