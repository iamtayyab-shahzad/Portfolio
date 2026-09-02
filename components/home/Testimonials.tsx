import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientsConfig, testimonialsConfig } from "@/data/testimonials";
import { SmartImage } from "@/components/ui/SmartImage";

export function Testimonials() {
  if (!testimonialsConfig.enabled || testimonialsConfig.items.length === 0) {
    return null;
  }

  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="Testimonials" title={testimonialsConfig.heading} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {testimonialsConfig.items.map((item) => (
          <figure
            key={`${item.name}-${item.company}`}
            className="rounded-lg border border-line bg-surface p-6"
          >
            <blockquote className="text-sm leading-relaxed text-ink">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {item.avatar ? (
                <SmartImage
                  src={item.avatar.src}
                  alt={item.avatar.alt}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated font-mono text-xs text-dim"
                >
                  {item.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="text-xs text-muted">
                  {item.role}
                  {item.company ? `, ${item.company}` : ""}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function Clients() {
  if (!clientsConfig.enabled || clientsConfig.items.length === 0) {
    return null;
  }

  return (
    <Section id="clients" className="pt-0">
      <SectionHeading eyebrow="Clients" title={clientsConfig.heading} />
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {clientsConfig.items.map((client) => (
          <li key={client.name} className="font-mono text-sm text-dim">
            {client.href ? (
              <a href={client.href} className="transition-colors hover:text-ink">
                {client.name}
              </a>
            ) : (
              client.name
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
