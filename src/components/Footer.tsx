import Link from "next/link";
import { CALCULATOR_ROUTES, DECISION_TOOL_ROUTES, CONTENT_ROUTES, LEGAL_ROUTES } from "@/lib/site-routes";
import { SITE_NAME } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16 pb-16 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <span aria-hidden="true">🚆</span>{SITE_NAME}
          </Link>
          <p className="mt-2 text-sm text-muted">Free tools for Indian Railways travellers.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-sm">Calculators</h3>
          <ul className="space-y-1 text-sm text-muted">
            {CALCULATOR_ROUTES.slice(0, 6).map((t) => (
              <li key={t.href}><Link href={t.href} className="hover:text-foreground">{t.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-sm">Plan &amp; Decide</h3>
          <ul className="space-y-1 text-sm text-muted">
            {DECISION_TOOL_ROUTES.slice(0, 6).map((t) => (
              <li key={t.href}><Link href={t.href} className="hover:text-foreground">{t.label}</Link></li>
            ))}
            {CONTENT_ROUTES.map((r) => (
              <li key={r.href}><Link href={r.href} className="hover:text-foreground">{r.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-sm">Legal</h3>
          <ul className="space-y-1 text-sm text-muted">
            {LEGAL_ROUTES.map((r) => (
              <li key={r.href}><Link href={r.href} className="hover:text-foreground">{r.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-4 border-t border-border text-xs text-muted flex flex-col gap-2">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All information is provided for general guidance only.</p>
        <p className="font-medium">{SITE_NAME} is an independent service and is not affiliated with, endorsed by, or connected to IRCTC, Indian Railways, or the Government of India.</p>
      </div>
    </footer>
  );
}
