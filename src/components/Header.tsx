"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ToolIcon } from "@/components/ToolIcon";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { SITE_NAME } from "@/lib/seo";
import { localePath, type Locale } from "@/i18n/locales";
import { localizeTools } from "@/i18n/tool-translations";
import { localizeGuides } from "@/i18n/guide-translations";
import type { Dictionary } from "@/i18n/dictionary";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Hover intent: a small close delay stops the panel vanishing while the
  // pointer travels from the trigger into the menu.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const open = (set: (v: boolean) => void) => { cancelClose(); set(true); };
  const scheduleClose = (set: (v: boolean) => void) => {
    cancelClose();
    closeTimer.current = setTimeout(() => set(false), 220);
  };
  const pathname = usePathname();
  const lp = (href: string) => localePath(lang, href);
  const n = dict.nav;
  const allTools = localizeTools(lang, [...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES]);
  const guides = localizeGuides(lang, GUIDES).slice(0, 7);

  const isActive = (href: string) => pathname === lp(href) || pathname.startsWith(lp(href) + "/");

  const navLink = (href: string, label: string) => (
    <Link
      href={lp(href)}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-surface-2 ${
        isActive(href) ? "text-primary" : "text-foreground/80 hover:text-foreground"
      }`}
    >
      {label}
      {isActive(href) && (
        <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" aria-hidden="true" />
      )}
    </Link>
  );

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-border"
      style={{ background: "var(--nav-bg-blur)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 h-16" aria-label="Main navigation">
        <Link href={lp("/")} className="flex items-center gap-2.5 font-bold text-[17px] shrink-0 tracking-tight">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="14" rx="4" />
              <path d="M5 10h14M8 17l-2 4M16 17l2 4" />
            </svg>
          </span>
          {SITE_NAME}
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {/* Tools mega-menu */}
          <div className="relative" onMouseEnter={() => open(setToolsOpen)} onMouseLeave={() => scheduleClose(setToolsOpen)}>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface-2 transition-colors inline-flex items-center gap-1.5"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((v) => !v)}
            >
              {n.tools}
              <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[600px] max-w-[92vw]"><div className="card p-3 grid grid-cols-2 gap-1">
                {allTools.map((t) => (
                  <Link
                    key={t.href}
                    href={lp(t.href)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-primary-soft transition-colors group"
                    onClick={() => setToolsOpen(false)}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-primary group-hover:bg-surface transition-colors">
                      <ToolIcon href={t.href} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[13px] font-medium leading-snug">{t.label}</span>
                  </Link>
                ))}
              </div></div>
            )}
          </div>

          {/* Guides menu */}
          <div className="relative" onMouseEnter={() => open(setGuidesOpen)} onMouseLeave={() => scheduleClose(setGuidesOpen)}>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface-2 transition-colors inline-flex items-center gap-1.5"
              aria-expanded={guidesOpen}
              onClick={() => setGuidesOpen((v) => !v)}
            >
              {n.guides}
              <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${guidesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {guidesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80"><div className="card p-2.5">
                <Link href={lp("/guides")} className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-soft transition-colors" onClick={() => setGuidesOpen(false)}>
                  {n.allGuides} →
                </Link>
                <span className="my-1.5 block h-px bg-border" />
                {guides.map((g) => (
                  <Link key={g.slug} href={lp(`/guides/${g.slug}`)} className="block rounded-lg px-3 py-2 text-[13px] text-muted hover:text-foreground hover:bg-surface-2 transition-colors leading-snug" onClick={() => setGuidesOpen(false)}>
                    {g.title}
                  </Link>
                ))}
              </div></div>
            )}
          </div>

          {navLink("/trains", n.trains)}
          {navLink("/plan-ticket", n.planTicket)}
          {navLink("/faq", n.faq)}
        </div>

        <div className="flex items-center gap-2">
          <Link href={lp("/reminders")} className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-[13px]">
            {n.reminders}
          </Link>
          <LanguageSelector lang={lang} />
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground"
            aria-label={n.menu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={mobileOpen ? "M18 6 6 18M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-6 py-5 space-y-6 max-h-[75vh] overflow-y-auto bg-[var(--background)]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted mb-3">{n.tools}</p>
            <div className="grid grid-cols-1 gap-1">
              {allTools.map((t) => (
                <Link key={t.href} href={lp(t.href)} className="flex items-center gap-3 rounded-lg py-2.5 text-sm" onClick={() => setMobileOpen(false)}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <ToolIcon href={t.href} className="h-4 w-4" />
                  </span>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-4 border-t border-border text-sm font-medium">
            <Link href={lp("/guides")} className="py-2.5" onClick={() => setMobileOpen(false)}>{n.guides}</Link>
            <Link href={lp("/plan-ticket")} className="py-2.5" onClick={() => setMobileOpen(false)}>{n.planTicket}</Link>
            <Link href={lp("/faq")} className="py-2.5" onClick={() => setMobileOpen(false)}>{n.faq}</Link>
          </div>
        </div>
      )}

      {/* Bottom tab bar (mobile) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t border-border grid grid-cols-4 text-[11px] font-medium"
        style={{ background: "var(--nav-bg-blur)" }}
      >
        {[
          { href: "/", label: n.home, d: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" },
          { href: "/trains", label: n.trains, d: "M8 3h8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM4 10h16M8 17l-2 4M16 17l2 4" },
          { href: "/booking-date-calculator", label: n.tools, d: "M5 5h14v16H5zM9 3v4M15 3v4M8 12h8M8 16h5" },
          { href: "/reminders", label: n.reminders, d: "M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6ZM10 19.5a2.2 2.2 0 0 0 4 0" },
        ].map((i) => (
          <Link
            key={i.href}
            href={lp(i.href)}
            className={`flex flex-col items-center gap-1 py-2.5 ${isActive(i.href) ? "text-primary" : "text-muted"}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={i.d} /></svg>
            {i.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
