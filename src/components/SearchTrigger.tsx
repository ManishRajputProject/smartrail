"use client";

function openSearch() {
  window.dispatchEvent(new CustomEvent("railsetu:open-search"));
}

/** Search affordances. "bar"/"icon" live on the dark header; "hero" sits on
 *  the dark hero. All styled for light text on dark chrome. */
export function SearchTrigger({ variant = "bar" }: { variant?: "bar" | "icon" | "hero" }) {
  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="flex items-center gap-3 w-full max-w-md mx-auto px-4 py-3 text-left rounded-xl bg-white/10 border border-white/25 hover:bg-white/16 transition-colors"
        aria-label="Search tools, guides and stations"
      >
        <span aria-hidden="true" className="text-lg">🔍</span>
        <span className="flex-1 text-white/70 text-[15px]">Search tools, guides, trains, stations…</span>
        <kbd className="hidden sm:block text-[11px] text-white/70 border border-white/25 rounded px-1.5 py-0.5">⌘K</kbd>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 text-nav-fg hover:bg-white/10 transition-colors"
      >
        🔍
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="hidden lg:flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[13px] text-white/70 hover:bg-white/16 transition-colors w-56"
      aria-label="Search tools, guides and stations"
    >
      <span aria-hidden="true">🔍</span>
      <span className="flex-1 text-left">Search…</span>
      <kbd className="text-[10px] border border-white/25 rounded px-1 py-0.5">⌘K</kbd>
    </button>
  );
}
