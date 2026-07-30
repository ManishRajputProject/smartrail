"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import { fill } from "@/i18n/train-page-strings";

interface StationResult {
  code: string;
  name: string;
}

interface TrainResult {
  number: string;
  name: string;
  type: string;
  fromCode: string;
  fromName: string;
  dep: string;
  toCode: string;
  toName: string;
  arr: string;
  distanceKm?: number;
  durationMin?: number;
}

function StationInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: { code: string; label: string };
  onChange: (code: string, label: string) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState(value.label);
  const [results, setResults] = useState<StationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setQuery(value.label), [value.label]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
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
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange("", e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
      />
      {showResults && query.trim().length >= 2 && !value.code && (
        <div className="absolute z-30 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg max-h-60 overflow-y-auto">
          {results.map((s) => (
            <button
              key={s.code}
              type="button"
              onMouseDown={() => {
                onChange(s.code, `${s.code} — ${s.name}`);
                setShowResults(false);
              }}
              className="w-full text-left px-3 py-2.5 hover:bg-primary-soft transition-colors border-b border-border last:border-b-0"
            >
              <span className="font-mono font-bold text-primary text-[13px] mr-2">{s.code}</span>
              <span className="text-[14px]">{s.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrainsBetweenClient({ locale, t }: { locale: string; t: Dictionary["live"] }) {
  const lp = (href: string) => `/${locale}${href}`;
  const [from, setFrom] = useState({ code: "", label: "" });
  const [to, setTo] = useState({ code: "", label: "" });
  const [results, setResults] = useState<TrainResult[] | null>(null);
  const [source, setSource] = useState<"live" | "static" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!from.code || !to.code) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/trains-between?from=${from.code}&to=${to.code}`);
      const data = await res.json();
      setResults(data.trains ?? []);
      setSource(data.source ?? null);
    } finally {
      setLoading(false);
    }
  }

  function swap() {
    setFrom(to);
    setTo(from);
    setResults(null);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <StationInput
            id="tb-from"
            label={t.fromStation}
            value={from}
            onChange={(code, label) => setFrom({ code, label })}
            placeholder="e.g. NDLS or New Delhi"
          />
          <button
            type="button"
            onClick={swap}
            aria-label={t.swapStations}
            className="hidden sm:grid place-items-center h-10 w-10 rounded-lg bg-surface-2 hover:bg-primary-soft transition-colors mb-0.5"
          >
            <span aria-hidden="true">⇄</span>
          </button>
          <StationInput
            id="tb-to"
            label={t.toStation}
            value={to}
            onChange={(code, label) => setTo({ code, label })}
            placeholder="e.g. BCT or Mumbai Central"
          />
        </div>

        <button
          type="submit"
          disabled={!from.code || !to.code || loading}
          className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {t.searchTrains}
        </button>
      </form>

      {!from.code || !to.code ? (
        results === null && <p className="mt-3 text-sm text-muted">{t.selectBothStations}</p>
      ) : null}

      {results !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">
              {fill(t.resultsCount, { count: results.length, plural: results.length === 1 ? "" : "s" })}
            </p>
            {source && (
              <span className={`chip ${source === "live" ? "bg-emerald-500/10 text-emerald-600" : "bg-surface-2 text-muted"}`}>
                {source === "live" ? t.liveDataBadge : t.staticDataBadge}
              </span>
            )}
          </div>
          <div className="mt-2 space-y-2">
            {results.map((tr) => (
              <Link
                key={tr.number}
                href={lp(`/trains/${tr.number}`)}
                className="card card-hover flex items-center gap-3 p-3.5"
              >
                <span className="font-mono font-bold text-primary text-[15px] shrink-0 tabular-nums">{tr.number}</span>
                <span className="flex-1 min-w-0">
                  <span className="font-semibold text-[14px] block truncate">{tr.name}</span>
                  <span className="text-[12px] text-muted">{tr.fromName} → {tr.toName}</span>
                </span>
                <span className="text-[12px] text-muted shrink-0 text-right tabular-nums">
                  {tr.dep || "—"}<br />{tr.arr || "—"}
                </span>
              </Link>
            ))}
            {results.length === 0 && <p className="text-muted text-sm py-4 text-center">{t.noResults}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
