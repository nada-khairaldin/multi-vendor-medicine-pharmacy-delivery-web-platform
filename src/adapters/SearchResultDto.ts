export type SearchDto = MedicineDto | PharmacyDto;

export interface MedicineDto {
  id: string;
  type: "medicine";
  name: string;
  form: string;
  quantity: number;
  category: string[];
  isAvailable: boolean;
  deliveryTimeMinutes: number;
  pharmacyDistanceKm: number;
  requiresPrescription: boolean;
}

export interface PharmacyDto {
  id: string;
  type: "pharmacy";
  name: string;
  deliveryTime: number;
  distance: number;
}
