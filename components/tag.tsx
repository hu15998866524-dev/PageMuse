"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Tag({
  label,
  active = false,
  href,
  onClick,
}: {
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition",
    active
      ? "border-charcoal bg-charcoal text-sand"
      : "border-line bg-panel text-muted hover:border-accent hover:text-ink",
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
