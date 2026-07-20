import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export function Breadcrumb({ items, dark = false }: { items: { name: string; href: string }[]; dark?: boolean }) {
  const full = [{ name: "Home", href: "/" }, ...items];
  const base = dark ? "text-white/60" : "text-muted";
  const current = dark ? "text-white/90" : "text-foreground";
  const hover = dark ? "hover:text-white" : "hover:text-foreground";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(full.map((i) => ({ name: i.name, url: absoluteUrl(i.href) })))} />
      <nav aria-label="Breadcrumb" className={`text-sm ${base} mb-3`}>
        <ol className="flex flex-wrap items-center gap-1">
          {full.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === full.length - 1 ? (
                <span className={current}>{item.name}</span>
              ) : (
                <Link href={item.href} className={hover}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
