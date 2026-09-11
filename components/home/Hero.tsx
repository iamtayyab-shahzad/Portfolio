import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-glow" />
      <Container className="relative py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-3xl animate-fade-up">
          {siteConfig.availability.visible ? (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
              <span
                className={
                  siteConfig.availability.available
                    ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                    : "h-1.5 w-1.5 rounded-full bg-dim"
                }
                aria-hidden
              />
              <span className="sr-only">Status: </span>
              {siteConfig.availability.label}
            </p>
          ) : null}

          <p className="text-sm font-medium tracking-wide text-accent">
            {siteConfig.name} — {siteConfig.role}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-ink sm:text-5xl md:text-[3.5rem] md:leading-[1.05]">
            {siteConfig.hero.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.hero.valueProposition}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.hero.primaryCta.href}>
              {siteConfig.hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={siteConfig.hero.secondaryCta.href} variant="secondary">
              {siteConfig.hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <p className="mt-8 text-sm text-dim">
            {siteConfig.credibility.join(" · ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
