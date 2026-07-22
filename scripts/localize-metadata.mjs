/**
 * Wire per-locale titles/descriptions (already present in page-translations.ts)
 * into each route's generateMetadata, so search engines index localized
 * <title> and <meta description> instead of English on every locale.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "src/app/[lang]";

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name === "page.tsx") out.push(p);
  }
  return out;
}

// String literal: double-quoted, allowing escaped quotes, optionally on its own line.
const STR = String.raw`"((?:[^"\\]|\\.)*)"`;

let changed = 0;
const skipped = [];

for (const file of walk(ROOT)) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("buildMetadata(")) continue;
  if (s.includes("localizePage(locale,") && s.includes("meta.title")) continue; // already done

  const titleRe = new RegExp(String.raw`(\n\s*)title:\s*\n?\s*${STR},`);
  const descRe = new RegExp(String.raw`(\n\s*)description:\s*\n?\s*${STR},`);
  const pathRe = new RegExp(String.raw`\n\s*path:\s*"/([^"]*)",`);

  const tm = s.match(titleRe);
  const dm = s.match(descRe);
  const pm = s.match(pathRe);

  if (!tm || !dm || !pm) {
    skipped.push(`${file} (no simple title/description/path literal)`);
    continue;
  }

  const slug = pm[1];
  if (!slug || slug.includes("[")) {
    skipped.push(`${file} (dynamic or root path "/${slug}")`);
    continue;
  }

  const title = tm[2];
  const desc = dm[2];

  // Replace the literals with lookups, then insert the lookup itself.
  s = s.replace(titleRe, "$1title: meta.title,");
  s = s.replace(descRe, "$1description: meta.description,");

  const insert =
    `  const meta = localizePage(locale, "${slug}", {\n` +
    `    title: "${title}",\n` +
    `    description: "${desc}",\n` +
    `  });\n`;

  // Insert immediately before the buildMetadata return inside generateMetadata.
  s = s.replace(/(\n)(\s*)return buildMetadata\(\{/, `$1${insert}$2return buildMetadata({`);

  if (!/import \{ localizePage \}/.test(s)) {
    s = s.replace(
      /(import \{ (?:DEFAULT_LOCALE|isLocale)[^\n]*\n)/,
      `$1import { localizePage } from "@/i18n/page-translations";\n`
    );
  }

  fs.writeFileSync(file, s);
  changed++;
}

console.log(`rewrote ${changed} pages`);
if (skipped.length) console.log("skipped:\n" + skipped.map((x) => "  " + x).join("\n"));
