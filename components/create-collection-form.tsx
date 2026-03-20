"use client";

import { FormEvent, useState } from "react";
import { useCollections } from "@/components/providers/collections-provider";
import { useToast } from "@/components/providers/toast-provider";

export function CreateCollectionForm() {
  const { createCollection } = useCollections();
  const { showToast } = useToast();
  const [value, setValue] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const name = value.trim();
    if (!name) return;
    createCollection(name);
    setValue("");
    showToast("已新建收藏夹");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-[28px] border border-line bg-panel p-5">
      <div>
        <div className="text-base font-semibold text-ink">新建收藏夹</div>
        <div className="mt-1 text-sm text-muted">例如 Q2述职参考、品牌提案参考</div>
      </div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="输入收藏夹名称"
        className="rounded-2xl border border-line bg-sand px-4 py-3 text-sm text-ink outline-none placeholder:text-soft"
      />
      <button type="submit" className="rounded-full bg-charcoal px-4 py-3 text-sm text-sand transition hover:opacity-90">
        新建收藏夹
      </button>
    </form>
  );
}
