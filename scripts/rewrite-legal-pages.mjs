/**
 * Replace the six hardcoded legal/about pages with the shared data-driven
 * renderer. Also converts their static `metadata` export to generateMetadata
 * with a locale, which fixes a latent bug: without it every locale emitted the
 * default-locale canonical for these pages.
 */
import fs from "node:fs";

const PAGES = {
  terms: {
    metaTitle: "Terms of Use",
    metaDesc: "Terms of use for RailSetu's free Indian Railways calculators and planning tools.",
    related: [
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/contact", label: "Contact" },
    ],
  },
  "privacy-policy": {
    metaTitle: "Privacy Policy",
    metaDesc: "What RailSetu collects, why, and how to have it deleted. Most tools run entirely in your browser.",
    related: [
      { href: "/data-deletion", label: "Data Deletion" },
      { href: "/terms", label: "Terms" },
      { href: "/contact", label: "Contact" },
    ],
  },
  disclaimer: {
    metaTitle: "Disclaimer",
    metaDesc: "RailSetu is an independent informational service, not affiliated with IRCTC or Indian Railways.",
    related: [
      { href: "/about", label: "About" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  about: {
    metaTitle: "About & Methodology",
    metaDesc: "Who runs RailSetu, how every railway rule is verified, and what we deliberately refuse to do.",
    related: [
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/data-deletion", label: "Data Deletion" },
      { href: "/contact", label: "Contact" },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDesc: "How to reach RailSetu for feedback, corrections and privacy requests.",
    related: [
      { href: "/about", label: "About" },
      { href: "/data-deletion", label: "Data Deletion" },
    ],
  },
  "data-deletion": {
    metaTitle: "Data Deletion Request",
    metaDesc: "How to have any reminder or subscription data tied to your email or phone number deleted.",
    related: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

for (const [slug, cfg] of Object.entries(PAGES)) {
  const related = cfg.related
    .map((r) => `          { href: "${r.href}", label: "${r.label}" },`)
    .join("\n");

  const src = `import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { legalDoc } from "@/i18n/legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const doc = legalDoc(locale, "${slug}");
  const meta = localizePage(locale, "${slug}", {
    title: doc.title || ${JSON.stringify(cfg.metaTitle)},
    description: ${JSON.stringify(cfg.metaDesc)},
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/${slug}",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <LegalPage
      lang={lang}
      doc={legalDoc(lang, "${slug}")}
      href="/${slug}"
      relatedLinks={[
${related}
      ]}
    />
  );
}
`;

  fs.writeFileSync(`src/app/[lang]/${slug}/page.tsx`, src);
  console.log("rewrote:", slug);
}
