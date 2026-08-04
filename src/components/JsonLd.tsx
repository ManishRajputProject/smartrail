export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RailSetu",
    url: "https://railsetu.in",
    description:
      "Independent, free IRCTC booking calculators and reminders for Indian Railways travellers. Not affiliated with IRCTC or Indian Railways.",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RailSetu",
    url: "https://railsetu.in",
    description:
      "Free IRCTC booking date, Tatkal timing, refund and waitlist calculators for Indian Railways travellers.",
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: "RailSetu", url: "https://railsetu.in" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://railsetu.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
