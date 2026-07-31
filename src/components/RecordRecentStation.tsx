"use client";

import { useEffect } from "react";
import { addRecentItem, RECENT_KEYS } from "@/lib/recent-storage";

interface RecentStation {
  id: string;
  code: string;
  name: string;
}

/** Renders nothing — records the current station into the "recent" list on
 *  mount, surfaced as a quick-access chip on the Station Directory page. */
export function RecordRecentStation({ code, name }: Omit<RecentStation, "id">) {
  useEffect(() => {
    addRecentItem<RecentStation>(RECENT_KEYS.stations, { id: code, code, name });
  }, [code, name]);
  return null;
}
