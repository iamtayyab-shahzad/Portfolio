import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";
import Link from "next/link";

const facts = [
  { label: "Based in", value: "Pakistan (UTC+5)" },
  { label: "Works with", value: "Clients worldwide, remotely" },
  { label: "Education", value: "BS Computer Science, Namal University" },
  { label: "Focus", value: "Business software, SaaS & AI tools" },
];

export function AboutTeaser() {
  const { about } = siteConfig;

  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[1.4rem] border border-accent/20 bg-accent/[0.05]"
          />
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-elevated">
            <SmartImage
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(max-width: 1024px) 24rem, 26rem"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="About me" title="A developer who thinks like a business owner" />
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>{about.who}</p>
            <p>{about.interestedIn}</p>
          </div>

          <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-dim">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-ink/90">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            More about me
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
