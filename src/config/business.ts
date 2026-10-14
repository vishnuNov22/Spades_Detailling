/**
 * SINGLE SOURCE OF TRUTH for business details.
 * Everything below was taken from the client's own Instagram posts and signboard.
 * Values marked TODO are unknown — fill them in before launch (empty values are hidden on the site).
 */
export const BUSINESS = {
  name: "SPADES",
  fullName: "SPADES — The Detailing Xperts",
  legalName: "SPADES The Detailing Xperts",
  tagline: "From dust to dazzle — we bring your ride back to life.",
  description:
    "Car and bike detailing studio in Anducode, Kanyakumari. Foam wash, interior detailing, machine polishing, ceramic wax, ceramic & graphene coating, 3M underbody coating and headlight restoration — with free pick-up & drop.",

  /** Calls (tel: links). First number is the primary one. */
  phones: ["+916374465349", "+918248318912"],
  /** WhatsApp number in international format without "+" or spaces. TODO: confirm which number has WhatsApp. */
  whatsapp: "916374465349",
  /** TODO: add the business email. Leave "" to hide email links. */
  email: "",

  address: {
    line1: "Near Co-operative Society",
    locality: "Anducode",
    district: "Kanyakumari",
    region: "Tamil Nadu",
    postalCode: "629168",
    country: "IN",
  },
  /** Used for the Google Maps embed and "Get directions" link. */
  mapQuery: "SPADES The Detailing Xperts, Anducode, Kanyakumari 629168",

  /** TODO: add real opening hours, e.g. [{ days: "Mon – Sat", time: "9:00 AM – 7:00 PM" }]. Empty = "Call to confirm". */
  hours: [] as { days: string; time: string }[],

  social: {
    instagram: "https://www.instagram.com/spades_thedetailingxperts/",
    instagramHandle: "@spades_thedetailingxperts",
  },

  /** Confirmed in the client's posts. */
  perks: ["Free pick-up & drop available", "Cars & bikes", "Prices vary by vehicle type"],

  /** TODO: set to the live domain once deployed (used for SEO metadata). */
  siteUrl: "https://spades-detailing.vercel.app",
} as const;

export const MEDIA = {
  /** Logo (transparent PNG, for dark backgrounds). Replace with the original logo file when available. */
  logo: { src: "/images/logo/spades-logo.png", width: 935, height: 365 },
  /**
   * Hero media. Drop a short silent loop at /public/videos/hero.mp4 (and optionally hero.webm) and set
   * `video` to "/videos/hero.mp4". Until then the real studio photo below is shown with a cinematic grade.
   */
  hero: {
    video: "" as string,
    videoWebm: "" as string,
    poster: "/images/hero/hero.jpg",
  },
} as const;

export const fullAddress = (sep = ", ") =>
  [BUSINESS.address.line1, BUSINESS.address.locality, `${BUSINESS.address.district} ${BUSINESS.address.postalCode}`].join(sep);
