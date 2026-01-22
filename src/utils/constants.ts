import { SearchFilter } from "@/src/types/search";

export const DEFAULT_FILTERS: SearchFilter[] = [
  {
    key: "availability",
    label: "Availability",
    description: "Available now",
  },
  {
    key: "delivery",
    label: "Delivery",
    description: "Fast delivery",
  },
  {
    key: "pharmacy",
    label: "Pharmacy",
    description: "Nearby only",
  },
  {
    key: "prescription",
    label: "Prescription",
    description: "Required",
  },
];
