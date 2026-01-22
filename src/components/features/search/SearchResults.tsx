'use client";';

import { SearchSection } from "./SearchSection";
import { FaFilter, FaSearchMinus } from "react-icons/fa";
import { SearchFilters } from "./SearchFilters";
import { useFilteredSearch } from "@/src/hooks/search/useFilteredSearch";
import { useState } from "react";
import { TabButton } from "./TabButton";
import { SearchResult } from "@/src/types/search";
import { useSearchContext } from "@/src/contexts/SearchContext";

type Props = {
  results: SearchResult[];
};

export function SearchResults({ results }: Props) {
  const { query, appliedFilters, setAppliedFilters, handleSelect } =
    useSearchContext();

  const medicineResults = results.filter((r) => r.type === "medicine");

  const pharmacyResults = results.filter((r) => r.type === "pharmacy");

  const {
    filtersOpen,
    activeFilters,
    filteredMedicines,
    openFilters,
    applyFilters,
    clearAllFilters,
    toggleFilter,
  } = useFilteredSearch(medicineResults, appliedFilters, setAppliedFilters);

  const [activeTab, setActiveTab] = useState<"medicines" | "pharmacies">(
    "medicines",
  );

  const isFiltering = appliedFilters.length > 0;

  return (
    <>
      {results.length !== 0 ? (
        <div className="space-y-4 p-4">
          <button
            className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            onClick={openFilters}
          >
            Filters <FaFilter />
            {appliedFilters.length > 0 && (
              <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">
                {appliedFilters.length}
              </span>
            )}
          </button>

          {filtersOpen && (
            <SearchFilters
              open={filtersOpen}
              activeFilters={activeFilters}
              onToggle={(key) => toggleFilter(key)}
              onApply={applyFilters}
              onClear={clearAllFilters}
            />
          )}
          {!isFiltering && (
            <div className="flex items-center gap-2 pb-2 border-b">
              <TabButton
                label="Medicines"
                isActive={activeTab === "medicines"}
                onClick={() => setActiveTab("medicines")}
              />

              <span className="text-gray-300">/</span>

              <TabButton
                label="Pharmacies"
                isActive={activeTab === "pharmacies"}
                onClick={() => setActiveTab("pharmacies")}
              />
            </div>
          )}
          {activeTab === "medicines" && (
            <SearchSection
              title="Medicines"
              icon="💊"
              items={filteredMedicines}
              offset={0}
              onSelect={handleSelect}
            />
          )}
          {activeTab === "pharmacies" && !isFiltering && (
            <SearchSection
              title="Pharmacies"
              icon="📍"
              items={pharmacyResults}
              offset={0}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 px-6 py-10 text-center">
          <div className="flex justify-center items-center bg-gray-100 rounded-full w-14 h-14">
            <FaSearchMinus className="text-gray-400 text-2xl" />
          </div>

          <p className="font-semibold text-base">No results for {query}</p>

          <p className="text-gray-500 text-sm">
            Check the spelling or try a different keyword.
          </p>
        </div>
      )}
    </>
  );
}
