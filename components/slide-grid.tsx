import { Slide } from "@/lib/types";
import { SlideCard } from "@/components/slide-card";

export function SlideGrid({ slides }: { slides: Slide[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {slides.map((slide) => (
        <SlideCard key={slide.id} slide={slide} />
      ))}
    </div>
  );
}
