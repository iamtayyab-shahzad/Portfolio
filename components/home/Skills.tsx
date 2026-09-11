import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  const capabilities = skillGroups.flatMap((group) => group.items);

  return (
    <Section id="capabilities">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <SectionHeading
          eyebrow="Why work with me"
          title="Practical full-stack delivery"
          description="Capabilities that matter when shipping real software — not a wall of logos."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {capabilities.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-line pb-3 text-sm text-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="leading-relaxed text-ink/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
