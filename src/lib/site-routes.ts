/**
 * Single source of truth for every static route on the site — drives header
 * nav, footer nav, the homepage tool grid, and the sitemap. Add a route here
 * once and it shows up everywhere consistently.
 */

export interface ToolRoute {
  href: string;
  label: string;
  tag: string;
  description: string;
  icon: string; // simple emoji glyph, keeps this dependency-free
}

export const CALCULATOR_ROUTES: ToolRoute[] = [
  {
    href: "/booking-date-calculator",
    label: "Booking Date Calculator",
    tag: "Most Used",
    description: "Find the exact date IRCTC advance booking opens for your journey date.",
    icon: "📅",
  },
  {
    href: "/tatkal-time-calculator",
    label: "Tatkal Time Calculator",
    tag: "Time-Critical",
    description: "Check the exact minute Tatkal booking opens for AC and non-AC classes.",
    icon: "⏱️",
  },
  {
    href: "/tatkal-charge-calculator",
    label: "Tatkal Charge Calculator",
    tag: "Know the Cost",
    description: "Estimate the Tatkal surcharge on top of the base fare, by class.",
    icon: "💸",
  },
  {
    href: "/refund-calculator",
    label: "Refund Calculator",
    tag: "Save Money",
    description: "Estimate your refund after cancellation based on how close to departure you cancel.",
    icon: "↩️",
  },
  {
    href: "/chart-preparation-time",
    label: "Chart Preparation Time",
    tag: "Plan Ahead",
    description: "Know roughly when the chart is prepared before your train departs.",
    icon: "🗒️",
  },
  {
    href: "/fare-calculator",
    label: "Train Fare Calculator",
    tag: "Compare Fares",
    description: "Ballpark fare estimate by class and distance, with Tatkal and GST factored in.",
    icon: "🎟️",
  },
  {
    href: "/group-fare-calculator",
    label: "Group Fare Calculator",
    tag: "Travelling Together",
    description: "Estimate total fare for a group booking multiple passengers on one PNR.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    href: "/luggage-calculator",
    label: "Luggage Allowance Calculator",
    tag: "Pack Smart",
    description: "Check your free luggage allowance and likely excess charges by class.",
    icon: "🧳",
  },
];

export const DECISION_TOOL_ROUTES: ToolRoute[] = [
  {
    href: "/waitlist-predictor",
    label: "WL Confirmation Outlook",
    tag: "Predict Odds",
    description: "An honest, pattern-based outlook for your waitlisted ticket — no fake percentage.",
    icon: "📊",
  },
  {
    href: "/quota-selector",
    label: "Quota Selector",
    tag: "3 Quick Questions",
    description: "Answer a couple of questions to find the right booking quota for your trip.",
    icon: "🧭",
  },
  {
    href: "/journey-checklist",
    label: "Journey Checklist",
    tag: "Don't Forget Anything",
    description: "A pre-travel checklist generated for your journey type and duration.",
    icon: "✅",
  },
  {
    href: "/long-weekend-planner",
    label: "Long Weekend Planner",
    tag: "Plan Ahead",
    description: "See upcoming Indian long weekends and when booking opens for each.",
    icon: "🏖️",
  },
  {
    href: "/plan-ticket",
    label: "Plan Ticket Calendar",
    tag: "60-Day Calendar",
    description: "A calendar of upcoming journey dates with holidays and booking status marked.",
    icon: "🗓️",
  },
  {
    href: "/trip-cost-estimator",
    label: "Trip Cost Estimator",
    tag: "Budget It Out",
    description: "Estimate total trip cost — fare plus stay, food and local transport.",
    icon: "🧮",
  },
  {
    href: "/travel-mode-comparator",
    label: "Train vs Flight vs Bus",
    tag: "Compare Modes",
    description: "Compare rough time and cost across train, flight and bus for your route.",
    icon: "🚄",
  },
];

export const COMMUNITY_ROUTES: ToolRoute[] = [
  {
    href: "/reminders",
    label: "Booking Reminders",
    tag: "Only Here",
    description: "Free email and calendar reminders before your Tatkal or advance booking window opens.",
    icon: "🔔",
  },
  {
    href: "/journey-reports",
    label: "Journey Reports",
    tag: "Community",
    description: "Real traveller reports on Tatkal confirmation, delays and coach comfort.",
    icon: "💬",
  },
];

export const CONTENT_ROUTES = [
  { href: "/guides", label: "All Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/stations", label: "Station Directory" },
  { href: "/about", label: "About & Methodology" },
];

export const LEGAL_ROUTES = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/data-deletion", label: "Data Deletion" },
  { href: "/contact", label: "Contact" },
];

export const ALL_TOOL_ROUTES = [...CALCULATOR_ROUTES, ...DECISION_TOOL_ROUTES, ...COMMUNITY_ROUTES];
