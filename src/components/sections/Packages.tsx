"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADD_ONS, PACKAGES, STARTING_FROM, VEHICLE_TYPES, type VehicleType } from "@/data/packages";
import { inr } from "@/lib/utils";
import { IMG } from "@/data/images";
import { serviceMessage, waLink } from "@/lib/whatsapp";

const IMAGES: Record<string, string> = { refresh: IMG.foamWash2, rejuvenate: IMG.polishing };

export function Packages() {
  const [v, setV] = useState<VehicleType>("Hatchback");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <section id="packages" aria-labelledby="packages-title" className="section scroll-mt-20 border-t border-white/10">
      <div className="wrap">
        <SectionHeading id="packages-title" kicker="Packages" lines={["Simple pricing.", "Serious results."]}
          aside="Fixed inclusions, honest starting prices. Prices vary by vehicle type — if your car needs more than the package covers, we'll tell you before we start." />

        <div role="radiogroup" aria-label="Vehicle type" className="mt-12 inline-flex rounded-full border border-white/15 bg-char p-1">
          {VEHICLE_TYPES.map((t) => (
            <button key={t} role="radio" aria-checked={v === t} onClick={() => setV(t)}
              className={`h-10 rounded-full px-4 text-sm font-semibold transition sm:px-6 ${v === t ? "bg-accent text-ink" : "text-silver hover:text-white"}`}>{t}</button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PACKAGES.map((p, i) => {
            const items = open[p.id] ? p.items : p.items.slice(0, 6);
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <article className={`flex h-full flex-col overflow-hidden rounded-4xl border bg-char ${p.featured ? "border-accent/70 shadow-[0_30px_80px_-40px_rgba(245,228,0,.45)]" : "border-white/10"}`}>
                  <div className="relative h-52 overflow-hidden">
                    <Image src={IMAGES[p.id]} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-char to-transparent" />
                    {p.featured && <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">Most complete</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-medium">{p.name} Package</h3>
                    <p className="mt-1 text-sm text-mute">{p.tagline}</p>
                    <p className="mt-6 font-display text-4xl font-medium text-accent">{inr(p.prices[v])}<span className="ml-2 text-sm font-normal text-mute">/ {v.toLowerCase()}</span></p>
                    {p.includesNote && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">{p.includesNote}</p>}
                    <ul className="mt-4 grid gap-2.5 text-sm">
                      {items.map((it) => <li key={it} className="flex gap-3 text-silver"><span className="mt-2 h-px w-3 shrink-0 bg-accent" />{it}</li>)}
                    </ul>
                    {p.items.length > 6 && (
                      <button onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))} aria-expanded={!!open[p.id]}
                        className="mt-4 self-start text-xs font-semibold text-white underline-offset-4 hover:underline">
                        {open[p.id] ? "Show less" : `+ ${p.items.length - 6} more inclusions`}
                      </button>
                    )}
                    <a href={waLink(serviceMessage(`the ${p.name} package`, v.toLowerCase()))} target="_blank" rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent transition hover:gap-3">
                      Enquire about {p.name} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={0.16}>
            <article className="flex h-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-char">
              <div className="relative h-52 overflow-hidden">
                <Image src={IMG.beading} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-char to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-medium">Protection &amp; specialist</h3>
                <p className="mt-1 text-sm text-mute">Starting prices — final quote after inspection</p>
                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {STARTING_FROM.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center justify-between py-3.5 text-sm text-silver transition hover:text-white">
                        <span>{s.label}</span><span className="font-display text-base text-white">from {inr(s.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">Add-ons</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ADD_ONS.map((a) => <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1.5 text-xs text-silver"><Plus className="h-3 w-3 text-accent" />{a}</li>)}
                </ul>
                <Link href="/services" className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent transition hover:gap-3">All services <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          </Reveal>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-mute"><Check className="h-3.5 w-3.5 text-accent" /> Free pick-up &amp; drop available. Prices as published by SPADES; confirm current rates when you enquire.</p>
      </div>
    </section>
  );
}
