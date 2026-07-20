import type { Metadata } from "next";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your data.`,
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12 prose-sm leading-relaxed">
      <Breadcrumb items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted mb-6">Last updated: 20 July 2026</p>

      <p className="text-muted mb-3">
        {SITE_NAME} is designed to be usable without an account. Most tools on this site — the calculators,
        the quota selector, the checklist generator — process everything in your browser and send nothing to
        our servers. This policy covers the few features that do collect data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What we collect</h2>
      <ul className="list-disc list-inside text-muted space-y-1 mb-3">
        <li><strong>Booking reminders:</strong> journey date, an optional train reference, your email address, and (if you opt in) a phone number for future WhatsApp reminders.</li>
        <li><strong>Journey reports:</strong> the train reference, journey date, category and text you choose to submit. We don&apos;t require or knowingly collect your name or contact details for this feature.</li>
        <li><strong>Feedback votes:</strong> fully anonymous — no contact information is collected.</li>
        <li><strong>Analytics:</strong> aggregate, privacy-respecting usage analytics (pages viewed, general location by country/region) to understand what's useful. We do not sell this data.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Why we collect it</h2>
      <p className="text-muted mb-3">
        Solely to operate the feature you used it for — sending you the reminder you asked for, or displaying
        moderated community reports. We do not use your email or phone number for unrelated marketing without
        separate, explicit opt-in.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Advertising</h2>
      <p className="text-muted mb-3">
        This site is supported by display advertising and, in places, affiliate links (clearly labelled as
        such). Ad providers may use cookies to serve relevant ads — you can control this through your browser
        settings or any consent banner shown on the site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your rights</h2>
      <p className="text-muted mb-3">
        You can ask us to delete any data associated with your email or phone number at any time — see our{" "}
        <a href="/data-deletion" className="text-primary underline underline-offset-2">Data Deletion</a> page
        for how. We process such requests under India&apos;s Digital Personal Data Protection Act, 2023 and its
        rules.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="text-muted">Questions about this policy, or a data request: hello@railsetu.in</p>
    </div>
  );
}
