import Link from "next/link";
import { ArrowRight, Mouse, MoveDown } from "lucide-react";
import { SlidePreview } from "@/components/slide-preview";
import { Tag } from "@/components/tag";
import { categoryMeta, sceneMeta, topics } from "@/lib/constants";
import { Slide } from "@/lib/types";

export function ImmersiveSlideFeed({ slides }: { slides: Slide[] }) {
  const firstSlide = slides[0];

  return (
    <section className="-mx-5 md:-mx-8">
      <div className="feed-scroll h-[calc(100vh-5.5rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth px-5 md:px-8">
        {slides.map((slide, index) => (
          <article key={slide.id} className="flex min-h-[calc(100vh-5.5rem)] snap-start items-center py-6">
            <div className="group relative min-h-[84vh] w-full overflow-hidden rounded-[40px] border border-line bg-panel p-4 shadow-card md:p-5">
              <Link href={`/slide/${slide.id}`} className="block h-full overflow-hidden rounded-[36px]">
                <div className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white backdrop-blur">
                  {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </div>
                <div className="h-full min-h-[80vh] transition duration-500 group-hover:scale-[1.01]">
                  <SlidePreview slide={slide} large />
                </div>
              </Link>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[40px] bg-gradient-to-t from-black/12 via-black/0 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 md:p-5" />
              <div className="absolute bottom-8 right-8 z-10 w-[min(420px,calc(100%-4rem))] rounded-[30px] border border-white/14 bg-white/52 p-4 opacity-0 shadow-lift backdrop-blur-xl transition duration-300 group-hover:opacity-100 hover:bg-white/84 md:p-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-line bg-panel px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-soft">
                      {categoryMeta[slide.category].label}
                    </div>
                    <div className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-ink">
                      {slide.style}
                    </div>
                  </div>
                  <div>
                    <h2 className="max-w-md text-3xl font-semibold tracking-tight text-ink md:text-[2.65rem] md:leading-[1.02]">
                      {slide.title}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-muted transition duration-300 group-hover:opacity-100 md:text-[15px] md:opacity-0">
                      {slide.summary}
                    </p>
                  </div>
                  <div className="space-y-3 transition duration-300 md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                    <div className="text-xs uppercase tracking-[0.2em] text-soft">适用场景</div>
                    <div className="flex flex-wrap gap-2">
                      {slide.scenes.map((scene) => (
                        <Tag key={scene} label={scene} href={`/scene/${sceneMeta[scene].slug}`} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 transition duration-300 md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:max-h-[22rem] md:group-hover:opacity-100">
                    <div className="text-xs uppercase tracking-[0.2em] text-soft">结构拆解</div>
                    <div className="grid gap-3">
                      <div className="rounded-[24px] border border-line bg-panel/86 p-4">
                        <div className="text-sm font-medium text-ink">版式结构</div>
                        <p className="mt-2 text-sm leading-6 text-muted">{slide.layoutAnalysis}</p>
                      </div>
                      <div className="rounded-[24px] border border-line bg-panel/86 p-4">
                        <div className="text-sm font-medium text-ink">可迁移方法</div>
                        <p className="mt-2 text-sm leading-6 text-muted">{slide.reusableTips}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                    <div className="flex flex-wrap gap-2">
                      {slide.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} label={tag} href={`/search?q=${encodeURIComponent(tag)}`} />
                      ))}
                    </div>
                    <Link
                      href={`/slide/${slide.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm text-sand transition hover:opacity-90"
                    >
                      查看详情
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {firstSlide ? (
          <article className="flex min-h-[calc(100vh-5.5rem)] snap-start items-end py-6">
            <div className="w-full rounded-[36px] border border-line bg-panel p-4 md:p-5">
              <div className="grid gap-4 rounded-[30px] bg-sand p-4 md:grid-cols-[1.2fr_0.8fr] md:p-5">
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <Link
                      key={topic.name}
                      href={topic.href}
                      className="rounded-full border border-line bg-panel px-4 py-2 text-sm text-ink transition hover:border-accent"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
                  <span className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted">
                    <Mouse className="h-4 w-4" />
                    向下滚动切换大图
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted">
                    <MoveDown className="h-4 w-4" />
                    首页直接从大图开始
                  </span>
                </div>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
