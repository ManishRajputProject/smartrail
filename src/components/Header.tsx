"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { SITE_NAME } from "@/lib/seo";

export function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[var(--background)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0" aria-label={`${SITE_NAME} home`}>
          <span aria-hidden="true">🚆</span>
          {SITE_NAME}
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className="px-3 py-2 rounded-md hover:bg-surface-2"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((v) => !v)}
            >
              Tools
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full w-[560px] max-w-[90vw] rounded-xl border border-border bg-[var(--background)] p-4 shadow-xl grid grid-cols-2 gap-1">
                {[...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex flex-col rounded-lg px-3 py-2 hover:bg-surface-2"
                  >
                    <span className="font-medium">{t.icon} {t.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setGuidesOpen(true)}
            onMouseLeave={() => setGuidesOpen(false)}
          >
            <button
              type="button"
              className="px-3 py-2 rounded-md hover:bg-surface-2"
              aria-expanded={guidesOpen}
              onClick={() => setGuidesOpen((v) => !v)}
            >
              Guides
            </button>
            {guidesOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-border bg-[var(--background)] p-2 shadow-xl">
                <Link href="/guides" className="block rounded-lg px-3 py-2 font-medium hover:bg-surface-2">
                  All Guides
                </Link>
                {GUIDES.slice(0, 6).map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="block rounded-lg px-3 py-2 hover:bg-surface-2 text-sm"
                  >
                    {g.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/plan-ticket" className="px-3 py-2 rounded-md hover:bg-surface-2">Plan Ticket</Link>
          <Link href="/reminders" className="px-3 py-2 rounded-md hover:bg-surface-2">Reminders</Link>
          <Link href="/faq" className="px-3 py-2 rounded-md hover:bg-surface-2">FAQ</Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 py-3 space-y-3 text-sm">
          <div>
            <p className="font-semibold text-muted mb-1">Tools</p>
            <div className="grid grid-cols-1 gap-1">
              {[...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => (
                <Link key={t.href} href={t.href} className="py-1" onClick={() => setMobileOpen(false)}>
                  {t.icon} {t.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-2 border-t border-border">
            <Link href="/guides" onClick={() => setMobileOpen(false)}>Guides</Link>
            <Link href="/plan-ticket" onClick={() => setMobileOpen(false)}>Plan Ticket</Link>
            <Link href="/reminders" onClick={() => setMobileOpen(false)}>Reminders</Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
          </div>
        </div>
      )}

      {/* Bottom tab bar for small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-[var(--background)] grid grid-cols-4 text-xs">
        <Link href="/" className="flex flex-col items-center gap-0.5 py-2">
          <span aria-hidden="true">🏠</span>Home
        </Link>
        <Link href="/plan-ticket" className="flex flex-col items-center gap-0.5 py-2">
          <span aria-hidden="true">🗓️</span>Plan
        </Link>
        <Link href="/booking-date-calculator" className="flex flex-col items-center gap-0.5 py-2">
          <span aria-hidden="true">🧮</span>Tools
        </Link>
        <Link href="/reminders" className="flex flex-col items-center gap-0.5 py-2">
          <span aria-hidden="true">🔔</span>Remind
        </Link>
      </div>
    </header>
  );
}
