import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LAST_VERIFIED } from "@/lib/irctc-rules";

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE_NAME} — Who We Are & How We Keep Data Accurate`,
  description: `${SITE_NAME} is an independent, free toolkit for Indian Railways travellers. Here's who runs it, how rules are verified, and how to report an error.`,
  path: "/about",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "About", href: "/about" }]} />
      <p className="eyebrow mb-1">About</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">
        Who we are &amp; how we keep the numbers right
      </h1>

      <div className="mt-5 space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-2">What {SITE_NAME} is</h2>
          <p className="text-muted">
            {SITE_NAME} is an independent, free set of calculators and planning tools for Indian Railways
            travellers — booking dates, Tatkal timing, refund estimates, waitlist outlooks and reminders. It
            is built and maintained as a solo project, is supported by advertising, and requires no login for
            any tool.
          </p>
          <p className="text-muted mt-2 font-medium">
            We are not affiliated with, endorsed by, or connected to IRCTC, Indian Railways, or the Government
            of India in any way. For official bookings and live data, always use irctc.co.in.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-2">How rules are verified</h2>
          <ul className="space-y-1.5 text-muted">
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              Every rule the calculators use — the 60-day advance window, Tatkal opening times, refund slabs,
              chart-prep timing — lives in a single, version-controlled module with a &quot;last verified&quot; date
              (currently {LAST_VERIFIED}).</li>
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              Rules are checked against official IRCTC and Indian Railways announcements, not against other
              third-party sites.</li>
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              The rule module is covered by automated tests that run before every deployment, so a change in
              one calculator can&apos;t silently break another.</li>
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              Each guide lists the sources its facts were checked against and shows both its publish and last
              review dates.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-2">What we deliberately don&apos;t do</h2>
          <ul className="space-y-1.5 text-muted">
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              No fake precision. The waitlist tool gives an honest outlook band instead of an invented
              percentage, because real confirmation depends on cancellation data nobody outside railways has.</li>
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              No scraping of IRCTC systems. Train-schedule features will ship only when backed by properly
              licensed or open data.</li>
            <li className="flex gap-2"><span className="text-primary shrink-0" aria-hidden="true">▸</span>
              No dark patterns. Estimates are labelled as estimates, and every page that touches money says
              &quot;verify on IRCTC before deciding&quot;.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-2">Spotted an error?</h2>
          <p className="text-muted">
            Railway rules change, and when they do we want to be fast. If a number here disagrees with what
            IRCTC shows you, email <strong>hello@railsetu.in</strong> with a screenshot — corrections ship
            within days and the affected page&apos;s &quot;last reviewed&quot; date is updated.
          </p>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-bold tracking-tight mb-1.5">Quick links</h2>
          <div className="flex flex-wrap gap-2 text-[13px]">
            <Link href="/disclaimer" className="chip bg-surface-2 hover:bg-primary-soft transition-colors">Disclaimer</Link>
            <Link href="/privacy-policy" className="chip bg-surface-2 hover:bg-primary-soft transition-colors">Privacy Policy</Link>
            <Link href="/data-deletion" className="chip bg-surface-2 hover:bg-primary-soft transition-colors">Data Deletion</Link>
            <Link href="/contact" className="chip bg-surface-2 hover:bg-primary-soft transition-colors">Contact</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
