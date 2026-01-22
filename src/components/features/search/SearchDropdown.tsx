import { useSearchContext } from "@/src/contexts/SearchContext";
import { SearchDefaultState } from "./SearchDefaultState";
import { SearchResults } from "./SearchResults";
import { useSearch } from "@/src/hooks/search/useSearch";

export function SearchDropdown() {
  const { query, open, appliedFilters } = useSearchContext();
  const { results, isLoading, error } = useSearch(query, appliedFilters);

  const isTyping = query.length > 0;

  if (!open) return null;

  return (
    <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-lg mt-2 border rounded-xl max-h-100 overflow-y-auto">
      {isLoading && <div className="p-4 text-gray-500 text-sm">Searching…</div>}

      {error && !isLoading && (
        <div className="p-4 text-red-500 text-sm">{error}</div>
      )}

      {!isTyping && <SearchDefaultState />}

      {isTyping && !isLoading && !error && <SearchResults results={results} />}
    </div>
  );
}
