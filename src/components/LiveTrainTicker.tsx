import Link from "next/link";
import type { LiveStationTrain } from "@/lib/railradar";
import { localePath, type Locale } from "@/i18n/locales";

function StatusText({ delayMinutes, liveStatus }: { delayMinutes: number; liveStatus: LiveStationTrain["liveStatus"] }) {
  if (liveStatus === "scheduled") {
    return <span className="font-semibold text-muted">Scheduled</span>;
  }
  if (delayMinutes <= 0) {
    return <span className="font-semibold text-success">On time</span>;
  }
  return <span className="font-semibold text-amber-600">+{delayMinutes}m late</span>;
}

function TickerItem({ train, lang }: { train: LiveStationTrain; lang: Locale }) {
  return (
    <Link
      href={localePath(lang, `/trains/${train.number}`)}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/40"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft font-mono text-[11px] font-bold text-primary">
        {train.number}
      </span>
      <span className="min-w-0">
        <span className="block max-w-[180px] truncate text-[13px] font-semibold leading-tight">{train.name}</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
          <span className="max-w-[64px] truncate">{train.fromCode}</span>
          <span aria-hidden="true">→</span>
          <span className="max-w-[64px] truncate">{train.toCode}</span>
          <span aria-hidden="true">·</span>
          <StatusText delayMinutes={train.delayMinutes} liveStatus={train.liveStatus} />
        </span>
      </span>
    </Link>
  );
}

/**
 * Continuous marquee of real live trains at a hub station. Pure CSS
 * transform loop (pauses on hover/focus, collapses under reduced-motion —
 * same pattern as TrainAnnouncementBar). Renders nothing if the live feed
 * came back empty, rather than showing a stale or fake ticker.
 */
export function LiveTrainTicker({ trains, lang }: { trains: LiveStationTrain[]; lang: Locale }) {
  if (trains.length === 0) return null;

  return (
    <div className="live-ticker rounded-2xl border border-border bg-surface-2/40">
      <div className="live-ticker-track">
        {trains.map((t) => (
          <TickerItem key={`a-${t.number}`} train={t} lang={lang} />
        ))}
        {trains.map((t) => (
          <TickerItem key={`b-${t.number}`} train={t} lang={lang} />
        ))}
      </div>
    </div>
  );
}
