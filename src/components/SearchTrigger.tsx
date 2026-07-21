"use client";

function openSearch() {
  window.dispatchEvent(new CustomEvent("railsetu:open-search"));
}

const SearchGlyph = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

/**
 * Search affordances. All three sit on light surfaces now (the palette is
 * light-first), so they use foreground/muted tokens rather than fixed white.
 */
export function SearchTrigger({ variant = "bar", placeholder }: { variant?: "bar" | "icon" | "hero"; placeholder?: string }) {
  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="card card-hover flex items-center gap-4 w-full px-6 py-5 text-left"
        aria-label="Search tools, guides, trains and stations"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <SearchGlyph className="h-5 w-5" />
        </span>
        <span className="flex-1 text-muted text-[16px]">
          {placeholder ?? "Search tools, guides, trains, stations…"}
        </span>
        <kbd className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-muted border border-border rounded-md px-2 py-1">
          ⌘K
        </kbd>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface-2 transition-colors"
      >
        <SearchGlyph className="h-[18px] w-[18px]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="hidden lg:flex items-center gap-2.5 rounded-lg border border-border bg-surface-2/60 px-3.5 py-2 text-[13px] text-muted hover:border-primary/40 hover:bg-surface-2 transition-colors w-56"
      aria-label="Search tools, guides, trains and stations"
    >
      <SearchGlyph />
      <span className="flex-1 text-left">{placeholder ?? "Search…"}</span>
      <kbd className="text-[10px] border border-border rounded px-1.5 py-0.5">⌘K</kbd>
    </button>
  );
}
