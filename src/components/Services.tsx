import { ArrowRight, Check, HeartHandshake, MessagesSquare, PackageCheck, Pill, ShoppingBasket, Store, Syringe } from "lucide-react";
import type { ReactNode } from "react";
import { useInquiry } from "../state/inquiry";
import { Reveal } from "./ui/Reveal";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Topo } from "./ui/Topo";
import raadFoto from "../assets/foto/kunde-ved-disken.webp";
import vaksineFoto from "../assets/foto/vaksine-plaster.webp";
import reseptfrittFoto from "../assets/foto/reseptfritt.webp";

function IconTile({ children, tone = "fjord" }: { children: ReactNode; tone?: "fjord" | "nype" | "dark" }) {
  const tones = {
    fjord: "bg-fjord-100 text-fjord-700",
    nype: "bg-nype-100 text-nype-600",
    dark: "bg-fjord-700 text-fjord-200",
  };
  return <span className={`grid size-12 place-items-center rounded-2xl ${tones[tone]}`}>{children}</span>;
}

const card = "h-full rounded-[2rem] bg-white p-7 ring-1 ring-sand-200/90 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-fjord-900/10 sm:p-8";

export function Services() {
  const { openForm } = useInquiry();

  return (
    <section id="tjenester" className="relative py-24 sm:py-32" aria-labelledby="tjenester-tittel">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-fjord-500" aria-hidden="true" /> Tjenester
          </p>
          <h2 id="tjenester-tittel" className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-fjord-950 sm:text-5xl">
            Alt du forventer av et apotek – og litt ekstra tid.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Fra e-resepten din til en rolig prat om medisinene. Finner du ikke det du leter etter, spør oss – vi hjelper deg gjerne.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Resepter */}
          <Reveal className="lg:col-span-2">
            <SpotlightCard className={card}>
              <div className="grid h-full gap-8 md:grid-cols-[1fr_17rem] md:items-center">
                <div>
                  <IconTile>
                    <Pill className="size-6" aria-hidden="true" />
                  </IconTile>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-fjord-950 sm:text-3xl">Resepter og e-resept</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    Hent medisinene dine hos oss – eller send en bestilling på forhånd, så ligger alt klart når du kommer. Har vi
                    ikke varen inne, bestiller vi den til deg.
                  </p>
                  <button
                    type="button"
                    onClick={() => openForm("medisin")}
                    className="group mt-6 inline-flex items-center gap-2 font-semibold text-fjord-700 underline-offset-4 hover:underline"
                  >
                    Bestill medisin <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
                <div aria-hidden="true" className="rounded-3xl bg-kalk p-4 ring-1 ring-sand-200">
                  <p className="px-1 text-xs font-bold tracking-[0.18em] text-ink-soft uppercase">Din bestilling</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {["Blodtrykksmedisin · 98 stk", "Allergitabletter · 30 stk", "Inhalator · 1 stk"].map((t) => (
                      <li key={t} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-sand-200/70">
                        <span className="grid size-5 place-items-center rounded-full bg-fjord-500 text-white">
                          <Check className="size-3" strokeWidth={3.5} />
                        </span>
                        <span className="font-medium text-ink">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-fjord-800 px-3 py-2.5 text-sm font-semibold text-kalk">
                    <PackageCheck className="size-4" /> Klar til henting
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Vaksinasjon */}
          <Reveal className="lg:row-span-2" delay={0.08}>
            <SpotlightCard className={`${card} flex flex-col`} color="rgba(244, 169, 143, 0.28)">
              <div className="relative -mx-3 -mt-3 overflow-hidden rounded-[1.6rem] sm:-mx-4 sm:-mt-4">
                <img
                  src={vaksineFoto}
                  alt="Kvinne med plaster på overarmen etter vaksinasjon"
                  width={1100}
                  height={1100}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover object-[center_40%] lg:aspect-square transition duration-700 group-hover/spot:scale-[1.03]"
                />
                <span className="absolute top-4 left-4">
                  <IconTile tone="nype">
                    <Syringe className="size-6" aria-hidden="true" />
                  </IconTile>
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-medium tracking-tight text-fjord-950 sm:text-3xl">Vaksinasjon</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Influensa, covid-19 og reisevaksiner. Send en forespørsel, så finner vi en tid som passer deg.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Vaksiner">
                {["Influensa", "Covid-19", "Pneumokokk", "Reisevaksiner"].map((v) => (
                  <li key={v} className="rounded-full bg-nype-50 px-3 py-1 text-sm font-medium text-nype-700 ring-1 ring-nype-100">
                    {v}
                  </li>
                ))}
              </ul>

              <div className="min-h-6 flex-1" aria-hidden="true" />
              <button
                type="button"
                onClick={() => openForm("vaksine")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-nype-400 px-5 py-3 font-semibold text-fjord-950 transition hover:bg-nype-300"
              >
                Bestill vaksinasjon <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </SpotlightCard>
          </Reveal>

          {/* Råd – fotokort */}
          <Reveal delay={0.04}>
            <div className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-fjord-900 p-7 text-kalk ring-1 ring-fjord-900 sm:p-8">
              <img
                src={raadFoto}
                alt="Farmasøyt gir en smilende kunde en pakke over disken"
                width={1200}
                height={800}
                loading="lazy"
                className="absolute inset-0 -z-10 size-full object-cover object-[30%_center] transition duration-700 group-hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-fjord-950 via-fjord-950/70 to-fjord-950/0" />
              <span className="grid size-12 place-items-center rounded-2xl bg-kalk/90 text-fjord-700 backdrop-blur">
                <MessagesSquare className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl font-medium tracking-tight">Råd og veiledning</h3>
              <p className="mt-2 leading-relaxed text-fjord-100">
                Lurer du på dosering, bivirkninger eller om medisiner kan tas sammen? Farmasøyten vår tar seg tid til deg.
              </p>
            </div>
          </Reveal>

          {/* Reseptfritt */}
          <Reveal delay={0.12}>
            <SpotlightCard className={`${card} flex flex-col`}>
              <IconTile>
                <ShoppingBasket className="size-6" aria-hidden="true" />
              </IconTile>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-fjord-950">Reseptfritt og egenpleie</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Smertestillende, allergi, hudpleie, vitaminer, førstehjelp og produkter til mor og barn.
              </p>
              <div className="-mx-7 mt-6 -mb-7 flex flex-1 items-end sm:-mx-8 sm:-mb-8">
                <img
                  src={reseptfrittFoto}
                  alt=""
                  width={1200}
                  height={525}
                  loading="lazy"
                  className="aspect-[16/7] w-full object-cover"
                />
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Vi bestiller inn */}
          <Reveal delay={0.04}>
            <SpotlightCard className={card}>
              <IconTile tone="nype">
                <HeartHandshake className="size-6" aria-hidden="true" />
              </IconTile>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-fjord-950">Vi skaffer det du trenger</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Er noe tomt på hylla, bestiller vi det inn – som regel klart til neste virkedag.
              </p>
            </SpotlightCard>
          </Reveal>

          {/* Kjedeuavhengig */}
          <Reveal className="lg:col-span-2" delay={0.12}>
            <div className="relative isolate h-full overflow-hidden rounded-[2rem] bg-fjord-900 p-7 text-kalk sm:p-8">
              <Topo className="-z-10 bg-fjord-600/40" />
              <div className="flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-end">
                <div className="max-w-md">
                  <IconTile tone="dark">
                    <Store className="size-6" aria-hidden="true" />
                  </IconTile>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight sm:text-3xl">Kjedeuavhengig – og stolte av det</h3>
                  <p className="mt-3 leading-relaxed text-fjord-100">
                    Vi er ikke en del av en kjede. Det betyr korte beslutninger, et vareutvalg tilpasset folk i Sokndal, og at vi
                    kan prioritere det som er viktig for deg.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 sm:max-w-[14rem] sm:justify-end">
                  {["Lokale valg", "Korte beslutninger", "Personlig service"].map((t) => (
                    <li key={t} className="rounded-full bg-fjord-800/80 px-3.5 py-1.5 text-sm font-medium text-fjord-100 ring-1 ring-fjord-600">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
