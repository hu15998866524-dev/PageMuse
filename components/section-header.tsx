import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  href,
  tone = "default",
}: {
  title: string;
  description?: string;
  href?: string;
  tone?: "default" | "light";
}) {
  const isLight = tone === "light";

  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-2">
        <h2 className={cn("text-2xl font-semibold tracking-tight", isLight ? "text-white" : "text-ink")}>{title}</h2>
        {description ? (
          <p className={cn("max-w-2xl text-sm leading-6", isLight ? "text-white" : "text-muted")}>{description}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-2 text-sm transition",
            isLight ? "text-white/78 hover:text-white" : "text-muted hover:text-ink",
          )}
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
