import type { JSX } from "react";

/**
 * Duotone icon family for the tool catalog. Each icon is a soft "back" shape
 * at low opacity plus a crisp foreground, both inheriting currentColor, so a
 * single `text-*` class themes the whole set and it costs nothing extra to
 * render (inline SVG, no sprite request, no JS).
 */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const BACK = { fill: "currentColor", opacity: 0.16 };

const ICONS: Record<string, JSX.Element> = {
  "booking-date-calculator": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" {...BACK} />
      <path d="M3 9.5h18M8 3v4M16 3v4" {...S} />
      <path d="M9 15.5l2 2 4-4" {...S} />
    </>
  ),
  "tatkal-time-calculator": (
    <>
      <circle cx="12" cy="13" r="8.5" {...BACK} />
      <circle cx="12" cy="13" r="8.5" {...S} />
      <path d="M12 8.5V13l3 1.8M9 2.5h6" {...S} />
    </>
  ),
  "tatkal-charge-calculator": (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7.6c.7 0 1.3.3 1.8.7l4.4 4.4c.5.5.7 1.1.7 1.8v7.6A2.5 2.5 0 0 1 18.5 20" {...BACK} />
      <path d="M6 4h6.8c.5 0 1 .2 1.4.6l5.2 5.2c.4.4.6.9.6 1.4V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" {...S} />
      <path d="M9 9h5M9 12h5M13 9c0 3-1.4 3-4 3l4 3.5" {...S} />
    </>
  ),
  "refund-calculator": (
    <>
      <circle cx="12" cy="12" r="9" {...BACK} />
      <path d="M4 9a9 9 0 1 1-.6 5" {...S} />
      <path d="M3.2 4v5h5" {...S} />
      <path d="M10 14.5h3a1.75 1.75 0 0 0 0-3.5h-2a1.75 1.75 0 0 1 0-3.5h3M12 6v1.5M12 14.5V16" {...S} />
    </>
  ),
  "chart-preparation-time": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" {...BACK} />
      <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" {...S} />
      <path d="M9.5 8.5h5M9.5 12h5M9.5 15.5h3" {...S} />
    </>
  ),
  "fare-calculator": (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" {...BACK} />
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" {...S} />
      <path d="M14 9.5v5" strokeDasharray="2 2" {...S} />
    </>
  ),
  "group-fare-calculator": (
    <>
      <circle cx="9" cy="8" r="3.2" {...BACK} />
      <circle cx="9" cy="8" r="3.2" {...S} />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" {...S} />
      <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19.5a5.4 5.4 0 0 0-2-4.2" {...S} />
    </>
  ),
  "luggage-calculator": (
    <>
      <rect x="4" y="7" width="16" height="13" rx="3" {...BACK} />
      <rect x="4" y="7" width="16" height="13" rx="3" {...S} />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M10 11v5M14 11v5" {...S} />
    </>
  ),
  "waitlist-predictor": (
    <>
      <path d="M3 20V4" {...S} />
      <rect x="6" y="12" width="3.4" height="8" rx="1.2" {...BACK} />
      <rect x="11" y="8" width="3.4" height="12" rx="1.2" {...BACK} />
      <rect x="16" y="4.5" width="3.4" height="15.5" rx="1.2" {...BACK} />
      <path d="M6 20v-8h3.4v8M11 20V8h3.4v12M16 20V4.5h3.4V20M3 20h18" {...S} />
    </>
  ),
  "pnr-status": (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" {...BACK} />
      <path d="M3 9.5a2 2 0 0 0 0-3.5A2 2 0 0 1 5 6h14a2 2 0 0 1 2 2v1.5a2 2 0 0 0 0 5V16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a2 2 0 0 0 0-5Z" {...S} />
      <circle cx="11" cy="12" r="2.6" {...S} />
      <path d="M13 14l2 2" {...S} />
    </>
  ),
  "train-classes": (
    <>
      <path d="M5 6h14v8H5z" {...BACK} />
      <path d="M6 4h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" {...S} />
      <path d="M4 9.5h16M12 4v11M4.5 19h15M7 15v4M17 15v4" {...S} />
    </>
  ),
  "quota-selector": (
    <>
      <circle cx="12" cy="12" r="9" {...BACK} />
      <circle cx="12" cy="12" r="9" {...S} />
      <path d="M15.5 8.5l-2 5.2-5.2 2 2-5.2 5.2-2Z" {...S} />
    </>
  ),
  "journey-checklist": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" {...BACK} />
      <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" {...S} />
      <path d="M9 8.5l1.3 1.3L13 7M9 14.5l1.3 1.3L13 13M15.5 9h.01M15.5 15h.01" {...S} />
    </>
  ),
  "long-weekend-planner": (
    <>
      <circle cx="12" cy="11" r="4" {...BACK} />
      <circle cx="12" cy="11" r="3.4" {...S} />
      <path d="M12 3.5v1.6M12 17v1.6M4.9 11H3.3M20.7 11h-1.6M6.9 5.9 5.8 4.8M18.1 5.9l1.1-1.1M6.9 16.1l-1.1 1.1M18.1 16.1l1.1 1.1" {...S} />
      <path d="M4 21h16" {...S} />
    </>
  ),
  "plan-ticket": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" {...BACK} />
      <rect x="3" y="5" width="18" height="16" rx="3" {...S} />
      <path d="M3 9.5h18M8 3v4M16 3v4" {...S} />
      <rect x="6.5" y="12.5" width="3" height="3" rx="1" fill="currentColor" />
      <rect x="14.5" y="12.5" width="3" height="3" rx="1" fill="currentColor" opacity=".5" />
    </>
  ),
  "trip-cost-estimator": (
    <>
      <rect x="3" y="6" width="18" height="14" rx="3" {...BACK} />
      <path d="M3 9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9Z" {...S} />
      <path d="M3 10h5a2 2 0 0 1 0 4H3M16.5 4.5 7 6" {...S} />
    </>
  ),
  "travel-mode-comparator": (
    <>
      <rect x="3" y="4" width="9" height="11" rx="2.5" {...BACK} />
      <path d="M5.5 4h4A2.5 2.5 0 0 1 12 6.5v6A2.5 2.5 0 0 1 9.5 15h-4A2.5 2.5 0 0 1 3 12.5v-6A2.5 2.5 0 0 1 5.5 4Z" {...S} />
      <path d="M3 9.5h9M5.5 18l-1.5 2M9.5 18l1.5 2M5.5 15v3M9.5 15v3" {...S} />
      <path d="M14 13.5 21 9M15.5 16l6-3.5M17 8.5l4.5-2.5" {...S} />
    </>
  ),
  trains: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="4" {...BACK} />
      <path d="M9 3h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" {...S} />
      <path d="M5 10h14" {...S} />
      <circle cx="9" cy="13.5" r="1.1" fill="currentColor" />
      <circle cx="15" cy="13.5" r="1.1" fill="currentColor" />
      <path d="M8 17l-2 4M16 17l2 4M4 21h16" {...S} />
    </>
  ),
  "trains-between": (
    <>
      <rect x="3" y="8" width="18" height="8" rx="4" {...BACK} />
      <path d="M5 12h14" {...S} />
      <path d="M7.5 8.5 4 12l3.5 3.5M16.5 8.5 20 12l-3.5 3.5" {...S} />
      <circle cx="8.5" cy="12" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="12" r="1.1" fill="currentColor" />
    </>
  ),
  stations: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" {...BACK} />
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" {...S} />
      <circle cx="12" cy="10" r="2.6" {...S} />
    </>
  ),
  reminders: (
    <>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" {...BACK} />
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" {...S} />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" {...S} />
    </>
  ),
  "journey-reports": (
    <>
      <path d="M4 5h16v11H9l-5 4V5Z" {...BACK} />
      <path d="M6 4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9.5L5 19.5V6a2 2 0 0 1 1-2Z" {...S} />
      <path d="M8.5 9h7M8.5 12.5h4" {...S} />
    </>
  ),
};

const FALLBACK = (
  <>
    <circle cx="12" cy="12" r="9" {...BACK} />
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M12 8v4l2.5 2" {...S} />
  </>
);

/** Renders the duotone icon for a tool route href (e.g. "/refund-calculator"). */
export function ToolIcon({ href, className = "" }: { href: string; className?: string }) {
  const slug = href.replace(/^\//, "");
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {ICONS[slug] ?? FALLBACK}
    </svg>
  );
}
