import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="What I can build"
        description="Clear offerings for businesses that need production software — not another brochure site."
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {services.map((service, index) => (
          <article key={service.title} className="bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
