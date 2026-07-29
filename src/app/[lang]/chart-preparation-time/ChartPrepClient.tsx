"use client";

import type { Dictionary } from "@/i18n/dictionary";

import { useEffect, useRef, useState } from "react";
import { computeChartTimes, type ChartTimes } from "@/lib/irctc-rules";
import { DatePicker, todayISO } from "@/components/DatePicker";
import { fill } from "@/i18n/train-page-strings";

interface TrainResult {
  number: string;
  name: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  dep: string;
  arr: string;
  type: string;
}

interface Stop {
  code: string;
  name: string;
  arrival: string | null;
  departure: string | null;
  day: number;
}

type Mode = "number" | "datetime";
type Status = "cnf" | "rac" | "wl";

function fmt(d: Date) {
  return d.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

/** Combine a "YYYY-MM-DD" date with an "HH:MM" clock time into a local Date. */
function combine(isoDate: string, hhmm: string): Date | null {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  const tm = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!dm || !tm) return null;
  return new Date(Number(dm[1]), Number(dm[2]) - 1, Number(dm[3]), Number(tm[1]), Number(tm[2]));
}

function ResultCards({ times, forms }: { times: ChartTimes; forms: Dictionary["forms"] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{forms.firstChartLabel}</p>
        <p className="text-lg font-bold text-primary mt-1 leading-tight">{fmt(times.firstChart)}</p>
        <p className="text-[11px] text-muted mt-1">{times.earlyMorning ? forms.earlyMorningNote : forms.normalChartNote}</p>
      </div>
      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-3.5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{forms.finalChartLabel}</p>
        <p className="text-lg font-bold text-secondary mt-1 leading-tight">{fmt(times.finalChart)}</p>
        <p className="text-[11px] text-muted mt-1">{forms.finalChartNote}</p>
      </div>
    </div>
  );
}

function TicketStatusPanel({ forms }: { forms: Dictionary["forms"] }) {
  const [status, setStatus] = useState<Status>("wl");
  const tabs: { key: Status; label: string; note: string }[] = [
    { key: "cnf", label: forms.statusCnf, note: forms.statusCnfNote },
    { key: "rac", label: forms.statusRac, note: forms.statusRacNote },
    { key: "wl", label: forms.statusWl, note: forms.statusWlNote },
  ];
  const active = tabs.find((t) => t.key === status)!;

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold mb-2">{forms.whatThisMeansForTicket}</p>
      <div className="flex gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setStatus(t.key)}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
              t.key === status ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground hover:bg-primary-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[13px] text-muted">{active.note}</p>
    </div>
  );
}

