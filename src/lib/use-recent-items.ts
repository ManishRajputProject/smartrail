"use client";

import { useSyncExternalStore } from "react";
import { getRecentItems, subscribeRecentItems } from "@/lib/recent-storage";

const EMPTY: unknown[] = [];
// getSnapshot must return a referentially stable value between calls when
// nothing changed, or React warns of a possible infinite loop — cache the
// parsed array per key and only re-read localStorage when "onChange" fires.
const cache = new Map<string, unknown[]>();

/** SSR-safe read of a "recent items" localStorage list via useSyncExternalStore
 *  instead of `useState` + `useEffect`, so there's no synchronous setState in
 *  an effect body and the value stays in sync if another tab updates it. */
export function useRecentItems<T>(key: string): T[] {
  return useSyncExternalStore(
    (onChange) => {
      const invalidate = () => {
        cache.delete(key);
        onChange();
      };
      const handler = (e: StorageEvent) => {
        if (e.key === key) invalidate();
      };
      window.addEventListener("storage", handler);
      const unsubscribeSameTab = subscribeRecentItems(key, invalidate);
      return () => {
        window.removeEventListener("storage", handler);
        unsubscribeSameTab();
      };
    },
    () => {
      let items = cache.get(key);
      if (!items) {
        items = getRecentItems<T>(key);
        cache.set(key, items);
      }
      return items as T[];
    },
    () => EMPTY as T[] // server snapshot: always empty, matches pre-hydration DOM
  );
}
