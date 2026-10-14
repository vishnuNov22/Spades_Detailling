import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; className?: string; external?: boolean };

/** Yellow CTA with the dark arrow tile (reference: "Book Your Detail ↗"). */
export function PrimaryButton({ href, children, className = "", external }: Props) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden><ArrowUpRight className="h-4 w-4" /></span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn-primary ${className}`}>{inner}</a>
  ) : (
    <Link href={href} className={`btn-primary ${className}`}>{inner}</Link>
  );
}

export function GhostButton({ href, children, className = "", external }: Props) {
  return external || href.startsWith("tel:") || href.startsWith("mailto:") ? (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`btn-ghost ${className}`}>{children}</a>
  ) : (
    <Link href={href} className={`btn-ghost ${className}`}>{children}</Link>
  );
}
