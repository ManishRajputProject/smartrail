import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import "../globals.css";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Analytics } from "@/components/Analytics";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const OG_LOCALE: Record<Locale, string> = {
  en: "en_IN", hi: "hi_IN", bn: "bn_IN", mr: "mr_IN", ta: "ta_IN", te: "te_IN", gu: "gu_IN", kn: "kn_IN",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  // The layout body calls notFound() for an invalid locale segment below, but
  // that alone doesn't produce an HTTP 404 in this streaming setup (Next.js
  // sends 200 once streaming starts, and can only mark the response noindex
  // via metadata — see loading.js docs, "Status Codes"). Every other
  // notFound()-calling page in this app sets noIndex on this path already;
  // this was the one gap, silently claiming a normal, indexable page while
  // rendering a not-found body.
  if (!isLocale(lang)) {
    return { robots: { index: false, follow: false } };
  }
  const locale: Locale = lang;
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`]));
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Free IRCTC Booking Date, Tatkal & Refund Calculators`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { ...languages, "x-default": `${SITE_URL}/${DEFAULT_LOCALE}` },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Free IRCTC Booking Date, Tatkal & Refund Calculators`,
      description: SITE_DESCRIPTION,
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/favicon.ico" },
    verification: { google: "4dM8fnAJo__88wLLlj-oweNgthMa9zYlLn6eEF-Zn5w" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbff" },
    { media: "(prefers-color-scheme: dark)", color: "#080c18" },
  ],
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <Header lang={lang} dict={dict} />
        <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
        <Footer lang={lang} dict={dict} />
        <ConsentBanner lang={lang} t={dict.consent} />
        <Analytics />
      </body>
    </html>
  );
}
