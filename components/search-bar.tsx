"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar({
  initialValue = "",
  compact = false,
}: {
  initialValue?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center gap-3 rounded-[20px] border border-line bg-panel ${
        compact ? "px-4 py-3" : "px-5 py-4"
      } shadow-sm`}
    >
      <Search className="h-5 w-5 text-soft" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="搜索标题、标签、页型或场景"
        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-soft"
      />
      <button
        type="submit"
        className="rounded-full bg-charcoal px-4 py-2 text-sm text-sand transition hover:opacity-90"
      >
        搜索
      </button>
    </form>
  );
}
