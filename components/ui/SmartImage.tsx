import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";

type SmartImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

export function SmartImage({ src, className, alt, ...props }: SmartImageProps) {
  const path = typeof src === "string" ? src : "";
  const isSvg = path.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(className)}
      unoptimized={isSvg}
      {...props}
    />
  );
}
