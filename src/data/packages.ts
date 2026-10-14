/** Packages exactly as published by the client (Instagram, May 2024). Confirm current prices before launch. */
export const VEHICLE_TYPES = ["Hatchback", "Sedan", "MUV / SUV"] as const;
export type VehicleType = (typeof VEHICLE_TYPES)[number];

export type Package = {
  id: string;
  name: string;
  tagline: string;
  prices: Record<VehicleType, number>;
  featured?: boolean;
  includesNote?: string;
  items: string[];
};

export const PACKAGES: Package[] = [
  {
    id: "refresh",
    name: "Refresh",
    tagline: "A complete exterior & interior clean",
    prices: { Hatchback: 499, Sedan: 599, "MUV / SUV": 699 },
    items: [
      "Full body foam wash",
      "Underbody wash",
      "Tyre & arches cleaning",
      "Engine degreasing",
      "Floor mats vacuum & washing",
      "Car interior vacuuming",
      "Door panel & dashboard cleaning & polishing",
      "Alloys / rim wheel cleaning",
      "Tyre cleaning & polishing",
      "Exterior plastic parts polishing",
      "Windshield cleaning & protection",
      "Car perfume",
      "Paper mats laying",
    ],
  },
  {
    id: "rejuvenate",
    name: "Rejuvenate",
    tagline: "Deep interior detail + machine polish + ceramic wax",
    prices: { Hatchback: 4500, Sedan: 5500, "MUV / SUV": 6500 },
    featured: true,
    includesNote: "Everything in Refresh, plus:",
    items: [
      "Interior deep vacuuming",
      "Deep cleaning of dashboard, centre console & door panels",
      "Roof cleaning",
      "Upholstery & carpet cleaning",
      "Leather polishing",
      "AC vents cleaning & sanitisation",
      "Odour removal",
      "Watermarks & minor scratch removal",
      "Decontamination using clay",
      "Machine compounding",
      "Rubbing & polishing",
      "Ceramic wax polishing",
    ],
  },
];

export const ADD_ONS = ["Headlight restoration", "Underbody coating", "Antibacterial treatment"];

export const STARTING_FROM = [
  { label: "Bike foam wash", price: 149, slug: "foam-wash" },
  { label: "3M underbody coating", price: 2500, slug: "underbody-coating" },
  { label: "Ceramic wax", price: 4500, slug: "ceramic-wax" },
  { label: "Ceramic coating", price: 16999, slug: "ceramic-coating" },
];
