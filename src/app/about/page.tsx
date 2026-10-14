import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Reveal, MaskLines } from "@/components/animations/Reveal";
import { Process } from "@/components/sections/Process";
import { BookingSection } from "@/components/booking/BookingSection";
import { BUSINESS, fullAddress } from "@/config/business";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description: `${BUSINESS.fullName} is a car and bike detailing studio in Anducode, Kanyakumari — precise, careful detailing with free pick-up & drop.`,
  alternates: { canonical: "/about" },
};

const VALUES = [
  { t: "Precision", b: "We inspect under proper light, choose the right product and pad, and never rush a step to save time." },
  { t: "Care", b: "Your car or bike is treated like our own — safe wash methods, careful masking, clean handover." },
  { t: "Honesty", b: "Clear starting prices, and if a scratch can't be polished out safely, we'll tell you before we start." },
  { t: "Convenience", b: "Free pick-up & drop, and enquiries answered on WhatsApp so booking takes minutes." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader kicker="About SPADES" lines={["The Detailing", "Xperts."]} image="/images/about/studio.jpg"
        alt="The SPADES studio in Anducode" intro={BUSINESS.tagline}>
        <PrimaryButton href="#book">Book a detail</PrimaryButton>
      </PageHeader>

      <section className="section pt-12">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="kicker">Our approach</span>
            <h2 className="h-section mt-5"><MaskLines lines={["A black shed.", "A lot of light.", "Zero shortcuts."]} /></h2>
          </div>
          <Reveal>
            <p className="lead">
              {BUSINESS.name} works out of a purpose-built detailing bay in {BUSINESS.address.locality}: black corrugated walls, hexagon LED ceiling lights and diagonal light strips that show every swirl and water mark on the paint.
            </p>
            <p className="mt-5 text-silver/80">
              We detail cars and bikes — from a quick foam wash to machine polishing, ceramic wax, ceramic &amp; graphene coatings and 3M underbody coating. Every job follows the same disciplined process, scaled to what the vehicle actually needs.
            </p>
            <p className="mt-5 text-silver/80">Find us {fullAddress()}. Prefer not to drive over? Free pick-up &amp; drop is available.</p>
          </Reveal>
        </div>

        <div className="wrap mt-20 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative aspect-[16/7] overflow-hidden rounded-4xl border border-white/10 md:aspect-auto md:min-h-[360px]">
            <Image src="/images/gallery/studio-hex-lights.jpg" alt="Hexagon LED lights and the SPADES emblem inside the studio" fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[16/7] overflow-hidden rounded-4xl border border-white/10 md:aspect-auto md:min-h-[360px]">
            <Image src="/images/gallery/studio-led-bay.jpg" alt="Diagonal LED light strips on the black walls of the detailing bay" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/10" aria-labelledby="values-title">
        <div className="wrap">
          <span className="kicker">What we stand for</span>
          <h2 id="values-title" className="h-section mt-5">How we treat every vehicle.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06} className="bg-onyx p-8">
                <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-medium">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{v.b}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-mute">Services: {SERVICES.map((s) => s.title).join(" · ")}.</p>
        </div>
      </section>

      <Process />
      <BookingSection />
    </>
  );
}
