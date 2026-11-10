import type { InquiryType } from "../state/inquiry";

export type InquiryPayload = {
  type: InquiryType;
  typeLabel: string;
  navn: string;
  telefon: string;
  epost?: string;
  melding?: string;
  // Bestill medisin
  medisinType?: string;
  medisiner?: string;
  hentedag?: string;
  // Bestill vaksinasjon
  vaksine?: string;
  antall?: number;
  onsketDato?: string;
  tidspunkt?: string;
  // Andre henvendelser
  emne?: string;
  sendt: string;
};

/**
 * Hvor skjemaet sendes.
 * Sett VITE_FORM_ENDPOINT i en .env-fil (f.eks. en Make-/Zapier-webhook, Formspree eller en egen
 * serverfunksjon som sender e-post). Uten endepunkt kjører skjemaet i demomodus og later som det sendes.
 */
const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
export const isDemoMode = !endpoint;

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    console.info("[demo] Skjemaet er ikke koblet til ennå. Dette ville blitt sendt:", payload);
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Innsending feilet (${res.status})`);
}
