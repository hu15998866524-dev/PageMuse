import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { SlideGrid } from "@/components/slide-grid";
import { SortSelect } from "@/components/sort-select";
import { categoryMeta } from "@/lib/constants";
import { slides } from "@/lib/data";
import { getAllTags, getCategoryBySlug, sortSlides } from "@/lib/utils";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tag?: string; scene?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const { tag, scene, sort = "featured" } = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const baseSlides = slides.filter((slide) => slide.category === category);
  const filteredSlides = sortSlides(
    baseSlides.filter((slide) => (!tag || slide.tags.includes(tag)) && (!scene || slide.scenes.includes(scene as never))),
    sort,
  );

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "分类", href: "/discover" }, { label: categoryMeta[category].label }]} />
      <section className="rounded-[32px] border border-line bg-panel p-8">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">{categoryMeta[category].label}灵感</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{categoryMeta[category].description}</p>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <FilterBar title="按标签筛选" options={getAllTags(baseSlides)} queryKey="tag" />
        <FilterBar title="按场景筛选" options={[...new Set(baseSlides.flatMap((slide) => slide.scenes))]} queryKey="scene" />
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
          description="可以清除部分标签，看看更广的参考范围。"
          actionHref={`/category/${slug}`}
          actionLabel="清除筛选"
        />
      )}
    </div>
  );
}
