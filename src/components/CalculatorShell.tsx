import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { RelatedTools } from "@/components/RelatedTools";

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
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12 pb-24 md:pb-12">
      <Breadcrumb items={[{ name: breadcrumbLabel, href: breadcrumbHref }]} />
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">{eyebrow}</p>
      )}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-muted leading-relaxed max-w-2xl">{description}</p>
      {badges && badges.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {badges.map((b) => (
            <li key={b} className="flex items-center gap-1 text-success">
              <span aria-hidden="true">✓</span> {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 md:p-6">{children}</div>

      {explainer && <div className="mt-10 prose-sm max-w-none leading-relaxed">{explainer}</div>}

      {faqs && <FaqAccordion items={faqs} />}
      {relatedTools && <RelatedTools items={relatedTools} />}
    </div>
  );
}
