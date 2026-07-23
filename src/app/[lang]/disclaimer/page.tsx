import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { legalDoc } from "@/i18n/legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const doc = legalDoc(locale, "disclaimer");
  const meta = localizePage(locale, "disclaimer", {
    title: doc.title || "Disclaimer",
    description: "RailSetu is an independent informational service, not affiliated with IRCTC or Indian Railways.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/disclaimer",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <LegalPage
      lang={lang}
      doc={legalDoc(lang, "disclaimer")}
      href="/disclaimer"
      relatedLinks={[
          { href: "/about", label: "About" },
          { href: "/terms", label: "Terms" },
          { href: "/privacy-policy", label: "Privacy Policy" },
      ]}
    />
  );
}
