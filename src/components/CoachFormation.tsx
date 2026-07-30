import type { Dictionary } from "@/i18n/dictionary";

/**
 * Renders RailRadar's real, live coachPosition string as a formation strip —
 * verbatim codes, no invented class names or berth counts. Only the handful
 * of universally-unambiguous non-passenger codes get a distinct color; every
 * passenger coach keeps its raw code as the label, since exact class and
 * berth layout vary by rake and we have no verified source for those.
 */

type CoachKind = "engine" | "power" | "pantry" | "general" | "utility" | "passenger";

function classify(code: string): CoachKind {
  if (code === "ENG") return "engine";
  if (code.startsWith("EOG")) return "power";
  if (code.startsWith("PC")) return "pantry";
  if (code.startsWith("GEN")) return "general";
  if (code.startsWith("SLR")) return "utility";
  return "passenger";
}

const STYLE: Record<CoachKind, string> = {
  engine: "bg-neutral-800 text-white",
  power: "bg-neutral-400 text-white",
  pantry: "bg-amber-500 text-white",
  general: "bg-slate-300 text-slate-800",
  utility: "bg-slate-400 text-white",
  passenger: "bg-primary text-primary-foreground",
};

export function CoachFormation({ composition, t }: { composition: string; t: Dictionary["live"] }) {
  const coaches = composition.split("-").filter(Boolean);
  if (coaches.length === 0) return null;

  return (
    <div className="mt-3">
      <p className="text-[12px] text-muted mb-2">{t.coachFormationHint}</p>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {coaches.map((code, i) => (
          <div
            key={`${code}-${i}`}
            className={`shrink-0 min-w-[42px] h-9 rounded grid place-items-center text-[10px] font-bold tabular-nums ${STYLE[classify(code)]}`}
            title={code}
          >
            {code}
          </div>
        ))}
      </div>
    </div>
  );
}
