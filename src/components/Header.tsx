"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ToolIcon } from "@/components/ToolIcon";
import { LiveDot } from "@/components/LiveDot";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES, type ToolRoute } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";
import { SITE_NAME } from "@/lib/seo";
import { localePath, type Locale } from "@/i18n/locales";
import { localizeTools } from "@/i18n/tool-translations";
import { localizeGuides } from "@/i18n/guide-translations";
import type { Dictionary } from "@/i18n/dictionary";

// Routes backed by RailRadar live data, not just the static 2016 dataset —
// flagged in the menu so users know these can show real-time status.
const LIVE_HREFS = new Set(["/trains", "/trains-between", "/stations"]);

// Each hover-dropdown gets its own open state + close timer. Sharing one
// timer across menus meant entering menu B canceled menu A's pending close,
// so A never closed once the cursor left it — every dropdown needs its own.
function useHoverMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => { if (timer.current) clearTimeout(timer.current); };
  return {
    open: isOpen,
    onEnter: () => { cancel(); setIsOpen(true); },
    onLeave: () => { cancel(); timer.current = setTimeout(() => setIsOpen(false), 220); },
    toggle: () => { cancel(); setIsOpen((v) => !v); },
    close: () => { cancel(); setIsOpen(false); },
  };
}

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const calculatorsMenu = useHoverMenu();
  const planDecideMenu = useHoverMenu();
  const liveToolsMenu = useHoverMenu();
  const guidesMenu = useHoverMenu();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // A route change always means the user picked something — every menu
  // (desktop dropdowns and the mobile sheet) should close, not just the one
  // that happened to contain the link that was clicked.
  useEffect(() => {
    setMobileOpen(false);
    calculatorsMenu.close();
    planDecideMenu.close();
    liveToolsMenu.close();
    guidesMenu.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Desktop dropdowns should be mutually exclusive: opening one (by click or
  // hover) closes any other that's still open, instead of letting two sit
  // open side by side.
  const allDesktopMenus = [calculatorsMenu, planDecideMenu, liveToolsMenu, guidesMenu];
  const exclusive = (menu: ReturnType<typeof useHoverMenu>) => ({
    ...menu,
    onEnter: () => { allDesktopMenus.forEach((m) => { if (m !== menu) m.close(); }); menu.onEnter(); },
    toggle: () => { allDesktopMenus.forEach((m) => { if (m !== menu) m.close(); }); menu.toggle(); },
  });
  const lp = (href: string) => localePath(lang, href);
  const n = dict.nav;
  const s = dict.sections;

  const calcTools = localizeTools(lang, CALCULATOR_ROUTES);
  const decisionTools = localizeTools(lang, DECISION_TOOL_ROUTES);
  const directoryTools = localizeTools(lang, COMMUNITY_ROUTES);
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

  const menuRow = (t: ToolRoute, onClick: () => void) => (
    <Link
      key={t.href}
      href={lp(t.href)}
      className="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-primary-soft transition-colors group min-w-0"
      onClick={onClick}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-primary group-hover:bg-surface transition-colors">
        <ToolIcon href={t.href} className="h-4 w-4" />
      </span>
      <span className="text-[13px] font-medium leading-snug truncate min-w-0">{t.label}</span>
      {LIVE_HREFS.has(t.href) && (
        <span className="ml-auto shrink-0"><LiveDot /></span>
      )}
    </Link>
  );

  const navDropdown = (label: string, menu: ReturnType<typeof useHoverMenu>, tools: ToolRoute[]) => (
    <div className="relative" onMouseEnter={menu.onEnter} onMouseLeave={menu.onLeave}>
      <button
        type="button"
        className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface-2 transition-colors inline-flex items-center gap-1.5"
        aria-expanded={menu.open}
        onClick={menu.toggle}
      >
        {label}
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${menu.open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {menu.open && (
        <div className="absolute left-0 top-full pt-2 w-72">
          <div className="card p-2.5 space-y-0.5">
            {tools.map((t) => menuRow(t, menu.close))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-border"
      style={{ background: "var(--nav-bg-blur)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 h-16" aria-label="Main navigation">
        <Link href={lp("/")} className="flex items-center gap-2.5 font-bold text-[17px] shrink-0 tracking-tight">
          <span
            className="relative grid h-9 w-9 place-items-center rounded-xl text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="14" rx="4" />
              <path d="M5 10h14M8 17l-2 4M16 17l2 4" />
            </svg>
            {/* "Smart" accent spark — echoes the live-data pulse used
                throughout the product (see LiveDot). */}
            <svg viewBox="0 0 24 24" className="absolute -right-1.5 -top-1.5 h-3 w-3" fill="var(--accent)">
              <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
            </svg>
          </span>
          {SITE_NAME}
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navDropdown(s.calculators, exclusive(calculatorsMenu), calcTools)}
          {navDropdown(s.planDecide, exclusive(planDecideMenu), decisionTools)}
          {navDropdown(n.liveTools, exclusive(liveToolsMenu), directoryTools)}

          {/* Guides menu */}
          <div className="relative" onMouseEnter={exclusive(guidesMenu).onEnter} onMouseLeave={guidesMenu.onLeave}>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface-2 transition-colors inline-flex items-center gap-1.5"
              aria-expanded={guidesMenu.open}
              onClick={exclusive(guidesMenu).toggle}
            >
              {n.guides}
              <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${guidesMenu.open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {guidesMenu.open && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80"><div className="card p-2.5">
                <Link href={lp("/guides")} className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-soft transition-colors" onClick={guidesMenu.close}>
                  {n.allGuides} →
                </Link>
                <span className="my-1.5 block h-px bg-border" />
                {guides.map((g) => (
                  <Link key={g.slug} href={lp(`/guides/${g.slug}`)} className="block rounded-lg px-3 py-2 text-[13px] text-muted hover:text-foreground hover:bg-surface-2 transition-colors leading-snug" onClick={guidesMenu.close}>
                    {g.title}
                  </Link>
                ))}
              </div></div>
            )}
          </div>

          {navLink("/trains", n.trains)}
          {navLink("/plan-ticket", n.planTicket)}
        </div>

        <div className="flex items-center gap-2">
          <Link href={lp("/reminders")} className="!hidden md:!inline-flex btn-primary !py-2 !px-4 !text-[13px]">
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
        <div className="md:hidden border-t border-border px-6 pt-5 pb-24 space-y-5 max-h-[75vh] overflow-y-auto bg-[var(--background)]">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted mb-1.5 px-1">{s.calculators}</p>
              <div className="grid grid-cols-1 gap-0.5">
                {calcTools.map((t) => menuRow(t, () => setMobileOpen(false)))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted mb-1.5 px-1">{s.planDecide}</p>
              <div className="grid grid-cols-1 gap-0.5">
                {decisionTools.map((t) => menuRow(t, () => setMobileOpen(false)))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted mb-1.5 px-1">{n.liveTools}</p>
              <div className="grid grid-cols-1 gap-0.5">
                {directoryTools.map((t) => menuRow(t, () => setMobileOpen(false)))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-4 border-t border-border text-sm font-medium">
            <Link href={lp("/guides")} className="py-2.5" onClick={() => setMobileOpen(false)}>{n.guides}</Link>
            <Link href={lp("/plan-ticket")} className="py-2.5" onClick={() => setMobileOpen(false)}>{n.planTicket}</Link>
          </div>
        </div>
      )}
    </header>

    {/* Bottom tab bar (mobile) — a sibling of <header>, not a child: header's
        backdrop-blur creates a containing block for position:fixed descendants,
        which would pin this to the (variable-height) header box instead of the
        viewport bottom. */}
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t border-border grid grid-cols-4 text-[11px] font-medium"
      style={{ background: "var(--nav-bg-blur)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link href={lp("/")} className={`flex flex-col items-center gap-1 py-2.5 ${isActive("/") ? "text-primary" : "text-muted"}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" /></svg>
        {n.home}
      </Link>
      <Link href={lp("/trains")} className={`flex flex-col items-center gap-1 py-2.5 ${isActive("/trains") ? "text-primary" : "text-muted"}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3h8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM4 10h16M8 17l-2 4M16 17l2 4" /></svg>
        {n.trains}
      </Link>
      {/* Opens the categorized hamburger menu (Calculators / Plan & Decide /
          Live Tools) instead of deep-linking to one specific calculator —
          a single tool page here was misleading users expecting a directory. */}
      <button
        type="button"
        aria-label={n.tools}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className={`flex flex-col items-center gap-1 py-2.5 ${mobileOpen ? "text-primary" : "text-muted"}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h14v16H5zM9 3v4M15 3v4M8 12h8M8 16h5" /></svg>
        {n.tools}
      </button>
      <Link href={lp("/reminders")} className={`flex flex-col items-center gap-1 py-2.5 ${isActive("/reminders") ? "text-primary" : "text-muted"}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6ZM10 19.5a2.2 2.2 0 0 0 4 0" /></svg>
        {n.reminders}
      </Link>
    </div>
    </>
  );
}
