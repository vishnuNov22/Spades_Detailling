"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BUSINESS, MEDIA } from "@/config/business";
import { IMG } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;

export const STATS = [
  { v: "Free", l: "Pick-up & drop" },
  { v: "Cars & bikes", l: "One studio" },
  { v: "₹149", l: "Bike wash from" },
  { v: "3M", l: "Underbody coating" },
];

/** Bright, full-bleed hero in an inset rounded frame (2025-style). Optional background video via MEDIA.hero.video. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const video = MEDIA.hero.video;

  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, delay: d, ease: EASE } });

  return (
    <section ref={ref} id="top" aria-label={`${BUSINESS.name} — ${BUSINESS.tagline}`} className="relative px-2 pt-2 sm:px-3 sm:pt-3">
      <motion.div style={reduce ? undefined : { scale: frameScale }} className="relative h-[calc(100svh-16px)] min-h-[620px] origin-top overflow-hidden rounded-[28px] bg-ink sm:h-[calc(100svh-24px)] sm:rounded-4xl">
        <motion.div className="absolute inset-0"
          initial={reduce ? false : { clipPath: "inset(14% 12% 14% 12% round 32px)", scale: 1.18 }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}>
          <motion.div className="absolute inset-[-10%_0_0_0]" style={reduce ? undefined : { y: imgY }}>
            {video ? (
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={IMG.hero}>
                {MEDIA.hero.videoWebm && <source src={MEDIA.hero.videoWebm} type="video/webm" />}
                <source src={video} type="video/mp4" />
              </video>
            ) : (
              <Image src={IMG.hero} alt="A glossy, freshly detailed red car in a bright detailing studio" fill priority sizes="100vw" className="object-cover object-[60%_50%]" />
            )}
          </motion.div>
        </motion.div>

        {/* soft legibility gradients — the photo stays bright */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

        <motion.div style={reduce ? undefined : { y: contentY }} className="absolute inset-x-0 bottom-0 p-5 pb-8 sm:p-10 lg:p-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <motion.p {...rise(0.7)} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Car &amp; bike detailing · {BUSINESS.address.locality}, {BUSINESS.address.district}
              </motion.p>
              <h1 className="mt-5 font-display text-[3.4rem] font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-8xl lg:text-[8.5rem]">
                <span className="block overflow-hidden pb-2"><motion.span className="block" {...(reduce ? {} : { initial: { y: "105%" }, animate: { y: "0%" }, transition: { duration: 1.1, delay: 0.85, ease: EASE } })}>From dust</motion.span></span>
                <span className="block overflow-hidden pb-2"><motion.span className="block" {...(reduce ? {} : { initial: { y: "105%" }, animate: { y: "0%" }, transition: { duration: 1.1, delay: 0.97, ease: EASE } })}>to dazzle<span className="text-accent">.</span></motion.span></span>
              </h1>
              <motion.p {...rise(1.15)} className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
                Foam wash, machine polishing, ceramic protection and 3M underbody coating — done with care in our hexagon-lit studio.
              </motion.p>
              <motion.div {...rise(1.3)} className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact#book" className="btn-primary"><span>Book your detail</span><span className="btn-arrow"><ArrowUpRight className="h-4 w-4" /></span></Link>
                <Link href="/#packages" className="btn-glass">View packages</Link>
              </motion.div>
            </div>

            <motion.div {...rise(1.45)} className="hidden w-[340px] shrink-0 rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl lg:block">
              <div className="flex -space-x-3">
                {[IMG.foamWash, IMG.polishing, IMG.beading, IMG.interior].map((s) => (
                  <span key={s} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/80">
                    <Image src={s} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="mt-4 font-display text-xl font-semibold tracking-tight">7 detailing services</p>
              <p className="mt-1 text-sm text-white/75">From a ₹149 bike wash to ceramic coating.</p>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15">
                {STATS.map((s) => (
                  <div key={s.l} className="bg-black/20 px-3 py-3">
                    <dt className="sr-only">{s.l}</dt>
                    <dd className="font-display text-lg font-semibold">{s.v}</dd>
                    <dd className="text-[11px] text-white/70">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Yellow service ticker under the hero. */
export function ServiceMarquee() {
  const items = ["Foam wash", "Interior detailing", "Machine polishing", "Ceramic wax", "Ceramic & graphene coating", "3M underbody coating", "Headlight restoration", "Free pick-up & drop"];
  return (
    <div className="relative mx-2 mt-2 overflow-hidden rounded-full bg-accent py-4 text-ink sm:mx-3" aria-label="Services">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-lg font-semibold tracking-tight">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10" aria-hidden={i >= items.length}>{t}<span className="h-2 w-2 rounded-full bg-ink" /></span>
        ))}
      </div>
    </div>
  );
}
