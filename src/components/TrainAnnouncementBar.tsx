import type { Dictionary } from "@/i18n/dictionary";

/**
 * Signature element: an Indian steam locomotive hauling coaches, each coach
 * carrying one railway announcement, rolling continuously across the top of
 * the page.
 *
 * Implementation notes:
 * - Pure CSS `transform` animation (no JS, no layout thrash) so it stays off
 *   the main thread and costs nothing in Core Web Vitals.
 * - The rake is rendered twice and the track translates -50%, giving a
 *   seamless infinite loop.
 * - Pauses on hover/focus; fully disabled under prefers-reduced-motion, where
 *   it degrades to a static centred row.
 * - Decorative only — marked aria-hidden and mirrored to screen readers as a
 *   plain list.
 */

function Locomotive() {
  return (
    <span className="relative inline-flex items-end shrink-0" aria-hidden="true">
      {/* smoke puffs */}
      <svg className="absolute -top-1 left-7 overflow-visible" width="1" height="1" viewBox="0 0 1 1">
        <circle className="smoke" cx="0.5" cy="0.5" r="3.2" fill="rgba(255,255,255,.34)" />
        <circle className="smoke smoke-2" cx="0.5" cy="0.5" r="2.6" fill="rgba(255,255,255,.28)" />
        <circle className="smoke smoke-3" cx="0.5" cy="0.5" r="2" fill="rgba(255,255,255,.22)" />
      </svg>

      <svg width="86" height="46" viewBox="0 0 86 46" fill="none" role="img">
        <defs>
          <linearGradient id="locoBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a5a86" />
            <stop offset="1" stopColor="#222c48" />
          </linearGradient>
          <linearGradient id="locoTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff8a3d" />
            <stop offset="1" stopColor="#ffb37a" />
          </linearGradient>
        </defs>
        {/* chimney + dome */}
        <rect x="16" y="6" width="9" height="10" rx="2" fill="url(#locoBody)" />
        <rect x="14" y="4" width="13" height="4" rx="2" fill="#5b6b99" />
        <rect x="31" y="10" width="8" height="6" rx="3" fill="#5b6b99" />
        {/* boiler */}
        <rect x="10" y="16" width="42" height="16" rx="7" fill="url(#locoBody)" />
        <rect x="10" y="21" width="42" height="2.5" fill="url(#locoTrim)" opacity=".9" />
        {/* cab */}
        <path d="M52 12h16a3 3 0 0 1 3 3v17H52V12Z" fill="url(#locoBody)" />
        <rect x="56" y="16" width="11" height="8" rx="2" fill="#aebbdd" opacity=".85" />
        {/* footplate */}
        <rect x="6" y="32" width="68" height="4" rx="2" fill="#5b6b99" />
        {/* headlamp */}
        <circle cx="9" cy="20" r="3" fill="#ffd9a8" />
        {/* wheels */}
        <circle cx="18" cy="39" r="6" fill="#2a3454" stroke="#8b9ac4" strokeWidth="2" />
        <circle cx="38" cy="39" r="6" fill="#2a3454" stroke="#8b9ac4" strokeWidth="2" />
        <circle cx="60" cy="39" r="5" fill="#2a3454" stroke="#8b9ac4" strokeWidth="2" />
        <rect x="14" y="38" width="50" height="2" rx="1" fill="url(#locoTrim)" opacity=".75" />
      </svg>
    </span>
  );
}

function Rake({ items }: { items: string[] }) {
  return (
    <>
      <Locomotive />
      {items.map((text, i) => (
        <span key={`${text}-${i}`} className="flex items-end" aria-hidden="true">
          <span className="coupling" />
          <span className="coach">{text}</span>
        </span>
      ))}
    </>
  );
}

export function TrainAnnouncementBar({ dict }: { dict: Dictionary }) {
  const items = [
    `⏱️ ${dict.ticker.tatkalAc}`,
    `🕚 ${dict.ticker.tatkalNonAc}`,
    `📅 ${dict.ticker.advance}`,
    `🗒️ ${dict.ticker.chart}`,
  ];

  return (
    <div className="train-bar">
      {/* Visual rake — duplicated for a seamless loop, hidden from AT */}
      <div className="train-track">
        <Rake items={items} />
        <Rake items={items} />
      </div>

      {/* Accessible equivalent of the same announcements */}
      <ul className="sr-only">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
