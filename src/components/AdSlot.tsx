"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, AD_SIZES, adsConfigured, type AdPlacement } from "@/lib/ads";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";

const SCRIPT_ID = "adsbygoogle-js";

/** Load the AdSense library exactly once, and only after consent. Done
 *  imperatively rather than with next/script so a slot deep in the tree can
 *  request it without every slot rendering its own <Script>. */
function ensureAdScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(s);
}

/**
 * A consent-gated, layout-stable ad slot.
 *
 * - Renders nothing until a publisher ID is configured, so an unconfigured
 *   site shows no empty boxes.
 * - Fetches no ad script and renders no slot until the visitor has consented
 *   to advertising — the script is only injected after consent, which is the
 *   actual requirement rather than merely hiding the slot.
 * - Reserves its height up front so filling the slot causes no layout shift.
 * - Labelled for disclosure.
 */
export function AdSlot({
  placement = "inline",
  slot,
  label = "Advertisement",
  className = "",
}: {
  placement?: AdPlacement;
  /** AdSense ad unit id. Omit to use auto ads for the placement. */
  slot?: string;
  label?: string;
  className?: string;
}) {
  const [allowed, setAllowed] = useState(false);
  const pushed = useRef(false);

  useEffect(() => {
    const apply = (c: ConsentState | null) => setAllowed(Boolean(c?.advertising));
    apply(readConsent());

    const onChange = (e: Event) =>
      apply((e as CustomEvent<ConsentState>).detail ?? readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Load the library and hand over the slot once consent is in.
  useEffect(() => {
    if (!allowed || pushed.current || !adsConfigured()) return;
    ensureAdScript();
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle ?? []).push({});
      pushed.current = true;
    } catch {
      /* blocked or not yet loaded; a later consent change retries */
    }
  }, [allowed]);

  if (!adsConfigured() || !allowed) return null;

  const size = AD_SIZES[placement];

  return (
    <aside
      aria-label={label}
      className={`mx-auto w-full max-w-3xl px-4 my-8 ${className}`}
    >
      <p className="text-[10px] uppercase tracking-wide text-muted mb-1 text-center">
        {label}
      </p>
      <div
        className="flex items-center justify-center overflow-hidden rounded-lg bg-surface-2"
        style={{ minHeight: size.minHeight, maxHeight: size.maxHeight }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: size.minHeight }}
          data-ad-client={ADSENSE_CLIENT}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
