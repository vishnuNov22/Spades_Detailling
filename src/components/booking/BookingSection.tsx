import { MaskLines } from "@/components/animations/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";
import { BUSINESS } from "@/config/business";
import { fmtPhone, telLink } from "@/lib/whatsapp";

const HOW = [
  "Send your vehicle's details below — 30 seconds.",
  "We reply on WhatsApp with a tailored quote and free slots.",
  "Lock in your slot — or let us pick the vehicle up and drop it back.",
];

export function BookingSection({ defaultService, title = ["Tell us about", "your ride."] }: { defaultService?: string; title?: string[] }) {
  return (
    <section id="book" aria-labelledby="book-title" className="light section scroll-mt-16 rounded-t-[40px] sm:rounded-t-[56px]">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <span className="kicker">Book a detail</span>
          <h2 id="book-title" className="h-section mt-5"><MaskLines lines={title} /></h2>
          <ol className="mt-10 grid gap-6">
            {HOW.map((h, i) => (
              <li key={h} className="flex gap-5 border-b border-line pb-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xs font-semibold text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-relaxed text-silver">{h}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-mute">Prefer to talk? Call <a className="font-semibold text-fg hover:text-accent" href={telLink()}>{fmtPhone(BUSINESS.phones[0])}</a>{BUSINESS.phones[1] && <> or <a className="font-semibold text-fg hover:text-accent" href={telLink(BUSINESS.phones[1])}>{fmtPhone(BUSINESS.phones[1])}</a></>}.</p>
        </div>
        <BookingForm defaultService={defaultService} />
      </div>
    </section>
  );
}
