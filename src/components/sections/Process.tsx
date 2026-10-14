import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const STEPS = [
  { t: "Consultation & inspection", b: "We look at the vehicle with you under studio light and agree on what it needs — and what it doesn't." },
  { t: "Safe wash & decontamination", b: "Snow foam, careful hand wash and clay decontamination remove dirt and bonded contamination." },
  { t: "Surface assessment", b: "Paint, trim, glass and interior are checked so the right products and pads are chosen." },
  { t: "Correction or preparation", b: "Machine compounding and polishing refine the surface where your package includes it." },
  { t: "Protection", b: "Ceramic wax, ceramic or graphene coating, or 3M underbody coating — sealed in for the long run." },
  { t: "Final inspection & handover", b: "A last check under the lights, then the keys go back — with pick-up & drop if you asked for it." },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="light section rounded-t-[40px] sm:rounded-t-[56px]">
      <div className="wrap">
        <SectionHeading id="process-title" kicker="How we work" lines={["Six stages.", "No shortcuts."]}
          aside="Every package follows the same disciplined order, scaled to what your vehicle actually needs." />
        <ol className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.t} className="border-b border-line py-10 sm:odd:pr-10 sm:even:border-l sm:even:pl-10 lg:border-l lg:px-10 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0">
              <Reveal delay={(i % 3) * 0.08}>
                <span className="font-display text-6xl font-semibold tracking-tight text-fg/15">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl font-medium text-fg">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{s.b}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
