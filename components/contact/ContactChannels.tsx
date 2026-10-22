import {
  ArrowUpRightIcon,
  ClockIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/ui/Icons";
import { contactLinks, mailtoHref, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function SocialIcon({ label, className }: { label: string; className?: string }) {
  if (label === "GitHub") return <GitHubIcon className={className} />;
  if (label === "LinkedIn") return <LinkedInIcon className={className} />;
  return <ArrowUpRightIcon className={className} />;
}

export function ContactChannels({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <a
        href={mailtoHref}
        className="group flex items-center gap-4 rounded-xl border border-line bg-surface/80 p-4 transition-colors hover:border-accent/40 sm:p-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <MailIcon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-medium uppercase tracking-[0.12em] text-dim">
            Email me directly
          </span>
          <span className="mt-1 block truncate text-[15px] font-medium text-ink transition-colors group-hover:text-accent sm:text-base">
            {siteConfig.email}
          </span>
        </span>
      </a>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4">
          <ClockIcon className="h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm text-muted">
            <span className="block font-medium text-ink">Replies within 24 hours</span>
            A personal reply, not a template
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4">
          <MapPinIcon className="h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm text-muted">
            <span className="block font-medium text-ink">Pakistan, UTC+5</span>
            Working with clients worldwide
          </p>
        </div>
      </div>

      {contactLinks.length > 0 ? (
        <ul className="flex flex-wrap gap-2 pt-1">
          {contactLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel={link.identity ? "me noreferrer noopener" : "noreferrer noopener"}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3.5 text-sm text-muted transition-colors hover:border-white/25 hover:text-ink"
              >
                <SocialIcon label={link.label} className="h-4 w-4" />
                {link.label}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
