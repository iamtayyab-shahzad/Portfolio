import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <Section id="contact">
      <div className="rounded-2xl border border-line bg-elevated px-6 py-10 sm:px-10 sm:py-14 md:flex md:items-center md:justify-between md:gap-10">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Have a product or business system in mind?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Tell me what you&apos;re trying to build. I&apos;ll help turn the requirements into a
            practical technical solution.
          </p>
        </div>
        <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
          <ButtonLink href="/contact">Start a Project</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View My Work
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
