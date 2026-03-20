import { categoryMeta, sceneMeta } from "@/lib/constants";
import { Slide, SlideCategory } from "@/lib/types";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function getCategoryBySlug(slug: string): SlideCategory | undefined {
  return (Object.keys(categoryMeta) as SlideCategory[]).find(
    (key) => categoryMeta[key].slug === slug,
  );
}

export function getSceneBySlug(slug: string) {
  return Object.entries(sceneMeta).find(([, value]) => value.slug === slug)?.[0];
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function getAllTags(slides: Slide[]) {
  return [...new Set(slides.flatMap((slide) => slide.tags))].sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
}

export function matchScore(slide: Slide, query: string) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return 0;

  let score = 0;
  if (slide.title.toLowerCase().includes(keyword)) score += 10;
  if (slide.tags.some((tag) => tag.toLowerCase().includes(keyword))) score += 6;
  if (slide.scenes.some((scene) => scene.toLowerCase().includes(keyword))) score += 4;
  if (categoryMeta[slide.category].label.toLowerCase().includes(keyword)) score += 3;
  if (slide.summary.toLowerCase().includes(keyword)) score += 1;
  return score;
}

export function searchSlides(slides: Slide[], query: string) {
  return slides
    .map((slide) => ({ slide, score: matchScore(slide, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (Number(b.slide.isFeatured) !== Number(a.slide.isFeatured)) {
        return Number(b.slide.isFeatured) - Number(a.slide.isFeatured);
      }
      if (b.slide.popularity !== a.slide.popularity) return b.slide.popularity - a.slide.popularity;
      return new Date(b.slide.createdAt).getTime() - new Date(a.slide.createdAt).getTime();
    })
    .map((item) => item.slide);
}

export function getSimilarSlides(slides: Slide[], currentSlide: Slide) {
  return slides
    .filter((slide) => slide.id !== currentSlide.id)
    .map((slide) => {
      let score = 0;
      if (slide.category === currentSlide.category) score += 4;
      score += slide.tags.filter((tag) => currentSlide.tags.includes(tag)).length * 2;
      score += slide.scenes.filter((scene) => currentSlide.scenes.includes(scene)).length;
      if (slide.isFeatured) score += 1;
      return { slide, score };
    })
    .sort((a, b) => b.score - a.score || b.slide.popularity - a.slide.popularity)
    .slice(0, 4)
    .map((item) => item.slide);
}

export function sortSlides(slides: Slide[], sort: string) {
  const nextSlides = [...slides];
  if (sort === "latest") {
    nextSlides.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return nextSlides;
  }
  if (sort === "popular") {
    nextSlides.sort((a, b) => b.popularity - a.popularity);
    return nextSlides;
  }
  nextSlides.sort((a, b) => {
    if (Number(b.isFeatured) !== Number(a.isFeatured)) return Number(b.isFeatured) - Number(a.isFeatured);
    return b.popularity - a.popularity;
  });
  return nextSlides;
}
