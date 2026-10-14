import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton, GhostButton } from "@/components/ui/Buttons";
import { Reveal } from "@/components/animations/Reveal";
import { BookingSection } from "@/components/booking/BookingSection";
import { SERVICES, getService } from "@/data/services";
import { serviceMessage, waLink } from "@/lib/whatsapp";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} in Kanyakumari`,
    description: `${s.short} ${s.priceNote}. SPADES — The Detailing Xperts, Anducode.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [{ url: s.image }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = SERVICES.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHeader kicker={s.priceNote} lines={[s.title]} intro={s.intro} image={s.image}>
        <PrimaryButton href={waLink(serviceMessage(s.title.toLowerCase()))} external>Enquire on WhatsApp</PrimaryButton>
        <GhostButton href="#book">Book a slot</GhostButton>
      </PageHeader>

      <section className="section pt-12">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              {s.body.map((p) => <p key={p} className="lead">{p}</p>)}
              <h2 className="mt-14 font-display text-2xl font-medium">What&apos;s included</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.includes.map((it) => (
                  <li key={it} className="flex gap-3 rounded-3xl border border-white/10 bg-char px-4 py-3.5 text-sm text-silver"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{it}</li>
                ))}
              </ul>
              <h2 className="mt-14 font-display text-2xl font-medium">Good to know</h2>
              <ul className="mt-6 grid gap-3">
                {s.limitations.map((l) => <li key={l} className="flex gap-3 text-sm leading-relaxed text-mute"><Info className="mt-0.5 h-4 w-4 shrink-0 text-silver" />{l}</li>)}
              </ul>
            </Reveal>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card overflow-hidden">
              <div className="relative h-48"><Image src={s.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" /></div>
              <div className="p-7">
                <h2 className="text-xs font-semibold uppercase tracking-kicker text-mute">Options &amp; pricing</h2>
                <ul className="mt-4 divide-y divide-white/10">
                  {s.options.map((o) => (
                    <li key={o.name} className="py-4"><p className="font-display text-lg text-white">{o.name}</p><p className="mt-1 text-sm text-accent">{o.detail}</p></li>
                  ))}
                </ul>
                <div className="mt-4 grid gap-2.5">
                  {s.highlights.map((h) => <p key={h} className="flex gap-3 text-sm text-silver"><span className="mt-2 h-px w-3 shrink-0 bg-accent" />{h}</p>)}
                </div>
                <p className="mt-6 text-xs text-mute">Prices vary by vehicle type and condition. Free pick-up &amp; drop available.</p>
                <a href={waLink(serviceMessage(s.title.toLowerCase()))} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full justify-between pl-5">
                  <span>Get a quote</span><span className="btn-arrow">↗</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 py-20" aria-label="Other services">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium">Other services</h2>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">All services <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-4xl border border-white/10 p-6">
                <Image src={o.image} alt="" fill sizes="33vw" className="object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <p className="relative text-xs font-semibold uppercase tracking-kicker text-accent">{o.priceNote}</p>
                <h3 className="relative mt-2 font-display text-xl font-medium">{o.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingSection defaultService={s.title} title={["Book your", `${s.title.toLowerCase()}.`]} />
    </>
  );
}
