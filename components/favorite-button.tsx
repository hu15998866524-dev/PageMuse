"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useCollections } from "@/components/providers/collections-provider";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

export function FavoriteButton({ slideId }: { slideId: string }) {
  const { isFavorited, toggleFavorite } = useCollections();
  const { showToast } = useToast();
  const active = isFavorited(slideId);

  return (
    <button
      type="button"
      onClick={() => {
        toggleFavorite(slideId);
        showToast(active ? "已取消收藏" : "已加入收藏夹");
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
        active
          ? "border-charcoal bg-charcoal text-sand"
          : "border-line bg-panel text-muted hover:border-accent hover:text-ink",
      )}
    >
      {active ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      <span>{active ? "已收藏" : "收藏"}</span>
    </button>
  );
}
