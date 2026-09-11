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
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Title className="text-3xl font-semibold tracking-tighter text-ink sm:text-4xl">
        {title}
      </Title>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
