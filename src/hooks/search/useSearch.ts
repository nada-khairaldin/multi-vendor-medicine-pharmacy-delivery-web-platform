import { searchDummy } from "@/src/services/searchServices";
import { SearchFilter, SearchResult } from "@/src/types/search";
import { useEffect, useState } from "react";

export function useSearch(query: string, appliedFilters: SearchFilter[]) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults((prev) => (prev.length ? [] : prev));
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchDummy(query, appliedFilters, {
          signal: controller.signal,
        });
        setResults(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Something went wrong");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query, appliedFilters]);

  return { results, isLoading, error };
}
