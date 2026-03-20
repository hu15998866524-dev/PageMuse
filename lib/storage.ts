"use client";

import { defaultCollectionId } from "@/lib/constants";
import { initialCollections } from "@/lib/data";
import { Collection } from "@/lib/types";

const STORAGE_KEY = "ppt-inspiration-collections";

export function readCollections(): Collection[] {
  if (typeof window === "undefined") return initialCollections;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCollections));
    return initialCollections;
  }

  try {
    const parsed = JSON.parse(raw) as Collection[];
    if (!parsed.some((item) => item.id === defaultCollectionId)) {
      return initialCollections;
    }
    return parsed;
  } catch {
    return initialCollections;
  }
}

export function writeCollections(collections: Collection[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
}
