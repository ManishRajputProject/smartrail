import type { Metadata } from "next";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: `${SITE_NAME} is an independent informational service, not affiliated with IRCTC or Indian Railways.`,
  path: "/disclaimer",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12 prose-sm leading-relaxed">
      <Breadcrumb items={[{ name: "Disclaimer", href: "/disclaimer" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Disclaimer</h1>
      <p className="text-sm text-muted mb-6">Last updated: 20 July 2026</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. No Government Affiliation</h2>
      <p className="text-muted mb-3">
        {SITE_NAME} is a privately operated, independent informational service. We have no formal affiliation,
        authorisation, licence, or endorsement from Indian Railways, IRCTC (Indian Railway Catering and Tourism
        Corporation), the Ministry of Railways, or any governmental or quasi-governmental entity. All tools,
        calculators and guides on this site are created and maintained independently, for general informational
        and convenience purposes only.
      </p>
      <p className="text-muted mb-3">
        For official services — ticket booking, PNR status, live train schedules and cancellations — use the
        official IRCTC website at irctc.co.in.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Accuracy of Information</h2>
      <p className="text-muted mb-3">
        We make no warranties, express or implied, about the completeness, accuracy, reliability or availability
        of any information, tool or content on this site. Railway fares, schedules, quotas, refund rules and
        booking policies are subject to change at any time without notice. Fare and trip-cost figures shown by
        our calculators are illustrative estimates, not quotes.
      </p>
      <p className="text-muted mb-3">
        Always verify critical information — booking windows, refund amounts, cancellation rules, and train
        schedules — directly through IRCTC or official Indian Railways channels before making a booking or
        travel decision.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Community Content</h2>
      <p className="text-muted mb-3">
        Journey Reports are submitted by site visitors and reflect individual experiences, not verified data.
        We moderate submissions for spam and abuse but do not independently verify the accuracy of any
        individual report.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="text-muted mb-3">
        To the fullest extent permitted by applicable law, {SITE_NAME}, its operators and contributors are not
        liable for any direct, indirect, incidental or consequential loss, damage, cost or inconvenience
        arising from use of, or reliance on, any information, tool or content on this site. Use of this site is
        entirely at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Trademarks</h2>
      <p className="text-muted mb-3">
        &quot;IRCTC&quot;, &quot;Indian Railways&quot; and related names and marks are the registered trademarks of their
        respective owners. Any reference to these names on {SITE_NAME} is strictly descriptive and informational
        and does not imply affiliation, association or endorsement.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Governing Law</h2>
      <p className="text-muted mb-3">This Disclaimer is governed by the laws of India, with exclusive jurisdiction in the competent courts of India.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
      <p className="text-muted">Questions about this Disclaimer: hello@railsetu.in</p>
    </div>
  );
}
