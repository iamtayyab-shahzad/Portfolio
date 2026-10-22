import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <Section id="process" className="border-y border-line bg-surface/40">
      <SectionHeading
        eyebrow="How we work together"
        title="A clear process, with no surprises"
        description="You always know what is being built, what it costs, and when it will be ready."
      />
      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[15px] hidden h-px bg-gradient-to-r from-accent/50 via-line to-line lg:block"
        />
        {processSteps.map((step) => (
          <li key={step.number} className="relative">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-bg font-mono text-xs text-accent">
              {step.number}
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
