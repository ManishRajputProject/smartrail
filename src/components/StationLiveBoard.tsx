"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import { fill } from "@/i18n/train-page-strings";

interface LiveStationTrain {
  number: string;
  name: string;
  type: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  arrival: string | null;
  departure: string | null;
  platform: string | null;
  stopType: string;
  liveStatus: "at-station" | "upcoming" | "departed" | "scheduled";
  delayMinutes: number;
  expectedArrival: string | null;
  expectedDeparture: string | null;
}

interface StationBoardResponse {
  available: boolean;
  trains?: LiveStationTrain[];
}

const DISPLAY_LIMIT = 50;

function stopBadge(stopType: string, t: Dictionary["live"]): string {
  if (stopType === "origin") return t.origin;
  if (stopType === "destination") return t.destination;
  return t.haltStop;
}

function liveStatusLabel(status: LiveStationTrain["liveStatus"], t: Dictionary["live"]): string {
  if (status === "at-station") return t.liveTypeAtStation;
  if (status === "upcoming") return t.liveTypeUpcoming;
  if (status === "departed") return t.liveTypeDeparted;
  return t.liveTypeScheduled;
}

const STATUS_COLOR: Record<LiveStationTrain["liveStatus"], string> = {
  "at-station": "bg-emerald-500/10 text-emerald-600",
  upcoming: "bg-primary/10 text-primary",
  departed: "bg-surface-2 text-muted",
  scheduled: "bg-surface-2 text-muted",
};

export function StationLiveBoard({
  stationCode,
  locale,
  t,
}: {
  stationCode: string;
  locale: string;
  t: Dictionary["live"];
}) {
  const [data, setData] = useState<StationBoardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/stations/${stationCode}/live`)
      .then((r) => r.json())
      .then((d: StationBoardResponse) => {
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
  }, [stationCode]);

  if (loading) {
    return (
      <div className="mt-3 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-lg border border-border bg-surface-2 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data?.available || !data.trains?.length) {
    return <p className="mt-3 text-[13px] text-muted">{t.unavailable}</p>;
  }

  const trains = data.trains.slice(0, DISPLAY_LIMIT);

  return (
    <div className="mt-3">
      <p className="text-sm text-muted">{fill(t.stationBoardSubtitle, { count: data.trains.length })}</p>
      <div className="mt-2 divide-y divide-border rounded-xl border border-border overflow-hidden">
        {trains.map((tr, i) => {
          const time = tr.expectedDeparture ?? tr.expectedArrival ?? tr.departure ?? tr.arrival ?? "—";
          return (
            <Link
              key={`${tr.number}-${i}`}
              href={`/${locale}/trains/${tr.number}`}
              className="flex items-center gap-3 px-3.5 py-3 hover:bg-primary-soft transition-colors"
            >
              <span className="text-[13px] font-semibold tabular-nums shrink-0 w-12">{time}</span>
              <span className="flex-1 min-w-0">
                <span className="font-mono font-bold text-primary text-[13px] mr-1.5">{tr.number}</span>
                <span className="text-[14px]">{tr.name}</span>
                <span className="block text-[12px] text-muted mt-0.5 truncate">
                  {tr.fromName} → {tr.toName}
                  {tr.platform && <> · PF {tr.platform}</>}
                </span>
              </span>
              <span className="shrink-0 flex flex-col items-end gap-1">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${STATUS_COLOR[tr.liveStatus]}`}>
                  {liveStatusLabel(tr.liveStatus, t)}
                </span>
                <span className="text-[10px] text-muted">
                  {tr.delayMinutes > 0 ? fill(t.lateBy, { min: tr.delayMinutes }) : t.onTime}
                </span>
                <span className="text-[10px] text-muted chip bg-surface-2 !px-1.5 !py-0">{stopBadge(tr.stopType, t)}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
