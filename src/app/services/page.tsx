import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { IMG } from "@/data/images";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Reveal } from "@/components/animations/Reveal";
import { Packages } from "@/components/sections/Packages";
import { BookingSection } from "@/components/booking/BookingSection";
import { SERVICES } from "@/data/services";
import { serviceMessage, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Foam wash, interior detailing, polishing & paint correction, ceramic wax, ceramic & graphene coating, 3M underbody coating and headlight restoration in Anducode, Kanyakumari.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader kicker="Services" lines={["Every service,", "done properly."]} image={IMG.heroAlt}
        intro="Seven services, two complete packages and free pick-up & drop. Only what we actually offer — and what each one can and can't do.">
        <PrimaryButton href="#book">Book a detail</PrimaryButton>
      </PageHeader>

      <section className="section pt-12" aria-label="All services">
        <div className="wrap grid gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <article className={`grid overflow-hidden rounded-4xl border border-white/10 bg-char lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Link href={`/services/${s.slug}`} className="group relative block min-h-[300px] overflow-hidden lg:min-h-[440px]">
                  <Image src={s.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-[1.4s] ease-lux group-hover:scale-105" />
                  <span className="absolute left-6 top-6 font-display text-sm text-white/70">{String(i + 1).padStart(2, "0")}</span>
                </Link>
                <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                  <p className="text-xs font-semibold uppercase tracking-kicker text-accent">{s.priceNote}</p>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 text-silver/85">{s.intro}</p>
                  <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                    {s.highlights.map((h) => <li key={h} className="flex gap-3 text-silver"><span className="mt-2 h-px w-3 shrink-0 bg-accent" />{h}</li>)}
                  </ul>
                  <p className="mt-6 text-xs text-mute">For: {s.vehicles}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <Link href={`/services/${s.slug}`} className="btn-ghost">Details <ArrowRight className="h-4 w-4" /></Link>
                    <a href={waLink(serviceMessage(s.title.toLowerCase()))} target="_blank" rel="noopener noreferrer" className="btn-ghost !border-accent/50 !text-accent hover:!bg-accent/10">Enquire on WhatsApp</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Packages />
      <BookingSection />
    </>
  );
}
