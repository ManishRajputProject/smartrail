import { JsonLd, faqJsonLd } from "@/components/JsonLd";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Native <details>/<summary> — no JS required, content always crawlable. */
export function FaqAccordion({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <JsonLd data={faqJsonLd(items)} />
      {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
      <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-3 open:bg-surface">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-3 font-medium">
              {item.question}
              <span className="text-muted transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2 text-sm text-muted leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
