"use client";

function openSearch() {
  window.dispatchEvent(new CustomEvent("railsetu:open-search"));
}

/** Compact search affordance for the header. */
export function SearchTrigger({ variant = "bar" }: { variant?: "bar" | "icon" | "hero" }) {
  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="card card-hover flex items-center gap-3 w-full max-w-md mx-auto px-4 py-3 text-left"
        aria-label="Search tools, guides and stations"
      >
        <span aria-hidden="true" className="text-lg">🔍</span>
        <span className="flex-1 text-muted text-[15px]">Search tools, guides, stations…</span>
        <kbd className="hidden sm:block text-[11px] text-muted border border-border rounded px-1.5 py-0.5">⌘K</kbd>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2 transition-colors"
      >
        🔍
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] text-muted hover:border-primary transition-colors w-56"
      aria-label="Search tools, guides and stations"
    >
      <span aria-hidden="true">🔍</span>
      <span className="flex-1 text-left">Search…</span>
      <kbd className="text-[10px] border border-border rounded px-1 py-0.5">⌘K</kbd>
    </button>
  );
}
