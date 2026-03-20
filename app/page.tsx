import { ImmersiveSlideFeed } from "@/components/immersive-slide-feed";
import { SectionHeader } from "@/components/section-header";
import { SlideGrid } from "@/components/slide-grid";
import { slides } from "@/lib/data";
import { slideImageDimensions } from "@/lib/slide-image-dimensions";
import Link from "next/link";

export const dynamic = "force-dynamic";

function shuffleArray<T>(items: T[]) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

export default function HomePage() {
  const imageSlides = slides.filter((slide) => slide.coverImage.startsWith("/images/slides/"));
  const targetRatio = 16 / 9;
  const scoredSlides = imageSlides.map((slide) => {
    const size = slideImageDimensions[slide.id];
    const ratio = size ? size.width / size.height : 1;
    const score = Math.abs(ratio - targetRatio) + (ratio < 1.45 ? 1 : 0);

    return { slide, score };
  });

  const preferredSlides = scoredSlides.filter(({ score }) => score <= 0.32).map(({ slide }) => slide);
  const secondarySlides = scoredSlides
    .filter(({ score }) => score > 0.32 && score <= 0.75)
    .map(({ slide }) => slide);
  const fallbackSlides = scoredSlides.filter(({ score }) => score > 0.75).map(({ slide }) => slide);

  const heroSlides = [...shuffleArray(preferredSlides), ...shuffleArray(secondarySlides), ...shuffleArray(fallbackSlides)];

  const featuredSlides = heroSlides.slice(0, 10);
  const featuredIds = new Set(featuredSlides.map((slide) => slide.id));
  const masonrySlides = imageSlides.filter((slide) => !featuredIds.has(slide.id));

  return (
    <div className="space-y-14">
      <section className="px-2 pt-4 md:px-0 md:pt-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-white/90">PPT Page Inspiration Library</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">PageMuse</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/90 md:text-base">
            一个用来找优秀单页、看图、收集和建立版式直觉的灵感库。
          </p>
        </div>
      </section>

      <ImmersiveSlideFeed slides={featuredSlides} />

      <section className="py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 px-6 py-5 md:gap-x-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-5 py-3 text-lg font-medium text-white transition hover:bg-white/8 hover:text-white"
          >
            首页
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-5 py-3 text-lg font-medium text-white transition hover:bg-white/8 hover:text-white"
          >
            发现
          </Link>
          <Link
            href="/category/cover"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-5 py-3 text-lg font-medium text-white transition hover:bg-white/8 hover:text-white"
          >
            分类
          </Link>
          <Link
            href="/scene/work-report"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-5 py-3 text-lg font-medium text-white transition hover:bg-white/8 hover:text-white"
          >
            场景
          </Link>
          <Link
            href="/favorites"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-5 py-3 text-lg font-medium text-white transition hover:bg-white/8 hover:text-white"
          >
            收藏
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-5 py-3 text-lg font-medium text-white transition hover:bg-white/8 hover:text-white"
          >
            搜索
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="最新单页" description="继续下滑，保持灵感迸发。" tone="light" />
        <SlideGrid slides={masonrySlides} variant="masonry" />
      </section>
    </div>
  );
}
