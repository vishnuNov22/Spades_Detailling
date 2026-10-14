import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { DEFAULT_MESSAGE, telLink, waLink } from "@/lib/whatsapp";

/** Sticky one-tap actions on phones. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-white/10 bg-white/10 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={telLink()} className="flex h-14 items-center justify-center gap-2 bg-ink/90 text-sm font-semibold text-white"><Phone className="h-4 w-4 text-accent" /> Call</a>
      <a href={waLink(DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-2 bg-ink/90 text-sm font-semibold text-white"><WhatsAppIcon className="h-4 w-4 text-accent" /> WhatsApp</a>
      <Link href="/contact#book" className="flex h-14 items-center justify-center bg-accent text-sm font-bold text-ink">Book Now</Link>
    </div>
  );
}
