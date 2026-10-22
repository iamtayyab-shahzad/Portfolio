import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="services" className="border-y border-line bg-surface/40">
      <SectionHeading
        eyebrow="Services"
        title="What I can build for you"
        description="From a first version of your idea to the system your team uses every day. Every project includes design, development, deployment, and handover."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="group flex flex-col rounded-2xl border border-line bg-bg/60 p-6 transition-colors duration-200 hover:border-white/15 hover:bg-surface sm:p-7"
          >
            <span className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{service.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <article className="flex flex-col justify-between rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:p-7">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">Not sure what you need?</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Describe the problem in a few sentences. I&apos;ll suggest the simplest solution that
              works, with a realistic timeline and cost — before you commit to anything.
            </p>
          </div>
          <ButtonLink href="/contact" className="mt-8 self-start">
            Discuss Your Project
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </article>
      </div>
    </Section>
  );
}
