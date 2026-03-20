import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { SlideGrid } from "@/components/slide-grid";
import { SlidePreview } from "@/components/slide-preview";
import { Tag } from "@/components/tag";
import { categoryMeta, sceneMeta } from "@/lib/constants";
import { slides } from "@/lib/data";
import { getAllTags } from "@/lib/utils";

export default function DiscoverPage() {
  const tags = getAllTags(slides).slice(0, 12);
  const editorial = slides.filter((slide) => slide.isFeatured).slice(0, 6);
  const latest = [...slides]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="grid gap-6 rounded-[36px] border border-line bg-panel p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div className="rounded-[32px] bg-gradient-to-br from-charcoal via-slate-900 to-slate-800 p-8 text-sand">
          <div className="text-sm uppercase tracking-[0.24em] text-white/55">Discover</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">像翻策展墙一样继续找页</h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/72">
            发现页不再只是分类入口。这里优先展示更有视觉冲击力的参考页，再让你从页型、场景和风格继续收窄范围。
          </p>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[28px] border border-line bg-accent p-6 text-ink">
            <div className="text-sm uppercase tracking-[0.2em] text-ink/55">浏览建议</div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">先看大图，再决定要不要进入详情。</div>
          </div>
          <div className="rounded-[28px] border border-line bg-tertiary p-6 text-ink">
            <div className="text-sm uppercase tracking-[0.2em] text-ink/55">筛选建议</div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">当你知道用途时，优先用场景，而不是先搜关键词。</div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          {editorial.slice(0, 2).map((slide) => (
            <Link
              key={slide.id}
              href={`/slide/${slide.id}`}
              className="group overflow-hidden rounded-[36px] border border-line bg-panel p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="overflow-hidden rounded-[28px]">
                  <div className="transition duration-500 group-hover:scale-[1.02]">
                    <SlidePreview slide={slide} large />
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-[28px] bg-sand p-6">
                  <div>
                    <div className="text-sm text-soft">{slide.scenes.join(" / ")}</div>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{slide.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted">{slide.summary}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {slide.tags.slice(0, 4).map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="space-y-6">
          <section className="rounded-[28px] border border-line bg-panel p-6">
            <SectionHeader title="按页型找页" description="适合知道要做什么结构，但还没有具体视觉方向。" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Object.values(categoryMeta).map((category) => (
                <Tag key={category.slug} label={category.label} href={`/category/${category.slug}`} />
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-line bg-panel p-6">
            <SectionHeader title="按场景找页" description="适合先按业务语境和汇报目标缩小范围。" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Object.entries(sceneMeta).map(([scene, meta]) => (
                <Tag key={scene} label={scene} href={`/scene/${meta.slug}`} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-[28px] border border-line bg-panel p-6">
        <SectionHeader title="热门标签" description="从风格语言切入，快速缩小搜索范围。" />
        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} href={`/search?q=${encodeURIComponent(tag)}`} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="继续浏览" description="大图之外，仍然保留密集卡片浏览，适合横向比较。" />
        <SlideGrid slides={editorial} />
      </section>

      <section className="space-y-6">
        <SectionHeader title="最近收录" description="最近补充的内容，适合继续扩展灵感来源。" />
        <SlideGrid slides={latest} />
      </section>
    </div>
  );
}
