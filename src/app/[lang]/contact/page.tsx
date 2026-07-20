import type { Metadata } from "next";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
  path: "/contact",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12">
      <Breadcrumb items={[{ name: "Contact", href: "/contact" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Contact</h1>
      <p className="text-muted leading-relaxed mb-4">
        {SITE_NAME} is an independent project, not affiliated with IRCTC or Indian Railways. For official
        booking support, use IRCTC&apos;s own customer care channels.
      </p>
      <div className="rounded-xl border border-border p-5 space-y-2 text-sm">
        <p><strong>General &amp; feedback:</strong> hello@railsetu.in</p>
        <p><strong>Privacy / data requests:</strong> hello@railsetu.in (see <a href="/data-deletion" className="text-primary underline underline-offset-2">Data Deletion</a>)</p>
      </div>
    </div>
  );
}
