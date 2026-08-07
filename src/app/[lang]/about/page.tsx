import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { legalDoc } from "@/i18n/legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const doc = legalDoc(locale, "about");
  const meta = localizePage(locale, "about", {
    title: doc.title || "About & Methodology",
    description: "Who runs SmartRail, how every railway rule is verified, and what we deliberately refuse to do.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/about",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <LegalPage
      lang={lang}
      doc={legalDoc(lang, "about")}
      href="/about"
      relatedLinks={[
          { href: "/disclaimer", label: "Disclaimer" },
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/data-deletion", label: "Data Deletion" },
          { href: "/contact", label: "Contact" },
      ]}
    />
  );
}
