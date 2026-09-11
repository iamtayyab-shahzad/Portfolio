import { SmartImage } from "@/components/ui/SmartImage";
import type { SiteImage } from "@/types/content";

type ProjectGalleryProps = {
  shots: SiteImage[];
};

export function ProjectGallery({ shots }: ProjectGalleryProps) {
  if (shots.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
        Product screens
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {shots.map((shot) => (
          <div
            key={shot.src + shot.alt}
            className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-elevated"
          >
            <SmartImage
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 560px"
              className="object-cover object-top"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
