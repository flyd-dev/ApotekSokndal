import { forwardRef, useImperativeHandle, useRef } from "react";
import { X } from "lucide-react";
import { business } from "../data/business";

export type PrivacyDialogHandle = { open: () => void };

/**
 * Personvernerklæring som modal (native <dialog> gir fokusfelle og Esc-lukking gratis).
 * ⚠️ Teksten er et utkast og må kvalitetssikres før lansering.
 */
export const PrivacyDialog = forwardRef<PrivacyDialogHandle>(function PrivacyDialog(_, ref) {
  const dialog = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({ open: () => dialog.current?.showModal() }));

  return (
    <dialog
      ref={dialog}
      aria-labelledby="personvern-tittel"
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      className="m-auto max-h-[88vh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-[2rem] bg-kalk p-0 text-ink shadow-2xl"
    >
      <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-sand-200 bg-kalk/95 px-6 py-5 backdrop-blur sm:px-8">
        <h2 id="personvern-tittel" className="text-2xl font-medium tracking-tight text-fjord-950">
          Personvernerklæring
        </h2>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="grid size-10 place-items-center rounded-full bg-sand-100 text-fjord-900 transition hover:bg-sand-200"
          aria-label="Lukk"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="space-y-5 px-6 py-6 leading-relaxed text-ink-soft sm:px-8 [&_h3]:font-sans [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-ink">
        <p className="rounded-xl bg-nype-50 px-4 py-3 text-sm text-nype-700 ring-1 ring-nype-100">
          Utkast – teksten må gjennomgås før nettsiden lanseres.
        </p>
        <section>
          <h3>Behandlingsansvarlig</h3>
          <p>
            {business.legalName} (org.nr. {business.orgNr}), {business.address.street}, {business.address.postalCode}{" "}
            {business.address.city}, er ansvarlig for behandlingen av personopplysninger på denne nettsiden.
          </p>
        </section>
        <section>
          <h3>Hva vi samler inn, og hvorfor</h3>
          <p>
            Når du bruker kontaktskjemaet, behandler vi navn, telefonnummer, eventuell e-postadresse og det du skriver til oss. Vi
            bruker opplysningene bare til å svare på henvendelsen, gjøre klart bestillingen din eller avtale tid for vaksinasjon.
          </p>
          <p className="mt-2">
            En bestilling av medisin eller vaksine kan si noe om helsen din. Derfor ber vi om ditt uttrykkelige samtykke, og vi spør
            ikke om mer enn vi trenger. Ikke send personnummer eller sensitive detaljer i skjemaet.
          </p>
        </section>
        <section>
          <h3>Rettslig grunnlag</h3>
          <p>Samtykke, jf. personvernforordningen artikkel 6 nr. 1 bokstav a og artikkel 9 nr. 2 bokstav a.</p>
        </section>
        <section>
          <h3>Lagring og sletting</h3>
          <p>
            Henvendelser slettes når de er ferdig behandlet, og senest etter 90 dager. Opplysninger vi er pålagt å dokumentere ved
            utlevering av legemidler, lagres i apotekets fagsystem etter gjeldende regler.
          </p>
        </section>
        <section>
          <h3>Hvem får se opplysningene?</h3>
          <p>
            Bare de ansatte på apoteket. Leverandører som drifter nettsiden og e-posten vår, behandler opplysningene på våre vegne og er
            bundet av databehandleravtale. Vi selger eller deler aldri opplysningene dine med andre.
          </p>
        </section>
        <section>
          <h3>Informasjonskapsler (cookies)</h3>
          <p>Nettsiden bruker ingen sporings- eller markedsføringscookies, og vi bruker ikke analyseverktøy som følger deg.</p>
        </section>
        <section>
          <h3>Dine rettigheter</h3>
          <p>
            Du kan be om innsyn, retting eller sletting, og du kan når som helst trekke tilbake samtykket ditt. Kontakt oss på{" "}
            <a href={`mailto:${business.email}`} className="font-semibold text-fjord-700 underline">
              {business.email}
            </a>{" "}
            eller {business.phone.display}. Mener du at vi behandler opplysningene dine i strid med regelverket, kan du klage til
            Datatilsynet.
          </p>
        </section>
      </div>
    </dialog>
  );
});
