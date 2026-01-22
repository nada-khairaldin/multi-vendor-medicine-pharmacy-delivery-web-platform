"use client";

import { createContext, RefObject, useContext, useRef, useState } from "react";
import { SearchFilter, SearchResult } from "@/src/types/search";
import { useRouter } from "next/navigation";
import { useSearchRecents } from "@/src/hooks/search/useSearchRecents";

type SearchContextValue = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;

  open: boolean;
  setOpen: (v: boolean) => void;

  appliedFilters: SearchFilter[];
  setAppliedFilters: React.Dispatch<React.SetStateAction<SearchFilter[]>>;

  activeIndex: number;
  setActiveIndex: (v: number) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  handleSelect: (item: SearchResult) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilter[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setRecents } = useSearchRecents();

  const STORAGE_KEY = "searchRecents";

  const addToRecents = (item: SearchResult) => {
    if (typeof window === "undefined") return;

    setRecents((prev) => {
      const updated = [item, ...prev.filter((r) => r.id !== item.id)].slice(
        0,
        10,
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelect = (item: SearchResult) => {
    setQuery(item.title);
    addToRecents(item);
    setOpen(false);
    inputRef.current?.blur();
    router.push(`/medicine/${item.id}`);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        open,
        setOpen,
        appliedFilters,
        setAppliedFilters,
        activeIndex,
        setActiveIndex,
        inputRef,
        handleSelect,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearchContext must be used inside SearchProvider");
  }
  return ctx;
}
