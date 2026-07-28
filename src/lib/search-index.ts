import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES, CONTENT_ROUTES } from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";

export interface SearchItem {
  title: string;
  href: string;
  group: "Tool" | "Guide" | "Station" | "Page";
  keywords: string;
  hint?: string;
}

/**
 * Flat catalog of tools, guides and content pages. Built once at module load —
 * no network, safe in any runtime.
 *
 * Stations are intentionally NOT here: the full directory is ~8,900 entries
 * (too heavy to inline everywhere) and lives in the server-only rail-data
 * module. The search page merges full station results in separately; see
 * src/app/[lang]/search/page.tsx.
 */
export const SEARCH_INDEX: SearchItem[] = [
  ...[...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES].map((t) => ({
    title: t.label,
    href: t.href,
    group: "Tool" as const,
    keywords: `${t.label} ${t.tag} ${t.description}`.toLowerCase(),
    hint: t.tag,
  })),
  ...GUIDES.map((g) => ({
    title: g.title,
    href: `/guides/${g.slug}`,
    group: "Guide" as const,
    keywords: `${g.title} ${g.category} ${g.description}`.toLowerCase(),
    hint: `${g.readMins} min`,
  })),
  ...CONTENT_ROUTES.map((c) => ({
    title: c.label,
    href: c.href,
    group: "Page" as const,
    keywords: c.label.toLowerCase(),
  })),
];

/** Lightweight ranked search: exact-ish title matches float to the top. */
export function searchSite(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  return SEARCH_INDEX.map((item) => {
    const title = item.title.toLowerCase();
    let score = 0;
    if (title === q) score += 100;
    if (title.startsWith(q)) score += 40;
    if (title.includes(q)) score += 20;
    for (const term of terms) {
      if (title.includes(term)) score += 8;
      else if (item.keywords.includes(term)) score += 3;
      else score -= 5; // penalise items missing a term entirely
    }
    return { item, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
