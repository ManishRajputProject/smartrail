import { SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  CALCULATOR_ROUTES,
  DECISION_TOOL_ROUTES,
  COMMUNITY_ROUTES,
} from "@/lib/site-routes";
import { GUIDES } from "@/lib/guides";

/**
 * /llms.txt — a curated, machine-readable map of the site for large language
 * models (the llmstxt.org convention). It is NOT a ranking lever; it simply
 * gives answer engines a clean index of the highest-value pages with a
 * one-line description each, so a model can find and cite the right page
 * instead of guessing from raw HTML.
 *
 * Built from the same route/guide data as the nav and sitemap, so it can never
 * drift out of sync. English canonical URLs only — the pages carry hreflang to
 * their translations.
 */
export function GET() {
  const url = (path: string) => `${SITE_URL}/en${path === "/" ? "" : path}`;

  const section = (
    title: string,
    items: { path: string; label: string; description: string }[]
  ) =>
    `## ${title}\n\n` +
    items
      .map((i) => `- [${i.label}](${url(i.path)}): ${i.description}`)
      .join("\n");

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> Free, independent calculators and guides for Indian Railways travellers — IRCTC booking dates, Tatkal timing, refund estimates, waitlist outlooks and reminders. Not affiliated with IRCTC or Indian Railways; for official booking and live data use irctc.co.in. All figures are estimates based on published rules and should be verified on IRCTC before travel.`,
    "",
    "Every rule the calculators use (the 60-day advance window, Tatkal times, refund slabs, chart-prep timing) is version-controlled with a last-verified date and covered by automated tests. Content is available in English, Hindi, Bengali, Marathi, Tamil, Telugu, Gujarati and Kannada.",
    "",
    section(
      "Calculators",
      CALCULATOR_ROUTES.map((r) => ({
        path: r.href,
        label: r.label,
        description: r.description,
      }))
    ),
    "",
    section(
      "Decision & planning tools",
      DECISION_TOOL_ROUTES.map((r) => ({
        path: r.href,
        label: r.label,
        description: r.description,
      }))
    ),
    "",
    section(
      "Guides",
      GUIDES.map((g) => ({
        path: `/guides/${g.slug}`,
        label: g.title,
        description: g.description,
      }))
    ),
    "",
    section(
      "Reference & community",
      COMMUNITY_ROUTES.map((r) => ({
        path: r.href,
        label: r.label,
        description: r.description,
      }))
    ),
    "",
    "## Reference data",
    "",
    "- Train and station details come from India's Open Government Data (data.gov.in, Government Open Data License – India). It is a static reference snapshot, not a live feed — timings, routes and availability change and must be verified on IRCTC or NTES before booking.",
    "",
    "## About",
    "",
    `- [About & methodology](${url("/about")}): How the site is run, how every railway rule is verified, and what it deliberately does not do.`,
    `- [Disclaimer](${url("/disclaimer")}): Independence from IRCTC/Indian Railways, accuracy limitations and liability terms.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
