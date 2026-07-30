"use client";

import { useEffect, useState } from "react";
import { fill } from "@/i18n/train-page-strings";
import type { Dictionary } from "@/i18n/dictionary";

interface LiveStopStatus {
  code: string;
  name: string;
  status: string;
  scheduledArrival: string | null;
  scheduledDeparture: string | null;
  actualArrival: string | null;
  actualDeparture: string | null;
  delayArrivalMin: number | null;
  delayDepartureMin: number | null;
}

interface LiveStatusResponse {
  available: boolean;
  status?: string;
  delayMinutes?: number;
  lastUpdatedAt?: string;
  currentLocation?: { stationCode: string; status: string } | null;
  previousHalt?: { code: string; name: string } | null;
  nextHalt?: { code: string; name: string; distanceKm: number } | null;
  stops?: LiveStopStatus[];
}

function delayColor(min: number): string {
  if (min <= 0) return "text-emerald-600 dark:text-emerald-400";
  if (min < 30) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

export function LiveStatusPanel({ trainNumber, t }: { trainNumber: string; t: Dictionary["live"] }) {
  const [data, setData] = useState<LiveStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/trains/${trainNumber}/live`)
      .then((r) => r.json())
      .then((d: LiveStatusResponse) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setData({ available: false });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [trainNumber]);

  if (loading) {
    return <div className="mt-4 h-20 rounded-xl border border-border bg-surface-2 animate-pulse" />;
  }

  if (!data?.available) {
    return <p className="mt-4 text-[13px] text-muted">{t.unavailable}</p>;
  }

  const delay = data.delayMinutes ?? 0;
  const delayLabel = delay <= 0 ? t.onTime : fill(t.lateBy, { min: delay });
  const updatedTime = data.lastUpdatedAt
    ? new Date(data.lastUpdatedAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
    : "";

  return (
    <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary flex items-center gap-1.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t.liveStatus}
        </p>
        <span className={`text-[12px] font-semibold ${delayColor(delay)}`}>{delayLabel}</span>
      </div>

      {data.currentLocation && (
        <p className="mt-2 text-[14px]">
          {data.currentLocation.status === "at-station"
            ? fill(t.atStation, { station: data.currentLocation.stationCode })
            : data.previousHalt && data.nextHalt
              ? fill(t.between, { from: data.previousHalt.name, to: data.nextHalt.name })
              : null}
        </p>
      )}

      {data.nextHalt && (
        <p className="mt-1 text-[12px] text-muted">
          {fill(t.nextHaltIn, { station: data.nextHalt.name, km: data.nextHalt.distanceKm })}
        </p>
      )}

      {updatedTime && <p className="mt-2 text-[11px] text-muted">{fill(t.lastUpdated, { time: updatedTime })}</p>}
    </div>
  );
}
