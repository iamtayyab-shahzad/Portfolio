import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title="How I work"
        description="A straightforward path from problem to a product people can use."
      />
      <ol className="mt-10 divide-y divide-line border-y border-line">
        {processSteps.map((step) => (
          <li
            key={step.number}
            className="grid gap-3 py-6 sm:grid-cols-[5.5rem_minmax(0,12rem)_minmax(0,1fr)] sm:items-baseline sm:gap-8"
          >
            <span className="font-mono text-sm text-accent">{step.number}</span>
            <h3 className="text-base font-medium tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
