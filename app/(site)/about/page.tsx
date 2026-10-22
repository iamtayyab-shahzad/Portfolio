import { ContactChannels } from "@/components/contact/ContactChannels";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} is a full-stack developer from Pakistan building websites, business systems, SaaS products, APIs, and AI tools for clients worldwide.`,
  path: "/about",
});

const facts = [
  { label: "Based in", value: "Pakistan (UTC+5)" },
  { label: "Works with", value: "Clients worldwide, remotely" },
  { label: "Education", value: "BS Computer Science, Namal University" },
  { label: "Main production work", value: "Krunchies restaurant platform" },
];

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

      <Section className="pb-16 md:pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:mx-0">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[1.4rem] border border-accent/20 bg-accent-soft/40"
            />
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-elevated">
              <SmartImage
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(max-width: 1024px) 24rem, 26rem"
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About"
              title="I build complete software products — and I explain every step."
              as="h1"
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
              <p className="text-ink/90">{about.who}</p>
              <p>{about.whatIBuild}</p>
            </div>

            <dl className="mt-10 grid gap-x-8 gap-y-5 border-y border-line py-7 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-dim">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink/90">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 space-y-8">
              <AboutBlock title="How I work" body={about.interestedIn} />
              <AboutBlock title="What I'm looking for" body={about.headingTowards} />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">
                Discuss Your Project
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                View My Work
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Technology"
            title="Tools I use to ship"
            description="The stack behind my production and AI work. I choose tools based on what your project needs and explain the trade-offs."
          />
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h2 className="border-b border-line pb-3 text-sm font-semibold text-ink">
                  {group.category}
                </h2>
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

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Get in touch"
            title="Have something you want built?"
            description="Send a short description of the project. I'll reply within 24 hours with questions and a suggested approach."
          />
          <ContactChannels />
        </div>
      </Section>
    </>
  );
}

function AboutBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}
