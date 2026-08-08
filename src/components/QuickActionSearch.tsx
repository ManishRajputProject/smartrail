"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface StationValue {
  code: string;
  label: string;
}

function StationField({
  id,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  placeholder: string;
  value: StationValue;
  onChange: (v: StationValue) => void;
}) {
  const [results, setResults] = useState<{ code: string; name: string }[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const query = value.label;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) return;
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/stations/search-live?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResults(data.results ?? []);
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div className="relative min-w-0 flex-1 text-left">
      <input
        id={id}
        value={query}
        onChange={(e) => {
          onChange({ code: "", label: e.target.value });
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
        className="input w-full"
      />
      {open && query.trim().length >= 2 && !value.code && (
        <div className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-border bg-surface text-left shadow-lg">
          {results.map((s) => (
            <button
              key={s.code}
              type="button"
              onMouseDown={() => {
                onChange({ code: s.code, label: `${s.code} — ${s.name}` });
                setOpen(false);
              }}
              className="w-full border-b border-border px-3 py-2 text-left transition-colors last:border-0 hover:bg-primary-soft"
            >
              <span className="mr-2 font-mono text-[12px] font-bold text-primary">{s.code}</span>
              <span className="text-[13px]">{s.name}</span>
            </button>
          ))}
          {results.length === 0 && (
            <p className="px-3 py-2 text-[12px] text-muted">No matching station</p>
          )}
        </div>
      )}
    </div>
  );
}

type Tab = "track" | "between" | "pnr";

const TABS: { id: Tab; label: string }[] = [
  { id: "track", label: "Track a Train" },
  { id: "between", label: "Between Stations" },
  { id: "pnr", label: "Booking Status" },
];

/**
 * Hero quick-action widget: three real, functional lookups (not a generic
 * site search, which was deliberately removed from the homepage). Each tab
 * hands off to the dedicated tool page with the input pre-filled, so the
 * result is never fabricated on the homepage itself.
 */
export function QuickActionSearch({ lang }: { lang: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("track");
  const [trackQuery, setTrackQuery] = useState("");
  const [from, setFrom] = useState<StationValue>({ code: "", label: "" });
  const [to, setTo] = useState<StationValue>({ code: "", label: "" });
  const [pnrText, setPnrText] = useState("");

  const lp = (href: string) => `/${lang}${href}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (tab === "track") {
      if (!trackQuery.trim()) return;
      router.push(lp(`/trains?q=${encodeURIComponent(trackQuery.trim())}`));
    } else if (tab === "between") {
      if (!from.code || !to.code) return;
      router.push(
        lp(
          `/trains-between?from=${from.code}&to=${to.code}&fromLabel=${encodeURIComponent(from.label)}&toLabel=${encodeURIComponent(to.label)}`
        )
      );
    } else {
      if (!pnrText.trim()) return;
      router.push(lp(`/pnr-status?status=${encodeURIComponent(pnrText.trim())}`));
    }
  }

  return (
    <div className="panel mx-auto max-w-xl p-2 text-left">
      <div className="flex gap-1 rounded-xl bg-surface-2 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-2.5 py-2 text-[12.5px] font-semibold transition-colors sm:text-[13px] ${
              tab === t.id ? "bg-surface text-primary shadow-sm" : "text-muted hover:text-foreground"
            }`}
            aria-pressed={tab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-3 p-1">
        {tab === "track" && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              placeholder="Train number or name, e.g. 12951 or Rajdhani"
              className="input flex-1"
              aria-label="Train number or name"
            />
            <button type="submit" className="btn-primary shrink-0">Track</button>
          </div>
        )}

        {tab === "between" && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <StationField id="qa-from" placeholder="From station" value={from} onChange={setFrom} />
            <StationField id="qa-to" placeholder="To station" value={to} onChange={setTo} />
            <button type="submit" className="btn-primary shrink-0">Search</button>
          </div>
        )}

        {tab === "pnr" && (
          <div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={pnrText}
                onChange={(e) => setPnrText(e.target.value)}
                placeholder="e.g. GNWL/12, RAC 4 or CNF/B2/34"
                className="input flex-1"
                aria-label="Booking status as shown on your ticket"
              />
              <button type="submit" className="btn-primary shrink-0">Decode</button>
            </div>
            <p className="mt-1.5 text-[11px] text-muted">
              Decodes the status printed on your ticket — doesn&apos;t fetch a live PNR.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
