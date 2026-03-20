import Link from "next/link";
import { SearchX } from "lucide-react";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-line bg-panel px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-haze text-muted">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-full bg-charcoal px-5 py-3 text-sm text-sand transition hover:opacity-90"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
