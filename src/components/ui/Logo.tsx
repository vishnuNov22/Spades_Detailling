import Image from "next/image";
import Link from "next/link";
import { BUSINESS, MEDIA } from "@/config/business";

export function Logo({ className = "h-9 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${BUSINESS.fullName} — home`} className="inline-flex shrink-0 items-center">
      <Image src={MEDIA.logo.src} alt={BUSINESS.fullName} width={MEDIA.logo.width} height={MEDIA.logo.height} className={className} priority={priority} />
    </Link>
  );
}
