import type { Metadata } from "next";
import { Clock, Instagram, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { IMG } from "@/data/images";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BookingSection } from "@/components/booking/BookingSection";
import { BUSINESS, fullAddress } from "@/config/business";
import { DEFAULT_MESSAGE, fmtPhone, mailLink, telLink, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description: `Book car or bike detailing at ${BUSINESS.fullName}, ${fullAddress()}. Call, WhatsApp or send an enquiry.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`;
  return (
    <>
      <PageHeader kicker="Contact" lines={["Let's get your", "ride gleaming."]} image={IMG.foamWash}
        intro="Call, WhatsApp or send the enquiry below — we'll reply with a quote and free slots." />

      <section className="pb-8 pt-4" aria-label="Contact details">
        <div className="wrap grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <Phone className="h-5 w-5 text-accent" />
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-kicker text-mute">Call</h2>
            {BUSINESS.phones.map((p) => <a key={p} href={telLink(p)} className="mt-2 block font-display text-xl text-white hover:text-accent">{fmtPhone(p)}</a>)}
          </div>
          <a href={waLink(DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="card group p-6 transition hover:border-accent/60">
            <WhatsAppIcon className="h-5 w-5 text-accent" />
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-kicker text-mute">WhatsApp</h2>
            <p className="mt-2 font-display text-xl text-white group-hover:text-accent">Chat with us</p>
            <p className="mt-1 text-sm text-mute">Fastest way to get a quote</p>
          </a>
          <a href={maps} target="_blank" rel="noopener noreferrer" className="card group p-6 transition hover:border-accent/60">
            <MapPin className="h-5 w-5 text-accent" />
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-kicker text-mute">Studio</h2>
            <p className="mt-2 text-white">{fullAddress()}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent"><Navigation className="h-3.5 w-3.5" /> Get directions</p>
          </a>
          <div className="card p-6">
            <Clock className="h-5 w-5 text-accent" />
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-kicker text-mute">Hours</h2>
            {BUSINESS.hours.length ? BUSINESS.hours.map((h) => <p key={h.days} className="mt-2 text-white">{h.days} · {h.time}</p>) : <p className="mt-2 text-white">Call to confirm today&apos;s timings</p>}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-silver hover:text-white"><Instagram className="h-4 w-4" /> Instagram</a>
              {BUSINESS.email && <a href={mailLink()} className="inline-flex items-center gap-1.5 text-silver hover:text-white"><Mail className="h-4 w-4" /> Email</a>}
            </div>
          </div>
        </div>
      </section>

      <BookingSection />

      <section aria-label="Map" className="border-t border-white/10">
        <iframe title={`Map to ${BUSINESS.fullName}`} src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&output=embed`}
          className="h-[420px] w-full grayscale-[85%] invert-[90%] hue-rotate-180" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </>
  );
}
