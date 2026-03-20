import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { SearchBar } from "@/components/search-bar";
import { SlideGrid } from "@/components/slide-grid";
import { slides } from "@/lib/data";
import { searchSlides } from "@/lib/utils";
import { categoryMeta } from "@/lib/constants";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; scene?: string }>;
}) {
  const { q = "", tag, scene } = await searchParams;
  const results = searchSlides(slides, q).filter(
    (slide) => (!tag || slide.tags.includes(tag)) && (!scene || slide.scenes.includes(scene as never)),
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-line bg-panel p-8">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">搜索</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          按标题、标签、页型和场景查找参考页。
        </p>
        <div className="mt-6">
          <SearchBar initialValue={q} compact />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <FilterBar title="按标签筛选" options={[...new Set(results.flatMap((slide) => slide.tags))]} queryKey="tag" />
        <FilterBar title="按场景筛选" options={[...new Set(results.flatMap((slide) => slide.scenes))]} queryKey="scene" />
      </section>

      {q ? (
        <div className="space-y-2">
          <div className="text-sm text-soft">搜索结果</div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">共找到 {results.length} 个相关页面</h2>
          <p className="text-sm text-muted">
            结果来自：标题 / 标签 / 场景 / 页型
            {q ? `，当前关键词“${q}”` : ""}
          </p>
        </div>
      ) : (
        <div className="text-sm text-soft">输入关键词后开始搜索，例如“融资”“深色”“数据页”。</div>
      )}

      {q && results.length > 0 ? (
        <SlideGrid slides={results} />
      ) : q ? (
        <EmptyState
          title="没有找到匹配结果"
          description="试试更简洁的关键词，或切换页型、场景与标签重新查看。"
        />
      ) : (
        <div className="rounded-[28px] border border-line bg-panel p-6">
          <div className="text-sm text-soft">推荐搜索</div>
          <div className="mt-4 flex flex-wrap gap-3">
            {["述职", "融资", "时间轴", "高级感", categoryMeta.data.label, categoryMeta.cover.label].map((item) => (
              <a
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="rounded-full border border-line bg-sand px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-ink"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
