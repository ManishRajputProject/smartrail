import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { nowIST, latestBookableJourneyDate, formatDateLong, ARP_DAYS } from "@/lib/irctc-rules";
import { computeLongWeekends } from "@/lib/holidays";
import { FeedbackVoteWidget } from "@/components/FeedbackVoteWidget";
import { SearchTrigger } from "@/components/SearchTrigger";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Free IRCTC Booking Date, Tatkal & Refund Calculators`,
  description:
    "Free calculators for IRCTC booking dates, Tatkal timing, refunds and more — plus free reminders so you never miss the booking window. No sign-up, always accurate.",
  path: "/",
});

const homeFaqs = [
  { question: "Is this site affiliated with IRCTC?", answer: "No. We're an independent, free tool — not affiliated with, endorsed by, or connected to IRCTC or Indian Railways." },
  { question: "Do I need to log in to use these tools?", answer: "No login is required for any calculator, checklist or planner on this site." },
  { question: "Is it really free?", answer: "Yes — every tool here is free to use, supported by ads rather than subscriptions." },
];

export default function Home() {
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
            FREE · NO LOGIN · ALWAYS CURRENT
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] rise-in-1">
            Know exactly when<br />
            <span className="gradient-text">your train booking opens</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-white/75 text-base md:text-lg leading-relaxed rise-in-2">
            IRCTC booking dates, Tatkal timing, refunds, waitlist odds and 5,000+ trains — answered in
            seconds, with free reminders so you never miss the window.
          </p>

          <div className="mt-6 w-full max-w-md mx-auto rise-in-3">
            <SearchTrigger variant="hero" />
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 rise-in-3">
            <Link href="/booking-date-calculator" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center hover:bg-white/16 transition-colors">
              <span className="block text-xs text-white/70">Today you can book up to</span>
              <span className="block text-2xl font-extrabold gradient-text mt-0.5 tabular-nums">{formatDateLong(latestBookable)}</span>
              <span className="block text-[11px] text-white/60 mt-0.5">{ARP_DAYS}-day window · opens 8:00 AM IST daily</span>
            </Link>

            <div className="flex flex-wrap justify-center gap-2.5">
              <Link href="/booking-date-calculator" className="btn-primary">Check Booking Date</Link>
              <Link href="/reminders" className="btn-on-dark">🔔 Set a Reminder</Link>
            </div>

            {upcomingLongWeekend && (
              <p className="text-[13px] text-white/70">
                Next long weekend: <strong className="text-white">{upcomingLongWeekend.holiday.name}</strong>{" "}
                ({upcomingLongWeekend.days} days) ·{" "}
                <Link href="/long-weekend-planner" className="text-[var(--primary-strong)] font-medium underline underline-offset-2">Plan it →</Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Rule ticker */}
      <div className="ticker text-[12px] font-medium">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex flex-wrap justify-center gap-x-6 gap-y-0.5 text-center">
          <span>⏱️ Tatkal AC opens 10:00 AM</span>
          <span>🕚 Tatkal Non-AC opens 11:00 AM</span>
          <span>📅 Advance booking: {ARP_DAYS} days ahead</span>
          <span>🗒️ Chart ~4 hrs before departure</span>
        </div>
      </div>

      {/* Calculators grid */}
      <section id="tools" className="reveal mx-auto max-w-6xl px-4 py-10">
        <p className="eyebrow">Calculators</p>
        <div className="flex flex-wrap items-end justify-between gap-2 mt-1">
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight">Quick answers, zero friction</h2>
          <p className="text-sm text-muted">8 rule-based calculators · updated for current IRCTC rules</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CALCULATOR_ROUTES.map((t) => (
            <Link key={t.href} href={t.href} className="card card-hover group p-4">
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
          <p className="eyebrow">Plan, Decide &amp; Look Up</p>
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight mt-1">Beyond calculators</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => (
              <Link key={t.href} href={t.href} className="card card-hover group p-4 flex items-start gap-3">
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
        <p className="eyebrow">Guides</p>
        <div className="flex flex-wrap items-end justify-between gap-2 mt-1">
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight">Understand the rules</h2>
          <Link href="/guides" className="text-sm text-primary font-semibold underline underline-offset-2">All guides →</Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.slice(0, 6).map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card card-hover group p-4">
              <div className="flex items-center gap-2">
                <span className="chip bg-primary-soft text-primary">{g.category}</span>
                <span className="text-[11px] text-muted">{g.readMins} min read</span>
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
            <p className="eyebrow">Why trust these numbers</p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-muted">
              <li>✅ Every rule lives in one dated, unit-tested module — checked against official IRCTC announcements</li>
              <li>✅ Honest uncertainty: the waitlist tool shows outlook bands, never a made-up percentage</li>
              <li>✅ Estimates labelled as estimates — fares and refunds always say &quot;verify on IRCTC&quot;</li>
              <li>✅ Train &amp; station data from India&apos;s Open Government Data, clearly marked as reference-only</li>
            </ul>
            <Link href="/about" className="inline-block mt-2.5 text-sm text-primary font-semibold underline underline-offset-2">
              How we keep data accurate →
            </Link>
          </div>
          <div>
            <p className="eyebrow">What&apos;s next</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[12px]">
              <span className="chip bg-success-soft text-success">✓ 8 calculators</span>
              <span className="chip bg-success-soft text-success">✓ Train Finder</span>
              <span className="chip bg-success-soft text-success">✓ Reminders</span>
              <span className="chip bg-accent-soft text-accent">⚙ Hindi guides</span>
              <span className="chip bg-surface-2 text-muted">◌ Live status (needs licensing)</span>
            </div>
            <p className="mt-3 text-sm font-semibold">Vote for what we build next:</p>
            <div className="mt-1.5"><FeedbackVoteWidget /></div>
          </div>
        </div>
      </section>

      {/* CTA (dark) */}
      <section className="section-dark hero-glow">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Don&apos;t miss your <span className="gradient-text">next window</span>
          </h2>
          <p className="mt-2.5 text-white/75 text-[15px]">
            Tatkal opens one day before your journey — 10 AM AC, 11 AM Non-AC. Lock a free reminder in seconds.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <Link href="/reminders" className="btn-primary">Set Reminder in 10 Seconds</Link>
            <Link href="/plan-ticket" className="btn-on-dark">Browse Booking Calendar</Link>
          </div>
          <p className="mt-3 text-xs text-white/60">No spam · No login · Free forever</p>
        </div>
      </section>
    </>
  );
}
