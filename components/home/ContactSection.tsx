import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";

const nextSteps = [
  "I read your message and reply within 24 hours",
  "We clarify the scope on a short call or by email",
  "You get a written plan with timeline and cost",
];

export function ContactSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={siteConfig.contact.headline}
            description={siteConfig.contact.subheadline}
            as={compact ? "h2" : "h1"}
          />

          <ContactChannels className="mt-9" />

          <div className="mt-10 border-t border-line pt-8">
            <h2 className="text-sm font-semibold text-ink">What happens next</h2>
            <ol className="mt-4 space-y-3">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[10px] text-accent">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-dim">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
              {siteConfig.contact.note}
            </p>
          </div>
        </div>

        <div className="lg:pt-2">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
