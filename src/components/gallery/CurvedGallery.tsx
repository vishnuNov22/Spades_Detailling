"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MaskLines } from "@/components/animations/Reveal";

export type CurvedItem = { src: string; alt: string; label: string };

/**
 * Concave 3D image arc (reference: "See the Transformation").
 * Scroll rotates the arc; it can also be dragged. Falls back to a simple swipe row under reduced motion.
 */
export function CurvedGallery({ items, kicker, title }: { items: CurvedItem[]; kicker: string; title: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    on(); window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const cardW = Math.max(190, Math.min(340, vw * 0.23));
  const cardH = cardW * 1.32;
  const R = cardW * 2.35;
  const step = ((cardW * 1.12) / R) * (180 / Math.PI);
  const span = step * (items.length - 1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrollRot = useTransform(scrollYProgress, [0, 1], [span / 2 - step * 0.5, -span / 2 + step * 0.5]);
  const drag = useMotionValue(0);
  const rot = useTransform(() => scrollRot.get() + drag.get());
  const transform = useMotionTemplate`translateZ(${R * 0.84}px) rotateY(${rot}deg)`;

  const start = useRef<{ x: number; d: number } | null>(null);
  const onDown = (e: RPointerEvent) => { start.current = { x: e.clientX, d: drag.get() }; (e.target as Element).setPointerCapture?.(e.pointerId); };
  const onMove = (e: RPointerEvent) => { if (start.current) drag.set(start.current.d + (e.clientX - start.current.x) * 0.12); };
  const onUp = () => { start.current = null; };

  const Heading = (
    <div className="wrap text-center">
      <span className="kicker">{kicker}</span>
      <h2 className="h-section mt-4"><MaskLines lines={title} /></h2>
    </div>
  );

  if (reduce) {
    return (
      <section className="section">
        {Heading}
        <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto px-5 pb-4">
          {items.map((it) => (
            <figure key={it.src} className="relative h-[380px] w-[280px] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10">
              <Image src={it.src} alt={it.alt} fill sizes="280px" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink p-4 text-sm text-white">{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={title.join(" ")} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28">
        {Heading}
        <div className="relative mt-4 flex-1 cursor-grab touch-pan-y select-none active:cursor-grabbing"
          style={{ perspective: "1000px" }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          <motion.div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d", transform }}>
            {items.map((it, i) => {
              const a = i * step - span / 2;
              return (
                <figure key={it.src} className="absolute overflow-hidden rounded-3xl border border-white/15 bg-char shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]"
                  style={{ width: cardW, height: cardH, left: -cardW / 2, top: -cardH / 2, transform: `rotateY(${a}deg) translateZ(${-R}px)`, backfaceVisibility: "hidden" }}>
                  <Image src={it.src} alt={it.alt} fill sizes={`${Math.round(cardW)}px`} className="pointer-events-none object-cover" draggable={false} />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {it.label}
                  </figcaption>
                </figure>
              );
            })}
          </motion.div>
        </div>
        <p className="pb-8 text-center text-[11px] font-semibold uppercase tracking-kicker text-mute">Scroll or drag</p>
      </div>
    </section>
  );
}
