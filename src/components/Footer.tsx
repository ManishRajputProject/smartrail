import Link from "next/link";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, COMMUNITY_ROUTES, CONTENT_ROUTES, LEGAL_ROUTES } from "@/lib/site-routes";
import { SITE_NAME } from "@/lib/seo";
import { localePath, type Locale } from "@/i18n/locales";
import { localizeTools } from "@/i18n/tool-translations";
import { trainIndexStrings } from "@/i18n/train-index-strings";
import { NewsletterForm } from "@/components/NewsletterForm";
import type { Dictionary } from "@/i18n/dictionary";

const SOCIALS = [
  { label: "X", href: "https://x.com", d: "M18.9 2H22l-7.2 8.3L23.3 22h-6.6l-5.2-6.8L5.5 22H2.4l7.7-8.8L1.1 2h6.8l4.7 6.2L18.9 2Z" },
  { label: "Instagram", href: "https://instagram.com", d: "M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 4.9 4.9.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.15 3.2-1.7 4.8-4.9 4.9-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-4.9-4.9-.06-1.3-.07-1.7-.07-4.9s0-3.6.07-4.9C2.3 4 3.8 2.4 7 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 5.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" },
  { label: "Facebook", href: "https://facebook.com", d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" },
];

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const lp = (href: string) => localePath(lang, href);
  const f = dict.footer;
  const calculators = localizeTools(lang, CALCULATOR_ROUTES);
  const planTools = localizeTools(lang, [...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES]);
  const linkLabel = (href: string, fallback: string) =>
    (dict.links as Record<string, string>)[href] ?? fallback;

  const col = "text-[13.5px] text-nav-muted hover:text-nav-fg transition-colors";

  return (
    <footer className="section-dark mt-16 pb-20 md:pb-0">
      {/* Newsletter band */}
      <div className="border-b" style={{ borderColor: "var(--nav-border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-nav-fg">
              Never miss a booking window
            </h2>
            <p className="mt-2.5 text-[14px] muted-on-dark leading-relaxed max-w-md">
              Occasional emails on long weekends, festival rushes and IRCTC rule changes. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href={lp("/")} className="inline-flex items-center gap-2.5 font-bold text-[17px] text-nav-fg">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-white"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="3" width="14" height="14" rx="4" />
                <path d="M5 10h14M8 17l-2 4M16 17l2 4" />
              </svg>
            </span>
            {SITE_NAME}
          </Link>
          <p className="mt-4 text-[13.5px] muted-on-dark leading-relaxed max-w-xs">{f.tagline}</p>
          <Link href={lp("/about")} className="mt-4 inline-block text-[13.5px] text-primary-strong font-semibold underline underline-offset-4">
            {f.about} →
          </Link>

          <div className="mt-7 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={`${SITE_NAME} on ${s.label}`}
                className="grid h-10 w-10 place-items-center rounded-xl border transition-colors hover:bg-white/10"
                style={{ borderColor: "var(--nav-border)" }}
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-nav-muted" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[12px] uppercase tracking-[0.12em] text-nav-fg">{f.calculators}</h3>
          <ul className="space-y-2.5">
            {calculators.map((t) => (
              <li key={t.href}><Link href={lp(t.href)} className={col}>{t.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[12px] uppercase tracking-[0.12em] text-nav-fg">{f.planLearn}</h3>
          <ul className="space-y-2.5">
            {planTools.map((t) => (
              <li key={t.href}><Link href={lp(t.href)} className={col}>{t.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[12px] uppercase tracking-[0.12em] text-nav-fg">{f.legal}</h3>
          <ul className="space-y-2.5">
            {CONTENT_ROUTES.map((r) => (
              <li key={r.href}><Link href={lp(r.href)} className={col}>{linkLabel(r.href, r.label)}</Link></li>
            ))}
            {/* One link to the A–Z train index — the hub, not 5,477 footer links. */}
            <li><Link href={lp("/trains/browse/a")} className={col}>{trainIndexStrings(lang).browseAZ}</Link></li>
            {LEGAL_ROUTES.map((r) => (
              <li key={r.href}><Link href={lp(r.href)} className={col}>{linkLabel(r.href, r.label)}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mx-auto max-w-6xl px-6 py-7 text-[12px] muted-on-dark flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t"
        style={{ borderColor: "var(--nav-border)" }}
      >
        <p>© {new Date().getFullYear()} {SITE_NAME} · {f.rights}</p>
        <p className="font-medium shrink-0">{f.notAffiliated}</p>
      </div>
    </footer>
  );
}
