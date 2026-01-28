import { useSearchContext } from "@/contexts/SearchContext";
import { SearchDefaultState } from "./SearchDefaultState";
import { SearchResults } from "./SearchResults";
import { useSearch } from "@/hooks/search/useSearch";

export function SearchDropdown() {
  const { query, open, appliedFilters } = useSearchContext();
  const { results, isLoading, error } = useSearch(query, appliedFilters);

  const isTyping = query.length > 0;

  if (!open) return null;

  return (
    <div className="absolute md:absolute top-full left-0 right-0 z-50 bg-white shadow-lg mt-2 border md:border rounded-xl max-h-[60vh] md:max-h-100 overflow-y-auto w-full md:min-w-[500px]">
      {isLoading && <div className="p-4 text-gray-500 text-sm">Searching…</div>}

      {error && !isLoading && (
        <div className="p-4 text-red-500 text-sm">{error}</div>
      )}

      {!isTyping && <SearchDefaultState />}

      {isTyping && !isLoading && !error && <SearchResults results={results} />}
    </div>
  );
}
