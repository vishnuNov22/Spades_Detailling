import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/services";

// Bento rhythm on desktop (12 cols): big feature + tall + 3 + 2
const LAYOUT = [
  "lg:col-span-7 lg:row-span-2 min-h-[460px] lg:min-h-[640px]",
  "lg:col-span-5 min-h-[300px]",
  "lg:col-span-5 min-h-[300px]",
  "lg:col-span-4 min-h-[340px]",
  "lg:col-span-4 min-h-[340px]",
  "lg:col-span-4 min-h-[340px]",
  "lg:col-span-12 min-h-[300px] lg:min-h-[360px]",
];

export function ServiceShowcase() {
  return (
    <section id="services" aria-labelledby="services-title" className="light section rounded-t-[40px] sm:rounded-t-[56px]">
      <div className="wrap">
        <SectionHeading id="services-title" kicker="What we offer" lines={["Services built to make", "your ride shine."]}
          aside="From a quick foam wash to long-term ceramic protection — every service is done by hand and machine in our studio, for cars and bikes." />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.07} className={`${LAYOUT[i] ?? "lg:col-span-4 min-h-[340px]"} ${i === 0 || i === 6 ? "sm:col-span-2" : ""} flex`}>
              <Link href={`/services/${s.slug}`} className="group relative flex w-full flex-col justify-end overflow-hidden rounded-4xl p-6 sm:p-8">
                <Image src={s.image} alt={s.title} fill sizes={i === 0 || i === 6 ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 34vw, (min-width:640px) 50vw, 100vw"}
                  className="object-cover transition duration-[1.2s] ease-lux group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur sm:left-6 sm:top-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition duration-500 ease-lux group-hover:rotate-45 group-hover:bg-accent sm:right-6 sm:top-6">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div className="relative">
                  <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">{s.priceNote}</p>
                  <h3 className={`mt-3 font-display font-semibold tracking-[-0.03em] text-white ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{s.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{s.short}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
