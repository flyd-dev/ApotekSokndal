import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { business } from "../data/business";
import { Reveal } from "./ui/Reveal";

const faqs = [
  {
    q: "Hva skjer hvis dere ikke har medisinen min inne?",
    a: "Da bestiller vi den til deg. Som regel er den klar til henting neste virkedag, og vi gir deg beskjed når den er kommet.",
  },
  {
    q: "Kan jeg hente medisiner for andre?",
    a: "Ja, i de fleste tilfeller. Ta med din egen legitimasjon og fødselsnummeret til den du henter for. For enkelte legemidler gjelder strengere regler – spør oss gjerne hvis du er usikker.",
  },
  {
    q: "Må jeg bestille time for å vaksinere meg?",
    a: "Det er lurt å sende en forespørsel i skjemaet eller ringe oss, så finner vi et tidspunkt som passer og sørger for at vaksinen er på plass.",
  },
  {
    q: "Er dere en del av en kjede?",
    a: `Nei. ${business.name} er et selvstendig apotek. For deg som kunde betyr det ingen forskjell på resepter – egenandelen på blå resept er den samme som på alle andre apotek.`,
  },
  {
    q: "Hva gjør jeg hvis det haster utenom åpningstid?",
    a: "Ring legevakten på 116 117. Ved livstruende sykdom eller skade: ring 113. Ikke bruk kontaktskjemaet til akutte henvendelser.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="sporsmal" className="py-24 sm:py-32" aria-labelledby="faq-tittel">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-8 bg-fjord-500" aria-hidden="true" /> Spørsmål og svar
          </p>
          <h2 id="faq-tittel" className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-fjord-950 sm:text-5xl">
            Lurer du på noe?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Her er svar på det vi oftest får spørsmål om. Finner du ikke svaret, er det bare å{" "}
            <a href="#kontakt" className="font-semibold text-fjord-700 underline underline-offset-4 hover:text-fjord-900">
              ta kontakt
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-sand-200 rounded-[2rem] bg-white px-6 ring-1 ring-sand-200 sm:px-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${base}-q${i}`;
              const panelId = `${base}-a${i}`;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left font-sans text-lg font-semibold text-fjord-950 transition hover:text-fjord-700"
                    >
                      {f.q}
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-full transition duration-300 ${
                          isOpen ? "rotate-45 bg-fjord-800 text-kalk" : "bg-sand-100 text-fjord-800"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="size-5" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
