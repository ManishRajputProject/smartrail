import type { HowItWorksVariant } from "@/i18n/how-it-works-strings";

/** Static 3-step explainer, reused across the live-feature landing pages
 *  (track a train / trains between stations / station board). Plain markup,
 *  no client JS needed. */
export function HowItWorks({ variant }: { variant: HowItWorksVariant }) {
  return (
    <section className="mt-8" aria-labelledby="how-it-works">
      <h2 id="how-it-works" className="text-lg font-bold tracking-tight mb-3">{variant.title}</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {variant.steps.map((step, i) => (
          <div key={step.title} className="card p-3.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-soft text-primary text-[12px] font-bold">
              {i + 1}
            </span>
            <p className="font-semibold text-[14px] mt-2">{step.title}</p>
            <p className="text-[12px] text-muted mt-0.5">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
