import { ContactChannels } from "@/components/contact/ContactChannels";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div aria-hidden className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span aria-hidden className="h-px w-6 bg-accent/60" />
              Next step
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]">
              Have a project in mind? Let&apos;s figure out the right way to build it.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Send a short description of what you need. I&apos;ll reply with questions, a
              suggested approach, and an honest estimate — no commitment required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">
                Discuss Your Project
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                View My Work
              </ButtonLink>
            </div>
          </div>

          <ContactChannels />
        </div>
      </div>
    </Section>
  );
}
