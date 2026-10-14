import Image from "next/image";
import type { ReactNode } from "react";
import { MaskLines } from "@/components/animations/Reveal";

/** Bright photo header in an inset rounded frame, used on inner pages. */
export function PageHeader({ kicker, lines, intro, image, alt = "", children }: {
  kicker: string; lines: string[]; intro?: ReactNode; image: string; alt?: string; children?: ReactNode;
}) {
  return (
    <header className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative flex min-h-[78svh] items-end overflow-hidden rounded-[28px] pb-12 pt-36 sm:rounded-4xl sm:pb-16">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="wrap relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />{kicker}
          </span>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-[3rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-[6.5rem]"><MaskLines lines={lines} /></h1>
          {intro && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </header>
  );
}
