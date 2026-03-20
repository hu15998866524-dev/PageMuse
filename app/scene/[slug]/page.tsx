import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { SlideGrid } from "@/components/slide-grid";
import { SortSelect } from "@/components/sort-select";
import { categoryMeta, sceneMeta } from "@/lib/constants";
import { slides } from "@/lib/data";
import { getSceneBySlug, sortSlides } from "@/lib/utils";

export default async function ScenePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tag?: string; category?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const { tag, category, sort = "featured" } = await searchParams;
  const scene = getSceneBySlug(slug);
  if (!scene || !(scene in sceneMeta)) notFound();

  const sceneKey = scene as keyof typeof sceneMeta;
  const baseSlides = slides.filter((slide) => slide.scenes.includes(sceneKey));
  const filteredSlides = sortSlides(
    baseSlides.filter((slide) => (!tag || slide.tags.includes(tag)) && (!category || slide.category === category)),
    sort,
  );

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "场景", href: "/discover" }, { label: sceneKey }]} />
      <section className="rounded-[32px] border border-line bg-panel p-8">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">{sceneKey}灵感库</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{sceneMeta[sceneKey].description}</p>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <FilterBar
          title="按页型筛选"
          options={[...new Set(baseSlides.map((slide) => slide.category))].map((item) => ({
            label: categoryMeta[item].label,
            value: item,
          }))}
          queryKey="category"
        />
        <FilterBar title="按标签筛选" options={[...new Set(baseSlides.flatMap((slide) => slide.tags))]} queryKey="tag" />
        <div className="flex items-end">
          <SortSelect />
        </div>
      </section>
      <div className="text-sm text-soft">共找到 {filteredSlides.length} 页</div>
      {filteredSlides.length > 0 ? (
        <SlideGrid slides={filteredSlides} />
      ) : (
        <EmptyState
          title="当前筛选下暂无内容"
          description="可以清除部分页型或标签，看看更广的参考范围。"
          actionHref={`/scene/${slug}`}
          actionLabel="清除筛选"
        />
      )}
    </div>
  );
}
