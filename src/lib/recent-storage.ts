/** Small localStorage-backed "recent items" list, capped at `max` entries,
 *  newest first, de-duplicated by `id`. SSR-safe (no-ops without `window`). */

const MAX_DEFAULT = 5;

// The native "storage" event only fires in OTHER tabs, never the tab that
// made the write — so same-tab consumers (useRecentItems, via
// useSyncExternalStore) need their own notification for a write to be
// reflected immediately without a full page reload.
const sameTabListeners = new Map<string, Set<() => void>>();

export function subscribeRecentItems(key: string, onChange: () => void): () => void {
  let set = sameTabListeners.get(key);
  if (!set) {
    set = new Set();
    sameTabListeners.set(key, set);
  }
  set.add(onChange);
  return () => set!.delete(onChange);
}

function notifySameTab(key: string): void {
  sameTabListeners.get(key)?.forEach((fn) => fn());
}

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // localStorage full or disabled — recent items are a nicety, fail silently
  }
}

export function getRecentItems<T>(key: string): T[] {
  return read<T>(key);
}

export function addRecentItem<T extends { id: string }>(key: string, item: T, max = MAX_DEFAULT): T[] {
  const existing = read<T>(key).filter((i) => i.id !== item.id);
  const next = [item, ...existing].slice(0, max);
  write(key, next);
  notifySameTab(key);
  return next;
}

export const RECENT_KEYS = {
  trains: "railsetu:recentTrains",
  stations: "railsetu:recentStations",
  stationPairs: "railsetu:recentStationPairs",
} as const;
