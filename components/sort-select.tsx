"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "featured", label: "精选优先" },
  { value: "latest", label: "最新" },
  { value: "popular", label: "热门" },
];

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const value = params.get("sort") ?? "featured";

  return (
    <select
      value={value}
      onChange={(event) => {
        const next = new URLSearchParams(params.toString());
        next.set("sort", event.target.value);
        router.push(`?${next.toString()}`, { scroll: false });
      }}
      className="rounded-full border border-line bg-panel px-4 py-3 text-sm text-ink outline-none"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
