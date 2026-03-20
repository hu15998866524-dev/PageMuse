import Link from "next/link";
import { Slide } from "@/lib/types";
import { SlidePreview } from "@/components/slide-preview";
import { cn } from "@/lib/utils";

const masonryHeightMap = [
  "h-[240px] md:h-[260px] xl:h-[280px]",
  "h-[300px] md:h-[340px] xl:h-[360px]",
  "h-[260px] md:h-[290px] xl:h-[310px]",
  "h-[330px] md:h-[380px] xl:h-[400px]",
  "h-[250px] md:h-[275px] xl:h-[295px]",
  "h-[315px] md:h-[360px] xl:h-[385px]",
];

export function SlideCard({
  slide,
  variant = "default",
  index = 0,
}: {
  slide: Slide;
  variant?: "default" | "image-only";
  index?: number;
}) {
  if (variant === "image-only") {
    return (
      <article className="group mb-3 break-inside-avoid">
        <Link
          href={`/slide/${slide.id}`}
          className={cn(
            "relative block overflow-hidden rounded-[36px] border border-white/10 bg-white/4 shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition duration-300 hover:scale-[1.012] hover:border-white/18",
            masonryHeightMap[index % masonryHeightMap.length],
          )}
        >
          <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.02]">
            <SlidePreview slide={slide} imageOnly fill className="h-full rounded-none border-0 shadow-none" />
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group rounded-[28px] border border-line bg-panel p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift">
      <Link href={`/slide/${slide.id}`} className="block">
        <div className="overflow-hidden rounded-[22px]">
          <div className="transition duration-300 group-hover:scale-[1.02]">
            <SlidePreview slide={slide} />
          </div>
        </div>
      </Link>
    </article>
  );
}
