import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { nowIST, latestBookableJourneyDate, formatDateLong, ARP_DAYS } from "@/lib/irctc-rules";
import { computeLongWeekends } from "@/lib/holidays";
import { FeedbackVoteWidget } from "@/components/FeedbackVoteWidget";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Free IRCTC Booking Date, Tatkal & Refund Calculators`,
  description:
    "Free calculators for IRCTC booking dates, Tatkal timing, refunds and more — plus free reminders so you never miss the booking window. No sign-up, always accurate.",
  path: "/",
});

const homeFaqs = [
  {
    question: "Is this site affiliated with IRCTC?",
    answer: "No. We're an independent, free tool — not affiliated with, endorsed by, or connected to IRCTC or Indian Railways.",
  },
  {
    question: "Do I need to log in to use these tools?",
    answer: "No login is required for any calculator, checklist or planner on this site.",
  },
  {
    question: "Is it really free?",
    answer: "Yes — every tool here is free to use, supported by ads rather than subscriptions.",
  },
];

export default function Home() {
  const today = nowIST();
  const latestBookable = latestBookableJourneyDate(today);
  const upcomingLongWeekend = computeLongWeekends(today)[0];

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted mb-6">
            FREE · NO LOGIN · ALWAYS CURRENT
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Know Exactly When<br />
            <span className="text-primary">Your Train Booking Opens</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted text-lg leading-relaxed">
            Free calculators for IRCTC booking dates, Tatkal timing, refunds and more — plus free reminders so
            you never miss the booking window. No sign-up, no ads on the calculators themselves, always
            accurate.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/booking-date-calculator"
              className="rounded-xl border border-primary/30 bg-primary/5 px-6 py-4 text-center hover:bg-primary/10 transition-colors"
            >
              <span className="block text-sm text-muted">Today you can book up to</span>
              <span className="block text-xl font-bold text-primary mt-0.5">{formatDateLong(latestBookable)}</span>
              <span className="block text-xs text-muted mt-0.5">· {ARP_DAYS}-day window open</span>
            </Link>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <Link href="/booking-date-calculator" className="rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity">
                Check Booking Date
              </Link>
              <Link href="/reminders" className="rounded-lg border border-border font-semibold px-5 py-2.5 hover:bg-surface-2 transition-colors">
                Set Up a Reminder
              </Link>
            </div>
          </div>

          {upcomingLongWeekend && (
            <p className="mt-8 text-sm text-muted">
              Next long weekend: <strong className="text-foreground">{upcomingLongWeekend.holiday.name}</strong>,{" "}
              {upcomingLongWeekend.start} → {upcomingLongWeekend.end} ·{" "}
              <Link href="/long-weekend-planner" className="text-primary underline underline-offset-2">See all →</Link>
            </p>
          )}
        </div>
      </section>

      {/* Calculators grid */}
      <section id="tools" className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Next Stop · Calculators</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Railway Calculators</h2>
        <p className="mt-2 text-muted max-w-2xl">Quick answers to your most common railway booking questions.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATOR_ROUTES.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-xl border border-border p-5 hover:border-primary hover:bg-surface transition-colors">
              <span className="text-2xl" aria-hidden="true">{t.icon}</span>
              <p className="text-xs font-semibold text-primary uppercase mt-2">{t.tag}</p>
              <h3 className="font-semibold mt-1">{t.label}</h3>
              <p className="text-sm text-muted mt-1">{t.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Decision tools grid */}
      <section className="mx-auto max-w-6xl px-4 py-14 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Plan &amp; Decide</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Plan Your Journey</h2>
        <p className="mt-2 text-muted max-w-2xl">Beyond calculators — tools to help you decide and plan ahead.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => (
            <Link key={t.href} href={t.href} className="rounded-xl border border-border p-5 hover:border-primary hover:bg-surface transition-colors">
              <span className="text-2xl" aria-hidden="true">{t.icon}</span>
              <p className="text-xs font-semibold text-primary uppercase mt-2">{t.tag}</p>
              <h3 className="font-semibold mt-1">{t.label}</h3>
              <p className="text-sm text-muted mt-1">{t.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-bold text-lg">{ARP_DAYS}-Day Rule</p>
            <p className="text-xs text-muted mt-1">Kept current with IRCTC rules</p>
          </div>
          <div>
            <p className="font-bold text-lg">10 / 11 AM</p>
            <p className="text-xs text-muted mt-1">Exact Tatkal timings, AC / Non-AC</p>
          </div>
          <div>
            <p className="font-bold text-lg">No Login</p>
            <p className="text-xs text-muted mt-1">Every tool works without an account</p>
          </div>
          <div>
            <p className="font-bold text-lg">Free Forever</p>
            <p className="text-xs text-muted mt-1">Ad-supported, not paywalled</p>
          </div>
        </div>
      </section>

      {/* Guides preview */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Platform · Guides</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Popular Guides</h2>
        <p className="mt-2 text-muted max-w-2xl">In-depth guides to help you navigate Indian Railways.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.slice(0, 6).map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border border-border p-5 hover:border-primary hover:bg-surface transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">{g.category}</span>
              <h3 className="font-semibold mt-1">{g.title}</h3>
              <p className="text-sm text-muted mt-1">{g.description}</p>
              <p className="text-xs text-muted mt-3">{g.readMins} min read</p>
            </Link>
          ))}
        </div>
        <Link href="/guides" className="inline-block mt-6 text-primary font-medium underline underline-offset-2">
          Browse all guides →
        </Link>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-6xl px-4 py-14 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Product · Roadmap</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{SITE_NAME} is Growing</h2>
        <p className="mt-2 text-muted max-w-2xl">Actively built and updated with the latest IRCTC rules. Here&apos;s what&apos;s coming.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase text-success mb-2">Released</p>
            <ul className="space-y-1 text-sm text-muted">
              <li>All 8 calculators</li>
              <li>Waitlist Outlook</li>
              <li>Plan Ticket Calendar</li>
              <li>Email &amp; calendar reminders</li>
              <li>Journey Reports (community)</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-accent mb-2">In Progress</p>
            <ul className="space-y-1 text-sm text-muted">
              <li>WhatsApp reminders</li>
              <li>Regional language guides</li>
              <li>Enhanced WL outlook using community data</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted mb-2">Planned</p>
            <ul className="space-y-1 text-sm text-muted">
              <li>Licensed train schedule lookup</li>
              <li>Mobile apps</li>
              <li>Fare trend analysis</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <p className="font-semibold mb-3">Help Shape {SITE_NAME} — what should we build next?</p>
          <FeedbackVoteWidget />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Don&apos;t Miss Your Next Window</h2>
          <p className="mt-3 text-muted">
            Tatkal opens just one day before your journey — at 10 AM for AC and 11 AM for Non-AC. Lock a
            reminder in seconds.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/reminders" className="rounded-lg bg-primary text-primary-foreground font-semibold px-6 py-3 hover:opacity-90 transition-opacity">
              Set Reminder
            </Link>
            <Link href="/booking-date-calculator" className="rounded-lg border border-border font-semibold px-6 py-3 hover:bg-surface-2 transition-colors">
              Check Booking Date
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">No spam · No login required · Free forever</p>
        </div>
      </section>
    </>
  );
}
