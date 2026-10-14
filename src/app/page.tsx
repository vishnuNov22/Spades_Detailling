import { Hero, ServiceMarquee } from "@/components/hero/Hero";
import { ServiceShowcase } from "@/components/services/ServiceShowcase";
import { CurvedGallery } from "@/components/gallery/CurvedGallery";
import { ScrollStory } from "@/components/animations/ScrollStory";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { Packages } from "@/components/sections/Packages";
import { InstagramCTA } from "@/components/sections/InstagramCTA";
import { BookingSection } from "@/components/booking/BookingSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMG } from "@/data/images";
import { STORY } from "@/data/story";

const curved = [
  { src: IMG.splash, alt: "Rinse spray on a black car", label: "Rinse" },
  { src: IMG.foamRed, alt: "Red car covered in snow foam", label: "Snow foam" },
  { src: IMG.tyre, alt: "Gloved hand brushing a tyre", label: "Tyres" },
  { src: IMG.wheel, alt: "Wheel being washed", label: "Wheels" },
  { src: IMG.studio, alt: "The SPADES studio in Anducode", label: "SPADES studio" },
  { src: IMG.dashboard, alt: "Detailer cleaning a dashboard", label: "Interior" },
  { src: IMG.interiorDark, alt: "Black leather seats", label: "Leather" },
  { src: IMG.waxHand, alt: "Hand waxing a car bonnet", label: "Wax" },
  { src: IMG.studioHex, alt: "Hexagon lights inside the SPADES bay", label: "SPADES bay" },
  { src: IMG.heroAlt, alt: "White sports car in a studio", label: "Finish" },
  { src: IMG.redRear, alt: "Red sports car", label: "Gloss" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceMarquee />
      <div className="h-6" />
      <ServiceShowcase />
      <CurvedGallery items={curved} kicker="The craft" title={["Detailing, up close."]} />
      <ScrollStory scenes={STORY} />
      <WhoWeAre />
      <section aria-labelledby="ba-title" className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="ba-title" kicker="The difference" lines={["Drag to see", "what a detail does."]} />
          <BeforeAfter before={IMG.beadingDark} after={IMG.beadingDark} beforeFilter="grayscale(.7) contrast(.75) brightness(.95) blur(1.5px)"
            alt="paint surface before and after polishing and protection" illustration />
        </div>
      </section>
      <Process />
      <Packages />
      <InstagramCTA />
      <div className="h-2 sm:h-3" />
      <BookingSection />
    </>
  );
}
