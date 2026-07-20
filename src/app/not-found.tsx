import Link from "next/link";
import { CALCULATOR_ROUTES } from "@/lib/site-routes";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden="true">🚉</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">This route doesn&apos;t exist</h1>
      <p className="mt-2 text-muted">
        The page you were looking for has left the platform. Let&apos;s get you back on track.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/faq" className="btn-secondary">Browse FAQ</Link>
      </div>

      <div className="mt-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-2.5">Popular tools</p>
        <div className="flex flex-wrap justify-center gap-2">
          {CALCULATOR_ROUTES.slice(0, 5).map((t) => (
            <Link key={t.href} href={t.href} className="chip bg-surface-2 hover:bg-primary-soft transition-colors">
              {t.icon} {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
