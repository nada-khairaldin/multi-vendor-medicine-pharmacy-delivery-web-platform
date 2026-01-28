import { SearchFilter, SearchResult } from "@/types/search";
import { DUMMY_SEARCH_DTO } from "../mock/searchData";
import { toSearchResult } from "../adapters/SearchMapper";
import { getRequest } from "../libs/apiClient";
import { SearchDto } from "../adapters/SearchResultDto";

export function searchDummy(
  query: string,
  filters: SearchFilter[],
  options?: { signal?: AbortSignal },
): Promise<SearchResult[]> {
  return new Promise<SearchResult[]>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const q = query.toLowerCase();

      let filtered = DUMMY_SEARCH_DTO.filter((item) =>
        item.type === "medicine"
          ? item.name.toLowerCase().includes(q) ||
            item.category.some((cat: string) => cat.toLowerCase().includes(q))
          : item.name.toLowerCase().includes(q),
      );

      // simulate filtering
      if (filters.length > 0) {
        filtered = filtered.filter((item) => {
          if (item.type !== "medicine") return false;

          return filters.every((filter) => {
            switch (filter.key) {
              case "availability":
                return item.isAvailable === true;

              case "delivery":
                return item.deliveryTimeMinutes <= 15;

              case "pharmacy":
                return item.pharmacyDistanceKm <= 3;

              case "prescription":
                return item.requiresPrescription === true;

              default:
                return true;
            }
          });
        });
      }

      resolve(toSearchResult(filtered));
    }, 600);

    // Handle abort signal
    if (options?.signal) {
      options.signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new Error("Search aborted"));
      });
    }
  });
}

export async function searchGlobal(
  query: string,
  filters: SearchFilter[],
  options?: { signal?: AbortSignal },
) {
  const params: Record<string, string> = {
    q: query,
  };

  filters.forEach((filter) => {
    switch (filter.key) {
      case "availability":
        params.available = "true";
        break;

      case "delivery":
        params.maxDeliveryTime = "15";
        break;

      case "pharmacy":
        params.maxDistance = "3";
        break;

      case "prescription":
        params.requiresPrescription = "true";
        break;
    }
  });

  const data = await getRequest<SearchDto[]>("/search", {
    params,
    signal: options?.signal,
  });

  return toSearchResult(data);
}
