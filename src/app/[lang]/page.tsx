import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { nowIST, latestBookableJourneyDate, formatDateLong } from "@/lib/irctc-rules";
import { computeLongWeekends } from "@/lib/holidays";
import { allTrainsCount, allStationsCount } from "@/lib/rail-data";
import { getLiveStationBoard } from "@/lib/railradar";
import { FeedbackVoteWidget } from "@/components/FeedbackVoteWidget";
import { TrainAnnouncementBar } from "@/components/TrainAnnouncementBar";
import { LiveTrainTicker } from "@/components/LiveTrainTicker";
import { QuickActionSearch } from "@/components/QuickActionSearch";
import { LiveDot } from "@/components/LiveDot";
import { ToolIcon } from "@/components/ToolIcon";
import { StatCounter } from "@/components/StatCounter";
import { FaqAccordion } from "@/components/FaqAccordion";
import { DEFAULT_LOCALE, isLocale, localePath, LOCALES, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { localizeTools } from "@/i18n/tool-translations";
import { localizeGuides, categoryLabel } from "@/i18n/guide-translations";

// `force-dynamic` bypasses the fetch cache entirely — even fetches that
// explicitly request caching (like the live-ticker's `revalidate: 120`) get
// forced to re-fetch on every single request, including bots and Next.js's
// own link-prefetching. That was burning RailRadar quota on every page view.
// A plain revalidate window regenerates the page (and its live data) at most
// once every 2 minutes, matching the ticker's own cache TTL.
export const revalidate = 120;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const d = getDictionary(locale);
  return buildMetadata({
    title: `${SITE_NAME} — ${d.common.homeMetaTitle}`,
    description: d.common.homeMetaDescription,
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
  const { hero, sections, cta } = dict;
  const calculators = localizeTools(lang, CALCULATOR_ROUTES);
  const planTools = localizeTools(lang, DECISION_TOOL_ROUTES);
  const directoryTools = localizeTools(lang, COMMUNITY_ROUTES);
  const guides = localizeGuides(lang, GUIDES).slice(0, 6);

  const today = nowIST();
  const latestBookable = latestBookableJourneyDate(today);
  const upcomingLongWeekend = computeLongWeekends(today)[0];

  // New Delhi is one of the busiest hubs on the network — a reliable source
  // of real, currently-moving trains for the homepage ticker. Renders
  // nothing if the live feed is empty rather than showing stale data.
  const liveBoard = await getLiveStationBoard("NDLS").catch(() => null);
  const liveTickerTrains = (liveBoard?.trains ?? []).slice(0, 8);

  // Every figure below is a verifiable fact about the product — no invented traffic numbers.
  const stats = [
    { value: allTrainsCount(), label: "Trains in the database", href: "/trains" },
    { value: allStationsCount(), label: "Stations you can look up", href: "/stations" },
    { value: CALCULATOR_ROUTES.length + DECISION_TOOL_ROUTES.length + COMMUNITY_ROUTES.length, label: "Free tools, no login", href: "#tools" },
    { value: LOCALES.length, label: "Languages supported", href: "#tools" },
  ];

  // Real station codes only — each links straight into Trains Between
  // Stations with both ends pre-filled, so the result is the live search,
  // never a fabricated preview.
  const popularRoutes = [
    { from: "NDLS", fromLabel: "New Delhi", to: "BCT", toLabel: "Mumbai Central" },
    { from: "BCT", fromLabel: "Mumbai Central", to: "PUNE", toLabel: "Pune Jn" },
    { from: "MAS", fromLabel: "Chennai Central", to: "SBC", toLabel: "Bengaluru" },
    { from: "HWH", fromLabel: "Howrah", to: "NDLS", toLabel: "New Delhi" },
    { from: "SC", fromLabel: "Secunderabad", to: "MAS", toLabel: "Chennai Central" },
    { from: "ADI", fromLabel: "Ahmedabad", to: "BCT", toLabel: "Mumbai Central" },
    { from: "JP", fromLabel: "Jaipur", to: "NDLS", toLabel: "New Delhi" },
    { from: "LKO", fromLabel: "Lucknow", to: "NDLS", toLabel: "New Delhi" },
  ];

  const roadmap = [
    { state: "done", title: "Calculators & planners", body: "All 8 calculators plus the planning and decision tools." },
    { state: "done", title: "Train & station lookup", body: "5,000+ trains and 8,900+ stations from open government data." },
    { state: "done", title: "Live train tracking", body: "Real-time status, delay, platform, coach formation and route maps for any train." },
    { state: "done", title: "8 Indian languages", body: "Interface, tools and guide summaries fully localized." },
    { state: "active", title: "Live features in every language", body: "Live tracking UI is translated; guide articles are still rolling out language by language." },
    { state: "next", title: "Deeper station guides", body: "Layouts, facilities and getting-there notes for major stations." },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-5xl px-6 pt-12 pb-14 md:pt-16 md:pb-20 text-center">
          <p className="chip mx-auto border border-border bg-surface text-muted shadow-sm rise-in">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            {hero.badge}
          </p>

          <h1 className="mt-6 text-[40px] leading-[1.08] md:text-[68px] md:leading-[1.04] font-extrabold tracking-[-0.02em] rise-in-1">
            {hero.title1}
            <br />
            <span className="gradient-text-brand">{hero.title2}</span>
          </h1>

          <p className="mt-4 max-w-xl mx-auto text-muted text-[17px] md:text-[19px] leading-relaxed rise-in-2">
            {hero.subtitle}
          </p>

          <div className="mt-7 rise-in-3">
            <QuickActionSearch lang={lang} />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 rise-in-3">
            <Link href={lp("/booking-date-calculator")} className="btn-primary">{hero.checkBooking}</Link>
            <Link href={lp("/reminders")} className="btn-secondary">{hero.setReminder}</Link>
          </div>

          {/* Live booking window */}
          <div className="mt-10 rise-in-3">
            <Link
              href={lp("/booking-date-calculator")}
              className="panel card-hover inline-flex flex-col items-center px-8 py-6 text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{hero.bookUpTo}</span>
              <span className="mt-2 block text-[30px] md:text-[36px] font-extrabold gradient-text-brand tabular-nums leading-tight">
                {formatDateLong(latestBookable)}
              </span>
              <span className="mt-2 text-[13px] text-muted">{hero.windowNote}</span>
            </Link>

            {upcomingLongWeekend && (
              <p className="mt-6 text-sm text-muted">
                {hero.nextLongWeekend}: <strong className="text-foreground">{upcomingLongWeekend.holiday.name}</strong>{" "}
                ({upcomingLongWeekend.days} {hero.days}) ·{" "}
                <Link href={lp("/long-weekend-planner")} className="text-primary font-semibold underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                  {hero.planIt} →
                </Link>
              </p>
            )}

            {/* Rolling announcements */}
            <div className="mt-10 w-full">
              <TrainAnnouncementBar dict={dict} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE RIGHT NOW ================= */}
      <section className="reveal border-b border-border bg-primary-soft/50">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow inline-flex items-center gap-2">
              <LiveDot />
              {sections.liveEyebrow}
            </p>
            <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
              {sections.liveTitle}
            </h2>
            <p className="mt-3 text-muted text-[17px] leading-relaxed">{sections.liveSub}</p>
          </div>

          {liveTickerTrains.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 inline-flex items-center gap-2 text-[13px] font-semibold text-muted">
                <LiveDot />
                Right now at New Delhi (NDLS)
              </p>
              <LiveTrainTicker trains={liveTickerTrains} lang={lang} />
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/trains", icon: "trains" as const, title: sections.liveTrackTitle, desc: sections.liveTrackDesc },
              { href: "/trains-between", icon: "trains-between" as const, title: sections.liveBetweenTitle, desc: sections.liveBetweenDesc },
              { href: "/stations", icon: "stations" as const, title: sections.liveBoardTitle, desc: sections.liveBoardDesc },
            ].map((c) => (
              <Link key={c.href} href={lp(c.href)} className="card card-hover group p-6 flex flex-col bg-surface">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <ToolIcon href={c.href} className="h-6 w-6" />
                  </span>
                  <span className="chip bg-emerald-500/10 text-emerald-600 inline-flex items-center gap-1.5">
                    <LiveDot />
                    LIVE
                  </span>
                </div>
                <h3 className="mt-5 font-semibold text-[17px] leading-snug group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="mt-3 text-[14px] text-muted leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR ROUTES ================= */}
      <section className="reveal mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Popular Routes</p>
          <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
            Find trains on the busiest routes
          </h2>
          <p className="mt-3 text-muted text-[17px] leading-relaxed">Jump straight to live trains between two major stations.</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map((r) => (
            <Link
              key={`${r.from}-${r.to}`}
              href={lp(
                `/trains-between?from=${r.from}&to=${r.to}&fromLabel=${encodeURIComponent(r.fromLabel)}&toLabel=${encodeURIComponent(r.toLabel)}`
              )}
              className="card card-hover group flex items-center justify-between gap-2 p-4"
            >
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-semibold group-hover:text-primary transition-colors">
                  {r.fromLabel} → {r.toLabel}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-muted">{r.from} → {r.to}</span>
              </span>
              <span className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= CALCULATORS ================= */}
      <section id="tools" className="reveal mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">{sections.calculators}</p>
          <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
            {sections.calculatorsTitle}
          </h2>
          <p className="mt-3 text-muted text-[17px] leading-relaxed">{sections.calculatorsSub}</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map((t) => (
            <Link key={t.href} href={lp(t.href)} className="card card-hover group p-6 flex flex-col">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <ToolIcon href={t.href} className="h-6 w-6" />
              </span>
              <span className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">{t.tag}</span>
              <h3 className="mt-2 font-semibold text-[17px] leading-snug group-hover:text-primary transition-colors">{t.label}</h3>
              <p className="mt-3 text-[14px] text-muted leading-relaxed">{t.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= PLAN & DECIDE ================= */}
      <section className="reveal border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">{sections.planDecide}</p>
            <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
              {sections.planDecideTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {planTools.map((t) => (
              <Link key={t.href} href={lp(t.href)} className="card card-hover group p-6 flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                  <ToolIcon href={t.href} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-[16px] leading-snug group-hover:text-primary transition-colors">{t.label}</h3>
                  <p className="mt-2 text-[14px] text-muted leading-relaxed">{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DIRECTORIES & LIVE TOOLS ================= */}
      <section className="reveal mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">{sections.directoryEyebrow}</p>
          <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
            {sections.directoryTitle}
          </h2>
          <p className="mt-3 text-muted text-[17px] leading-relaxed">{sections.directorySub}</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {directoryTools.map((t) => (
            <Link key={t.href} href={lp(t.href)} className="card card-hover group p-6 flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                <ToolIcon href={t.href} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold text-[16px] leading-snug group-hover:text-primary transition-colors">{t.label}</h3>
                <p className="mt-2 text-[14px] text-muted leading-relaxed">{t.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= TRUST / STATS ================= */}
      <section className="reveal mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">{sections.whyTrust}</p>
          <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
            Built on rules you can check
          </h2>
          <p className="mt-3 text-muted text-[17px] leading-relaxed">
            Every figure here is a fact about the product itself — not a traffic claim we can&apos;t prove.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Link key={s.label} href={s.href.startsWith("#") ? s.href : lp(s.href)} className="panel card-hover p-8 text-center">
              <p className="text-[38px] md:text-[44px] font-extrabold tracking-tight gradient-text-brand leading-none">
                <StatCounter value={s.value} />
              </p>
              <p className="mt-3 text-[14px] text-muted leading-snug">{s.label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { t: "Dated, tested rules", d: "Every IRCTC rule lives in one version-controlled module with a “last verified” date and automated tests." },
            { t: "Honest uncertainty", d: "The waitlist tool shows outlook bands, never a made-up percentage. Estimates are labelled as estimates." },
            { t: "Sourced, open data", d: "Train and station data comes from India’s Open Government Data, clearly marked as reference-only." },
          ].map((c) => (
            <div key={c.t} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-success-soft text-success" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="font-semibold text-[16px]">{c.t}</h3>
              </div>
              <p className="mt-4 text-[14px] text-muted leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href={lp("/about")} className="btn-secondary">{sections.howAccurate} →</Link>
        </div>
      </section>

      {/* ================= GUIDES ================= */}
      <section className="reveal border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">{sections.guides}</p>
              <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">{sections.guidesTitle}</h2>
            </div>
            <Link href={lp("/guides")} className="btn-secondary">{sections.allGuidesLink} →</Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={lp(`/guides/${g.slug}`)} className="card card-hover group p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="chip bg-primary-soft text-primary">{categoryLabel(lang, g.category)}</span>
                  <span className="text-[12px] text-muted">{g.readMins} {dict.common.minRead}</span>
                </div>
                <h3 className="mt-4 font-semibold text-[17px] leading-snug group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="mt-3 text-[14px] text-muted leading-relaxed line-clamp-3">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ROADMAP ================= */}
      <section className="reveal mx-auto max-w-4xl px-6 py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">{sections.whatsNext}</p>
          <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">Where this is going</h2>
        </div>

        <ol className="mt-10 relative">
          {/* connecting line */}
          <span className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-1/2" aria-hidden="true" />
          {roadmap.map((r, i) => (
            <li key={r.title} className="relative pl-12 pb-7 last:pb-0 md:pl-0 md:grid md:grid-cols-2 md:gap-12">
              <span
                className={`absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border-2 md:left-1/2 md:-translate-x-1/2 ${
                  r.state === "done"
                    ? "bg-success-soft border-success text-success"
                    : r.state === "active"
                      ? "bg-accent-soft border-accent text-accent-foreground"
                      : "bg-surface border-border text-muted"
                }`}
                aria-hidden="true"
              >
                {r.state === "done" ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                ) : r.state === "active" ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-current opacity-60" />
                )}
              </span>

              <div className={i % 2 === 0 ? "md:text-right md:pr-4" : "md:col-start-2 md:pl-4"}>
                <div className="card p-6">
                  <h3 className="font-semibold text-[16px]">{r.title}</h3>
                  <p className="mt-2 text-[14px] text-muted leading-relaxed">{r.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 panel p-7 text-center">
          <p className="font-semibold text-[17px]">{sections.voteNext}</p>
          <div className="mt-5 flex justify-center">
            <FeedbackVoteWidget />
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="reveal mx-auto max-w-3xl px-6 py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 text-[30px] md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
            Frequently asked questions
          </h2>
        </div>
        <FaqAccordion items={homeFaqs} title="" />
      </section>

      {/* ================= CTA ================= */}
      <section className="section-dark hero-glow">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20 text-center">
          <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.02em] leading-tight">
            {cta.title1} <span className="gradient-text">{cta.title2}</span>
          </h2>
          <p className="mt-4 text-white/70 text-[17px] leading-relaxed">{cta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={lp("/reminders")} className="btn-primary">{cta.setReminder}</Link>
            <Link href={lp("/plan-ticket")} className="btn-on-dark">{cta.browseCalendar}</Link>
          </div>
          <p className="mt-6 text-[13px] text-white/50">{cta.noSpam}</p>
        </div>
      </section>
    </>
  );
}
