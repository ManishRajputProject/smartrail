import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/lib/faq-data";

export const metadata: Metadata = buildMetadata({
  title: "IRCTC FAQ — Booking, Tatkal & Cancellation Questions Answered",
  description: "Answers to the most common IRCTC booking, Tatkal, cancellation and waiting-list questions.",
  path: "/faq",
  keywords: ["IRCTC FAQ", "train booking questions", "tatkal FAQ"],
});

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12 pb-24 md:pb-12">
      <Breadcrumb items={[{ name: "FAQ", href: "/faq" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
      <p className="mt-3 text-muted max-w-2xl">Common IRCTC booking, Tatkal, cancellation and waiting-list questions, answered.</p>

      <nav aria-label="FAQ categories" className="mt-6 flex flex-wrap gap-2">
        {FAQ_CATEGORIES.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-surface-2">
            {c.title}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-10">
        {FAQ_CATEGORIES.map((c) => (
          <section key={c.id} id={c.id}>
            <FaqAccordion items={c.items} title={c.title} />
          </section>
        ))}
      </div>
    </div>
  );
}
