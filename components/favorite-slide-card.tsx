"use client";

import Link from "next/link";
import { Slide } from "@/lib/types";
import { SlidePreview } from "@/components/slide-preview";
import { useCollections } from "@/components/providers/collections-provider";
import { useToast } from "@/components/providers/toast-provider";

export function FavoriteSlideCard({
  slide,
  activeCollectionId,
}: {
  slide: Slide;
  activeCollectionId: string;
}) {
  const { collections, moveSlide, removeSlide } = useCollections();
  const { showToast } = useToast();

  return (
    <article className="rounded-[28px] border border-line bg-panel p-4">
      <Link href={`/slide/${slide.id}`} className="block overflow-hidden rounded-[22px]">
        <SlidePreview slide={slide} />
      </Link>
      <div className="mt-4 space-y-4">
        <div>
          <Link href={`/slide/${slide.id}`} className="text-lg font-semibold tracking-tight text-ink">
            {slide.title}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{slide.summary}</p>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-soft">移动到收藏夹</label>
          <select
            value={activeCollectionId}
            onChange={(event) => {
              moveSlide(slide.id, event.target.value);
              showToast("已移动到新的收藏夹");
            }}
            className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-sm text-ink outline-none"
          >
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            removeSlide(slide.id, activeCollectionId);
            showToast("已取消收藏");
          }}
          className="w-full rounded-full border border-line bg-sand px-4 py-3 text-sm text-muted transition hover:border-accent hover:text-ink"
        >
          取消收藏
        </button>
      </div>
    </article>
  );
}
