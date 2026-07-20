export type BoardChance = "yes" | "maybe" | "no";

export interface PnrStatusCode {
  code: string;
  full: string;
  board: BoardChance;
  meaning: string;
}

/** Static reference — these are stable status-code definitions, not live data. */
export const PNR_STATUS_CODES: PnrStatusCode[] = [
  { code: "CNF", full: "Confirmed", board: "yes", meaning: "Your berth/seat is confirmed. The exact coach and berth number are assigned at chart preparation." },
  { code: "RAC", full: "Reservation Against Cancellation", board: "yes", meaning: "You can board with a shared side-berth. You'll usually get a full berth if a confirmed passenger cancels or doesn't show." },
  { code: "WL", full: "Waiting List", board: "maybe", meaning: "You're on a waiting list. Confirmation depends on cancellations before chart preparation. A fully waitlisted e-ticket cannot board." },
  { code: "GNWL", full: "General Waiting List", board: "maybe", meaning: "Waiting list from the origin or nearby stations. Draws from the largest cancellation pool — the best confirmation odds." },
  { code: "PQWL", full: "Pooled Quota Waiting List", board: "maybe", meaning: "Waiting list shared across several intermediate-station journeys. Clears more slowly than GNWL." },
  { code: "RLWL", full: "Remote Location Waiting List", board: "maybe", meaning: "Waiting list for specific intermediate stations with their own small quota. Only same-segment cancellations help." },
  { code: "RSWL", full: "Roadside Station Waiting List", board: "maybe", meaning: "Waiting list for minor roadside stations with a very small quota. Historically the slowest to clear." },
  { code: "TQWL", full: "Tatkal Quota Waiting List", board: "maybe", meaning: "Waiting list within the Tatkal quota. Tatkal tickets rarely cancel, so this clears only occasionally." },
  { code: "PQWL", full: "Pooled Quota Waiting List", board: "maybe", meaning: "A quota shared between multiple intermediate stations — lower confirmation chances than GNWL." },
  { code: "REGRET", full: "No Accommodation / Regret", board: "no", meaning: "No tickets are available in this class; the waiting list is full and no more bookings are being accepted." },
  { code: "CAN", full: "Cancelled", board: "no", meaning: "This ticket has been cancelled. Any refund is processed per the cancellation rules." },
  { code: "NOSHOW", full: "No Show", board: "no", meaning: "The passenger did not board. No refund is applicable on a confirmed no-show ticket." },
];

/** Deduplicated for the reference table (PQWL appears twice above for lookup). */
export const PNR_STATUS_TABLE: PnrStatusCode[] = PNR_STATUS_CODES.filter(
  (c, i, arr) => arr.findIndex((x) => x.code === c.code) === i
);

export const BOARD_LABEL: Record<BoardChance, { text: string; className: string }> = {
  yes: { text: "✓ Yes", className: "text-success" },
  maybe: { text: "? Maybe", className: "text-accent" },
  no: { text: "✕ No", className: "text-danger" },
};

export interface DecodedPnr {
  matchedCode?: PnrStatusCode;
  position?: number;
  coach?: string;
  berth?: string;
  summary: string;
}

/**
 * Parse a user-typed status such as "GNWL/12", "RAC 4", "CNF/B2/34",
 * "WL 15/WL 8" or "PQWL/34". Extracts the status code, current position and
 * (for confirmed) coach/berth. Pure client-safe logic — no lookups elsewhere.
 */
export function decodePnrStatus(raw: string): DecodedPnr | null {
  const input = raw.trim().toUpperCase();
  if (!input) return null;

  const codeMatch = input.match(/CNF|RAC|GNWL|PQWL|RLWL|RSWL|TQWL|REGRET|NOSHOW|CAN|WL/);
  const code = codeMatch?.[0];
  const matchedCode = code ? PNR_STATUS_TABLE.find((c) => c.code === code) : undefined;

  // "current/booking" pairs like "GNWL 34/12" — take the last number as current
  const numbers = input.match(/\d+/g)?.map(Number) ?? [];
  const coachMatch = input.match(/([ABCDESH]\d{1,2})/); // e.g. B2, S9, A1
  const coach = coachMatch?.[1];

  if (!matchedCode) {
    return { summary: "Couldn't recognise that status. Type it as shown on your ticket, e.g. GNWL/12, RAC 4 or CNF/B2/34." };
  }

  if (matchedCode.code === "CNF") {
    const berth = numbers.length ? String(numbers[numbers.length - 1]) : undefined;
    return {
      matchedCode,
      coach,
      berth,
      summary: coach
        ? `Confirmed — coach ${coach}${berth ? `, berth ${berth}` : ""}. You're good to board.`
        : "Confirmed. Your coach and berth are assigned at chart preparation.",
    };
  }

  if (matchedCode.code === "RAC") {
    const position = numbers.length ? numbers[numbers.length - 1] : undefined;
    return {
      matchedCode,
      position,
      summary: `RAC ${position ?? ""}`.trim() + " — you can board with a shared side-berth; a lower RAC number is close to a full berth.",
    };
  }

  // Waiting-list family
  const position = numbers.length ? numbers[numbers.length - 1] : undefined;
  return {
    matchedCode,
    position,
    summary:
      position != null
        ? `${matchedCode.code} ${position} — position ${position} on the ${matchedCode.full.toLowerCase()}. It confirms only if enough passengers ahead cancel before chart preparation.`
        : `${matchedCode.full}. It confirms only if enough passengers ahead cancel before chart preparation.`,
  };
}
