"use client";

import { useState } from "react";
import { SearchResult } from "@/src/types/search";

const STORAGE_KEY = "searchRecents";

function readRecents(): SearchResult[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useSearchRecents() {
  const [recents, setRecents] = useState<SearchResult[]>(() => readRecents());

  return { recents, setRecents, STORAGE_KEY };
}
