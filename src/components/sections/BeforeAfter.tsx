"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Draggable, keyboard-accessible comparison slider.
 * `illustration` = true shows an honest caption until the client's real before/after photos are added.
 */
export function BeforeAfter({ before, after, alt, illustration = false, beforeFilter }: { before: string; after: string; alt: string; illustration?: boolean; beforeFilter?: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromClientX = useCallback((x: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  }, []);

  return (
    <figure>
      <div ref={box} className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-4xl bg-char"
        onPointerDown={(e) => { dragging.current = true; (e.currentTarget as Element).setPointerCapture(e.pointerId); fromClientX(e.clientX); }}
        onPointerMove={(e) => dragging.current && fromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)} onPointerCancel={() => (dragging.current = false)}>
        <Image src={after} alt={`After: ${alt}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="pointer-events-none object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`Before: ${alt}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="pointer-events-none object-cover" draggable={false} style={beforeFilter ? { filter: beforeFilter } : undefined} />
          {beforeFilter && <div className="pointer-events-none absolute inset-0 bg-[#b9b4a3]/25 mix-blend-screen" />}
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">Before</span>
        <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink">After</span>
        <div className="absolute inset-y-0 w-px bg-white/90" style={{ left: `${pos}%` }}>
          <button type="button" role="slider" aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
              if (e.key === "Home") setPos(0);
              if (e.key === "End") setPos(100);
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-ink/70 text-white shadow-xl backdrop-blur">
            <MoveHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      {illustration && (
        <figcaption className="mt-3 text-xs text-mute">Illustration only — replace with SPADES&apos; own before &amp; after photos of the same panel (see README).</figcaption>
      )}
    </figure>
  );
}
