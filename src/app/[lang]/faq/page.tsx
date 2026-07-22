import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { faqCategoryTitle, faqItem } from "@/i18n/faq-translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
    title: "IRCTC FAQ — Booking, Tatkal & Cancellation Questions Answered",
    description: "Answers to the most common IRCTC booking, Tatkal, cancellation and waiting-list questions.",
    path: "/faq",
    keywords: ["IRCTC FAQ", "train booking questions", "tatkal FAQ"],
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  // Localize every category title and Q&A, falling back to the English source.
  const categories = FAQ_CATEGORIES.map((c) => ({
    id: c.id,
    title: faqCategoryTitle(lang, c.id, c.title),
    items: c.items.map((item, i) => faqItem(lang, c.id, i, item)),
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14 pb-24 md:pb-16">
      <Breadcrumb items={[{ name: dict.nav.faq, href: "/faq" }]} />
      <h1 className="text-[28px] md:text-[38px] font-extrabold tracking-[-0.02em] leading-tight">
        {dict.common.faqTitle}
      </h1>
      <p className="mt-3 text-muted text-[16px] max-w-2xl leading-relaxed">
        {dict.common.faqSubtitle}
      </p>

      <nav aria-label="FAQ categories" className="mt-7 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] font-medium hover:border-primary hover:bg-primary-soft transition-colors"
          >
            {c.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-10">
        {categories.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-24">
            <FaqAccordion items={c.items} title={c.title} />
          </section>
        ))}
      </div>
    </div>
  );
}
