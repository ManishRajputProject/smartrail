import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — IRCTC Booking Tools`,
    short_name: SITE_NAME,
    description: "Free IRCTC booking date, Tatkal, refund and waitlist calculators for Indian Railways travellers.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c10",
    theme_color: "#4f46e5",
    lang: "en-IN",
    categories: ["travel", "utilities", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
