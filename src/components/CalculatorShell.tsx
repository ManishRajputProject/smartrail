import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { RelatedTools } from "@/components/RelatedTools";
import { LAST_VERIFIED } from "@/lib/irctc-rules";
import { AdSlot } from "@/components/AdSlot";

export function CalculatorShell({
  eyebrow,
  title,
  description,
  badges,
  breadcrumbLabel,
  breadcrumbHref,
  children,
  explainer,
  faqs,
  relatedTools,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  badges?: string[];
  breadcrumbLabel: string;
  breadcrumbHref: string;
  children: ReactNode;
  explainer?: ReactNode;
  faqs?: FaqItem[];
  relatedTools?: { href: string; label: string; description: string }[];
}) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: breadcrumbLabel, href: breadcrumbHref },
  ];

  return (
    <div className="pb-20 md:pb-12">
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))} />

      {/* Dark hero header */}
      <div className="section-dark hero-glow">
        <div className="mx-auto max-w-3xl px-4 pt-6 pb-9 md:pt-8 md:pb-11">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/60 mb-3">
            <ol className="flex flex-wrap items-center gap-1">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === crumbs.length - 1 ? (
                    <span className="text-white/90">{c.name}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-white">{c.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary-strong)] mb-1.5">{eyebrow}</p>}
          <h1 className="text-[26px] md:text-[34px] font-extrabold tracking-tight leading-tight text-white">{title}</h1>
          <p className="mt-2.5 text-white/75 text-[15px] leading-relaxed max-w-2xl">{description}</p>
          {badges && badges.length > 0 && (
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {badges.map((b) => (
                <li key={b} className="chip bg-white/10 border border-white/15 text-white/85">✓ {b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="card -mt-6 p-4 md:p-5 relative z-10">{children}</div>

        <p className="mt-2 text-[11px] text-muted">
          Rules last verified {LAST_VERIFIED} · Always confirm critical details on{" "}
          <a href="https://www.irctc.co.in" rel="nofollow noopener" target="_blank" className="underline underline-offset-2">irctc.co.in</a>
        </p>

        {explainer && <div className="mt-8 leading-relaxed">{explainer}</div>}
        <AdSlot placement="inline" />
        {faqs && <FaqAccordion items={faqs} />}
        {relatedTools && <RelatedTools items={relatedTools} />}
      </div>
    </div>
  );
}
