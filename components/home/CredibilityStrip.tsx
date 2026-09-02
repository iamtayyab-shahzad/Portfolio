import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function CredibilityStrip() {
  return (
    <section aria-label="Focus areas" className="border-b border-line">
      <Container className="py-6 md:py-7">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {siteConfig.credibility.map((item) => (
            <li
              key={item}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
