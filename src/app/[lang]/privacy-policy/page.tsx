import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { legalDoc } from "@/i18n/legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const doc = legalDoc(locale, "privacy-policy");
  const meta = localizePage(locale, "privacy-policy", {
    title: doc.title || "Privacy Policy",
    description: "What RailSetu collects, why, and how to have it deleted. Most tools run entirely in your browser.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/privacy-policy",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <LegalPage
      lang={lang}
      doc={legalDoc(lang, "privacy-policy")}
      href="/privacy-policy"
      relatedLinks={[
          { href: "/data-deletion", label: "Data Deletion" },
          { href: "/terms", label: "Terms" },
          { href: "/contact", label: "Contact" },
      ]}
    />
  );
}
