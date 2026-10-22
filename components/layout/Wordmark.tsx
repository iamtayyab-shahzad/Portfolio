import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent-soft font-mono text-[13px] font-semibold text-accent"
      >
        TS
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        {siteConfig.wordmark}
      </span>
    </span>
  );
}
