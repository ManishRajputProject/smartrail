"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_META, isLocale, type Locale } from "@/i18n/locales";

export function LanguageSelector({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    // Replace the leading /<locale> segment with the chosen one.
    const segments = pathname.split("/");
    if (segments[1] && isLocale(segments[1])) segments[1] = next;
    else segments.splice(1, 0, next);
    const target = segments.join("/") || `/${next}`;
    // Remember the choice so unprefixed links & future visits stay in-language.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    router.push(target);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={LOCALE_META[lang].english + " — change language"}
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-[13px] font-medium text-foreground hover:bg-surface-2 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>
        <span>{LOCALE_META[lang].short}</span>
        <span aria-hidden="true" className="text-[10px]">▾</span>
      </button>
      {open && (
        <div className="card absolute right-0 top-full mt-1 w-44 p-1.5 text-foreground z-50" role="menu">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              role="menuitem"
              onClick={() => switchTo(l)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm hover:bg-primary-soft transition-colors ${l === lang ? "font-semibold text-primary" : ""}`}
            >
              <span>{LOCALE_META[l].native}</span>
              <span className="text-[11px] text-muted">{LOCALE_META[l].english}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
