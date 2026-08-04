"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

/** Today's date as a local "YYYY-MM-DD" (not UTC), for use as a `min`. */
export function todayISO(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

interface DatePickerStrings {
  selectDate: string;
  today: string;
  clear: string;
  done: string;
  prevMonth: string;
  nextMonth: string;
  chooseMonth: string;
}

/**
 * Accessible, dependency-free date picker matching the site's design system.
 *
 * - Value contract is a "YYYY-MM-DD" string (or ""), a drop-in for the native
 *   <input type="date"> it replaces, so wiring is unchanged.
 * - Month and weekday names are localised via Intl in the page's locale; day
 *   numbers stay Latin for legibility, matching the site's numeral convention.
 * - Keyboard: arrows move by day/week, Home/End to week ends, PageUp/PageDown
 *   by month, Enter/Space selects, Escape closes. Focus returns to the trigger
 *   on close. The grid follows the WAI-ARIA date-picker dialog pattern.
 */
export function DatePicker({
  id,
  value,
  onChange,
  locale,
  t,
  min,
  max,
  required,
  placeholder,
  withTime,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  locale: string;
  t: DatePickerStrings;
  /** "YYYY-MM-DD" earliest selectable date (inclusive). */
  min?: string;
  /** "YYYY-MM-DD" latest selectable date (inclusive). */
  max?: string;
  required?: boolean;
  placeholder?: string;
  /** Also pick a time. Value contract becomes "YYYY-MM-DDTHH:MM". */
  withTime?: boolean;
}) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // With time, value is "YYYY-MM-DDTHH:MM"; the calendar works on the date part.
  const [datePart, timePart] = value.includes("T") ? value.split("T") : [value, ""];
  const time = withTime ? timePart || "10:00" : "";
  const selected = parseISO(datePart);
  const minDate = parseISO(min);
  const maxDate = parseISO(max);

  /** Emit the value in the right shape (with or without the time part). */
  const emit = (isoDate: string, hhmm = time) =>
    onChange(withTime ? `${isoDate}T${hhmm}` : isoDate);

  // The month currently shown, and the day that holds keyboard focus.
  const [view, setView] = useState<Date>(startOfMonth(selected ?? clampToday(minDate, maxDate)));
  const [focusDay, setFocusDay] = useState<Date>(selected ?? clampToday(minDate, maxDate));

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(view),
    [locale, view]
  );
  const weekdayNames = useMemo(() => weekdays(locale), [locale]);
  const displayValue = selected
    ? new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...(withTime ? { hour: "numeric", minute: "2-digit", hour12: true } : {}),
      }).format(withTime ? withClock(selected, time) : selected)
    : "";

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // When the popover opens, sync the view/focus to the current value and move
  // focus into the grid.
  useEffect(() => {
    if (!open) return;
    const base = selected ?? clampToday(minDate, maxDate);
    setView(startOfMonth(base));
    setFocusDay(base);
    const raf = requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function commit(day: Date) {
    if (isDisabled(day, minDate, maxDate)) return;
    emit(toISO(day));
    // With a time to set, keep the popover open so the user can pick it, then
    // close via Done. Date-only closes immediately, as before.
    if (!withTime) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  function onGridKey(e: React.KeyboardEvent) {
    let next: Date | null = null;
    switch (e.key) {
      case "ArrowLeft": next = addDays(focusDay, -1); break;
      case "ArrowRight": next = addDays(focusDay, 1); break;
      case "ArrowUp": next = addDays(focusDay, -7); break;
      case "ArrowDown": next = addDays(focusDay, 7); break;
      case "Home": next = addDays(focusDay, -mondayIndex(focusDay)); break;
      case "End": next = addDays(focusDay, 6 - mondayIndex(focusDay)); break;
      case "PageUp": next = addMonths(focusDay, -1); break;
      case "PageDown": next = addMonths(focusDay, 1); break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(focusDay);
        return;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      default:
        return;
    }
    if (next) {
      e.preventDefault();
      setFocusDay(next);
      setView(startOfMonth(next));
      requestAnimationFrame(() => {
        gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
      });
    }
  }

  const grid = monthGrid(view);
  const todayStr = toISO(new Date());

  return (
    <div ref={rootRef} className="relative">
      <button
        id={inputId}
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="w-full flex items-center gap-2.5 rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base text-left hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" className="text-primary shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4" />
        </svg>
        <span className={selected ? "" : "text-muted"}>
          {displayValue || placeholder || t.selectDate}
        </span>
      </button>
      {/* Keep the value in the form for native required/submit semantics. */}
      <input type="hidden" name={id} value={value} required={required} readOnly />

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={t.selectDate}
          className="absolute z-40 mt-2 w-[300px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_48px_rgba(15,23,42,0.18)]"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-secondary px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView(addMonths(view, -1))}
                aria-label={t.prevMonth}
                className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/15 transition-colors"
              >
                <Chevron dir="left" />
              </button>
              <span className="font-semibold tracking-tight" aria-live="polite">
                {monthLabel}
              </span>
              <button
                type="button"
                onClick={() => setView(addMonths(view, 1))}
                aria-label={t.nextMonth}
                className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/15 transition-colors"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>

          <div className="p-3">
            {/* Weekday row */}
            <div className="grid grid-cols-7 mb-1">
              {weekdayNames.map((w) => (
                <div key={w.key} className="text-center text-[11px] font-semibold uppercase tracking-wide text-muted py-1">
                  {w.label}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div
              ref={gridRef}
              role="grid"
              aria-label={monthLabel}
              onKeyDown={onGridKey}
              className="grid grid-cols-7 gap-0.5"
            >
              {grid.map((day) => {
                const inMonth = day.getMonth() === view.getMonth();
                const iso = toISO(day);
                const isSelected = iso === datePart;
                const isFocus = iso === toISO(focusDay);
                const isToday = iso === todayStr;
                const disabled = isDisabled(day, minDate, maxDate);
                return (
                  <button
                    key={iso}
                    type="button"
                    role="gridcell"
                    tabIndex={isFocus ? 0 : -1}
                    aria-selected={isSelected}
                    aria-disabled={disabled}
                    aria-current={isToday ? "date" : undefined}
                    aria-label={new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(day)}
                    disabled={disabled}
                    onClick={() => commit(day)}
                    className={[
                      "relative h-9 rounded-lg text-sm tabular-nums transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold"
                        : disabled
                          ? "text-muted/40 cursor-not-allowed"
                          : inMonth
                            ? "text-foreground hover:bg-primary-soft"
                            : "text-muted/50 hover:bg-primary-soft",
                    ].join(" ")}
                  >
                    {day.getDate()}
                    {isToday && !isSelected && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Time row (only when picking a datetime) */}
            {withTime && (
              <div className="mt-2 flex items-center gap-2 border-t border-border pt-2.5">
                <svg viewBox="0 0 24 24" width="16" height="16" className="text-muted shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                <select
                  aria-label="Hour"
                  value={time.split(":")[0]}
                  onChange={(e) => emit(datePart || toISO(clampToday(minDate, maxDate)), `${e.target.value}:${time.split(":")[1]}`)}
                  className="rounded-lg border border-border bg-[var(--background)] px-2 py-1.5 text-sm tabular-nums"
                >
                  {Array.from({ length: 24 }, (_, h) => String(h).padStart(2, "0")).map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className="text-muted font-semibold">:</span>
                <select
                  aria-label="Minute"
                  value={time.split(":")[1]}
                  onChange={(e) => emit(datePart || toISO(clampToday(minDate, maxDate)), `${time.split(":")[0]}:${e.target.value}`)}
                  className="rounded-lg border border-border bg-[var(--background)] px-2 py-1.5 text-sm tabular-nums"
                >
                  {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="text-[12px] text-muted">IST</span>
              </div>
            )}

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); triggerRef.current?.focus(); }}
                className="text-[13px] font-medium text-muted hover:text-foreground px-1.5 py-1 rounded"
              >
                {t.clear}
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => { const d = clampToday(minDate, maxDate); setView(startOfMonth(d)); setFocusDay(d); }}
                  className="text-[13px] font-medium text-primary hover:bg-primary-soft px-2.5 py-1 rounded-lg"
                >
                  {t.today}
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
                  className="btn-primary !py-1.5 !px-4 !text-[13px]"
                >
                  {t.done}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

/* ---- date helpers (local time, no timezone drift) ---- */

/** A copy of `day` with the given "HH:MM" applied, for display formatting. */
function withClock(day: Date, hhmm: string): Date {
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), h || 0, m || 0);
}

function parseISO(s?: string): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}
function toISO(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
}
/** 0 = Monday … 6 = Sunday (the grid is Monday-first). */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}
function clampToday(min: Date | null, max: Date | null): Date {
  const today = new Date();
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (min && t < min) return min;
  if (max && t > max) return max;
  return t;
}
function isDisabled(d: Date, min: Date | null, max: Date | null): boolean {
  if (min && d < min) return true;
  if (max && d > max) return true;
  return false;
}
/** 42 days (6 weeks) covering the month, Monday-first. */
function monthGrid(view: Date): Date[] {
  const first = startOfMonth(view);
  const start = addDays(first, -mondayIndex(first));
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}
function weekdays(locale: string): { key: string; label: string }[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2024-01-01 was a Monday.
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, 1 + i);
    return { key: String(i), label: fmt.format(d) };
  });
}
