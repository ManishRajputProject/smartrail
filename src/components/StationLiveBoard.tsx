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
  stopType: string;
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
        {trains.map((tr, i) => (
          <Link
            key={`${tr.number}-${i}`}
            href={`/${locale}/trains/${tr.number}`}
            className="flex items-center gap-3 px-3.5 py-3 hover:bg-primary-soft transition-colors"
          >
            <span className="text-[13px] font-semibold tabular-nums shrink-0 w-12">
              {tr.departure || tr.arrival || "—"}
            </span>
            <span className="flex-1 min-w-0">
              <span className="font-mono font-bold text-primary text-[13px] mr-1.5">{tr.number}</span>
              <span className="text-[14px]">{tr.name}</span>
              <span className="block text-[12px] text-muted mt-0.5 truncate">
                {tr.fromName} → {tr.toName}
              </span>
            </span>
            <span className="text-[11px] text-muted shrink-0 chip bg-surface-2">{stopBadge(tr.stopType, t)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
