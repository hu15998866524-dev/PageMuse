import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BannerCard({
  name,
  description,
  href,
  tone,
}: {
  name: string;
  description: string;
  href: string;
  tone: string;
}) {
  const toneClass =
    tone === "charcoal"
      ? "bg-charcoal text-sand"
      : tone === "sage"
        ? "bg-sage text-ink"
        : tone === "tertiary"
          ? "bg-tertiary text-ink"
          : "bg-accent text-ink";

  return (
    <Link
      href={href}
      className={cn(
        "group rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card",
        toneClass,
      )}
    >
      <div className="text-sm opacity-70">专题入口</div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{name}</div>
      <p className="mt-3 max-w-xs text-sm leading-6 opacity-85">{description}</p>
      <div className="mt-8 inline-flex items-center gap-2 text-sm">
        查看专题
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
