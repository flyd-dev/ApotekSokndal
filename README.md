# Norges Apotek Sokndal – nettside og grafisk profil (utkast)

Forslag til nettside, logo og Facebook-profil for **Norges Apotek Sokndal AS**
(org.nr. 838 011 802), apoteket i Gamleveien 12 på Haua (Hauge i Dalane).

![Skjermbilde av nettsiden](utkast/skjermbilde-pc.jpg)

## Vis utkastet

| Fil | Hva |
| --- | --- |
| [`utkast/norges-apotek-sokndal-utkast.html`](utkast/norges-apotek-sokndal-utkast.html) | Hele nettsiden i **én fil**. Last ned og dobbeltklikk – den virker uten internett og uten server. |
| [`utkast/skjermbilde-pc.jpg`](utkast/skjermbilde-pc.jpg) / [`skjermbilde-mobil.jpg`](utkast/skjermbilde-mobil.jpg) | Hele siden som bilde, PC og mobil. |
| [`profil/profilark.png`](profil/profilark.png) | Grafisk profil på ett ark: logo, farger, skrifter og grafiske elementer. |
| [`profil/`](profil/) | Logo som vektor (SVG), Facebook-profilbilde (720×720), Facebook-forsidebilde (1640×624) og delingsbilde (1200×630). |

## Hva nettsiden inneholder

- **Toppseksjon** med «Bestill medisin» og «Bestill vaksinasjon», og et merke som viser om apoteket er **åpent nå** (regnes ut fra åpningstidene i norsk tid).
- **Tjenester**: resepter og e-resept, vaksinasjon, råd og veiledning, reseptfritt, bestilling av varer og «kjedeuavhengig».
- **Slik bestiller du** i tre steg.
- **Åpningstider og adresse** med dagens dag uthevet, og veibeskrivelse via Google Maps. Kartet er tegnet, ikke en Google-innbygging, så det settes ingen cookies.
- **Om oss**, med et «Hilsen fra Haua»-postkort.
- **Spørsmål og svar.**
- **Kontaktskjema** med nedtrekksmenyen *Bestill medisin / Bestill vaksinasjon / Andre henvendelser*. Feltene tilpasser seg valget, og skjemaet har validering, samtykke, spamfilter og kvittering.
- **Personvernerklæring** (utkast) og en tydelig beskjed om å ringe 113 / 116 117 når det haster.

**Lenker som åpner skjemaet med riktig valg** (fine i Facebook-innlegg):
`…/#bestill-medisin` og `…/#bestill-vaksine`.

## Må avklares med eierne før lansering

Alle fakta ligger samlet i [`src/data/business.ts`](src/data/business.ts). Endrer du dem der, oppdateres hele siden, bunnteksten og dataene til Google.

- [ ] **Åpningstider.** Utkastet bruker man–fre 09–17 og lør 10–14. Det er plassholdere.
- [ ] **Telefon.** 47 79 36 08 er nummeret som står på 1881.no. Bekreft at det er dette som skal vises.
- [ ] **E-post og domene.** `post@norgesapoteksokndal.no` og `norgesapoteksokndal.no` er antatt og ikke registrert.
- [ ] **Facebook-lenke**, når siden er opprettet.
- [ ] **Hvilke vaksiner og tjenester** de faktisk tilbyr, for eksempel influensa, covid-19, reisevaksiner og eventuelt Medisinstart eller inhalasjonsveiledning.
- [ ] **Bilder** av apoteket og de ansatte. Ekte foto løfter siden mye.
- [ ] **Bokmål eller nynorsk.** Siden er skrevet på bokmål, og teksten er enkel å skrive om.
- [ ] **Personvernerklæringen** må gjennomgås.

## Koble til skjemaet

Uten oppsett kjører skjemaet i *demomodus*. Det later som det sender, og sier ifra om det i kvitteringen.
Legg inn en adresse i `.env` for å koble det til:

```
VITE_FORM_ENDPOINT=https://…   # f.eks. Make/Zapier-webhook, Formspree eller egen serverfunksjon
```

Skjemaet sender JSON (se `InquiryPayload` i [`src/lib/submitInquiry.ts`](src/lib/submitInquiry.ts)).

**Viktig om personvern:** En bestilling av medisin eller vaksine regnes som *helseopplysninger*, altså en særlig kategori etter GDPR art. 9. Vi anbefaler:

- en leverandør med databehandleravtale og lagring i EU/EØS
- at henvendelsene ikke videresendes til private e-postkontoer
- at det ikke bes om fødselsnummer i skjemaet (det gjør det ikke i dag)
- at henvendelser slettes når de er ferdig behandlet

## Videre forslag

1. **Google Bedriftsprofil** (Google Maps/Søk). Det viktigste for lokal synlighet: åpningstider, telefon og veibeskrivelse rett i søket.
2. **Facebook-side.** Profilbilde og forsidebilde ligger klare i `profil/`.
3. **Nettbutikk senere.** Salg av legemidler på nett krever egne avklaringer med Direktoratet for medisinske produkter (DMP) og EUs felles logo for netthandel. Siden er bygget slik at en butikk kan legges til.
4. **Universell utforming.** Siden er laget med tanke på WCAG 2.1 AA, med god kontrast, tastaturnavigasjon, merkede skjemafelt og respekt for «reduser bevegelse». Den bør likevel testes før lansering.

## For utviklere

Vite · React 18 · TypeScript · Tailwind CSS v4 · Motion. Skriftene (Fraunces og Figtree, begge OFL) ligger lokalt, så det gjøres ingen kall til Google Fonts. Det brukes ingen sporingscookies. Strukturerte data (schema.org/Pharmacy) genereres fra `business.ts`.

```bash
npm install
npm run dev            # utviklingsserver
npm run build          # produksjonsbygg i dist/ (passer på et vanlig webhotell, Netlify, Vercel o.l.)
npm run build:utkast   # bygger utkast/norges-apotek-sokndal-utkast.html (én selvstendig fil)
```

Profilmateriell (valgfritt):

```bash
npm run generer:topo     # kotelinje-mønsteret (src/assets/topo.svg)
npm run generer:logo     # logoer som vektor – krever: pip install fonttools brotli uharfbuzz
npm run generer:profil   # Facebook-bilder, delingsbilde og profilark – krever Playwright
```

```
src/
  data/business.ts        ← all kontaktinfo og åpningstider
  components/             ← seksjonene på siden (Hero, Services, ContactForm …)
  lib/openingHours.ts     ← «Åpent nå»-logikk (Europe/Oslo)
  lib/submitInquiry.ts    ← innsending av skjema
profil/                   ← logo, Facebook-bilder, profilark
utkast/                   ← ferdig utkast å vise kunden
scripts/                  ← generering av mønster, logo og profilmateriell
```
