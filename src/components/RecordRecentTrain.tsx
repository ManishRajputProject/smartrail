"use client";

import { useEffect } from "react";
import { addRecentItem, RECENT_KEYS } from "@/lib/recent-storage";

interface RecentTrain {
  id: string;
  number: string;
  name: string;
  fromName: string;
  toName: string;
}

/** Renders nothing — just records the current train into the "recent" list
 *  on mount, so it can be surfaced as a quick-access chip on the Train
 *  Finder page next visit. */
export function RecordRecentTrain({ number, name, fromName, toName }: Omit<RecentTrain, "id">) {
  useEffect(() => {
    addRecentItem<RecentTrain>(RECENT_KEYS.trains, { id: number, number, name, fromName, toName });
  }, [number, name, fromName, toName]);
  return null;
}
