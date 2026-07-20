"use client";

import { useState } from "react";
import { decodePnrStatus, BOARD_LABEL, type DecodedPnr } from "@/lib/pnr-status";

export function PnrDecoderClient() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<DecodedPnr | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(decodePnrStatus(value));
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. GNWL/12, RAC 4 or CNF/B2/34"
          aria-label="Enter your booking status"
          className="input"
        />
        <button type="submit" className="btn-primary shrink-0">Decode</button>
      </form>
      <p className="mt-1.5 text-[12px] text-muted">
        Type the status <strong>exactly as shown on your ticket</strong>. This explains what it means — it does
        not fetch your live PNR (that needs the official IRCTC/NTES site).
      </p>

      {result && (
        <div className="mt-3 rounded-xl border border-primary/30 bg-primary-soft p-4">
          {result.matchedCode ? (
            <>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary">{result.matchedCode.code}</span>
                <span className="text-sm text-muted">{result.matchedCode.full}</span>
                <span className={`ml-auto text-sm font-semibold ${BOARD_LABEL[result.matchedCode.board].className}`}>
                  {BOARD_LABEL[result.matchedCode.board].text} board
                </span>
              </div>
              <p className="mt-2 text-[15px] font-medium">{result.summary}</p>
            </>
          ) : (
            <p className="text-[15px]">{result.summary}</p>
          )}
        </div>
      )}
    </div>
  );
}
