import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, IdCard, Loader2, Plane } from "lucide-react";
import { inquiryLabels, useInquiry, type InquiryType } from "../state/inquiry";
import { isDemoMode, submitInquiry, type InquiryPayload } from "../lib/submitInquiry";
import { business } from "../data/business";

type Fields = {
  navn: string;
  telefon: string;
  epost: string;
  medisinType: string;
  medisiner: string;
  hentedag: string;
  vaksine: string;
  antall: string;
  onsketDato: string;
  tidspunkt: string;
  emne: string;
  melding: string;
  samtykke: boolean;
  nettsted: string; // honningkrukke mot spam – skal være tom
};

const empty: Fields = {
  navn: "",
  telefon: "",
  epost: "",
  medisinType: "Medisin på resept",
  medisiner: "",
  hentedag: "",
  vaksine: "",
  antall: "1",
  onsketDato: "",
  tidspunkt: "Uansett",
  emne: "",
  melding: "",
  samtykke: false,
  nettsted: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

const vaccines = ["Influensavaksine", "Koronavaksine (covid-19)", "Pneumokokkvaksine", "Reisevaksine", "Annet / usikker"];

const submitLabels: Record<InquiryType, string> = {
  medisin: "Send bestilling",
  vaksine: "Send vaksineforespørsel",
  annet: "Send melding",
};

const thanks: Record<InquiryType, string> = {
  medisin: "bestillingen din",
  vaksine: "vaksineforespørselen din",
  annet: "meldingen din",
};

const today = () => new Date().toISOString().slice(0, 10);

function validate(type: InquiryType, f: Fields): Errors {
  const e: Errors = {};
  if (f.navn.trim().length < 2) e.navn = "Skriv inn navnet ditt.";
  const digits = f.telefon.replace(/[\s\-().]/g, "");
  if (!/^(\+|00)?\d{8,15}$/.test(digits)) e.telefon = "Skriv inn et gyldig telefonnummer, f.eks. 412 34 567.";
  if (f.epost.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.epost.trim())) e.epost = "E-postadressen ser ikke riktig ut.";
  if (type === "medisin" && f.medisiner.trim().length < 2) e.medisiner = "Fortell oss hva du vil bestille.";
  if (type === "vaksine" && !f.vaksine) e.vaksine = "Velg hvilken vaksine det gjelder.";
  if (type === "annet" && f.melding.trim().length < 5) e.melding = "Skriv en kort melding til oss.";
  if (!f.samtykke) e.samtykke = "Du må samtykke for at vi kan behandle henvendelsen.";
  return e;
}

