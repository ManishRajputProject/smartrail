"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchTrigger } from "@/components/SearchTrigger";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { SITE_NAME } from "@/lib/seo";

export function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl text-nav-fg"
      style={{ background: "var(--nav-bg-blur)", borderBottom: "1px solid var(--nav-border)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 h-14" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 font-bold text-[17px] shrink-0 tracking-tight text-nav-fg" aria-label={`${SITE_NAME} home`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg text-base text-white shadow-sm" style={{ background: "linear-gradient(135deg, var(--primary), #12a594)" }} aria-hidden="true">🚆</span>
          {SITE_NAME}
        </Link>

        <div className="hidden md:flex items-center gap-0.5 text-sm font-medium">
          <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
            <button type="button" className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-expanded={toolsOpen} onClick={() => setToolsOpen((v) => !v)}>
              Tools ▾
            </button>
            {toolsOpen && (
              <div className="card absolute left-0 top-full w-[540px] max-w-[90vw] p-3 grid grid-cols-2 gap-0.5 text-foreground">
                {[...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => (
                  <Link key={t.href} href={t.href} className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-primary-soft transition-colors" onClick={() => setToolsOpen(false)}>
                    <span aria-hidden="true">{t.icon}</span>
                    <span className="text-[13px]">{t.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setGuidesOpen(true)} onMouseLeave={() => setGuidesOpen(false)}>
            <button type="button" className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-expanded={guidesOpen} onClick={() => setGuidesOpen((v) => !v)}>
              Guides ▾
            </button>
            {guidesOpen && (
              <div className="card absolute left-0 top-full w-72 p-2 text-foreground">
                <Link href="/guides" className="block rounded-lg px-3 py-1.5 font-semibold hover:bg-primary-soft transition-colors" onClick={() => setGuidesOpen(false)}>
                  All Guides →
                </Link>
                {GUIDES.slice(0, 7).map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="block rounded-lg px-3 py-1.5 hover:bg-primary-soft transition-colors text-[13px] text-muted hover:text-foreground" onClick={() => setGuidesOpen(false)}>
                    {g.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/trains" className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">Trains</Link>
          <Link href="/plan-ticket" className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">Plan Ticket</Link>
          <Link href="/faq" className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-1.5">
          <SearchTrigger />
          <span className="md:hidden"><SearchTrigger variant="icon" /></span>
          <Link href="/reminders" className="hidden md:inline-flex btn-accent !py-1.5 !px-3.5 text-[13px]">
            🔔 Reminders
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 text-nav-fg"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 text-sm max-h-[70vh] overflow-y-auto" style={{ borderTop: "1px solid var(--nav-border)" }}>
          <div>
            <p className="font-semibold text-nav-muted text-xs uppercase tracking-wide mb-1.5">Tools</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              {[...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => (
                <Link key={t.href} href={t.href} className="py-1.5 text-[13px]" onClick={() => setMobileOpen(false)}>
                  {t.icon} {t.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-2" style={{ borderTop: "1px solid var(--nav-border)" }}>
            <Link href="/guides" className="py-1" onClick={() => setMobileOpen(false)}>📚 Guides</Link>
            <Link href="/plan-ticket" className="py-1" onClick={() => setMobileOpen(false)}>🗓️ Plan Ticket</Link>
            <Link href="/faq" className="py-1" onClick={() => setMobileOpen(false)}>❓ FAQ</Link>
          </div>
        </div>
      )}

      {/* Bottom tab bar for small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl grid grid-cols-4 text-[11px] font-medium text-nav-fg" style={{ background: "var(--nav-bg-blur)", borderTop: "1px solid var(--nav-border)" }}>
        <Link href="/" className="flex flex-col items-center gap-0.5 py-2"><span aria-hidden="true">🏠</span>Home</Link>
        <Link href="/trains" className="flex flex-col items-center gap-0.5 py-2"><span aria-hidden="true">🚆</span>Trains</Link>
        <Link href="/booking-date-calculator" className="flex flex-col items-center gap-0.5 py-2"><span aria-hidden="true">🧮</span>Tools</Link>
        <Link href="/reminders" className="flex flex-col items-center gap-0.5 py-2"><span aria-hidden="true">🔔</span>Remind</Link>
      </div>
    </header>
  );
}
