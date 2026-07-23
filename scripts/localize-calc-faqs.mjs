/**
 * Point each calculator's `faqs={faqs}` at the localised list, so the visible
 * FAQ *and* the FAQPage JSON-LD it feeds are in the page's language.
 */
import fs from "node:fs";

const SLUGS = [
  "booking-date-calculator",
  "tatkal-time-calculator",
  "refund-calculator",
  "fare-calculator",
  "tatkal-charge-calculator",
  "group-fare-calculator",
  "luggage-calculator",
  "chart-preparation-time",
  "trip-cost-estimator",
];

// Only booking-date-calculator interpolates rule constants into its answers.
const VARS = {
  "booking-date-calculator": "{ days: ARP_DAYS, hour: ARP_OPEN_HOUR_IST }",
};

let changed = 0;
const skipped = [];

for (const slug of SLUGS) {
  const file = `src/app/[lang]/${slug}/page.tsx`;
  let s = fs.readFileSync(file, "utf8");

  if (s.includes("calcFaqs(")) {
    skipped.push(`${slug} (already wired)`);
    continue;
  }
  if (!/faqs=\{faqs\}/.test(s)) {
    skipped.push(`${slug} (no faqs={faqs} prop)`);
    continue;
  }

  const vars = VARS[slug] ? `, ${VARS[slug]}` : "";
  s = s.replace(/faqs=\{faqs\}/, `faqs={calcFaqs(lang, "${slug}", faqs${vars})}`);

  if (!/import \{ calcFaqs \}/.test(s)) {
    // Anchor after the last import so we do not depend on any one being present.
    const lines = s.split(/\r?\n/);
    let last = 0;
    lines.forEach((l, i) => {
      if (/^import /.test(l)) last = i;
    });
    lines.splice(
      last + 1,
      0,
      `import { calcFaqs } from "@/i18n/calculator-faq-translations";`
    );
    s = lines.join("\n");
  }

  fs.writeFileSync(file, s);
  changed++;
}

console.log(`wired ${changed} calculators`);
if (skipped.length) console.log("skipped:\n" + skipped.map((x) => "  " + x).join("\n"));
