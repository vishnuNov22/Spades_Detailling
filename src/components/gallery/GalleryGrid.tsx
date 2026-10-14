"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";

/** Editorial masonry grid with category filters and a keyboard-friendly full-screen viewer. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat);

  const close = useCallback(() => setIdx(null), []);
  const move = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [idx, close, move]);

  return (
    <>
      {cats.length > 2 && (
        <div role="tablist" aria-label="Filter gallery" className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`chip ${cat === c ? "!border-accent !text-accent" : ""}`}>{c}</button>
          ))}
        </div>
      )}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {shown.map((it, i) => (
          <button key={it.src} onClick={() => setIdx(i)} className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10" aria-label={`Open image: ${it.alt}`}>
            <Image src={it.src} alt={it.alt} width={it.w} height={it.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition duration-1000 ease-lux group-hover:scale-[1.04]" />
            <span className="absolute bottom-3 left-3 rounded bg-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">{it.category}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {idx !== null && shown[idx] && (
          <motion.div role="dialog" aria-modal="true" aria-label={shown[idx].alt} className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <div className="relative h-full max-h-[86vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image src={shown[idx].src} alt={shown[idx].alt} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 text-center text-sm text-silver">{shown[idx].alt}</p>
            <button autoFocus onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white"><X className="h-5 w-5" /></button>
            {shown.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous image" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-ink/60 text-white"><ChevronLeft className="h-5 w-5" /></button>
                <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next image" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-ink/60 text-white"><ChevronRight className="h-5 w-5" /></button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
