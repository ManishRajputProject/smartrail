"use client";

import { useMemo, useState } from "react";
import type { Station } from "@/lib/stations";

export function StationSearchClient({ stations }: { stations: Station[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stations;
    return stations.filter(
      (s) => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
    );
  }, [stations, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by station name, code or city…"
        aria-label="Search stations"
        className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base mb-4"
      />
      <p className="text-xs text-muted mb-3">{filtered.length} stations</p>
      <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
        {filtered.map((s) => (
          <div key={s.code} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <div>
              <span className="font-mono font-semibold text-primary">{s.code}</span>
              <span className="ml-2">{s.name}</span>
            </div>
            <span className="text-xs text-muted shrink-0">{s.city}, {s.state}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted">No matching stations.</p>}
      </div>
    </div>
  );
}
