import { SearchDto } from "@/adapters/SearchResultDto";

export const DUMMY_SEARCH_DTO: SearchDto[] = [
  //  MEDICINES

  {
    id: "m1",
    type: "medicine",
    name: "Panadol 500mg",
    form: "Tablet",
    quantity: 12,
    category: ["pain-killer", "fever"],

    isAvailable: true,
    deliveryTimeMinutes: 10,
    pharmacyDistanceKm: 2.3,
    requiresPrescription: true,
  },
  {
    id: "m2",
    type: "medicine",
    name: "Paracetamol",
    form: "Tablet",
    quantity: 20,
    category: ["pain-killer", "fever-reducer"],

    isAvailable: true,
    deliveryTimeMinutes: 25,
    pharmacyDistanceKm: 5.1,
    requiresPrescription: false,
  },
  {
    id: "m3",
    type: "medicine",
    name: "Amoxicillin",
    form: "Capsule",
    quantity: 20,
    category: ["antibiotic", "infection"],

    isAvailable: true,
    deliveryTimeMinutes: 15,
    pharmacyDistanceKm: 3.2,
    requiresPrescription: true,
  },
  {
    id: "m4",
    type: "medicine",
    name: "Augmentin",
    form: "Tablet",
    quantity: 14,
    category: ["antibiotic"],

    isAvailable: false,
    deliveryTimeMinutes: 30,
    pharmacyDistanceKm: 6.8,
    requiresPrescription: true,
  },
  {
    id: "m5",
    type: "medicine",
    name: "Vitamin C",
    form: "Tablet",
    quantity: 30,
    category: ["vitamins", "immune"],

    isAvailable: true,
    deliveryTimeMinutes: 5,
    pharmacyDistanceKm: 1.2,
    requiresPrescription: false,
  },
  {
    id: "m6",
    type: "medicine",
    name: "Cough Syrup",
    form: "Syrup",
    quantity: 1,
    category: ["cold", "flu"],

    isAvailable: false,
    deliveryTimeMinutes: 20,
    pharmacyDistanceKm: 4.5,
    requiresPrescription: false,
  },

  // PHARMACIES

  {
    id: "p1",
    type: "pharmacy",
    name: "City Pharmacy",
    deliveryTime: 15,
    distance: 2.55,
  },
  {
    id: "p2",
    type: "pharmacy",
    name: "Health Plus Pharmacy",
    deliveryTime: 10,
    distance: 1.8,
  },
  {
    id: "p3",
    type: "pharmacy",
    name: "Care Pharmacy",
    deliveryTime: 25,
    distance: 5.0,
  },
];
