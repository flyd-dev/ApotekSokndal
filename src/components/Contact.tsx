import { ArrowUpRight, Mail, MapPin, Phone, Siren } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "../data/business";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";
import { Topo } from "./ui/Topo";
import { FacebookIcon } from "./ui/FacebookIcon";

function InfoRow({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-fjord-700/70 text-fjord-200 ring-1 ring-fjord-600">{icon}</span>
      <div>
        <p className="text-sm font-semibold tracking-wide text-fjord-300">{title}</p>
        <div className="mt-0.5 text-lg text-kalk">{children}</div>
      </div>
    </li>
  );
}

export function Contact({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  return (
    <section id="kontakt" className="relative isolate overflow-hidden bg-fjord-900 py-24 text-kalk sm:py-32" aria-labelledby="kontakt-tittel">
      <div className="topo-mask absolute inset-0 -z-10">
        <Topo className="bg-fjord-600/50" />
      </div>
      <div aria-hidden="true" className="absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full bg-fjord-600/30 blur-3xl" />

      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-fjord-300">
              <span className="h-px w-8 bg-fjord-300" aria-hidden="true" /> Kontakt
            </p>
            <h2 id="kontakt-tittel" className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.03em] sm:text-5xl">
              Bestill, spør eller si hei.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-fjord-100">
              Bruk skjemaet til å bestille medisin eller vaksinasjon – eller send oss et spørsmål. Du kan selvfølgelig også ringe eller
              stikke innom.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-6">
              <InfoRow icon={<Phone className="size-5" aria-hidden="true" />} title="Telefon">
                <a href={business.phone.href} className="font-display text-2xl font-medium hover:text-fjord-200">
                  {business.phone.display}
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className="size-5" aria-hidden="true" />} title="E-post">
                <a href={`mailto:${business.email}`} className="break-all underline-offset-4 hover:underline">
                  {business.email}
                </a>
              </InfoRow>
              <InfoRow icon={<MapPin className="size-5" aria-hidden="true" />} title="Besøksadresse">
                <address className="not-italic">
                  {business.address.street}
                  <br />
                  {business.address.postalCode} {business.address.city}
                </address>
              </InfoRow>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex gap-4 rounded-3xl bg-nype-400 p-5 text-fjord-950">
              <Siren className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-bold">Haster det?</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed">
                  Ved akutt sykdom eller skade: ring <a href="tel:113" className="font-bold underline">113</a>. Legevakt:{" "}
                  <a href="tel:116117" className="font-bold whitespace-nowrap underline">
                    116 117
                  </a>
                  . Ikke bruk skjemaet til akutte henvendelser.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-4 rounded-3xl bg-fjord-800/70 p-5 ring-1 ring-fjord-700 transition hover:bg-fjord-800"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-kalk text-fjord-800">
                <FacebookIcon className="size-6" />
              </span>
              <span className="flex-1">
                <span className="block font-bold">Følg oss på Facebook</span>
                <span className="mt-0.5 block text-[0.95rem] text-fjord-200">Nyheter, tilbud og endrede åpningstider.</span>
              </span>
              <ArrowUpRight className="size-5 text-fjord-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div id="skjema" className="scroll-mt-28 rounded-[2rem] bg-white p-6 text-ink shadow-2xl shadow-fjord-950/40 sm:p-10">
            <ContactForm onOpenPrivacy={onOpenPrivacy} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
