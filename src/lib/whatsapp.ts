import { BUSINESS } from "@/config/business";

/** wa.me link with a correctly encoded, prefilled message. */
export function waLink(message: string, number: string = BUSINESS.whatsapp): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const telLink = (phone: string = BUSINESS.phones[0]) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const mailLink = (subject = "Detailing enquiry") =>
  BUSINESS.email ? `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}` : "";

/** "+916374465349" -> "+91 63744 65349" */
export function fmtPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  const local = d.length > 10 ? d.slice(-10) : d;
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

export const DEFAULT_MESSAGE = `Hello ${BUSINESS.name}, I'd like to know more about your detailing services.`;

export function serviceMessage(service: string, vehicle?: string) {
  return `Hello ${BUSINESS.name}, I would like to enquire about ${service}${vehicle ? ` for my ${vehicle}` : " for my vehicle"}. Could you please share the available packages and pricing?`;
}

export type BookingDetails = {
  service: string;
  vehicleType: string;
  vehicleModel?: string;
  date?: string;
  time?: string;
  pickup?: boolean;
  name: string;
  phone: string;
  notes?: string;
};

export function bookingMessage(b: BookingDetails) {
  const lines = [
    `Hello ${BUSINESS.name}, I'd like to book a detail.`,
    "",
    `Service: ${b.service}`,
    `Vehicle: ${b.vehicleType}${b.vehicleModel ? ` — ${b.vehicleModel}` : ""}`,
  ];
  if (b.date) lines.push(`Preferred date: ${b.date}${b.time ? `, ${b.time}` : ""}`);
  if (b.pickup) lines.push("Pick-up & drop: Yes please");
  lines.push(`Name: ${b.name}`, `Phone: ${b.phone}`);
  if (b.notes) lines.push(`Notes: ${b.notes}`);
  lines.push("", "(Sent from the SPADES website)");
  return lines.join("\n");
}
