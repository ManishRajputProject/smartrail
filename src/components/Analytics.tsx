"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";

const GA_MEASUREMENT_ID = "G-4K99XFSYGV";
const SCRIPT_ID = "ga-gtag-js";

/** Load gtag.js exactly once, and only after analytics consent — same
 *  imperative-script pattern as AdSlot's AdSense loader. */
function ensureGaScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return;

  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_MEASUREMENT_ID);

  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

/** Renders nothing — mounts once in the root layout, loads Google Analytics
 *  only once the visitor has consented to analytics (matches the cookie
 *  banner's "privacy-respecting analytics" promise), and reacts live if
 *  consent changes without needing a reload. */
export function Analytics() {
  const [allowed, setAllowed] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const apply = (c: ConsentState | null) => setAllowed(Boolean(c?.analytics));
    apply(readConsent());

    const onChange = (e: Event) =>
      apply((e as CustomEvent<ConsentState>).detail ?? readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (!allowed || loaded.current) return;
    ensureGaScript();
    loaded.current = true;
  }, [allowed]);

  return null;
}
