import Link from "next/link";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, CONTENT_ROUTES, LEGAL_ROUTES } from "@/lib/site-routes";
import { SITE_NAME } from "@/lib/seo";
import { localePath, type Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionary";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const lp = (href: string) => localePath(lang, href);
  const f = dict.footer;

  return (
    <footer className="section-dark mt-12 pb-16 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link href={lp("/")} className="font-bold text-base flex items-center gap-2 text-nav-fg">
            <span className="grid h-7 w-7 place-items-center rounded-lg text-sm text-white" style={{ background: "linear-gradient(135deg, var(--primary), #12a594)" }} aria-hidden="true">🚆</span>
            {SITE_NAME}
          </Link>
          <p className="mt-2 text-[13px] muted-on-dark leading-snug">{f.tagline}</p>
          <Link href={lp("/about")} className="mt-1.5 inline-block text-[13px] text-primary-strong font-medium underline underline-offset-2">
            {f.about}
          </Link>
        </div>

        <div>
          <h3 className="font-semibold mb-1.5 text-[13px] uppercase tracking-wide muted-on-dark">{f.calculators}</h3>
          <ul className="space-y-1 text-[13px]">
            {CALCULATOR_ROUTES.map((t) => (
              <li key={t.href}><Link href={lp(t.href)} className="muted-on-dark hover:text-nav-fg transition-colors">{t.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1.5 text-[13px] uppercase tracking-wide muted-on-dark">{f.planLearn}</h3>
          <ul className="space-y-1 text-[13px]">
            {DECISION_TOOL_ROUTES.map((t) => (
              <li key={t.href}><Link href={lp(t.href)} className="muted-on-dark hover:text-nav-fg transition-colors">{t.label}</Link></li>
            ))}
            {CONTENT_ROUTES.map((r) => (
              <li key={r.href}><Link href={lp(r.href)} className="muted-on-dark hover:text-nav-fg transition-colors">{r.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1.5 text-[13px] uppercase tracking-wide muted-on-dark">{f.legal}</h3>
          <ul className="space-y-1 text-[13px]">
            {LEGAL_ROUTES.map((r) => (
              <li key={r.href}><Link href={lp(r.href)} className="muted-on-dark hover:text-nav-fg transition-colors">{r.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-4 text-[11px] muted-on-dark flex flex-col md:flex-row md:items-center md:justify-between gap-1.5" style={{ borderTop: "1px solid var(--nav-border)" }}>
        <p>© {new Date().getFullYear()} {SITE_NAME} · {f.rights}</p>
        <p className="font-medium shrink-0">{f.notAffiliated}</p>
      </div>
    </footer>
  );
}
