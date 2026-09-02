import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} is a ${siteConfig.role.toLowerCase()} who builds software products, AI systems, and full-stack applications.`,
  path: "/about",
});

export default function AboutPage() {
  const { about } = siteConfig;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-line bg-elevated">
            <SmartImage
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(max-width: 1024px) 24rem, 26rem"
              priority
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="About" title={siteConfig.name} as="h1" />
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-dim">
              {siteConfig.role}
            </p>
            <div className="mt-8 space-y-8">
              <AboutBlock title="Who I am" body={about.who} />
              <AboutBlock title="What I am interested in" body={about.interestedIn} />
              <AboutBlock title="What I build" body={about.whatIBuild} />
              <AboutBlock title="Where I am heading" body={about.headingTowards} />
            </div>
            <div className="mt-10">
              <ButtonLink href="/contact">{"Let's work together"}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
      <Section className="pt-0">
        <SectionHeading eyebrow="Stack" title="Tools I use" />
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-dim">
                {group.category}
              </h2>
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
    </>
  );
}

function AboutBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-base font-medium tracking-tight text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{body}</p>
    </div>
  );
}
