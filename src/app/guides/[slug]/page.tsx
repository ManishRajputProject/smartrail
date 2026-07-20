import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GUIDES, getGuideBySlug } from "@/lib/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return buildMetadata({ title: "Guide Not Found", description: "This guide doesn't exist.", path: `/guides/${slug}`, noIndex: true });

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [guide.category, "IRCTC", "Indian Railways"],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <Breadcrumb items={[{ name: "Guides", href: "/guides" }, { name: guide.title, href: `/guides/${guide.slug}` }]} />
      <span className="text-xs font-semibold uppercase tracking-wide text-primary">{guide.category}</span>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">{guide.title}</h1>
      <p className="text-sm text-muted mt-2">{guide.readMins} min read · Updated {guide.updated}</p>

      <div className="mt-6 space-y-6">
        {guide.sections.map((section, i) => (
          <div key={i}>
            {section.heading && <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-muted leading-relaxed mb-2">{p}</p>
            ))}
            {section.list && (
              <ul className="list-disc list-inside text-muted space-y-1 mt-2">
                {section.list.map((item, k) => <li key={k}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>

      {guide.relatedTool && (
        <Link
          href={guide.relatedTool.href}
          className="mt-8 inline-block rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          Open {guide.relatedTool.label} →
        </Link>
      )}
    </article>
  );
}
