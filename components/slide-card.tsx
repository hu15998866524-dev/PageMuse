import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Slide } from "@/lib/types";
import { SlidePreview } from "@/components/slide-preview";
import { Tag } from "@/components/tag";
import { FavoriteButton } from "@/components/favorite-button";
import { categoryMeta } from "@/lib/constants";

export function SlideCard({ slide }: { slide: Slide }) {
  return (
    <article className="group rounded-[28px] border border-line bg-panel p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift">
      <Link href={`/slide/${slide.id}`} className="block">
        <div className="overflow-hidden rounded-[22px]">
          <div className="transition duration-300 group-hover:scale-[1.02]">
            <SlidePreview slide={slide} />
          </div>
        </div>
      </Link>
      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Link href={`/slide/${slide.id}`} className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
              {slide.title}
              <ArrowUpRight className="h-4 w-4 text-soft transition group-hover:text-ink" />
            </Link>
            <p className="line-clamp-1 text-sm text-muted">{slide.summary}</p>
          </div>
          <FavoriteButton slideId={slide.id} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag label={categoryMeta[slide.category].label} href={`/category/${slide.category}`} />
          {slide.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} label={tag} href={`/search?q=${encodeURIComponent(tag)}`} />
          ))}
        </div>
        <div className="text-sm text-soft">{slide.scenes.join(" / ")}</div>
      </div>
    </article>
  );
}
