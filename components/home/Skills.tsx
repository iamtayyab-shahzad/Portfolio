import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Stack"
        title="Technologies I work with"
        description="A curated set — not an exhaustive list. Replace these with the tools you actually ship with."
      />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-dim">
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
