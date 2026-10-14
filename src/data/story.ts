import { IMG } from "@/data/images";
import type { Scene } from "@/components/animations/ScrollStory";

/** Scroll-story scenes. Swap images for the client's own process photos (same paths) when available. */
export const STORY: Scene[] = [
  { image: IMG.grille, alt: "Close-up of a car's front grille under studio light", kicker: "01 · Inspection", title: "Every surface tells a story.", body: "Under our hexagon lights, swirls, water marks and dull spots have nowhere to hide. We start by looking — properly." },
  { image: IMG.polisherClose, alt: "Machine polishing reflections on dark paint", kicker: "02 · Refinement", title: "Refined with precision.", body: "Clay decontamination, machine compounding and polishing level the surface and bring the depth back." },
  { image: IMG.beadingDark, alt: "Water beading on glossy dark paint", kicker: "03 · Protection", title: "Protection that goes further.", body: "Ceramic wax, ceramic or graphene coating, and 3M underbody coating — chosen for how you use your vehicle." },
  { image: IMG.hero, alt: "A glossy freshly detailed car in a bright studio", kicker: "04 · Reveal", title: "The finish speaks for itself.", body: "From dust to dazzle. Collect it from the studio — or we'll drop it back to you." },
];
