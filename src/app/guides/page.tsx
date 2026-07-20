import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = buildMetadata({
  title: "Railway Guides — IRCTC Booking, Tatkal, Waitlist & More",
  description: "In-depth guides to help you navigate Indian Railways booking, Tatkal timing, cancellation rules, waiting lists and quotas.",
  path: "/guides",
  keywords: ["IRCTC guides", "railway booking guides", "tatkal guide"],
});

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      <Breadcrumb items={[{ name: "Guides", href: "/guides" }]} />
      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Platform · Guides</p>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Railway Guides</h1>
      <p className="mt-3 text-muted max-w-2xl">In-depth guides to help you navigate Indian Railways booking, Tatkal, cancellations and more.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border border-border p-5 hover:border-primary hover:bg-surface transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">{g.category}</span>
            <h2 className="font-semibold mt-1">{g.title}</h2>
            <p className="text-sm text-muted mt-1">{g.description}</p>
            <p className="text-xs text-muted mt-3">{g.readMins} min read · Updated {g.updated}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
