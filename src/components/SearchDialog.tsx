"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchSite, type SearchItem } from "@/lib/search-index";

const GROUP_ICON: Record<SearchItem["group"], string> = {
  Tool: "🧮",
  Guide: "📖",
  Station: "📍",
  Page: "📄",
};

const RECENT_KEY = "recent-searches";

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query ? searchSite(query) : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // Global open triggers: Cmd/Ctrl+K, "/" key, and a custom event from the search box
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !open && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        close();
      }
    }
    function onCustomOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("railsetu:open-search", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("railsetu:open-search", onCustomOpen);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      try {
        const stored = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
        if (Array.isArray(stored)) setRecent(stored.slice(0, 5));
      } catch {
        /* ignore */
      }
    }
  }, [open]);

  const go = useCallback(
    (item: SearchItem) => {
      try {
        const next = [item.title, ...recent.filter((r) => r !== item.title)].slice(0, 5);
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      router.push(item.href);
      close();
    },
    [recent, router, close]
  );

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] bg-black/40 backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        className="card w-full max-w-lg overflow-hidden !shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search RailSetu"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <span aria-hidden="true" className="text-muted">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search tools, guides, stations…"
            aria-label="Search"
            className="flex-1 bg-transparent py-3.5 text-[15px] outline-none"
          />
          <kbd className="hidden sm:block text-[10px] text-muted border border-border rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted">No matches for &quot;{query}&quot;.</p>
          )}

          {!query && recent.length > 0 && (
            <div className="mb-1">
              <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">Recent</p>
              {recent.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setQuery(r);
                    setActive(0);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-2"
                >
                  <span aria-hidden="true" className="text-muted">🕘</span>
                  {r}
                </button>
              ))}
            </div>
          )}

          {!query && recent.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              Try &quot;tatkal&quot;, &quot;refund&quot;, &quot;New Delhi&quot; or &quot;waitlist&quot;.
            </p>
          )}

          {results.map((item, i) => (
            <button
              key={`${item.group}-${item.href}-${item.title}`}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(item)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm ${
                i === active ? "bg-primary-soft" : "hover:bg-surface-2"
              }`}
            >
              <span aria-hidden="true">{GROUP_ICON[item.group]}</span>
              <span className="flex-1 truncate">{item.title}</span>
              {item.hint && <span className="text-[11px] text-muted shrink-0">{item.hint}</span>}
              <span className="text-[10px] text-muted border border-border rounded px-1.5 py-0.5 shrink-0">{item.group}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}
