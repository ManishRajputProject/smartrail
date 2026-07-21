import type { Dictionary } from "@/i18n/dictionary";

/**
 * An Indian steam locomotive hauling coaches, each carrying one railway
 * announcement.
 *
 * - Pure CSS `transform` on a duplicated rake → seamless infinite loop, no JS.
 * - Pauses on hover/focus; collapses to a static row under reduced-motion.
 * - Decorative SVG is aria-hidden; an sr-only list carries the same text.
 */

function Locomotive() {
  return (
    <span className="relative inline-flex items-end shrink-0" aria-hidden="true">
      <svg width="132" height="72" viewBox="0 0 132 72" fill="none" role="img">
        <defs>
          <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#586a9c" />
            <stop offset=".5" stopColor="#33406a" />
            <stop offset="1" stopColor="#1d2745" />
          </linearGradient>
          <linearGradient id="boilerG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6b7fb4" />
            <stop offset=".45" stopColor="#3b4870" />
            <stop offset="1" stopColor="#232e50" />
          </linearGradient>
          <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffc98a" />
            <stop offset=".5" stopColor="#ff9f45" />
            <stop offset="1" stopColor="#e07a24" />
          </linearGradient>
          <radialGradient id="lampG" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff6dc" />
            <stop offset="1" stopColor="#ffcf72" />
          </radialGradient>
        </defs>

        {/* ---- smoke ---- */}
        <g>
          <circle className="smoke" cx="30" cy="12" r="5" fill="rgba(255,255,255,.30)" />
          <circle className="smoke smoke-2" cx="30" cy="12" r="4" fill="rgba(255,255,255,.24)" />
          <circle className="smoke smoke-3" cx="30" cy="12" r="3" fill="rgba(255,255,255,.18)" />
        </g>

        {/* ---- chimney ---- */}
        <path d="M25 14h11v16H25z" fill="url(#bodyG)" />
        <rect x="22" y="10" width="17" height="6" rx="3" fill="url(#brass)" />

        {/* ---- steam dome & sand dome ---- */}
        <path d="M45 20a6 6 0 0 1 12 0v6H45z" fill="url(#bodyG)" />
        <rect x="44" y="24" width="14" height="4" rx="2" fill="url(#brass)" opacity=".9" />
        <path d="M62 23a4.5 4.5 0 0 1 9 0v4h-9z" fill="url(#bodyG)" />

        {/* ---- boiler ---- */}
        <rect x="18" y="27" width="62" height="21" rx="9" fill="url(#boilerG)" />
        {/* boiler bands */}
        <rect x="34" y="27" width="2.5" height="21" fill="#1b2440" opacity=".55" />
        <rect x="52" y="27" width="2.5" height="21" fill="#1b2440" opacity=".55" />
        <rect x="68" y="27" width="2.5" height="21" fill="#1b2440" opacity=".55" />
        {/* highlight */}
        <rect x="20" y="30" width="58" height="3" rx="1.5" fill="#93a4d4" opacity=".45" />

        {/* ---- smokebox front + headlamp ---- */}
        <circle cx="20" cy="37.5" r="10" fill="#2b3557" />
        <circle cx="20" cy="37.5" r="6.5" fill="#1b2440" />
        <circle cx="20" cy="30" r="4" fill="url(#lampG)" />
        <path d="M16 30h8" stroke="#c98b2f" strokeWidth="1.2" />

        {/* ---- cab ---- */}
        <path d="M80 16h22a5 5 0 0 1 5 5v27H80z" fill="url(#bodyG)" />
        <path d="M80 16h22a5 5 0 0 1 5 5v3H80z" fill="url(#brass)" opacity=".55" />
        <rect x="85" y="24" width="16" height="12" rx="2.5" fill="#b9c7ea" opacity=".85" />
        <rect x="85" y="24" width="16" height="12" rx="2.5" stroke="#8fa0cf" strokeWidth="1" />
        <path d="M93 24v12" stroke="#8fa0cf" strokeWidth="1" />

        {/* ---- running board / footplate ---- */}
        <rect x="10" y="48" width="99" height="5" rx="2.5" fill="#41507e" />
        <rect x="10" y="48" width="99" height="1.6" rx=".8" fill="url(#brass)" opacity=".5" />

        {/* ---- cowcatcher ---- */}
        <path d="M10 48 3 60h9l4-12z" fill="#41507e" />
        <path d="M6.5 54.5h7M5 57.5h8" stroke="#8fa0cf" strokeWidth="1.1" />

        {/* ---- wheels: 2 small leading, 2 large drivers ---- */}
        <circle cx="26" cy="58" r="7" fill="#212b4c" stroke="#8fa0cf" strokeWidth="2" />
        <circle cx="26" cy="58" r="2" fill="#8fa0cf" />
        <circle cx="52" cy="56" r="11" fill="#212b4c" stroke="#93a4d4" strokeWidth="2.4" />
        <circle cx="52" cy="56" r="3" fill="#93a4d4" />
        <path d="M52 45v22M41 56h22M44.5 48.5l15 15M59.5 48.5l-15 15" stroke="#5d6fa5" strokeWidth="1.6" />
        <circle cx="82" cy="56" r="11" fill="#212b4c" stroke="#93a4d4" strokeWidth="2.4" />
        <circle cx="82" cy="56" r="3" fill="#93a4d4" />
        <path d="M82 45v22M71 56h22M74.5 48.5l15 15M89.5 48.5l-15 15" stroke="#5d6fa5" strokeWidth="1.6" />

        {/* ---- coupling rod ---- */}
        <rect x="48" y="60" width="38" height="3" rx="1.5" fill="url(#brass)" />
        <circle cx="52" cy="61.5" r="2" fill="#ffd9a8" />
        <circle cx="82" cy="61.5" r="2" fill="#ffd9a8" />
      </svg>
    </span>
  );
}

function Coach({ text }: { text: string }) {
  return (
    <span className="flex items-end shrink-0" aria-hidden="true">
      {/* coupler */}
      <span className="coupler" />
      <span className="coach">
        {/* roof */}
        <span className="coach-roof" />
        <span className="coach-body">
          <span className="coach-window" />
          <span className="coach-text">{text}</span>
          <span className="coach-window" />
        </span>
        {/* bogies */}
        <span className="coach-bogies">
          <span className="bogie" />
          <span className="bogie" />
        </span>
      </span>
    </span>
  );
}

function Rake({ items }: { items: string[] }) {
  return (
    <>
      <Locomotive />
      {items.map((text, i) => (
        <Coach key={`${text}-${i}`} text={text} />
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
    <div className="train-bar rounded-2xl">
      <div className="train-track">
        <Rake items={items} />
        <Rake items={items} />
      </div>
      <ul className="sr-only">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
