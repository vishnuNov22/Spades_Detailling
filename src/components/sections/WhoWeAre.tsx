import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, MaskLines } from "@/components/animations/Reveal";
import { BUSINESS } from "@/config/business";

export function WhoWeAre() {
  return (
    <section aria-labelledby="who-title" className="light section rounded-t-[40px] sm:rounded-t-[56px]">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <span className="kicker">Who we are</span>
          <h2 id="who-title" className="h-section mt-5"><MaskLines lines={["Detailing built on", "care and precision."]} /></h2>
          <Reveal delay={0.1}>
            <p className="lead mt-8">
              {BUSINESS.name} — The Detailing Xperts is a car and bike detailing studio in {BUSINESS.address.locality}, {BUSINESS.address.district}.
              Inside our black-walled, hexagon-lit bay, every vehicle gets the same treatment: inspected under proper light, cleaned safely and finished by hand.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-mute">
              Our motto is simple — from dust to dazzle. Whether it&apos;s a ₹149 bike wash or a ceramic coating, we take the time to do it right, and we&apos;ll even pick your vehicle up and drop it back.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-2 text-sm">
              {["Cars & bikes", "Free pick-up & drop", "Hexagon-lit studio", "3M underbody coating"].map((f) => (
                <li key={f} className="rounded-2xl border border-line bg-char px-4 py-4 font-medium text-fg">{f}</li>
              ))}
            </ul>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg underline decoration-accent decoration-2 underline-offset-4 transition hover:gap-3">More about {BUSINESS.name} <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
        <Reveal y={50} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl">
            <Image src="/images/about/studio.jpg" alt={`The ${BUSINESS.name} studio in ${BUSINESS.address.locality}, with a white hatchback in the bay`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-[11px] font-semibold uppercase tracking-kicker text-white/80">Our studio · {BUSINESS.address.locality}</p>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-60 overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:block">
            <Image src="/images/gallery/studio-hex-lights.jpg" alt="Hexagon LED lights inside the SPADES bay" width={1444} height={564} className="h-auto w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
