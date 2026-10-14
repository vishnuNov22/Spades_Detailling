import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BUSINESS, fullAddress } from "@/config/business";
import { SERVICES } from "@/data/services";
import { DEFAULT_MESSAGE, fmtPhone, mailLink, telLink, waLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-ink pb-28 pt-20 lg:pb-12">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo className="h-12 w-auto" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mute">{BUSINESS.tagline}</p>
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-silver transition hover:text-accent">
              <Instagram className="h-4 w-4" /> {BUSINESS.social.instagramHandle}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-kicker text-mute">Services</h3>
            <ul className="mt-5 grid gap-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-silver transition hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-kicker text-mute">Studio</h3>
            <ul className="mt-5 grid gap-4 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">{fullAddress()}</a></li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {BUSINESS.hours.length ? (
                  <span>{BUSINESS.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>)}</span>
                ) : <span>Call to confirm today&apos;s timings</span>}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-kicker text-mute">Contact</h3>
            <ul className="mt-5 grid gap-3 text-sm">
              {BUSINESS.phones.map((p) => (
                <li key={p}><a href={telLink(p)} className="inline-flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-accent" /> {fmtPhone(p)}</a></li>
              ))}
              <li><a href={waLink(DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white"><WhatsAppIcon className="h-4 w-4 text-accent" /> WhatsApp us</a></li>
              {BUSINESS.email && <li><a href={mailLink()} className="inline-flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-accent" /> {BUSINESS.email}</a></li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {BUSINESS.legalName}. All rights reserved.</p>
          <p>Prices are starting prices and vary by vehicle type. Enquiries open WhatsApp — nothing is stored on this website.</p>
        </div>
      </div>
    </footer>
  );
}
