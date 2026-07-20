import type { Metadata } from "next";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms governing use of ${SITE_NAME}.`,
  path: "/terms",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12 prose-sm leading-relaxed">
      <Breadcrumb items={[{ name: "Terms", href: "/terms" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Terms of Use</h1>
      <p className="text-sm text-muted mb-6">Last updated: 20 July 2026</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Using this site</h2>
      <p className="text-muted mb-3">
        {SITE_NAME} provides free calculators, planning tools and reminders for Indian Railways travellers. By
        using this site you agree to use it for lawful, personal purposes and not to attempt to disrupt,
        scrape at scale, or abuse the reminder and community-submission features (for example, submitting spam
        or automated bulk entries).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">No warranty</h2>
      <p className="text-muted mb-3">
        Tools and content are provided &quot;as is&quot; without warranty of any kind. See our{" "}
        <a href="/disclaimer" className="text-primary underline underline-offset-2">Disclaimer</a> for detail
        on accuracy limitations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Community content</h2>
      <p className="text-muted mb-3">
        Journey Reports you submit may be displayed publicly after moderation. Don&apos;t submit anything
        defamatory, false, or that identifies another private individual without their consent. We may remove
        any submission at our discretion.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes</h2>
      <p className="text-muted mb-3">We may update these terms from time to time; continued use of the site after a change constitutes acceptance of the updated terms.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Governing law</h2>
      <p className="text-muted mb-3">These terms are governed by the laws of India, with exclusive jurisdiction in the competent courts of India.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="text-muted">hello@railsetu.in</p>
    </div>
  );
}
