/**
 * Gallery images. `real: true` = genuine SPADES photos (from the client's signboard photo and studio reels).
 * Add the client's own work photos to /public/images/gallery/ and list them here — only real work belongs in the gallery.
 */
export type GalleryCategory = "Studio" | "Exterior" | "Interior" | "Paint correction" | "Ceramic coating" | "Completed vehicles";

export type GalleryItem = { src: string; alt: string; category: GalleryCategory; w: number; h: number; real: boolean };

export const GALLERY: GalleryItem[] = [
  { src: "/images/gallery/studio-exterior.jpg", alt: "The SPADES detailing studio in Anducode with a freshly detailed white hatchback", category: "Studio", w: 1080, h: 1344, real: true },
  { src: "/images/gallery/studio-hex-lights.jpg", alt: "Hexagonal LED ceiling lights and the SPADES emblem inside the detailing bay", category: "Studio", w: 1444, h: 564, real: true },
  { src: "/images/gallery/studio-led-bay.jpg", alt: "Detailing bay with hexagon and diagonal LED lighting on black walls", category: "Studio", w: 1200, h: 452, real: true },
];

export const galleryCategories = () => Array.from(new Set(GALLERY.map((g) => g.category)));