export function ContactForm({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { type, setType } = useInquiry();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentTo, setSentTo] = useState<{ name: string; phone: string; type: InquiryType } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (f.nettsted) return; // spam-robot
    const found = validate(type, f);
    setErrors(found);
    if (Object.keys(found).length) {
      // Flytt fokus til første feil i skjemaet (rekkefølgen på siden, ikke i valideringen)
      const fields = Array.from(formRef.current?.elements ?? []) as HTMLInputElement[];
      fields.find((el) => el.name in found)?.focus();
      return;
    }

    const payload: InquiryPayload = {
      type,
      typeLabel: inquiryLabels[type],
      navn: f.navn.trim(),
      telefon: f.telefon.trim(),
      epost: f.epost.trim() || undefined,
      melding: f.melding.trim() || undefined,
      sendt: new Date().toISOString(),
      ...(type === "medisin" && { medisinType: f.medisinType, medisiner: f.medisiner.trim(), hentedag: f.hentedag || undefined }),
      ...(type === "vaksine" && {
        vaksine: f.vaksine,
        antall: Number(f.antall) || 1,
        onsketDato: f.onsketDato || undefined,
        tidspunkt: f.tidspunkt,
      }),
      ...(type === "annet" && { emne: f.emne.trim() || undefined }),
    };

    setState("sending");
    try {
      await submitInquiry(payload);
      setSentTo({ name: f.navn.trim().split(" ")[0], phone: f.telefon.trim(), type });
      setState("sent");
      setF(empty);
    } catch {
      setState("error");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${uid}-${k}-feil`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-nype-700">
        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
        {errors[k]}
      </p>
    ) : null;

  const a11y = (k: keyof Fields, hint?: string) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": [errors[k] ? `${uid}-${k}-feil` : "", hint ?? ""].filter(Boolean).join(" ") || undefined,
  });

  if (state === "sent" && sentTo) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[32rem] flex-col items-center justify-center px-4 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="grid size-20 place-items-center rounded-full bg-fjord-100 text-fjord-700"
        >
          <CheckCircle2 className="size-10" aria-hidden="true" />
        </motion.span>
        <h3 className="mt-6 text-3xl font-medium tracking-tight text-fjord-950">Takk, {sentTo.name}!</h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-soft">
          Vi har mottatt {thanks[sentTo.type]} og tar kontakt med deg på <strong className="text-ink">{sentTo.phone}</strong> så snart
          vi kan.
        </p>
        {isDemoMode && (
          <p className="mt-4 max-w-md rounded-xl bg-sand-100 px-4 py-2 text-sm text-ink-soft">
            Utkast: skjemaet er ennå ikke koblet til apotekets e-post, så ingenting ble sendt.
          </p>
        )}
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-8 rounded-full border border-fjord-800/15 px-6 py-3 font-semibold text-fjord-900 transition hover:bg-sand-100"
        >
          Send en ny henvendelse
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-påkrevd`}>
      {/* Hovedvalget: nedtrekksmeny */}
      <div>
        <label htmlFor="henvendelse-type" className="label text-base">
          Hva gjelder henvendelsen?
        </label>
        <select
          id="henvendelse-type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value as InquiryType)}
          className="field py-4 text-lg font-semibold text-fjord-900"
        >
          {(Object.keys(inquiryLabels) as InquiryType[]).map((t) => (
            <option key={t} value={t}>
              {inquiryLabels[t]}
            </option>
          ))}
        </select>
        <p id={`${uid}-påkrevd`} className="mt-2 text-sm text-ink-soft">
          Felt merket med <span className="font-bold text-nype-600">*</span> må fylles ut.
        </p>
      </div>

      {/* Felter som endrer seg etter valget */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-7 space-y-5"
        >
          {type === "medisin" && (
            <>
              <Segmented
                legend="Hva vil du bestille?"
                name="medisinType"
                options={["Medisin på resept", "Reseptfrie varer", "Begge deler"]}
                value={f.medisinType}
                onChange={(v) => set("medisinType", v)}
              />
              <div>
                <label htmlFor={`${uid}-medisiner`} className="label">
                  Hva trenger du? <Req />
                </label>
                <textarea
                  {...a11y("medisiner", `${uid}-medisiner-hint`)}
                  rows={4}
                  value={f.medisiner}
                  onChange={(e) => set("medisiner", e.target.value)}
                  className="field resize-y"
                  placeholder="F.eks. navn på medisinen, styrke og antall pakninger."
                />
                <p id={`${uid}-medisiner-hint`} className="mt-1.5 text-sm text-ink-soft">
                  Har du e-resept, holder det å skrive hvilke medisiner du vil hente.
                </p>
                {err("medisiner")}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-hentedag`} className="label">
                    Når vil du hente? <Opt />
                  </label>
                  <input
                    {...a11y("hentedag")}
                    type="date"
                    min={today()}
                    value={f.hentedag}
                    onChange={(e) => set("hentedag", e.target.value)}
                    className="field"
                  />
                </div>
                <Tip icon={<IdCard className="size-5" />}>Husk legitimasjon når du henter reseptbelagte medisiner.</Tip>
              </div>
            </>
          )}

          {type === "vaksine" && (
            <>
              <div className="grid gap-5 sm:grid-cols-[1fr_9rem]">
                <div>
                  <label htmlFor={`${uid}-vaksine`} className="label">
                    Hvilken vaksine? <Req />
                  </label>
                  <select
                    {...a11y("vaksine")}
                    value={f.vaksine}
                    onChange={(e) => set("vaksine", e.target.value)}
                    className="field"
                  >
                    <option value="">Velg vaksine …</option>
                    {vaccines.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                  {err("vaksine")}
                </div>
                <div>
                  <label htmlFor={`${uid}-antall`} className="label">
                    Antall personer
                  </label>
                  <input
                    {...a11y("antall")}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={10}
                    value={f.antall}
                    onChange={(e) => set("antall", e.target.value)}
                    className="field"
                  />
                </div>
              </div>
              {f.vaksine === "Reisevaksine" && (
                <Tip icon={<Plane className="size-5" />}>
                  Skriv gjerne hvor og når du skal reise i kommentarfeltet, så hjelper vi deg å finne ut hva du trenger.
                </Tip>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-onsketDato`} className="label">
                    Ønsket dato <Opt />
                  </label>
                  <input
                    {...a11y("onsketDato")}
                    type="date"
                    min={today()}
                    value={f.onsketDato}
                    onChange={(e) => set("onsketDato", e.target.value)}
                    className="field"
                  />
                </div>
                <Segmented
                  legend="Hva passer best?"
                  name="tidspunkt"
                  options={["Formiddag", "Ettermiddag", "Uansett"]}
                  value={f.tidspunkt}
                  onChange={(v) => set("tidspunkt", v)}
                />
              </div>
            </>
          )}

          {type === "annet" && (
            <div>
              <label htmlFor={`${uid}-emne`} className="label">
                Emne <Opt />
              </label>
              <input
                {...a11y("emne")}
                type="text"
                value={f.emne}
                onChange={(e) => set("emne", e.target.value)}
                className="field"
                placeholder="Hva gjelder det?"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Felles felter */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-melding`} className="label">
            {type === "annet" ? (
              <>
                Melding <Req />
              </>
            ) : (
              <>
                Kommentar <Opt />
              </>
            )}
          </label>
          <textarea
            {...a11y("melding")}
            rows={type === "annet" ? 5 : 3}
            value={f.melding}
            onChange={(e) => set("melding", e.target.value)}
            className="field resize-y"
            placeholder={type === "annet" ? "Skriv meldingen din her." : "Er det noe mer vi bør vite?"}
          />
          {err("melding")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-navn`} className="label">
            Fullt navn <Req />
          </label>
          <input
            {...a11y("navn")}
            type="text"
            autoComplete="name"
            value={f.navn}
            onChange={(e) => set("navn", e.target.value)}
            className="field"
          />
          {err("navn")}
        </div>
        <div>
          <label htmlFor={`${uid}-telefon`} className="label">
            Telefon <Req />
          </label>
          <input
            {...a11y("telefon")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={f.telefon}
            onChange={(e) => set("telefon", e.target.value)}
            className="field"
          />
          {err("telefon")}
        </div>
        <div>
          <label htmlFor={`${uid}-epost`} className="label">
            E-post <Opt />
          </label>
          <input
            {...a11y("epost")}
            type="email"
            autoComplete="email"
            value={f.epost}
            onChange={(e) => set("epost", e.target.value)}
            className="field"
          />
          {err("epost")}
        </div>
      </div>

      {/* Honningkrukke – skjult for mennesker */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Ikke fyll ut dette feltet
          <input tabIndex={-1} autoComplete="off" name="nettsted" value={f.nettsted} onChange={(e) => set("nettsted", e.target.value)} />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-kalk p-4 ring-1 ring-sand-200 transition hover:ring-sand-300">
          <input
            {...a11y("samtykke")}
            type="checkbox"
            checked={f.samtykke}
            onChange={(e) => set("samtykke", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-fjord-700"
          />
          <span className="text-sm leading-relaxed text-ink-soft">
            Jeg samtykker til at {business.name} behandler opplysningene jeg har oppgitt for å svare på henvendelsen. <Req />{" "}
            <button type="button" onClick={onOpenPrivacy} className="font-semibold text-fjord-700 underline underline-offset-2 hover:text-fjord-900">
              Les personvernerklæringen
            </button>
          </span>
        </label>
        {err("samtykke")}
      </div>

      {state === "error" && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-2xl bg-nype-50 p-4 text-sm font-medium text-nype-700 ring-1 ring-nype-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Beklager, noe gikk galt under innsendingen. Prøv igjen, eller ring oss på {business.phone.display}.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-fjord-800 px-8 py-4 text-base font-semibold text-kalk shadow-xl shadow-fjord-900/20 transition hover:bg-fjord-900 disabled:cursor-wait disabled:opacity-80"
        >
          {state === "sending" ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sender …
            </>
          ) : (
            <>
              {submitLabels[type]}
              <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="flex items-center gap-2 text-sm text-ink-soft">
          <CalendarDays className="size-4 shrink-0 text-fjord-600" aria-hidden="true" />
          Vi svarer så raskt vi kan i åpningstiden.
        </p>
      </div>
    </form>
  );
}

function Req() {
  return (
    <span className="font-bold text-nype-600" aria-hidden="true">
      *
    </span>
  );
}

function Opt() {
  return <span className="font-normal text-ink-soft">(valgfritt)</span>;
}

function Tip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="flex items-start gap-3 self-end rounded-2xl bg-fjord-50 p-4 text-sm leading-relaxed text-fjord-900 ring-1 ring-fjord-100">
      <span className="shrink-0 text-fjord-600" aria-hidden="true">
        {icon}
      </span>
      {children}
    </p>
  );
}

function Segmented({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label">{legend}</legend>
      <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-sand-100 p-1 ring-1 ring-sand-200">
        {options.map((o) => {
          const active = value === o;
          return (
            <label
              key={o}
              className={`relative cursor-pointer rounded-xl px-2 py-2.5 text-center text-sm font-semibold transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-nype-400 ${
                active ? "text-kalk" : "text-ink-soft hover:text-fjord-900"
              }`}
            >
              <input type="radio" name={name} value={o} checked={active} onChange={() => onChange(o)} className="sr-only" />
              {active && (
                <motion.span
                  layoutId={`seg-${name}`}
                  className="absolute inset-0 -z-0 rounded-xl bg-fjord-800 shadow-md"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
