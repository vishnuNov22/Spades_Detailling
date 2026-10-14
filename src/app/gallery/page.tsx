import type { Metadata } from "next";
import { Instagram } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { IMG } from "@/data/images";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BookingSection } from "@/components/booking/BookingSection";
import { BUSINESS } from "@/config/business";
import { GALLERY } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Inside the SPADES detailing studio in Anducode, Kanyakumari — hexagon-lit bay, finished vehicles and our latest work.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader kicker="Gallery" lines={["Inside the studio."]} image={IMG.splash}
        intro="Real photos from the SPADES bay. Our newest work goes up on Instagram first." />
      <section className="section pt-12">
        <div className="wrap">
          <GalleryGrid items={GALLERY} />
          <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer"
            className="group mt-6 flex flex-col items-start justify-between gap-6 rounded-4xl border border-dashed border-white/20 p-8 transition hover:border-accent sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl font-medium text-white">More of our work lives on Instagram</p>
              <p className="mt-2 text-sm text-mute">Before &amp; afters, ceramic jobs and studio reels — {BUSINESS.social.instagramHandle}</p>
            </div>
            <span className="btn-primary"><span className="inline-flex items-center gap-2"><Instagram className="h-4 w-4" /> Follow</span><span className="btn-arrow">↗</span></span>
          </a>
        </div>
      </section>
      <BookingSection />
    </>
  );
}
