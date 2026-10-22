import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#0a101c] hover:bg-accent-hover border-transparent shadow-[0_8px_24px_-12px_rgba(245,182,91,0.6)]",
  secondary:
    "bg-white/[0.02] text-ink border-white/15 hover:border-white/30 hover:bg-white/[0.05]",
  ghost: "bg-transparent text-muted border-transparent hover:text-ink",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors duration-200 min-h-11";

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  external = false,
}: CommonProps & { href: string; external?: boolean }) {
  const classNames = cn(base, styles[variant], className);

  if (external) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  disabled,
}: CommonProps & {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        base,
        styles[variant],
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}
