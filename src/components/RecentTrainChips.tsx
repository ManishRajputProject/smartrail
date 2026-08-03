"use client";

import Link from "next/link";
import { RECENT_KEYS } from "@/lib/recent-storage";
import { useRecentItems } from "@/lib/use-recent-items";
import { localePath, type Locale } from "@/i18n/locales";

interface RecentTrain {
  id: string;
  number: string;
  name: string;
}

export function RecentTrainChips({ lang }: { lang: Locale }) {
  const items = useRecentItems<RecentTrain>(RECENT_KEYS.trains);

  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="text-[12px] text-muted mr-0.5">Recent:</span>
      {items.map((t) => (
        <Link
          key={t.id}
          href={localePath(lang, `/trains/${t.number}`)}
          className="inline-flex items-center gap-1 rounded-full bg-surface-2 hover:bg-primary-soft px-3 py-1 text-[12px] font-medium transition-colors"
        >
          <span className="font-mono font-bold text-primary">{t.number}</span>
          <span className="text-muted">{t.name}</span>
        </Link>
      ))}
    </div>
  );
}
