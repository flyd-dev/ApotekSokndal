import { BellRing, ClipboardList, IdCard } from "lucide-react";
import { useInquiry } from "../state/inquiry";
import { Reveal } from "./ui/Reveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Send bestillingen",
    text: "Fyll ut skjemaet her på siden eller ring oss. Fortell hva du trenger – resten ordner vi.",
  },
  {
    icon: BellRing,
    title: "Vi gjør klart",
    text: "Vi finner frem medisinene, eller bestiller dem inn, og gir deg beskjed når alt er klart.",
  },
  {
    icon: IdCard,
    title: "Hent på Haua",
    text: "Kom innom i åpningstiden og ta med legitimasjon. Har du spørsmål, tar vi gjerne en prat.",
  },
];

export function HowItWorks() {
  const { openForm } = useInquiry();
  return (
    <section className="relative bg-sand-100/70 py-24 sm:py-32" aria-labelledby="slik-tittel">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-8 bg-fjord-500" aria-hidden="true" /> Slik bestiller du
            </p>
            <h2 id="slik-tittel" className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-fjord-950 sm:text-5xl">
              Slipp køen. Bestill på forhånd.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={() => openForm("medisin")}
              className="inline-flex items-center gap-2 rounded-full bg-fjord-800 px-6 py-3.5 font-semibold text-kalk shadow-lg shadow-fjord-900/15 transition hover:bg-fjord-900"
            >
              Start en bestilling
            </button>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.12} className="relative h-full rounded-[2rem] bg-kalk p-8 ring-1 ring-sand-200">
                <div className="flex items-center justify-between">
                  <span className="relative grid size-16 place-items-center rounded-2xl bg-fjord-800 text-kalk shadow-lg shadow-fjord-900/20">
                    <s.icon className="size-7" aria-hidden="true" />
                  </span>
                  <span className="font-display text-7xl leading-none font-medium text-sand-200" aria-hidden="true">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-medium tracking-tight text-fjord-950">
                  <span className="sr-only">Steg {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
