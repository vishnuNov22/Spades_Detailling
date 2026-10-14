"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

export type Scene = { image: string; alt: string; kicker: string; title: string; body: string };

function SceneLayer({ s, i, n, p }: { s: Scene; i: number; n: number; p: MotionValue<number> }) {
  const a = i / n, b = (i + 1) / n, f = 0.06;
  const opacity = useTransform(p, i === 0 ? [0, b - f, b] : i === n - 1 ? [a - f, a, 1] : [a - f, a, b - f, b], i === 0 ? [1, 1, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 1, 0]);
  const scale = useTransform(p, [a - f, b], [1.18, 1]);
  const ty = useTransform(p, [a - f, a + f, b - f, b], [40, 0, 0, -40]);
  const tOpacity = useTransform(p, i === n - 1 ? [a, a + f] : [a, a + f, b - f * 1.5, b - f * 0.5], i === n - 1 ? [0, 1] : [0, 1, 1, 0]);
  return (
    <>
      <motion.div className="absolute inset-0" style={{ opacity }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={s.image} alt={s.alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-0 z-10 pb-20 sm:pb-24" style={{ opacity: tOpacity, y: ty }}>
        <div className="wrap">
          <span className="kicker">{s.kicker}</span>
          <h3 className="mt-5 max-w-4xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.6rem]">{s.title}</h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-silver/85 sm:text-base">{s.body}</p>
        </div>
      </motion.div>
    </>
  );
}

/** Pinned, scroll-driven 4-scene story. Short pin (≈ 75vh scroll per scene) so it never traps the visitor. */
export function ScrollStory({ scenes }: { scenes: Scene[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section className="section">
        <div className="wrap grid gap-16">
          {scenes.map((s) => (
            <div key={s.title} className="grid items-center gap-8 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl"><Image src={s.image} alt={s.alt} fill sizes="50vw" className="object-cover" /></div>
              <div><span className="kicker">{s.kicker}</span><h3 className="h-section mt-4">{s.title}</h3><p className="lead mt-4">{s.body}</p></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="The SPADES process, scene by scene" className="relative" style={{ height: `${scenes.length * 75 + 25}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        {scenes.map((s, i) => <SceneLayer key={s.title} s={s} i={i} n={scenes.length} p={scrollYProgress} />)}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20" />
                <div className="absolute inset-x-0 top-24 z-10">
          <div className="wrap flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-mute">The process</span>
            <span className="relative h-px flex-1 bg-white/15"><motion.span className="absolute inset-y-0 left-0 bg-accent" style={{ width: bar }} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
