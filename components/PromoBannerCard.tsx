import Image from "next/image";
import type { PromoBanner } from "@/lib/types";

interface PromoBannerCardProps {
  banner: PromoBanner;
}

/** Marketing banner used at the bottom of the profile page; supports two themes. */
export function PromoBannerCard({ banner }: PromoBannerCardProps) {
  const overlay =
    banner.theme === "gradient"
      ? "bg-brand-gradient/90"
      : "bg-ink-900/70";

  return (
    <div className="relative h-[140px] overflow-hidden rounded-card sm:h-[160px]">
      <Image
        src={banner.imageUrl}
        alt={banner.highlight}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative flex h-full flex-col justify-center px-6 text-white">
        {banner.eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
            {banner.eyebrow}
          </p>
        )}
        <p className="mt-1 text-sm font-medium">{banner.title}</p>
        <p className="text-xl font-extrabold leading-tight">{banner.highlight}</p>
        <p className="mt-2 text-sm">
          Mulai dari{" "}
          <span className="text-lg font-bold">{banner.price}</span>{" "}
          {banner.priceUnit}
        </p>
      </div>
    </div>
  );
}
