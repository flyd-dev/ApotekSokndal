import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type InquiryType = "medisin" | "vaksine" | "annet";

export const inquiryLabels: Record<InquiryType, string> = {
  medisin: "Bestill medisin",
  vaksine: "Bestill vaksinasjon",
  annet: "Andre henvendelser",
};

type Ctx = {
  type: InquiryType;
  setType: (t: InquiryType) => void;
  /** Velger riktig skjema og ruller ned til kontaktskjemaet */
  openForm: (t: InquiryType) => void;
};

const InquiryContext = createContext<Ctx | null>(null);

/**
 * Lenker som åpner skjemaet med riktig valg – fine å bruke i Facebook-innlegg:
 *   …/#bestill-medisin   …/#bestill-vaksine
 */
const hashToType: Record<string, InquiryType> = {
  "#bestill-medisin": "medisin",
  "#bestill-vaksine": "vaksine",
  "#bestill-vaksinasjon": "vaksine",
};

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<InquiryType>("medisin");

  const openForm = useCallback((t: InquiryType) => {
    setType(t);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("skjema")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("henvendelse-type")?.focus({ preventScroll: true }), reduce ? 0 : 650);
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const t = hashToType[window.location.hash];
      if (t) openForm(t);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [openForm]);

  return <InquiryContext.Provider value={{ type, setType, openForm }}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry må brukes inne i <InquiryProvider>");
  return ctx;
}
