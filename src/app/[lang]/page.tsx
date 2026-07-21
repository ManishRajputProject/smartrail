import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { nowIST, latestBookableJourneyDate, formatDateLong } from "@/lib/irctc-rules";
import { computeLongWeekends } from "@/lib/holidays";
import { FeedbackVoteWidget } from "@/components/FeedbackVoteWidget";
import { SearchTrigger } from "@/components/SearchTrigger";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizeTools } from "@/i18n/tool-translations";
import { localizeGuides, categoryLabel } from "@/i18n/guide-translations";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
    title: `${SITE_NAME} — Free IRCTC Booking Date, Tatkal & Refund Calculators`,
    description:
      "Free calculators for IRCTC booking dates, Tatkal timing, refunds and more — plus free reminders so you never miss the booking window. No sign-up, always accurate.",
    path: "/",
    locale,
  });
}

const homeFaqs = [
  { question: "Is this site affiliated with IRCTC?", answer: "No. We're an independent, free tool — not affiliated with, endorsed by, or connected to IRCTC or Indian Railways." },
  { question: "Do I need to log in to use these tools?", answer: "No login is required for any calculator, checklist or planner on this site." },
  { question: "Is it really free?", answer: "Yes — every tool here is free to use, supported by ads rather than subscriptions." },
];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const lp = (href: string) => localePath(lang, href);
  const { hero, ticker, sections, cta } = dict;
  const calculators = localizeTools(lang, CALCULATOR_ROUTES);
  const planTools = localizeTools(lang, [...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES]);
  const guides = localizeGuides(lang, GUIDES).slice(0, 6);

  const today = nowIST();
  const latestBookable = latestBookableJourneyDate(today);
  const upcomingLongWeekend = computeLongWeekends(today)[0];

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* Hero (dark) */}
      <section className="section-dark hero-glow">
        <div className="mx-auto max-w-5xl px-4 pt-12 pb-12 md:pt-16 md:pb-16 text-center">
          <p className="chip mx-auto border border-white/20 bg-white/10 text-white/85 rise-in">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] rise-in-1">
            {hero.title1}<br />
            <span className="gradient-text">{hero.title2}</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-white/75 text-base md:text-lg leading-relaxed rise-in-2">
            {hero.subtitle}
          </p>

          <div className="mt-6 w-full max-w-md mx-auto rise-in-3">
            <SearchTrigger variant="hero" />
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 rise-in-3">
            <Link href={lp("/booking-date-calculator")} className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center hover:bg-white/16 transition-colors">
              <span className="block text-xs text-white/70">{hero.bookUpTo}</span>
              <span className="block text-2xl font-extrabold gradient-text mt-0.5 tabular-nums">{formatDateLong(latestBookable)}</span>
              <span className="block text-[11px] text-white/60 mt-0.5">{hero.windowNote}</span>
            </Link>

            <div className="flex flex-wrap justify-center gap-2.5">
              <Link href={lp("/booking-date-calculator")} className="btn-primary">{hero.checkBooking}</Link>
              <Link href={lp("/reminders")} className="btn-on-dark">🔔 {hero.setReminder}</Link>
            </div>

            {upcomingLongWeekend && (
              <p className="text-[13px] text-white/70">
                {hero.nextLongWeekend}: <strong className="text-white">{upcomingLongWeekend.holiday.name}</strong>{" "}
                ({upcomingLongWeekend.days} {hero.days}) ·{" "}
                <Link href={lp("/long-weekend-planner")} className="text-[var(--primary-strong)] font-medium underline underline-offset-2">{hero.planIt} →</Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Rule ticker */}
      <div className="ticker text-[12px] font-medium">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex flex-wrap justify-center gap-x-6 gap-y-0.5 text-center">
          <span>⏱️ {ticker.tatkalAc}</span>
          <span>🕚 {ticker.tatkalNonAc}</span>
          <span>📅 {ticker.advance}</span>
          <span>🗒️ {ticker.chart}</span>
        </div>
      </div>

      {/* Calculators grid */}
      <section id="tools" className="reveal mx-auto max-w-6xl px-4 py-10">
        <p className="eyebrow">{sections.calculators}</p>
        <div className="flex flex-wrap items-end justify-between gap-2 mt-1">
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight">{sections.calculatorsTitle}</h2>
          <p className="text-sm text-muted">{sections.calculatorsSub}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map((t) => (
            <Link key={t.href} href={lp(t.href)} className="card card-hover group p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg text-lg bg-primary-soft" aria-hidden="true">{t.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{t.tag}</span>
              </div>
              <h3 className="font-semibold mt-2.5 text-[15px] group-hover:text-primary transition-colors">{t.label}</h3>
              <p className="text-[13px] text-muted mt-1 leading-snug">{t.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Decision + data tools */}
      <section className="bg-surface-2/50 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="eyebrow">{sections.planDecide}</p>
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight mt-1">{sections.planDecideTitle}</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {planTools.map((t) => (
              <Link key={t.href} href={lp(t.href)} className="card card-hover group p-4 flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl bg-primary-soft" aria-hidden="true">{t.icon}</span>
                <div>
                  <h3 className="font-semibold text-[15px] group-hover:text-primary transition-colors">{t.label}</h3>
                  <p className="text-[13px] text-muted mt-0.5 leading-snug">{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="reveal mx-auto max-w-6xl px-4 py-10">
        <p className="eyebrow">{sections.guides}</p>
        <div className="flex flex-wrap items-end justify-between gap-2 mt-1">
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight">{sections.guidesTitle}</h2>
          <Link href={lp("/guides")} className="text-sm text-primary font-semibold underline underline-offset-2">{sections.allGuidesLink} →</Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.slug} href={lp(`/guides/${g.slug}`)} className="card card-hover group p-4">
              <div className="flex items-center gap-2">
                <span className="chip bg-primary-soft text-primary">{categoryLabel(lang, g.category)}</span>
                <span className="text-[11px] text-muted">{g.readMins} {dict.common.minRead}</span>
              </div>
              <h3 className="font-semibold mt-2 text-[15px] leading-snug group-hover:text-primary transition-colors">{g.title}</h3>
              <p className="text-[13px] text-muted mt-1 leading-snug line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust + roadmap */}
      <section className="bg-surface-2/50 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="eyebrow">{sections.whyTrust}</p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-muted">
              <li>✅ Every rule lives in one dated, unit-tested module — checked against official IRCTC announcements</li>
              <li>✅ Honest uncertainty: the waitlist tool shows outlook bands, never a made-up percentage</li>
              <li>✅ Estimates labelled as estimates — fares and refunds always say &quot;verify on IRCTC&quot;</li>
              <li>✅ Train &amp; station data from India&apos;s Open Government Data, clearly marked as reference-only</li>
            </ul>
            <Link href={lp("/about")} className="inline-block mt-2.5 text-sm text-primary font-semibold underline underline-offset-2">
              {sections.howAccurate} →
            </Link>
          </div>
          <div>
            <p className="eyebrow">{sections.whatsNext}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[12px]">
              <span className="chip bg-success-soft text-success">✓ 8 calculators</span>
              <span className="chip bg-success-soft text-success">✓ Train Finder</span>
              <span className="chip bg-success-soft text-success">✓ 8 languages</span>
              <span className="chip bg-accent-soft text-accent">⚙ More translations</span>
              <span className="chip bg-surface-2 text-muted">◌ Live status (needs licensing)</span>
            </div>
            <p className="mt-3 text-sm font-semibold">{sections.voteNext}</p>
            <div className="mt-1.5"><FeedbackVoteWidget /></div>
          </div>
        </div>
      </section>

      {/* CTA (dark) */}
      <section className="section-dark hero-glow">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {cta.title1} <span className="gradient-text">{cta.title2}</span>
          </h2>
          <p className="mt-2.5 text-white/75 text-[15px]">{cta.subtitle}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <Link href={lp("/reminders")} className="btn-primary">{cta.setReminder}</Link>
            <Link href={lp("/plan-ticket")} className="btn-on-dark">{cta.browseCalendar}</Link>
          </div>
          <p className="mt-3 text-xs text-white/60">{cta.noSpam}</p>
        </div>
      </section>
    </>
  );
}
