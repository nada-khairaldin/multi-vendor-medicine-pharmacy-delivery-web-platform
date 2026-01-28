import { SearchResult } from "@/types/search";
import { SearchDto } from "./SearchResultDto";

export function toSearchResult(dtos: SearchDto[]): SearchResult[] {
  return dtos.map((dto) => {
    if (dto.type === "medicine") {
      return {
        id: dto.id,
        type: "medicine",
        title: dto.name,
        subtitle: `${dto.form} · ${dto.quantity} tablets`,

        isAvailable: dto.isAvailable,
        deliveryTimeMinutes: dto.deliveryTimeMinutes,
        pharmacyDistanceKm: dto.pharmacyDistanceKm,
        requiresPrescription: dto.requiresPrescription,
      };
    }

    return {
      id: dto.id,
      type: "pharmacy",
      title: dto.name,
      subtitle: `Deliver · ${dto.deliveryTime} minutes | ${dto.distance} km`,
    };
  });
}
