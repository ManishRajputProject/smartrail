"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/locales";
import { CONSENT_VERSION, readConsent, writeConsent } from "@/lib/consent";

interface ConsentStrings {
  title: string;
  body: string;
  acceptAll: string;
  rejectAll: string;
  customise: string;
  save: string;
  necessaryLabel: string;
  necessaryNote: string;
  analyticsLabel: string;
  analyticsNote: string;
  advertisingLabel: string;
  advertisingNote: string;
  privacyLink: string;
}

/**
 * Consent banner. Deny-by-default: it renders nothing until we've confirmed on
 * the client that no valid decision is stored, so a returning visitor never
 * sees a flash of it, and no ad/analytics script runs before a choice.
 *
 * Fixed-position by design — it overlays rather than displacing content, so it
 * contributes nothing to CLS.
 */
export function ConsentBanner({ lang, t }: { lang: Locale; t: ConsentStrings }) {
  const [needsDecision, setNeedsDecision] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const headingId = useId();
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setNeedsDecision(readConsent() === null);
  }, []);

  // Move focus into the dialog once it appears so keyboard users reach it.
  useEffect(() => {
    if (needsDecision) firstButton.current?.focus();
  }, [needsDecision]);

  if (!needsDecision) return null;

  const decide = (next: { analytics: boolean; advertising: boolean }) => {
    writeConsent({ version: CONSENT_VERSION, ...next });
    setNeedsDecision(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={headingId}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur px-4 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id={headingId} className="text-[15px] font-bold tracking-tight">
          {t.title}
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          {t.body}{" "}
          <Link
            href={localePath(lang, "/privacy-policy")}
            className="underline underline-offset-2"
          >
            {t.privacyLink}
          </Link>
        </p>

        {expanded && (
          <div className="mt-3 space-y-2.5 rounded-lg border border-border bg-surface-2 p-3">
            <div className="flex gap-2.5 text-[13px]">
              <input
                type="checkbox"
                checked
                disabled
                aria-label={t.necessaryLabel}
                className="mt-0.5 shrink-0"
              />
              <span>
                <span className="font-semibold">{t.necessaryLabel}</span>
                <br />
                <span className="text-muted">{t.necessaryNote}</span>
              </span>
            </div>
            <label className="flex gap-2.5 text-[13px] cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 shrink-0"
              />
              <span>
                <span className="font-semibold">{t.analyticsLabel}</span>
                <br />
                <span className="text-muted">{t.analyticsNote}</span>
              </span>
            </label>
            <label className="flex gap-2.5 text-[13px] cursor-pointer">
              <input
                type="checkbox"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
                className="mt-0.5 shrink-0"
              />
              <span>
                <span className="font-semibold">{t.advertisingLabel}</span>
                <br />
                <span className="text-muted">{t.advertisingNote}</span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {/* Reject is first and equally prominent — no dark pattern. */}
          <button
            ref={firstButton}
            type="button"
            onClick={() => decide({ analytics: false, advertising: false })}
            className="btn-secondary !py-2 !px-4 !text-[13px]"
          >
            {t.rejectAll}
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: true, advertising: true })}
            className="btn-primary !py-2 !px-4 !text-[13px]"
          >
            {t.acceptAll}
          </button>
          {expanded ? (
            <button
              type="button"
              onClick={() => decide({ analytics, advertising })}
              className="btn-secondary !py-2 !px-4 !text-[13px]"
            >
              {t.save}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-[13px] underline underline-offset-2 px-2 self-center"
            >
              {t.customise}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
