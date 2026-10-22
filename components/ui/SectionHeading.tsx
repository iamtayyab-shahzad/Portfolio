import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Title = as;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-6 bg-accent/60" />
          {eyebrow}
        </p>
      ) : null}
      <Title className="text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.15]">
        {title}
      </Title>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
