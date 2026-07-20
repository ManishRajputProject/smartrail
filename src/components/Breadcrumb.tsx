import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  const full = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(full.map((i) => ({ name: i.name, url: absoluteUrl(i.href) })))}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4">
        <ol className="flex flex-wrap items-center gap-1">
          {full.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === full.length - 1 ? (
                <span className="text-foreground">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground">{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
