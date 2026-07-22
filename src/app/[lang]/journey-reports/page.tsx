import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { localizePage } from "@/i18n/page-translations";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ReportFormClient } from "./ReportFormClient";
import { getServerSupabase } from "@/lib/supabase/server";

// Fetches from Supabase — without this the page would be statically
// prerendered once at build time and freeze on whatever data existed then.
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const meta = localizePage(locale, "journey-reports", {
    title: "Journey Reports — Real Traveller Experiences",
    description: "Real, moderated traveller reports on Tatkal confirmation, delays and coach comfort — crowdsourced, not scraped.",
  });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/journey-reports",
    keywords: ["train journey reviews India", "tatkal confirmation experience", "IRCTC traveller reports"],
    locale,
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  tatkal_experience: "Tatkal Experience",
  delay: "Delay",
  coach_comfort: "Coach Comfort",
  waitlist_confirmation: "Waitlist Confirmation",
  other: "Other",
};

interface JourneyReportRow {
  id: string;
  train_ref: string | null;
  journey_date: string | null;
  category: string;
  rating: number | null;
  body: string | null;
  created_at: string;
}

async function getApprovedReports(): Promise<JourneyReportRow[]> {
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from("journey_reports")
      .select("id, train_ref, journey_date, category, rating, body, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) {
      console.error("journey_reports fetch failed", error);
      return [];
    }
    return data ?? [];
  } catch (e) {
    console.error("journey_reports fetch failed", e);
    return [];
  }
}

export default async function Page() {
  const reports = await getApprovedReports();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12">
      <Breadcrumb items={[{ name: "Journey Reports", href: "/journey-reports" }]} />
      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Community</p>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Journey Reports</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Real, moderated traveller reports on Tatkal confirmation, delays and coach comfort — crowdsourced by
        travellers like you, not scraped from any official system.
      </p>

      <div className="mt-6">
        <ReportFormClient />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Recent Reports</h2>
        {reports.length === 0 ? (
          <p className="text-sm text-muted rounded-xl border border-border p-4">
            No approved reports yet — be the first to share one above.
          </p>
        ) : (
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{CATEGORY_LABELS[r.category] ?? r.category}</span>
                  {r.rating && <span className="text-xs text-muted">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>}
                </div>
                {r.body && <p className="text-sm mt-2">{r.body}</p>}
                <p className="text-xs text-muted mt-2">
                  {r.train_ref && `Train ${r.train_ref} · `}
                  {r.journey_date && `Journey ${r.journey_date}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
