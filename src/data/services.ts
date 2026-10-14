import { IMG } from "@/data/images";

/**
 * Services CONFIRMED in the client's posts (May 2024 – Jan 2025).
 * PPF is NOT listed because the client has not confirmed it.
 * Prices are "starting from" and vary by vehicle type — confirm with the client before launch.
 */
export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  priceFrom: number | null;
  priceNote: string;
  intro: string;
  body: string[];
  highlights: string[];
  includes: string[];
  options: { name: string; detail: string }[];
  limitations: string[];
  vehicles: string;
};

export const SERVICES: Service[] = [
  {
    slug: "foam-wash",
    title: "Foam Wash",
    short: "A thorough snow-foam wash for cars and bikes — body, underbody, arches and wheels.",
    image: IMG.foamWash,
    priceFrom: 149,
    priceNote: "Bike from ₹149 · Car from ₹499",
    intro: "The foundation of every detail: a safe, thorough wash that lifts dirt before anything touches the paint.",
    body: [
      "Thick snow foam is applied to loosen road grime, then rinsed away before a careful hand wash. Underbody, tyres, arches and alloys are cleaned in the same visit, so the whole vehicle leaves clean — not just the parts you see.",
    ],
    highlights: ["Snow-foam pre-wash", "Underbody wash", "Tyre & arch cleaning", "Alloy / rim cleaning"],
    includes: [
      "Full body foam wash",
      "Underbody wash",
      "Tyre & arches cleaning",
      "Engine degreasing (car Refresh package)",
      "Alloy / rim wheel cleaning",
      "Windshield cleaning & protection",
      "Tyre cleaning & polishing",
    ],
    options: [
      { name: "Bike foam wash", detail: "From ₹149" },
      { name: "Car Refresh package", detail: "Hatchback ₹499 · Sedan ₹599 · MUV/SUV ₹699" },
    ],
    limitations: ["Heavy tar, overspray or deep stains may need decontamination or polishing as a separate service."],
    vehicles: "Cars & bikes",
  },
  {
    slug: "interior-detailing",
    title: "Interior & Upholstery Detailing",
    short: "Deep vacuuming, dashboard and panel cleaning, upholstery, leather care and AC vent sanitisation.",
    image: IMG.interior,
    priceFrom: 4500,
    priceNote: "Included in the Rejuvenate package · from ₹4,500",
    intro: "The cabin is where you spend your time. We clean it the way it deserves — every surface, seam and vent.",
    body: [
      "Interior detailing goes far beyond a quick vacuum. Dashboards, centre consoles and door panels are deep-cleaned, seats and carpets are shampooed, leather is cleaned and polished, and AC vents are cleaned and sanitised to remove trapped dust and odours.",
    ],
    highlights: ["Deep vacuuming", "Upholstery & carpet cleaning", "Leather polishing", "AC vent sanitisation"],
    includes: [
      "Interior deep vacuuming",
      "Deep cleaning of dashboard, centre console & door panels",
      "Roof cleaning",
      "Upholstery & carpet cleaning",
      "Leather polishing",
      "AC vents cleaning & sanitisation",
      "Odour removal",
      "Antibacterial treatment (add-on)",
    ],
    options: [{ name: "Rejuvenate package", detail: "Hatchback ₹4,500 · Sedan ₹5,500 · MUV/SUV ₹6,500" }],
    limitations: ["Permanent stains, burns or worn-out leather may improve but cannot always be fully reversed."],
    vehicles: "Cars",
  },
  {
    slug: "paint-correction",
    title: "Polishing & Paint Correction",
    short: "Clay decontamination, machine compounding and polishing to restore clarity and gloss.",
    image: IMG.polishing,
    priceFrom: 4500,
    priceNote: "Part of the Rejuvenate package · from ₹4,500",
    intro: "Swirls, water marks and dull paint, refined by machine until the reflections look crisp again.",
    body: [
      "The paint is first decontaminated with clay to remove bonded particles. Machine compounding and polishing then level the surface to reduce the appearance of light swirls, water marks and minor scratches, bringing back depth and gloss.",
    ],
    highlights: ["Clay bar decontamination", "Machine compounding", "Rubbing & polishing", "Gloss enhancement"],
    includes: [
      "Decontamination using clay",
      "Machine compounding",
      "Rubbing & polishing",
      "Watermark & minor scratch removal",
    ],
    options: [{ name: "Rejuvenate package", detail: "Includes machine compounding and polishing" }],
    limitations: [
      "Scratches that go through the clear coat cannot be polished out safely.",
      "Results depend on the paint's condition and thickness — we assess it before we start.",
    ],
    vehicles: "Cars",
  },
  {
    slug: "ceramic-wax",
    title: "Ceramic Wax Protection",
    short: "A glossy protective layer that helps shield paint from sun, weather and environmental fallout.",
    image: IMG.waxing,
    priceFrom: 4500,
    priceNote: "From ₹4,500 (varies by vehicle type)",
    intro: "Showroom shine with a protective layer that makes everyday dirt easier to wash off.",
    body: [
      "Ceramic wax adds gloss and a slick, water-repellent layer on top of the paint. It helps protect against UV and sun, weather erosion, acid rain, industrial fallout, bird droppings and tree sap — and keeps the car easier to clean between washes.",
    ],
    highlights: ["UV & sun protection", "Weather & acid-rain resistance", "Bird droppings & tree sap", "Deep gloss"],
    includes: ["Wash & preparation", "Ceramic wax application", "Final buff & inspection"],
    options: [{ name: "Ceramic wax", detail: "From ₹4,500 — price depends on vehicle size" }],
    limitations: [
      "Ceramic wax is a sacrificial layer and lasts less than a ceramic coating.",
      "It does not make paint scratch-proof.",
    ],
    vehicles: "Cars",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic & Graphene Coating",
    short: "Long-term paint protection with intense gloss and water-beading performance.",
    image: IMG.beading,
    priceFrom: 16999,
    priceNote: "From ₹16,999 (varies by vehicle & product)",
    intro: "Our most advanced protection: a hard, glossy coating bonded to properly prepared paint.",
    body: [
      "After a full wash, decontamination and polishing, a ceramic or graphene coating is applied panel by panel. The result is a deep, glass-like gloss, strong water beading and paintwork that stays cleaner and is easier to maintain.",
    ],
    highlights: ["Enhanced gloss", "Hydrophobic water beading", "Easier maintenance", "Prepared by machine polishing"],
    includes: ["Wash & decontamination", "Paint preparation / polishing", "Ceramic or graphene coating application", "Curing & final inspection"],
    options: [
      { name: "Ceramic coating", detail: "From ₹16,999" },
      { name: "Graphene coating", detail: "Ask for current pricing" },
    ],
    limitations: [
      "A coating is not scratch-proof — it resists light marring but cannot stop impacts or deep scratches.",
      "Durability depends on the product chosen and on correct washing afterwards.",
    ],
    vehicles: "Cars",
  },
  {
    slug: "underbody-coating",
    title: "3M Underbody Coating",
    short: "Rust and corrosion protection for the parts of your vehicle you never see.",
    image: IMG.lift,
    priceFrom: 2500,
    priceNote: "From ₹2,500",
    intro: "Protect your investment from below — where water, salt and grit do the most damage.",
    body: [
      "The underbody is cleaned and dried, then sealed with a 3M underbody coating. The protective layer helps prevent rust and corrosion, adds durability and helps your vehicle hold its resale value.",
    ],
    highlights: ["Protects from rust & corrosion", "Enhances durability", "Helps resale value"],
    includes: ["Underbody wash & drying", "Masking of sensitive parts", "3M underbody coating application"],
    options: [{ name: "3M underbody coating", detail: "From ₹2,500 · also available as an add-on" }],
    limitations: ["Existing heavy rust should be treated or repaired by a mechanic first."],
    vehicles: "Cars",
  },
  {
    slug: "headlight-restoration",
    title: "Headlight Restoration",
    short: "Yellowed, hazy headlights restored to clear — for better looks and better night visibility.",
    image: IMG.headlight,
    priceFrom: null,
    priceNote: "Add-on · ask for pricing",
    intro: "Cloudy headlights age a car instantly. Restoration brings the clarity back.",
    body: [
      "Oxidised, yellowed headlight lenses are sanded and polished back to clarity, improving both the look of the car and the light output at night.",
    ],
    highlights: ["Removes yellowing & haze", "Improves light output", "Instantly freshens the car's look"],
    includes: ["Lens cleaning & masking", "Wet sanding", "Machine polishing"],
    options: [{ name: "Headlight restoration", detail: "Available as an add-on to any package" }],
    limitations: ["Cracks or moisture inside the headlight unit cannot be fixed by restoration."],
    vehicles: "Cars",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
