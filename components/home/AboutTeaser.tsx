import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/site";

export function AboutTeaser() {
  const { about } = siteConfig;

  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-line bg-elevated lg:mx-0">
          <SmartImage
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(max-width: 1024px) 24rem, 28rem"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow="About" title="Who I am" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
            <p>{about.who}</p>
            <p>{about.interestedIn}</p>
            <p>{about.whatIBuild}</p>
            <p>{about.headingTowards}</p>
          </div>
          <div className="mt-8">
            <ButtonLink href="/about" variant="secondary">
              More about me
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
