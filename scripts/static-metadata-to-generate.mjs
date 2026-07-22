/**
 * Convert `export const metadata = buildMetadata({...})` routes to
 * `generateMetadata`, so they can (a) use localized titles/descriptions and
 * (b) pass `locale` to buildMetadata — without it these pages emitted the
 * default-locale canonical/hreflang on every locale.
 */
import fs from "node:fs";

const FILES = [
  "src/app/[lang]/journey-reports/page.tsx",
  "src/app/[lang]/search/page.tsx",
  "src/app/[lang]/stations/page.tsx",
  "src/app/[lang]/train-classes/page.tsx",
  "src/app/[lang]/trains/page.tsx",
];

const STR = String.raw`"((?:[^"\\]|\\.)*)"`;

for (const file of FILES) {
  let s = fs.readFileSync(file, "utf8");

  const block = s.match(/export const metadata: Metadata = buildMetadata\(\{([\s\S]*?)\n\}\);/);
  if (!block) {
    console.log("SKIP (no static metadata block):", file);
    continue;
  }
  const body = block[1];

  const title = body.match(new RegExp(String.raw`title:\s*\n?\s*${STR},`));
  const desc = body.match(new RegExp(String.raw`description:\s*\n?\s*${STR},`));
  const pathM = body.match(/path:\s*"\/([^"]*)",/);
  if (!title || !desc || !pathM) {
    console.log("SKIP (unparsed fields):", file);
    continue;
  }
  const slug = pathM[1];

  // Keep any remaining fields (keywords, etc.) verbatim.
  const rest = body
    .replace(new RegExp(String.raw`\n\s*title:\s*\n?\s*${STR},`), "")
    .replace(new RegExp(String.raw`\n\s*description:\s*\n?\s*${STR},`), "")
    .replace(/\n\s*path:\s*"\/[^"]*",/, "")
    .trimEnd();

  const replacement =
    `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {\n` +
    `  const { lang } = await params;\n` +
    `  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;\n` +
    `  const meta = localizePage(locale, "${slug}", {\n` +
    `    title: "${title[1]}",\n` +
    `    description: "${desc[1]}",\n` +
    `  });\n` +
    `  return buildMetadata({\n` +
    `    title: meta.title,\n` +
    `    description: meta.description,\n` +
    `    path: "/${slug}",${rest ? rest.replace(/\n  /g, "\n    ") : ""}\n` +
    `    locale,\n` +
    `  });\n` +
    `}`;

  s = s.replace(block[0], replacement);

  if (!/from "@\/i18n\/locales"/.test(s)) {
    s = s.replace(
      /(import \{ buildMetadata \} from "@\/lib\/seo";\n)/,
      `$1import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";\n`
    );
  }
  if (!/import \{ localizePage \}/.test(s)) {
    s = s.replace(
      /(import \{ buildMetadata \} from "@\/lib\/seo";\n)/,
      `$1import { localizePage } from "@/i18n/page-translations";\n`
    );
  }

  fs.writeFileSync(file, s);
  console.log("converted:", file);
}
