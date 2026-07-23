import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { localePath, type Locale } from "@/i18n/locales";
import type { LegalDoc } from "@/i18n/legal/types";

/**
 * Shared renderer for the legal and about pages.
 *
 * When the document is a translation it shows a prevailing-language notice
 * first: the English text remains the operative version, which is what makes
 * localising liability text safe.
 */
export function LegalPage({
  lang,
  doc,
  href,
  relatedLinks,
}: {
  lang: Locale;
  doc: LegalDoc;
  href: string;
  relatedLinks?: { href: string; label: string }[];
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12 leading-relaxed">
      <Breadcrumb items={[{ name: doc.title, href }]} />

      {doc.eyebrow && <p className="eyebrow mb-1">{doc.eyebrow}</p>}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{doc.title}</h1>
      {doc.updated && <p className="text-sm text-muted mb-4">{doc.updated}</p>}

      {doc.prevailingNotice && (
        <p className="mb-6 rounded-lg border border-border bg-surface-2 px-4 py-3 text-[13px] text-muted">
          {doc.prevailingNotice}
        </p>
      )}

      {doc.intro?.map((p, i) => (
        <p key={i} className="text-muted mb-3">
          {p}
        </p>
      ))}

      {doc.sections.map((s, i) => (
        <section key={i}>
          {s.heading && (
            <h2 className="text-xl font-semibold mt-6 mb-2">{s.heading}</h2>
          )}
          {s.list && (
            <ul className="list-disc list-inside text-muted space-y-1 mb-3">
              {s.list.map((li, j) => (
                <li key={j}>{li}</li>
              ))}
            </ul>
          )}
          {s.paragraphs?.map((p, j) => (
            <p key={j} className="text-muted mb-3">
              {p}
            </p>
          ))}
        </section>
      ))}

      {relatedLinks && relatedLinks.length > 0 && (
        <div className="card p-4 mt-8">
          <div className="flex flex-wrap gap-2 text-[13px]">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={localePath(lang, l.href)}
                className="chip bg-surface-2 hover:bg-primary-soft transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
