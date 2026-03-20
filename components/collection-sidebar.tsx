"use client";

import { Collection } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CollectionSidebar({
  collections,
  activeId,
  onSelect,
}: {
  collections: Collection[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-[28px] border border-line bg-panel p-4">
      <div className="mb-4 text-sm text-soft">收藏夹</div>
      <div className="space-y-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            type="button"
            onClick={() => onSelect(collection.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition",
              activeId === collection.id
                ? "bg-charcoal text-sand"
                : "bg-sand text-muted hover:bg-haze hover:text-ink",
            )}
          >
            <span>{collection.name}</span>
            <span>{collection.slideIds.length}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
