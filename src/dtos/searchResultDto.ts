export type SearchDto =
  | {
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
  | {
      id: string;
      type: "pharmacy";
      name: string;
      deliveryTime: number;
      distance: number;
    };
