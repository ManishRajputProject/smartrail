import type { Metadata } from "next";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Data Deletion Request",
  description: `How to request deletion of your data from ${SITE_NAME}.`,
  path: "/data-deletion",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12 prose-sm leading-relaxed">
      <Breadcrumb items={[{ name: "Data Deletion", href: "/data-deletion" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Data Deletion Request</h1>
      <p className="text-muted mb-4">
        Since {SITE_NAME} doesn&apos;t require an account, the only data we hold tied to you is whatever email
        or phone number you gave us when setting a reminder.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How to request deletion</h2>
      <p className="text-muted mb-3">
        Email <strong>hello@railsetu.in</strong> from the email address (or mentioning the phone number) you
        used, with the subject line &quot;Data Deletion Request&quot;. We&apos;ll verify the request and delete
        all associated reminder and subscription records within 30 days, and confirm once it&apos;s done.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What gets deleted</h2>
      <ul className="list-disc list-inside text-muted space-y-1 mb-3">
        <li>Pending and past reminder requests linked to your email/phone.</li>
        <li>Newsletter subscription records linked to your email/phone.</li>
      </ul>
      <p className="text-muted mb-3">
        Journey Reports are not linked to contact information at submission, so we generally cannot locate or
        remove a specific report unless you can identify it directly (e.g. by pasting the exact text) — include
        that in your request if applicable.
      </p>

      <p className="text-muted">See our <a href="/privacy-policy" className="text-primary underline underline-offset-2">Privacy Policy</a> for more on what we collect and why.</p>
    </div>
  );
}