export function ChartPrepClient({
  forms,
  locale,
  datepicker,
}: {
  forms: Dictionary["forms"];
  locale: string;
  datepicker: Dictionary["datepicker"];
}) {
  const [mode, setMode] = useState<Mode>("number");

  // --- By Train Number ---
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TrainResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState<TrainResult | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [boardingCode, setBoardingCode] = useState("");
  const [journeyDate, setJourneyDate] = useState(todayISO());
  const [numResult, setNumResult] = useState<{ times: ChartTimes; boardingArrival: Date | null } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/trains/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  async function selectTrain(t: TrainResult) {
    setSelected(t);
    setQuery(`${t.number} — ${t.name}`);
    setShowResults(false);
    setBoardingCode("");
    setNumResult(null);
    const res = await fetch(`/api/trains/${t.number}`);
    if (res.ok) {
      const data = await res.json();
      setStops(data.stops ?? []);
    }
  }

  function handleNumberSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !selected.dep || !journeyDate) return;
    const departure = combine(journeyDate, selected.dep);
    if (!departure) return;
    const times = computeChartTimes(departure);

    let boardingArrival: Date | null = null;
    if (boardingCode && boardingCode !== selected.fromCode) {
      const stop = stops.find((s) => s.code === boardingCode);
      if (stop?.arrival) {
        const dm = /^(\d{2}):(\d{2})$/.exec(stop.arrival);
        if (dm) {
          const daysAfterOrigin = Math.max(0, stop.day - 1);
          const [dy, dm2, dd] = journeyDate.split("-").map(Number);
          boardingArrival = new Date(dy, dm2 - 1, dd + daysAfterOrigin, Number(dm[1]), Number(dm[2]));
        }
      }
    }
    setNumResult({ times, boardingArrival });
  }

  // --- By Departure Time ---
  const [departure, setDeparture] = useState("");
  const [dtResult, setDtResult] = useState<ChartTimes | null>(null);

  function handleDtSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!departure) return;
    setDtResult(computeChartTimes(new Date(departure)));
  }

  const boardingStop = stops.find((s) => s.code === boardingCode);

  return (
    <div>
      {/* Mode switcher */}
      <div className="flex gap-1.5 mb-4 p-1 rounded-xl bg-surface-2 w-fit">
        <button
          type="button"
          onClick={() => setMode("number")}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
            mode === "number" ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-foreground"
          }`}
        >
          {forms.byTrainNumber}
        </button>
        <button
          type="button"
          onClick={() => setMode("datetime")}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
            mode === "datetime" ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-foreground"
          }`}
        >
          {forms.byDepartureTime}
        </button>
      </div>

      {mode === "number" ? (
        <form onSubmit={handleNumberSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="cp-train" className="block text-sm font-medium mb-1">{forms.trainNumberOrName}</label>
            <input
              id="cp-train"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              placeholder={forms.searchTrainPlaceholder}
              autoComplete="off"
              className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
            />
            {showResults && query.trim().length >= 2 && !selected && (
              <div className="absolute z-30 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg max-h-72 overflow-y-auto">
                {searching && <p className="px-3 py-2.5 text-sm text-muted">{forms.searching}</p>}
                {!searching && results.length === 0 && (
                  <p className="px-3 py-2.5 text-sm text-muted">{forms.noTrainsFound}</p>
                )}
                {!searching &&
                  results.map((t) => (
                    <button
                      key={t.number}
                      type="button"
                      onMouseDown={() => selectTrain(t)}
                      className="w-full text-left px-3 py-2.5 hover:bg-primary-soft transition-colors border-b border-border last:border-b-0"
                    >
                      <span className="font-mono font-bold text-primary text-[13px] mr-2">{t.number}</span>
                      <span className="text-[14px]">{t.name}</span>
                      <span className="block text-[12px] text-muted mt-0.5">{t.fromName} → {t.toName}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {selected && (
            <>
              <div className="rounded-lg border border-border bg-surface-2 px-3.5 py-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-primary bg-primary-soft rounded px-1.5 py-0.5 mr-2">
                  {selected.type || "Train"}
                </span>
                <span className="font-mono font-bold text-[13px]">{selected.number}</span>
                <span className="ml-1.5 font-semibold text-[14px]">{selected.name}</span>
                <p className="text-[12px] text-muted mt-1">{selected.fromName} → {selected.toName}</p>
                {selected.dep && (
                  <p className="text-[12px] text-muted mt-0.5">{fill(forms.departsOriginAt, { time: selected.dep })}</p>
                )}
              </div>

              {stops.length > 0 && (
                <div>
                  <label htmlFor="cp-boarding" className="block text-sm font-medium mb-1">{forms.boardingStation}</label>
                  <select
                    id="cp-boarding"
                    value={boardingCode}
                    onChange={(e) => setBoardingCode(e.target.value)}
                    className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
                  >
                    <option value="">{forms.boardingStationOrigin}</option>
                    {stops.map((s) => (
                      <option key={s.code} value={s.code}>{s.code} — {s.name}</option>
                    ))}
                  </select>
                  {boardingCode && boardingCode !== selected.fromCode && (
                    <p className="mt-1 text-xs text-muted">{fill(forms.boardingStationHint, { origin: selected.fromName })}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="cp-journey-date" className="block text-sm font-medium mb-1">{forms.journeyDate}</label>
                <DatePicker
                  id="cp-journey-date"
                  value={journeyDate}
                  onChange={setJourneyDate}
                  locale={locale}
                  t={datepicker}
                  min={todayISO()}
                  required
                />
              </div>

              <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
                {forms.calculateChartTimes}
              </button>
            </>
          )}

          {!selected && query.trim().length === 0 && (
            <p className="text-sm text-muted">{forms.selectTrainFirst}</p>
          )}

          {numResult && selected && (
            <div className="mt-2 space-y-3">
              <ResultCards times={numResult.times} forms={forms} />
              <div className="rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-[13px]">
                <p>
                  <span className="text-muted">{fill(forms.trainDeparts, { origin: selected.fromCode })}: </span>
                  <span className="font-semibold">
                    {combine(journeyDate, selected.dep) ? fmt(combine(journeyDate, selected.dep)!) : "—"}
                  </span>
                </p>
                {numResult.boardingArrival && boardingStop && (
                  <p className="mt-1">
                    <span className="text-muted">{fill(forms.yourBoardingArrival, { code: boardingStop.code })}: </span>
                    <span className="font-semibold">{fmt(numResult.boardingArrival)}</span>
                  </p>
                )}
              </div>
              <TicketStatusPanel forms={forms} />
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleDtSubmit} className="space-y-4">
          <div>
            <label htmlFor="cp-departure" className="block text-sm font-medium mb-1">{forms.scheduledDeparture}</label>
            <DatePicker
              id="cp-departure"
              value={departure}
              onChange={setDeparture}
              locale={locale}
              t={datepicker}
              min={todayISO()}
              withTime
              required
            />
            <p className="mt-1 text-xs text-muted">Use the train&apos;s scheduled departure from its source station.</p>
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity">
            {forms.checkChartTime}
          </button>

          {dtResult && (
            <div className="mt-2 space-y-3">
              <ResultCards times={dtResult} forms={forms} />
              <TicketStatusPanel forms={forms} />
            </div>
          )}
        </form>
      )}
    </div>
  );
}
