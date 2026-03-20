import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { DetailAnalysisBlock } from "@/components/detail-analysis-block";
import { FavoriteButton } from "@/components/favorite-button";
import { SlidePreview } from "@/components/slide-preview";
import { Tag } from "@/components/tag";
import { categoryMeta, sceneMeta } from "@/lib/constants";
import { slides } from "@/lib/data";
import { formatDate, getSimilarSlides } from "@/lib/utils";
import { SlideCard } from "@/components/slide-card";

export default async function SlideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = slides.find((item) => item.id === id);
  if (!slide) notFound();
  const similarSlides = getSimilarSlides(slides, slide);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: categoryMeta[slide.category].label, href: `/category/${slide.category}` },
          { label: slide.title },
        ]}
      />
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <SlidePreview slide={slide} large />
        <div className="rounded-[32px] border border-white/10 bg-black/58 p-7 text-white shadow-card backdrop-blur-xl">
          <div className="text-sm text-white/45">{formatDate(slide.createdAt)} 收录</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{slide.title}</h1>
          <p className="mt-4 text-sm leading-7 text-white/82">{slide.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {slide.tags.map((tag) => (
              <Tag key={tag} label={tag} href={`/search?q=${encodeURIComponent(tag)}`} />
            ))}
          </div>
          <div className="mt-6 space-y-4 rounded-[24px] border border-white/10 bg-white/6 p-5 text-sm text-white/82">
            <div>
              <span className="text-white/45">页型</span>
              <div className="mt-1 text-white">{categoryMeta[slide.category].label}</div>
            </div>
            <div>
              <span className="text-white/45">适用场景</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {slide.scenes.map((scene) => (
                  <Tag key={scene} label={scene} href={`/scene/${sceneMeta[scene].slug}`} />
                ))}
              </div>
            </div>
            <div>
              <span className="text-white/45">风格</span>
              <div className="mt-1 text-white">{slide.style}</div>
            </div>
          </div>
          <div className="mt-6">
            <FavoriteButton slideId={slide.id} />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <DetailAnalysisBlock title="版式结构" content={slide.layoutAnalysis} />
        <DetailAnalysisBlock title="视觉重点" content={slide.visualFocus} />
        <DetailAnalysisBlock title="可迁移方法" content={slide.reusableTips} />
        <DetailAnalysisBlock
          title="为什么好看"
          content={`这页的整体气质偏${slide.style}，通过${slide.tags.slice(0, 2).join("、")}建立稳定识别，同时保持内容主次清楚。`}
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">相似推荐</h2>
            <p className="mt-2 text-sm text-white/62">基于页型、标签与场景匹配的推荐页。</p>
          </div>
          <Link
            href={`/category/${slide.category}`}
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            查看同类页型
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {similarSlides.map((item) => (
            <SlideCard key={item.id} slide={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
