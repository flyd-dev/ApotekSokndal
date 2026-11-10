/**
 * All fakta om apoteket samlet ett sted.
 * Endrer du noe her, oppdateres nettsiden, strukturerte data for Google (JSON-LD) og bunnteksten automatisk.
 *
 * ⚠️  Felter merket TODO er plassholdere i utkastet og må bekreftes med eierne før lansering.
 */

export type OpeningHours = {
  /** 0 = søndag, 1 = mandag … 6 = lørdag (samme som Date.getDay()) */
  day: number;
  open: string | null; // "09:00" eller null = stengt
  close: string | null;
};

export const business = {
  name: "Norges Apotek Sokndal",
  shortName: "Norges Apotek",
  location: "Sokndal",
  legalName: "Norges Apotek Sokndal AS",
  orgNr: "838 011 802",

  // Nummeret er oppført på 1881.no for Norges Apotek Sokndal AS. TODO: bekreft at det er riktig nummer å vise.
  phone: { display: "47 79 36 08", href: "tel:+4747793608", e164: "+4747793608" },

  // TODO: plassholder – domene og e-post er ikke bestemt ennå.
  email: "post@norgesapoteksokndal.no",
  siteUrl: "https://www.norgesapoteksokndal.no",

  address: {
    street: "Gamleveien 12",
    postalCode: "4380",
    city: "Hauge i Dalane",
    municipality: "Sokndal",
    region: "Rogaland",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gamleveien+12%2C+4380+Hauge+i+Dalane",

  // TODO: lenke til Facebook-siden når den er opprettet.
  facebookUrl: "https://www.facebook.com/",

  // TODO: foreløpige åpningstider – må bekreftes.
  hours: [
    { day: 1, open: "09:00", close: "17:00" },
    { day: 2, open: "09:00", close: "17:00" },
    { day: 3, open: "09:00", close: "17:00" },
    { day: 4, open: "09:00", close: "17:00" },
    { day: 5, open: "09:00", close: "17:00" },
    { day: 6, open: "10:00", close: "14:00" },
    { day: 0, open: null, close: null },
  ] satisfies OpeningHours[],
} as const;

export const dayNames = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"] as const;

/** "09:00" → "09.00" (norsk skrivemåte for klokkeslett) */
export const fmtTime = (t: string) => t.replace(":", ".");
