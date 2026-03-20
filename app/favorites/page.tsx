import { FavoritesPageClient } from "@/components/favorites-page-client";

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-line bg-panel p-8">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">收藏夹</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          管理你的页面参考，按项目或主题建立自己的灵感清单。
        </p>
      </section>
      <FavoritesPageClient />
    </div>
  );
}
