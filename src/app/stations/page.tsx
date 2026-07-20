import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { searchStationsFull, allStationsCount, type Station } from "@/lib/rail-data";
import { STATIONS as POPULAR } from "@/lib/stations";

export const metadata: Metadata = buildMetadata({
  title: "Indian Railway Station Code Directory — Search 8,900+ Stations",
  description:
    "Search over 8,900 Indian Railways stations by name or code. See the station code, railway zone and state for any station.",
  path: "/stations",
  keywords: ["railway station code list", "IRCTC station code lookup", "station code finder", "railway zone"],
});

function Row({ s }: { s: Station }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm">
      <div className="min-w-0">
        <span className="font-mono font-bold text-primary">{s.code}</span>
        <span className="ml-2">{s.name}</span>
      </div>
      <span className="text-[12px] text-muted shrink-0 text-right">
        {s.state || "—"}{s.zone ? ` · ${s.zone}` : ""}
      </span>
    </div>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = q ? searchStationsFull(q, 60) : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 pb-20 md:pb-10">
      <Breadcrumb items={[{ name: "Station Directory", href: "/stations" }]} />
      <p className="eyebrow mb-1">Station Directory</p>
      <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-tight">Station Code Directory</h1>
      <p className="mt-2 text-muted text-[15px] max-w-2xl">
        Search {allStationsCount().toLocaleString("en-IN")}+ Indian Railways stations by name or code — with
        the railway zone and state for each.
      </p>

      <form action="/stations" method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by station name or code (e.g. NDLS, Chennai)…"
          aria-label="Search stations"
          className="input"
        />
        <button type="submit" className="btn-primary shrink-0">Search</button>
      </form>

      {q ? (
        <>
          <p className="mt-3 text-sm text-muted">{results.length} station{results.length === 1 ? "" : "s"} for &quot;{q}&quot;</p>
          <div className="mt-2 card divide-y divide-border overflow-hidden">
            {results.map((s) => <Row key={s.code} s={s} />)}
            {results.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted">No matching stations.</p>}
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">Major stations</p>
          <div className="mt-1.5 card divide-y divide-border overflow-hidden">
            {POPULAR.slice(0, 30).map((s) => (
              <div key={s.code} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm">
                <div><span className="font-mono font-bold text-primary">{s.code}</span><span className="ml-2">{s.name}</span></div>
                <span className="text-[12px] text-muted shrink-0">{s.city}, {s.state}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <DataDisclaimer />

      <div className="mt-6">
        <Link href="/trains" className="card card-hover p-3.5 block">
          <p className="font-semibold text-[14px]">🚆 Train Finder</p>
          <p className="text-[12px] text-muted mt-0.5">Search any train by number or name.</p>
        </Link>
      </div>
    </div>
  );
}
