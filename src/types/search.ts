type SearchResultType = "medicine" | "pharmacy";
type FilterKey = "availability" | "delivery" | "pharmacy" | "prescription";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;

  isAvailable?: boolean;
  deliveryTimeMinutes?: number;
  pharmacyDistanceKm?: number;
  requiresPrescription?: boolean;
};

export type SearchFilter = {
  key: FilterKey;
  label: string;
  description: string;
};
