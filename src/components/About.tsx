import { Clock3, ShieldCheck, Smile } from "lucide-react";
import { business } from "../data/business";
import { LogoMark } from "./Logo";
import { Reveal } from "./ui/Reveal";
import omFoto from "../assets/foto/farmasoyt-ved-hylla.webp";

const values = [
  { icon: Clock3, title: "Tid til deg", text: "Vi haster deg ikke gjennom køen." },
  { icon: Smile, title: "Nært og personlig", text: "Kjente fjes bak disken og rom for en prat." },
  { icon: ShieldCheck, title: "Faglig trygt", text: "Farmasøyt til stede når vi har åpent." },
];

export function About() {
  return (
    <section id="om-oss" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="om-tittel">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative mx-auto max-w-lg pb-16 sm:pb-20 lg:mx-0">
            <figure className="relative overflow-hidden rounded-[2.25rem] shadow-2xl shadow-fjord-950/20 ring-1 ring-sand-200 sm:mr-16">
              <img
                src={omFoto}
                alt="Farmasøyt finner fram en vare fra hylla til en kunde"
                width={960}
                height={1200}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            <div className="absolute right-0 bottom-0 w-[62%] sm:w-[58%]">
              <Postcard />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-8 bg-fjord-500" aria-hidden="true" /> Om oss
            </p>
            <h2 id="om-tittel" className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-fjord-950 sm:text-5xl">
              Et selvstendig apotek – for folk i Sokndal.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Apoteket på Haua har fått nye eiere, og dørene er åpne igjen. {business.name} er et selvstendig apotek uten kjede i
                ryggen – og det er helt bevisst.
              </p>
              <p>
                Det betyr at vi selv bestemmer hva som er viktig: god tid til hver kunde, et vareutvalg tilpasset folk i bygda, og et
                apotek som er her for å bli.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="mt-8 rounded-3xl border-l-4 border-nype-400 bg-nype-50 py-5 pr-6 pl-6">
              <blockquote className="font-display text-xl leading-snug text-fjord-950 sm:text-2xl">
                «Takk for at du handler lokalt. Det er det som holder apoteket i bygda.»
              </blockquote>
              <figcaption className="mt-2 text-sm font-semibold text-nype-700">– Alle oss på {business.name}</figcaption>
            </figure>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={0.1 + i * 0.08}>
                  <v.icon className="size-6 text-fjord-600" aria-hidden="true" />
                  <p className="mt-3 font-semibold text-fjord-950">{v.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** «Postkort fra Haua» – illustrasjon av Dalane-landskapet med små hvite trehus ved sjøen. */
function Postcard() {
  return (
    <figure className="relative rotate-3 transition duration-500 hover:rotate-0">
      <div className="overflow-hidden rounded-[1.4rem] bg-kalk p-2 shadow-2xl shadow-fjord-950/30 ring-1 ring-sand-200 sm:p-2.5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-gradient-to-b from-nype-100 via-kalk to-fjord-50">
          <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
            <circle cx="292" cy="92" r="34" fill="#ee7b5b" />
            <path d="M0 170c40-30 80-46 120-30s70 10 110-20 90-30 170 10v170H0Z" fill="#aedccb" />
            <path d="M0 200c50-40 110-30 150-10s80 0 120-24 90-10 130 20v114H0Z" fill="#4fae93" />
            <path d="M0 236c60-30 120-34 170-16s100 6 150-14 60 0 80 10v84H0Z" fill="#135e55" />
            {/* Sjø */}
            <path d="M0 262h400v38H0Z" fill="#0b3833" />
            <path d="M262 276h30M318 284h50" stroke="#2a8c7d" strokeWidth="3" strokeLinecap="round" />
            {/* Trehus */}
            <g fill="#f7f3ec">
              {[
                [268, 240, 22, 18],
                [294, 244, 18, 14],
                [316, 238, 24, 20],
                [344, 245, 16, 13],
              ].map(([x, y, w, h], i) => (
                <g key={i}>
                  <rect x={x} y={y} width={w} height={h} />
                  <path d={`M${x - 2} ${y}L${x + w / 2} ${y - w * 0.45}L${x + w + 2} ${y}Z`} />
                </g>
              ))}
            </g>
            <g fill="#0e4a43">
              <rect x="274" y="246" width="4" height="5" />
              <rect x="323" y="244" width="4" height="5" />
              <rect x="331" y="244" width="4" height="5" />
            </g>
          </svg>
          {/* Frimerke */}
          <div className="absolute top-2.5 left-2.5 rotate-6 bg-white p-1 shadow-md outline-2 outline-offset-[-1px] outline-white outline-dashed">
            <div className="grid size-10 place-items-center bg-fjord-800 sm:size-12">
              <LogoMark className="size-7 sm:size-8" tile={false} />
            </div>
          </div>
          {/* Poststempel */}
          <svg viewBox="0 0 120 60" className="absolute top-5 left-14 w-20 text-fjord-800/45 sm:left-16 sm:w-24" aria-hidden="true">
            <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="30" y="27" textAnchor="middle" className="fill-current text-[8px] font-bold tracking-widest">4380</text>
            <text x="30" y="38" textAnchor="middle" className="fill-current text-[7px] font-bold tracking-widest">HAUA</text>
            <path d="M58 20c8-5 14 5 22 0s14 5 22 0M58 30c8-5 14 5 22 0s14 5 22 0M58 40c8-5 14 5 22 0s14 5 22 0" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <figcaption className="absolute bottom-2 left-3 font-display text-base font-medium text-kalk sm:bottom-3 sm:left-4 sm:text-xl">
            Hilsen fra Haua
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
