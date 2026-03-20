import { ImmersiveSlideFeed } from "@/components/immersive-slide-feed";
import { SectionHeader } from "@/components/section-header";
import { SlideGrid } from "@/components/slide-grid";
import { Tag } from "@/components/tag";
import { categoryMeta, sceneMeta } from "@/lib/constants";
import { slides } from "@/lib/data";
import { slideImageDimensions } from "@/lib/slide-image-dimensions";

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
      <ImmersiveSlideFeed slides={featuredSlides} />

      <section className="grid gap-6 rounded-[36px] border border-line bg-panel p-6 md:grid-cols-[0.95fr_1.05fr] md:p-8">
        <div className="rounded-[28px] bg-charcoal p-8 text-sand">
          <div className="text-sm uppercase tracking-[0.24em] text-white/55">继续精确检索</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">大图负责激发灵感，筛选负责快速收敛。</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/72">
            如果你已经知道要找什么，就不要再继续盲滚。直接从页型、场景和标签切入，会更快得到可参考的候选页。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[28px] border border-line bg-sand p-6">
            <SectionHeader title="按页型浏览" description="更适合已经知道要做哪一页的用户。" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Object.values(categoryMeta).map((category) => (
                <Tag key={category.slug} label={category.label} href={`/category/${category.slug}`} />
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-line bg-sand p-6">
            <SectionHeader title="按场景浏览" description="更适合已经知道汇报用途的用户。" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Object.entries(sceneMeta).map(([scene, meta]) => (
                <Tag key={scene} label={scene} href={`/scene/${meta.slug}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="最新单页" description="持续补充新的页型与场景参考，保持真实内容感。" />
        <SlideGrid slides={masonrySlides} variant="masonry" />
      </section>
    </div>
  );
}
