import Link from "next/link";
import { ArrowRight, Mouse, MoveDown } from "lucide-react";
import { SlidePreview } from "@/components/slide-preview";
import { categoryMeta, sceneMeta, topics } from "@/lib/constants";
import { Slide } from "@/lib/types";

export function ImmersiveSlideFeed({ slides }: { slides: Slide[] }) {
  const firstSlide = slides[0];
  const panelTextClass = "text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.32)]";

  return (
    <section className="-mx-5 md:-mx-8">
      <div className="feed-scroll h-[calc(100vh-7.5rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth px-3 pt-3 md:px-4 md:pt-4">
        {slides.map((slide, index) => (
          <article key={slide.id} className="flex min-h-[calc(100vh-7.5rem)] snap-start items-start justify-center py-0">
            <div className="group relative w-full self-start">
              <div className="relative aspect-video w-full max-h-[calc(100vh-8.75rem)] overflow-hidden rounded-[30px] shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
                <Link href={`/slide/${slide.id}`} className="absolute inset-0 block">
                  <div className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white backdrop-blur">
                    {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </div>
                  <div className="h-full transition duration-300 group-hover:scale-[1.005]">
                    <SlidePreview slide={slide} large />
                  </div>
                </Link>
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex translate-x-2 items-stretch overflow-hidden rounded-r-[30px] opacity-0 transition duration-200 ease-out transform-gpu will-change-transform will-change-opacity group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100">
                  <div className="relative h-full w-[min(360px,92vw)] overflow-hidden border-l border-white/12 bg-black/22 p-6 shadow-[0_14px_36px_rgba(0,0,0,0.24)] backdrop-blur-[14px] md:w-[380px]">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08)_22%,rgba(0,0,0,0.18)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(24,18,16,0.46),rgba(24,18,16,0.36)_36%,rgba(10,10,12,0.48)_100%)]" />
                    <div className="absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(180deg,rgba(10,10,12,0.42),rgba(10,10,12,0.26)_58%,transparent)]" />
                    <div className="space-y-4 translate-x-2 opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                      <div className="relative z-10 flex flex-wrap items-center gap-3">
                        <div className={`rounded-full border border-white/20 bg-black/22 px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${panelTextClass}`}>
                          {categoryMeta[slide.category].label}
                        </div>
                        <div className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-ink">
                          {slide.style}
                        </div>
                      </div>
                      <div className="relative z-10">
                        <h2 className={`max-w-md text-3xl font-semibold tracking-tight md:text-[2.4rem] md:leading-[1.02] ${panelTextClass}`}>
                          {slide.title}
                        </h2>
                        <p className={`mt-4 max-w-md text-sm leading-7 text-white/92 md:text-[15px] ${panelTextClass}`}>{slide.summary}</p>
                      </div>
                      <div className="relative z-10 space-y-3">
                        <div className={`text-xs uppercase tracking-[0.2em] text-white/72 ${panelTextClass}`}>适用场景</div>
                        <div className="flex flex-wrap gap-2">
                          {slide.scenes.map((scene) => (
                            <Link
                              key={scene}
                              href={`/scene/${sceneMeta[scene].slug}`}
                              className={`rounded-full border border-white/20 bg-black/18 px-3 py-1.5 text-xs transition hover:bg-black/24 ${panelTextClass}`}
                            >
                              {scene}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="relative z-10 space-y-3">
                        <div className={`text-xs uppercase tracking-[0.2em] text-white/72 ${panelTextClass}`}>结构拆解</div>
                        <div className="grid gap-3">
                          <div className="rounded-[24px] border border-white/14 bg-black/18 p-4">
                            <div className={`text-sm font-medium ${panelTextClass}`}>版式结构</div>
                            <p className={`mt-2 text-sm leading-6 text-white/88 ${panelTextClass}`}>{slide.layoutAnalysis}</p>
                          </div>
                          <div className="rounded-[24px] border border-white/14 bg-black/18 p-4">
                            <div className={`text-sm font-medium ${panelTextClass}`}>可迁移方法</div>
                            <p className={`mt-2 text-sm leading-6 text-white/88 ${panelTextClass}`}>{slide.reusableTips}</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/14 pt-4">
                        <div className="flex flex-wrap gap-2">
                          {slide.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/search?q=${encodeURIComponent(tag)}`}
                              className={`rounded-full border border-white/20 bg-black/18 px-3 py-1.5 text-xs transition hover:bg-black/24 ${panelTextClass}`}
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={`/slide/${slide.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm text-ink transition hover:opacity-90"
                        >
                          查看详情
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {firstSlide ? (
          <article className="flex min-h-[auto] snap-start items-start py-2">
            <div className="w-full rounded-[32px] border border-white/10 bg-black/45 p-3 shadow-card backdrop-blur md:p-4">
              <div className="grid gap-4 rounded-[30px] bg-black/55 p-4 md:grid-cols-[1.2fr_0.8fr] md:p-5">
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <Link
                      key={topic.name}
                      href={topic.href}
                      className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/82 transition hover:border-accent"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/65">
                    <Mouse className="h-4 w-4" />
                    向下滚动切换大图
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/65">
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
