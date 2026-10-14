import Image from "next/image";
import { Instagram } from "lucide-react";
import { MaskLines } from "@/components/animations/Reveal";
import { BUSINESS } from "@/config/business";
import { IMG } from "@/data/images";

/** Honest social proof: points to the real Instagram feed instead of invented reviews. */
export function InstagramCTA() {
  return (
    <section aria-labelledby="ig-title" className="px-2 sm:px-3">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-4xl">
      <Image src={IMG.splash} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="wrap relative flex flex-col gap-8 py-24 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Results</span>
          <h2 id="ig-title" className="h-section mt-5 !text-white"><MaskLines lines={["The paintwork", "does the talking."]} /></h2>
          <p className="mt-6 max-w-lg text-lg text-white/85">See our latest foam washes, polishing, ceramic and underbody work — posted straight from the studio.</p>
        </div>
        <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary self-start lg:self-auto">
          <span className="inline-flex items-center gap-2"><Instagram className="h-4 w-4" /> {BUSINESS.social.instagramHandle}</span>
          <span className="btn-arrow">↗</span>
        </a>
      </div>
      </div>
    </section>
  );
}
