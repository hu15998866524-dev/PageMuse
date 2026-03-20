import { Slide } from "@/lib/types";
import { SlideCard } from "@/components/slide-card";

export function SlideGrid({
  slides,
  variant = "default",
}: {
  slides: Slide[];
  variant?: "default" | "masonry";
}) {
  if (variant === "masonry") {
    return (
      <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
        {slides.map((slide, index) => (
          <SlideCard key={slide.id} slide={slide} variant="image-only" index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {slides.map((slide) => (
        <SlideCard key={slide.id} slide={slide} />
      ))}
    </div>
  );
}
