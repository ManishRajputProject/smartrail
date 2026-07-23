import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * AI / LLM crawlers we explicitly welcome. Functionally redundant with the
 * `*` rule below (which already allows everyone), but it documents intent and
 * makes it a one-line edit to later restrict a specific bot without touching
 * the wildcard rule. These are the answer-engine and training crawlers whose
 * output can cite or surface the site.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (training)
  "OAI-SearchBot", // OpenAI (ChatGPT search)
  "ChatGPT-User", // OpenAI (user-triggered browsing)
  "ClaudeBot", // Anthropic (training)
  "Claude-Web", // Anthropic (user-triggered)
  "anthropic-ai", // Anthropic
  "PerplexityBot", // Perplexity (index)
  "Perplexity-User", // Perplexity (user-triggered)
  "Google-Extended", // Google Gemini / Vertex grounding
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Amazon
  "cohere-ai", // Cohere
  "YouBot", // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone: full site except server-only API routes.
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Named AI crawlers, welcomed explicitly on the public content.
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    // The index; crawlers follow it to every child (per-language + train).
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
