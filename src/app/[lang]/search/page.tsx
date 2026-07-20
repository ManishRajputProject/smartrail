import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { searchSite } from "@/lib/search-index";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search RailSetu's calculators, guides and station directory.",
  path: "/search",
  noIndex: true,
});

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = q ? searchSite(q, 20) : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "Search", href: "/search" }]} />
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight">
        {q ? <>Results for &quot;{q}&quot;</> : "Search"}
      </h1>

      <form action="/search" method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search tools, guides, stations…"
          aria-label="Search"
          className="input"
        />
        <button type="submit" className="btn-primary shrink-0">Search</button>
      </form>

      <p className="mt-3 text-[12px] text-muted">Tip: press ⌘K / Ctrl+K anywhere for instant search.</p>

      <div className="mt-5 space-y-2">
        {q && results.length === 0 && <p className="text-muted">No matches. Try a broader term.</p>}
        {results.map((item) => (
          <Link key={`${item.group}-${item.href}-${item.title}`} href={item.href} className="card card-hover flex items-center gap-3 p-3.5">
            <span className="flex-1">
              <span className="font-semibold text-[15px]">{item.title}</span>
              {item.hint && <span className="text-[12px] text-muted ml-2">{item.hint}</span>}
            </span>
            <span className="chip bg-surface-2 text-muted">{item.group}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
