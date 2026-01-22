import { useState, useMemo } from "react";
import { SearchFilter, SearchResult } from "@/src/types/search";
import { DEFAULT_FILTERS } from "@/src/utils/constants";

export function useFilteredSearch(
  medicineResults: SearchResult[],
  appliedFilters: SearchFilter[],
  setAppliedFilters: React.Dispatch<React.SetStateAction<SearchFilter[]>>,
) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);

  const openFilters = () => {
    setFiltersOpen((v) => !v);

    if (appliedFilters.length === 0) setActiveFilters(DEFAULT_FILTERS);
    else setActiveFilters([...appliedFilters]);
  };

  const applyFilters = () => {
    setAppliedFilters(activeFilters);
    setFiltersOpen(false);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setAppliedFilters([]);
    setFiltersOpen(false);
  };

  const toggleFilter = (key: SearchFilter["key"]) => {
    setActiveFilters((prev) => {
      const exists = prev.some((f) => f.key === key);
      if (exists) return prev.filter((f) => f.key !== key);

      const filter = DEFAULT_FILTERS.find((f) => f.key === key);
      return filter ? [...prev, filter] : prev;
    });
  };

  const filteredMedicines = useMemo(() => {
    if (!appliedFilters.length) return medicineResults;

    return medicineResults.filter((medicine) =>
      appliedFilters.every((filter) => {
        switch (filter.key) {
          case "availability":
            return medicine.isAvailable === true;
          case "delivery":
            return (
              typeof medicine.deliveryTimeMinutes === "number" &&
              medicine.deliveryTimeMinutes <= 15
            );
          case "pharmacy":
            return (
              typeof medicine.pharmacyDistanceKm === "number" &&
              medicine.pharmacyDistanceKm <= 3
            );
          case "prescription":
            return medicine.requiresPrescription === true;
          default:
            return true;
        }
      }),
    );
  }, [medicineResults, appliedFilters]);

  return {
    filtersOpen,
    activeFilters,
    appliedFilters,
    filteredMedicines,
    openFilters,
    applyFilters,
    clearAllFilters,
    toggleFilter,
  };
}
