"use client";

import { useEffect, useState } from "react";
import { slides } from "@/lib/data";
import { useCollections } from "@/components/providers/collections-provider";
import { CollectionSidebar } from "@/components/collection-sidebar";
import { CreateCollectionForm } from "@/components/create-collection-form";
import { EmptyState } from "@/components/empty-state";
import { FavoriteSlideCard } from "@/components/favorite-slide-card";

export function FavoritesPageClient() {
  const { collections } = useCollections();
  const [activeId, setActiveId] = useState(collections[0]?.id ?? "collection-default");
  useEffect(() => {
    if (!collections.some((collection) => collection.id === activeId) && collections[0]) {
      setActiveId(collections[0].id);
    }
  }, [activeId, collections]);
  const activeCollection = collections.find((collection) => collection.id === activeId) ?? collections[0];
  const favoriteSlides = slides.filter((slide) => activeCollection?.slideIds.includes(slide.id));

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="space-y-6">
        <CollectionSidebar collections={collections} activeId={activeCollection?.id ?? ""} onSelect={setActiveId} />
        <CreateCollectionForm />
      </div>
      <div className="space-y-6">
        <div className="rounded-[28px] border border-line bg-panel p-6">
          <div className="text-sm text-soft">当前收藏夹</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{activeCollection?.name ?? "默认收藏"}</h2>
          <p className="mt-3 text-sm text-muted">管理你的页面参考，按项目或主题沉淀自己的灵感清单。</p>
        </div>
        {favoriteSlides.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favoriteSlides.map((slide) => (
              <FavoriteSlideCard key={slide.id} slide={slide} activeCollectionId={activeCollection.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="你的收藏夹还是空的"
            description="先去浏览一些优秀单页，把值得参考的页面收进来。"
            actionHref="/"
            actionLabel="去首页看看"
          />
        )}
      </div>
    </div>
  );
}
