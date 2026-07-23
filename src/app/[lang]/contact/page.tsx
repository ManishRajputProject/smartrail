import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { legalDoc } from "@/i18n/legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const doc = legalDoc(locale, "contact");
  const meta = localizePage(locale, "contact", {
    title: doc.title || "Contact",
    description: "How to reach RailSetu for feedback, corrections and privacy requests.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/contact",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <LegalPage
      lang={lang}
      doc={legalDoc(lang, "contact")}
      href="/contact"
      relatedLinks={[
          { href: "/about", label: "About" },
          { href: "/data-deletion", label: "Data Deletion" },
      ]}
    />
  );
}
