import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import Link from "next/link";

export function Hero() {
  const flagship = getProjectBySlug("krunchies");
  const { hero, availability } = siteConfig;

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-texture pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-12 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up">
          {availability.visible ? (
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2.5 pr-3.5 text-xs font-medium text-muted">
              <span
                aria-hidden
                className={
                  availability.available
                    ? "animate-pulse-dot h-2 w-2 rounded-full bg-emerald-400"
                    : "h-2 w-2 rounded-full bg-dim"
                }
              />
              {availability.label}
            </p>
          ) : null}

          <p className="mt-7 font-mono text-[13px] text-dim">
            {siteConfig.name} <span className="text-white/20">/</span>{" "}
            <span className="text-muted">{siteConfig.role}</span>
          </p>

          <h1 className="mt-3 max-w-xl text-balance text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[3.3rem] lg:text-[3.6rem]">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.valueProposition}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {siteConfig.credibility.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted">
                <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {flagship ? (
          <div className="animate-fade-up delay-2 relative">
            <Link
              href={`/projects/${flagship.slug}`}
              aria-label={`${flagship.name} case study`}
              className="group block rounded-xl shadow-frame transition-transform duration-300 hover:-translate-y-1"
            >
              <ProjectMedia
                project={flagship}
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </Link>

            <div className="absolute -bottom-6 left-4 right-4 flex flex-wrap gap-2 sm:left-auto sm:right-6 sm:justify-end">
              <span className="rounded-lg border border-white/10 bg-[#0d1524]/95 px-3 py-2 text-xs text-muted shadow-lift backdrop-blur">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" aria-hidden />
                Live — real customer orders
              </span>
              <span className="rounded-lg border border-white/10 bg-[#0d1524]/95 px-3 py-2 text-xs text-muted shadow-lift backdrop-blur">
                <span className="font-semibold text-ink">113</span> API endpoints
              </span>
              <span className="rounded-lg border border-white/10 bg-[#0d1524]/95 px-3 py-2 text-xs text-muted shadow-lift backdrop-blur">
                POS works <span className="font-semibold text-ink">offline</span>
              </span>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
