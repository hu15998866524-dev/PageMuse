import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  description,
  href,
}: {
  title: string;
  description?: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
        {description ? <p className="max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
