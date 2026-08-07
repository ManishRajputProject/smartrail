import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
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
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 pb-20 md:pb-12">
      <Breadcrumb items={[{ name: breadcrumbLabel, href: breadcrumbHref }]} />
      {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
      <h1 className="text-[26px] md:text-[34px] font-extrabold tracking-tight leading-tight">{title}</h1>
      <p className="mt-2.5 text-muted text-[15px] leading-relaxed max-w-2xl">{description}</p>
      {badges && badges.length > 0 && (
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <li key={b} className="chip bg-success-soft text-success">✓ {b}</li>
          ))}
        </ul>
      )}

      <div className="card mt-5 p-4 md:p-5">{children}</div>

      <p className="mt-2 text-[11px] text-muted">
        Rules last verified {LAST_VERIFIED} · Always confirm critical details on{" "}
        <a href="https://www.irctc.co.in" rel="nofollow noopener" target="_blank" className="underline underline-offset-2">irctc.co.in</a>
      </p>

      {explainer && <div className="mt-8 leading-relaxed">{explainer}</div>}
      <AdSlot placement="inline" />
      {faqs && <FaqAccordion items={faqs} />}
      {relatedTools && <RelatedTools items={relatedTools} />}
    </div>
  );
}
