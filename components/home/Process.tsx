import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title="How projects move"
        description="A simple path from requirements to a product people can use."
      />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <li key={step.number} className="border-t border-line pt-5">
            <span className="font-mono text-xs text-accent">{step.number}</span>
            <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
