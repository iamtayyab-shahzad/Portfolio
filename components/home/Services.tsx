import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="what-i-build">
      <SectionHeading
        eyebrow="What I build"
        title="Products and systems, not just pages"
        description="AI where it is useful. Full-stack and backend when the product needs a real system underneath."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-lg border border-line bg-surface p-6 transition-colors duration-200 hover:border-white/15"
          >
            <h3 className="text-lg font-medium tracking-tight text-ink">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
            <ul className="mt-5 space-y-1.5">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-mono text-xs text-dim"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
