"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BUSINESS } from "@/config/business";
import { SERVICES } from "@/data/services";
import { bookingMessage, fmtPhone, mailLink, telLink, waLink } from "@/lib/whatsapp";

const SERVICE_OPTIONS = [
  "Refresh package",
  "Rejuvenate package",
  ...SERVICES.map((s) => s.title),
  "Not sure — recommend one",
];
const VEHICLES = ["Hatchback", "Sedan", "MUV / SUV", "Bike"];
const TIMES = ["Morning", "Afternoon", "Evening", "Flexible"];
const STEP_TITLES = ["Service", "Vehicle", "Schedule", "Your details"];

/**
 * 4-step enquiry. Nothing is stored on a server: on submit it opens WhatsApp with a prefilled,
 * correctly encoded message (and offers email if BUSINESS.email is set).
 */
export function BookingForm({ defaultService = "" }: { defaultService?: string }) {
  const [step, setStep] = useState(defaultService ? 1 : 0);
  const [service, setService] = useState(defaultService);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [sentUrl, setSentUrl] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const message = () => bookingMessage({ service, vehicleType, vehicleModel: vehicleModel.trim(), date, time, pickup, name: name.trim(), phone: phone.trim(), notes: notes.trim() });

  const next = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !service) e.service = "Choose a service, or pick “Not sure”.";
    if (step === 1 && !vehicleType) e.vehicleType = "Choose your vehicle type.";
    if (step === 3) {
      if (name.trim().length < 2) e.name = "Please enter your name.";
      const d = phone.replace(/[\s+-]/g, "").replace(/^91(?=\d{10}$)/, "");
      if (!/^[6-9]\d{9}$/.test(d)) e.phone = "Enter a valid 10-digit mobile number.";
    }
    setErr(e);
    if (Object.keys(e).length) return;
    if (step < 3) return setStep(step + 1);
    const url = waLink(message());
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const reset = () => { setSentUrl(""); setStep(0); setService(""); setVehicleType(""); setVehicleModel(""); setDate(""); setTime(""); setPickup(false); setName(""); setPhone(""); setNotes(""); };

  const Choice = ({ value, current, onPick, children }: { value: string; current: string; onPick: (v: string) => void; children?: ReactNode }) => (
    <button type="button" role="radio" aria-checked={current === value} onClick={() => { onPick(value); setErr({}); }}
      className={`flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${current === value ? "border-accent bg-accent/15 text-fg" : "border-line bg-onyx text-silver hover:border-fg/30"}`}>
      <span>{children ?? value}</span>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${current === value ? "border-accent bg-accent text-ink" : "border-fg/25"}`}>{current === value && <Check className="h-3 w-3" />}</span>
    </button>
  );

  if (sentUrl) {
    return (
      <div className="card p-8 text-center sm:p-10" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink"><Check className="h-7 w-7" /></span>
        <h3 className="mt-5 font-display text-2xl font-medium">WhatsApp is open — just tap send.</h3>
        <p className="mt-2 text-sm text-mute">Your details are already in the message. We&apos;ll reply with a quote and available slots.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"><span className="inline-flex items-center gap-2"><WhatsAppIcon className="h-4 w-4" /> Open WhatsApp again</span><span className="btn-arrow"><ArrowUpRight className="h-4 w-4" /></span></a>
          {BUSINESS.email && <a href={`${mailLink("Booking enquiry")}&body=${encodeURIComponent(message())}`} className="btn-ghost">Send by email instead</a>}
          <button onClick={reset} className="btn-ghost">New enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form className="card p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate aria-label="Booking enquiry">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em]">
        <span className="text-fg"><span className="text-fg">{String(step + 1).padStart(2, "0")}</span> / 04 · {STEP_TITLES[step]}</span>
        <span className="text-mute">Takes 30 seconds</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden>
        {STEP_TITLES.map((t, i) => <span key={t} className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? "bg-accent" : "bg-fg/10"}`} />)}
      </div>

      <AnimatePresence mode="wait">
        <motion.fieldset key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="mt-7">
          {step === 0 && (
            <>
              <legend className="font-display text-xl font-medium text-fg">What would you like done?</legend>
              <div role="radiogroup" aria-label="Service" className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {SERVICE_OPTIONS.map((s) => <Choice key={s} value={s} current={service} onPick={(v) => { setService(v); setTimeout(() => setStep(1), 220); }} />)}
              </div>
              {err.service && <p className="mt-3 text-sm text-red-500">{err.service}</p>}
            </>
          )}
          {step === 1 && (
            <>
              <legend className="font-display text-xl font-medium text-fg">Tell us about the vehicle.</legend>
              <div role="radiogroup" aria-label="Vehicle type" className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {VEHICLES.map((v) => <Choice key={v} value={v} current={vehicleType} onPick={setVehicleType} />)}
              </div>
              {err.vehicleType && <p className="mt-3 text-sm text-red-500">{err.vehicleType}</p>}
              <label className="mt-6 block text-sm font-medium text-fg">Make &amp; model <span className="text-mute">(optional)</span>
                <input className="field" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="e.g. Maruti Swift, Royal Enfield Classic 350" />
              </label>
            </>
          )}
          {step === 2 && (
            <>
              <legend className="font-display text-xl font-medium text-fg">When suits you?</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-fg">Preferred date <span className="text-mute">(optional)</span>
                  <input type="date" min={today} className="field " value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label className="block text-sm font-medium text-fg">Time of day
                  <select className="field [&_option]:bg-char" value={time} onChange={(e) => setTime(e.target.value)}>
                    <option value="">No preference</option>
                    {TIMES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>
              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-onyx px-4 py-4 text-sm text-silver">
                <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} className="h-4 w-4 accent-[#F5E400]" />
                I&apos;d like free pick-up &amp; drop
              </label>
            </>
          )}
          {step === 3 && (
            <>
              <legend className="font-display text-xl font-medium text-fg">Where should we reply?</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-fg">Name
                  <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!err.name} />
                  {err.name && <span className="mt-1.5 block text-xs text-red-500">{err.name}</span>}
                </label>
                <label className="block text-sm font-medium text-fg">Mobile number
                  <input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" aria-invalid={!!err.phone} />
                  {err.phone && <span className="mt-1.5 block text-xs text-red-500">{err.phone}</span>}
                </label>
                <label className="block text-sm font-medium text-fg sm:col-span-2">Anything we should know? <span className="text-mute">(optional)</span>
                  <textarea className="field h-24 py-3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Swirl marks on the bonnet, pet hair inside, etc." />
                </label>
              </div>
            </>
          )}
        </motion.fieldset>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => { setStep(step - 1); setErr({}); }} className="inline-flex items-center gap-2 text-sm font-semibold text-silver hover:text-fg"><ArrowLeft className="h-4 w-4" /> Back</button>
        ) : (
          <a href={telLink()} className="inline-flex items-center gap-2 text-sm font-semibold text-silver hover:text-fg"><Phone className="h-4 w-4" /> {fmtPhone(BUSINESS.phones[0])}</a>
        )}
        <button type="submit" className="btn-primary">
          {step === 3 ? <span className="inline-flex items-center gap-2"><WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp</span> : <span>Continue</span>}
          <span className="btn-arrow"><ArrowUpRight className="h-4 w-4" /></span>
        </button>
      </div>
      <p className="mt-4 text-xs text-mute">No deposit to enquire. Your details go straight into a WhatsApp message to {BUSINESS.name} — nothing is stored on this website.</p>
    </form>
  );
}
