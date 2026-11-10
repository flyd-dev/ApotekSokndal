import { Clock, Navigation, Phone } from "lucide-react";
import { business, dayNames, fmtTime } from "../data/business";
import { useOpenStatus } from "../lib/openingHours";
import { Reveal } from "./ui/Reveal";
import { Topo } from "./ui/Topo";

const order = [1, 2, 3, 4, 5, 6, 0];

export function HoursLocation() {
  const status = useOpenStatus();

  return (
    <section id="apningstider" className="py-24 sm:py-32" aria-labelledby="apningstider-tittel">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-fjord-500" aria-hidden="true" /> Åpningstider og adresse
          </p>
          <h2 id="apningstider-tittel" className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-fjord-950 sm:text-5xl">
            Du finner oss i Gamleveien, midt i sentrum.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-white p-7 ring-1 ring-sand-200 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="flex items-center gap-3 text-2xl font-medium tracking-tight text-fjord-950">
                  <Clock className="size-6 text-fjord-600" aria-hidden="true" /> Åpningstider
                </h3>
                <p
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                    status.isOpen ? "bg-fjord-100 text-fjord-800" : "bg-nype-100 text-nype-700"
                  }`}
                  aria-live="polite"
                >
                  <span className={`size-2 rounded-full ${status.isOpen ? "bg-fjord-500" : "bg-nype-500"}`} aria-hidden="true" />
                  {status.label}
                  {status.detail && <span className="font-medium opacity-80">· {status.detail}</span>}
                </p>
              </div>

              <table className="mt-7 w-full text-left">
                <caption className="sr-only">Åpningstider for {business.name}</caption>
                <tbody>
                  {order.map((d) => {
                    const h = business.hours.find((x) => x.day === d);
                    const isToday = d === status.today;
                    return (
                      <tr
                        key={d}
                        className={`border-b border-sand-200/80 last:border-0 ${isToday ? "bg-fjord-50 font-semibold text-fjord-900" : "text-ink"}`}
                        aria-current={isToday ? "date" : undefined}
                      >
                        <th scope="row" className={`py-3.5 font-medium capitalize ${isToday ? "rounded-l-xl pl-3 font-semibold" : ""}`}>
                          {dayNames[d]}
                          {isToday && (
                            <span className="ml-2 rounded-full bg-fjord-800 px-2 py-0.5 text-[0.7rem] font-bold tracking-wide text-kalk normal-case">
                              I dag
                            </span>
                          )}
                        </th>
                        <td className={`py-3.5 text-right tabular-nums ${isToday ? "rounded-r-xl pr-3" : ""} ${h?.open ? "" : "text-ink-soft"}`}>
                          {h?.open && h.close ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Stengt"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-6 text-sm leading-relaxed text-ink-soft">
                Endrede åpningstider i høytider og ferier legger vi ut her og på Facebook-siden vår.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-fjord-800 p-7 text-kalk sm:p-9">
              <StylizedMap />
              <div className="relative mt-auto rounded-3xl bg-kalk/95 p-5 text-ink shadow-2xl shadow-fjord-950/30 backdrop-blur sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                <address className="not-italic">
                  <span className="block font-display text-xl font-medium text-fjord-950">{business.name}</span>
                  <span className="mt-1 block text-ink-soft">
                    {business.address.street}, {business.address.postalCode} {business.address.city}
                  </span>
                </address>
                <div className="mt-4 flex gap-2 sm:mt-0 sm:shrink-0">
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-fjord-800 px-5 py-3 text-sm font-semibold text-kalk transition hover:bg-fjord-900"
                  >
                    <Navigation className="size-4" aria-hidden="true" /> Veibeskrivelse
                    <span className="sr-only">(åpnes i Google Maps)</span>
                  </a>
                  <a
                    href={business.phone.href}
                    className="inline-flex items-center gap-2 rounded-full border border-fjord-800/15 px-5 py-3 text-sm font-semibold text-fjord-900 transition hover:bg-white"
                    aria-label={`Ring ${business.phone.display}`}
                  >
                    <Phone className="size-4" aria-hidden="true" /> Ring
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Stilisert kart – ingen Google-innbygging, og dermed ingen informasjonskapsler fra tredjepart. */
function StylizedMap() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Topo className="bg-fjord-500/45" />
      <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {/* Elv */}
        <path d="M-20 420C120 380 180 450 300 400S470 300 560 330s160 40 260-20" fill="none" stroke="#2a8c7d" strokeWidth="26" strokeLinecap="round" opacity=".55" />
        {/* Veier */}
        <g fill="none" stroke="#f7f3ec" strokeLinecap="round" opacity=".9">
          <path d="M-20 170C150 190 260 150 400 200s260 40 420 10" strokeWidth="9" />
          <path d="M400 200C390 280 420 340 380 540" strokeWidth="7" />
          <path d="M400 200C450 120 520 70 560 -20" strokeWidth="6" />
          <path d="M120 -20c20 90 0 140 30 200" strokeWidth="5" opacity=".7" />
          <path d="M600 210c10 60 70 90 90 170" strokeWidth="5" opacity=".7" />
        </g>
        <text x="455" y="248" className="fill-fjord-100 text-[15px] font-semibold tracking-[0.16em] uppercase" opacity=".85">
          Gamleveien
        </text>
      </svg>
      {/* Kartnål */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="absolute top-full left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 animate-ping-slow rounded-full bg-nype-400/40" />
        <svg viewBox="0 0 48 60" className="relative size-14 drop-shadow-xl">
          <path d="M24 58S4 36.5 4 22a20 20 0 1 1 40 0c0 14.5-20 36-20 36Z" fill="#ee7b5b" />
          <circle cx="24" cy="22" r="12" fill="#f7f3ec" />
          <rect x="21.5" y="13" width="5" height="18" rx="2.5" fill="#0e4a43" />
          <rect x="15" y="19.5" width="18" height="5" rx="2.5" fill="#0e4a43" />
        </svg>
      </div>
    </div>
  );
}
