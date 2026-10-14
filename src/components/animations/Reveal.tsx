"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Fade-and-rise on first view. Disabled transforms under prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 28, className }: {
  children: ReactNode; delay?: number; y?: number; className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line masked text reveal for headlines. */
export function MaskLines({ lines, className, lineClassName, delay = 0, accentDot = true }: {
  lines: string[]; className?: string; lineClassName?: string; delay?: number; accentDot?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {accentDot && i === lines.length - 1 && l.endsWith(".") ? (
              <>{l.slice(0, -1)}<span className="text-accent">.</span></>
            ) : l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
