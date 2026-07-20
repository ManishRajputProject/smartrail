import Link from "next/link";

export function RelatedTools({ items }: { items: { href: string; label: string; description: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Related Tools</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-xl border border-border p-4 hover:border-primary hover:bg-surface transition-colors"
          >
            <p className="font-medium">{t.label}</p>
            <p className="text-sm text-muted mt-1">{t.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
