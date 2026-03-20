import { categoryMeta } from "@/lib/constants";
import { Slide } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  "midnight-grid": "from-slate-900 via-slate-800 to-slate-700 text-white",
  "paper-minimal": "from-stone-50 via-stone-100 to-stone-200 text-ink",
  "signal-tech": "from-zinc-900 via-slate-900 to-indigo-950 text-white",
  "grid-chapters": "from-slate-100 via-slate-50 to-white text-ink",
  "editorial-spread": "from-neutral-100 via-stone-50 to-white text-ink",
  "launch-stage": "from-zinc-950 via-zinc-900 to-slate-800 text-white",
  "ceremony-red": "from-neutral-900 via-red-950 to-stone-900 text-white",
  "business-metrics": "from-slate-100 via-slate-50 to-white text-ink",
  "research-cards": "from-zinc-100 via-neutral-50 to-white text-ink",
  "pitch-numbers": "from-slate-950 via-indigo-950 to-slate-900 text-white",
  "pie-contrast": "from-orange-50 via-stone-50 to-white text-ink",
  "funnel-flow": "from-slate-50 via-zinc-50 to-white text-ink",
  "timeline-editorial": "from-stone-50 via-neutral-50 to-white text-ink",
  "milestone-steps": "from-blue-50 via-white to-slate-50 text-ink",
  "venture-track": "from-zinc-950 via-slate-900 to-neutral-800 text-white",
  "before-after": "from-white via-neutral-100 to-zinc-300 text-ink",
  "decision-table": "from-slate-100 via-white to-slate-50 text-ink",
  "matrix-map": "from-slate-900 via-zinc-900 to-slate-800 text-white",
  "case-cards": "from-stone-100 via-white to-neutral-100 text-ink",
  "education-showcase": "from-amber-50 via-white to-stone-50 text-ink",
  "retrospective-notes": "from-zinc-50 via-neutral-50 to-stone-100 text-ink",
  "founder-portrait": "from-stone-900 via-zinc-800 to-neutral-700 text-white",
  "mentor-card": "from-amber-50 via-white to-orange-50 text-ink",
  "team-grid": "from-slate-100 via-white to-zinc-50 text-ink",
  "closing-statement": "from-stone-50 via-white to-neutral-50 text-ink",
  "tagline-close": "from-zinc-100 via-white to-stone-50 text-ink",
  "thanks-light": "from-white via-amber-50 to-stone-100 text-ink",
  "campus-cover": "from-stone-50 via-white to-zinc-50 text-ink",
  "launch-bars": "from-zinc-950 via-zinc-900 to-stone-800 text-white",
  "course-columns": "from-slate-50 via-white to-blue-50 text-ink",
};

export function SlidePreview({ slide, large = false }: { slide: Slide; large?: boolean }) {
  const cardTone = toneMap[slide.coverImage] ?? "from-white via-stone-50 to-zinc-100 text-ink";
  const isRealImage = slide.coverImage.startsWith("/");
  const imageFitClass = isRealImage ? "object-contain bg-white" : "object-cover";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-line bg-gradient-to-br shadow-sm",
        cardTone,
        large ? "aspect-video p-8" : "aspect-video p-5",
      )}
    >
      {isRealImage ? (
        <>
          <img src={slide.coverImage} alt={slide.title} className={cn("absolute inset-0 h-full w-full", imageFitClass)} />
        </>
      ) : null}
      <div className={cn("absolute inset-0 opacity-60", isRealImage ? "hidden" : "block")}>
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-current/10" />
        <div className="absolute right-8 top-10 h-16 w-16 rounded-full bg-current/5" />
        <div className="absolute bottom-6 left-6 right-6 h-px bg-current/10" />
      </div>
      <div className={cn("relative flex h-full flex-col justify-between", isRealImage ? "hidden" : "")}>
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[70%]">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">
              {categoryMeta[slide.category].label}
            </div>
            <div className={cn("mt-3 font-semibold tracking-tight", large ? "text-3xl" : "text-xl")}>
              {slide.title}
            </div>
          </div>
          <div className="rounded-full border border-current/10 px-3 py-1 text-[10px] opacity-75">
            {slide.style}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {slide.tags.slice(0, 3).map((tag) => (
            <div key={tag} className="rounded-2xl border border-current/10 bg-current/5 px-3 py-2 text-[11px]">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
