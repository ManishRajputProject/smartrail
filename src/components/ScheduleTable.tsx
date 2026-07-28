import type { ScheduleStop } from "@/lib/schedules";
import type { ScheduleStrings } from "@/i18n/schedule-strings";
import { fill } from "@/i18n/train-page-strings";

/**
 * Full halt-by-halt schedule for a train.
 *
 * Shows only commercial halts — places a passenger can actually board or
 * alight. The source data also lists every point the train runs through
 * without stopping; presenting those as "stops" would mislead, so they are
 * excluded upstream (see lib/schedules.ts).
 *
 * The table scrolls horizontally inside its own container rather than forcing
 * the page to scroll sideways on narrow screens.
 */
export function ScheduleTable({
  stops,
  totalKm,
  t,
}: {
  stops: ScheduleStop[];
  totalKm: number | null;
  t: ScheduleStrings;
}) {
  if (stops.length < 2) return null;

  const hasDistance = stops.some((s) => s.kmFromOrigin != null);
  const lastDay = stops[stops.length - 1].day;

  return (
    <section className="mt-8" aria-labelledby="schedule-heading">
      <h2 id="schedule-heading" className="text-[19px] font-bold tracking-tight">
        {t.heading}
      </h2>

      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
        {fill(t.summary, {
          stops: stops.length,
          days: lastDay,
        })}{" "}
        {t.haltsOnlyNote}
      </p>

      {/* Key facts that are exact, kept visually distinct from the derived column. */}
      <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
        <span className="chip bg-primary-soft text-primary">
          {fill(t.stopCount, { stops: stops.length })}
        </span>
        {totalKm != null && (
          <span className="chip bg-surface-2">
            {fill(t.totalDistance, { km: totalKm.toLocaleString() })}
          </span>
        )}
        {lastDay > 1 && (
          <span className="chip bg-surface-2">{fill(t.daysOnBoard, { days: lastDay })}</span>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-[14px]">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="bg-surface-2 text-left">
              <th scope="col" className="px-3 py-2.5 font-semibold w-10">
                {t.colNum}
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                {t.colStation}
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold text-right tabular-nums">
                {t.colArrival}
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold text-right tabular-nums">
                {t.colDeparture}
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold text-right">
                {t.colHalt}
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold text-right">
                {t.colDay}
              </th>
              {hasDistance && (
                <th scope="col" className="px-3 py-2.5 font-semibold text-right">
                  {t.colKm}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {stops.map((s, i) => {
              const isFirst = i === 0;
              const isLast = i === stops.length - 1;
              return (
                <tr
                  key={`${s.code}-${i}`}
                  className={`border-t border-border ${
                    isFirst || isLast ? "font-medium" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 text-muted tabular-nums">{i + 1}</td>
                  <th scope="row" className="px-3 py-2.5 text-left font-normal">
                    <span className={isFirst || isLast ? "font-semibold" : ""}>{s.name}</span>{" "}
                    <span className="font-mono text-[12px] text-muted">{s.code}</span>
                  </th>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {s.arrival ?? <span className="text-muted">{t.origin}</span>}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {s.departure ?? <span className="text-muted">{t.terminus}</span>}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-muted">
                    {s.haltMinutes != null && s.haltMinutes > 0
                      ? fill(t.minutes, { m: s.haltMinutes })
                      : "—"}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-muted">{s.day}</td>
                  {hasDistance && (
                    <td className="px-3 py-2.5 text-right tabular-nums text-muted">
                      {s.kmFromOrigin != null ? s.kmFromOrigin.toLocaleString() : "—"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasDistance && (
        <p className="mt-2 text-[12px] leading-relaxed text-muted">{t.distanceNote}</p>
      )}
      <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{t.verifyNote}</p>
    </section>
  );
}
