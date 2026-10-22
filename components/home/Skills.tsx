import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section id="stack">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeading
          eyebrow="Technology"
          title="A modern stack, chosen for reliability"
          description="Proven tools I have used in production. I pick what fits your project, not what is trendy — and I explain the trade-offs in plain language."
        />
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="border-b border-line pb-3 text-sm font-semibold text-ink">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[13px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
