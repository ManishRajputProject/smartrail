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
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "Guides", href: "/guides" }]} />
      <p className="eyebrow mb-1">Guides</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">Railway Guides</h1>
      <p className="mt-2 text-muted text-[15px] max-w-2xl">
        Original, source-checked guides to Indian Railways booking, Tatkal, cancellations, waitlists and
        quotas — each with a quick answer up top and a &quot;last reviewed&quot; date.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="card card-hover group p-4 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="chip bg-primary-soft text-primary">{g.category}</span>
              <span className="text-[11px] text-muted">{g.readMins} min</span>
            </div>
            <h2 className="font-semibold mt-2 text-[15px] leading-snug group-hover:text-primary transition-colors">{g.title}</h2>
            <p className="text-[13px] text-muted mt-1 leading-snug flex-1">{g.description}</p>
            <p className="text-[11px] text-muted mt-2.5">Updated {g.updated}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
