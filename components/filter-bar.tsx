"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Tag } from "@/components/tag";
import { FilterOption } from "@/lib/types";

export function FilterBar({
  title,
  options,
  queryKey,
}: {
  title: string;
  options: string[] | FilterOption[];
  queryKey: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const activeValue = params.get(queryKey) ?? "";
  const normalizedOptions: FilterOption[] = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option,
  );

  function setValue(value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === activeValue) {
      next.delete(queryKey);
    } else {
      next.set(queryKey, value);
    }
    router.push(`?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="rounded-[24px] border border-line bg-panel p-4">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted">
        <SlidersHorizontal className="h-4 w-4" />
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {normalizedOptions.map((option) => (
          <Tag
            key={option.value}
            label={option.label}
            active={activeValue === option.value}
            onClick={() => setValue(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
