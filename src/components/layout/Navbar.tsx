"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BUSINESS } from "@/config/business";
import { fmtPhone, telLink } from "@/lib/whatsapp";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Floating glass pill navigation with a sliding active indicator. */
export function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };
    if (open) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const current = NAV.find((n) => active(n.href))?.href ?? null;
  const pill = hover ?? current;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className={`mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-all duration-500 ease-lux sm:pl-6 ${scrolled ? "border-white/10 bg-ink/75 shadow-[0_20px_50px_-20px_rgba(0,0,0,.7)] backdrop-blur-2xl" : "border-white/15 bg-black/25 backdrop-blur-xl"}`}>
          <Logo className="h-8 w-auto" priority />

          <nav aria-label="Main" className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} onMouseEnter={() => setHover(n.href)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active(n.href) || hover === n.href ? "text-white" : "text-white/70"}`}>
                {pill === n.href && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.12]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{n.label}</span>
                {active(n.href) && <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={telLink()} aria-label={`Call ${fmtPhone(BUSINESS.phones[0])}`}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:flex">
              <Phone className="h-4 w-4" />
            </a>
            <Link href="/contact#book" className="btn-primary hidden h-12 sm:inline-flex">
              <span>Book a detail</span><span className="btn-arrow" aria-hidden><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
            <button ref={btnRef} onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex h-[88px] items-center justify-between px-6">
              <Logo className="h-8 w-auto" />
              <button autoFocus onClick={() => setOpen(false)} aria-label="Close menu"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col px-6">
              {NAV.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={n.href} aria-current={active(n.href) ? "page" : undefined}
                    className={`flex items-center justify-between py-3 font-display text-5xl font-semibold tracking-[-0.04em] ${active(n.href) ? "text-accent" : "text-white"}`}>
                    {n.label}<ArrowUpRight className="h-6 w-6 opacity-40" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto grid gap-3 pb-10 pt-8">
                <Link href="/contact#book" className="btn-primary w-full justify-between pl-6"><span>Book a detail</span><span className="btn-arrow"><ArrowUpRight className="h-4 w-4" /></span></Link>
                <a href={telLink()} className="btn-glass w-full"><Phone className="h-4 w-4" /> {fmtPhone(BUSINESS.phones[0])}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
