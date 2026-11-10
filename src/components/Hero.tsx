import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, MapPin, MessageCircleHeart, Package, Syringe, Truck, type LucideIcon } from "lucide-react";
import { business } from "../data/business";
import { useOpenStatus } from "../lib/openingHours";
import { useInquiry } from "../state/inquiry";
import { LogoMark } from "./Logo";
import { Topo } from "./ui/Topo";

const ease = [0.22, 1, 0.36, 1] as const;

function SplitWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { openForm } = useInquiry();

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-tittel">
      {/* Bakgrunn: kotelinjer + myke fargeflater */}
      <div className="topo-mask absolute inset-0 -z-10">
        <Topo className="bg-fjord-700/25" />
      </div>
      <div aria-hidden="true" className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-fjord-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/2 left-[-15%] -z-10 size-[30rem] rounded-full bg-nype-100/70 blur-3xl" />

      <div className="container-x grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-20 lg:pb-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-fjord-800/10 bg-white/70 py-1.5 pr-4 pl-1.5 text-sm font-medium text-fjord-900 shadow-sm backdrop-blur"
          >
            <span className="rounded-full bg-fjord-800 px-2.5 py-0.5 text-xs font-bold tracking-wide text-kalk">Nyåpnet</span>
            Selvstendig apotek i Sokndal
          </motion.p>

          <h1
            id="hero-tittel"
            className="mt-6 text-[2.9rem] leading-[1.02] font-medium tracking-[-0.035em] text-fjord-950 sm:text-6xl lg:text-[4.6rem]"
          >
            <SplitWords text="Ditt lokale apotek," />
            <br />
            <span className="relative inline-block text-fjord-600">
              <SplitWords text="midt på Haua." delay={0.25} />
              <svg
                aria-hidden="true"
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-[0.28em] w-[94%] text-nype-400"
              >
                <motion.path
                  d="M3 14C60 6 140 3 297 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.9, ease }}
                />
              </svg>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            Vi hjelper deg med resepter, vaksiner og gode råd – med kort vei, kjente fjes og god tid til hver kunde.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => openForm("medisin")}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-fjord-800 px-7 py-4 text-base font-semibold text-kalk shadow-xl shadow-fjord-900/20 transition hover:bg-fjord-900"
            >
              {/* «Shimmer» som glir over knappen (Magic UI-inspirert) */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-[120%]"
              />
              Bestill medisin
              <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => openForm("vaksine")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-fjord-800/15 bg-white/80 px-7 py-4 text-base font-semibold text-fjord-900 backdrop-blur transition hover:border-fjord-800/30 hover:bg-white"
            >
              <Syringe className="size-5 text-nype-500" aria-hidden="true" />
              Bestill vaksinasjon
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft"
          >
            {["Kjedeuavhengig", "Farmasøyt til stede", "Vi bestiller inn det du trenger"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-fjord-100 text-fjord-700">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/* ───────────────────────── Høyre side: «telefon» med varsler ───────────────────────── */

type Note = { icon: LucideIcon; title: string; body: string; tint: string };
const ages = ["nå", "4 min", "1 t"];
const notes: Note[] = [
  { icon: Package, title: "Bestillingen din er klar", body: "Velkommen innom Gamleveien 12 for å hente.", tint: "bg-fjord-100 text-fjord-700" },
  { icon: Syringe, title: "Vaksinetime bekreftet", body: "Influensavaksine torsdag kl. 10.30.", tint: "bg-nype-100 text-nype-600" },
  { icon: Truck, title: "Varen er bestilt inn", body: "Den kommer med morgendagens levering.", tint: "bg-sand-100 text-fjord-800" },
  { icon: MessageCircleHeart, title: "Svar fra farmasøyten", body: "Det går fint å ta dem sammen. God bedring!", tint: "bg-fjord-50 text-fjord-600" },
];

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function useMediaQuery(q: string) {
  const [match, setMatch] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setMatch(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [q]);
  return match;
}

function useOsloClock() {
  const fmt = () => {
    const d = new Date();
    return {
      time: new Intl.DateTimeFormat("nb-NO", { timeZone: "Europe/Oslo", hour: "2-digit", minute: "2-digit" }).format(d).replace(":", "."),
      date: cap(new Intl.DateTimeFormat("nb-NO", { timeZone: "Europe/Oslo", weekday: "long", day: "numeric", month: "long" }).format(d)),
    };
  };
  const [now, setNow] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setNow(fmt()), 20_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function HeroVisual() {
  const status = useOpenStatus();
  const clock = useOsloClock();
  const wide = useMediaQuery("(min-width: 640px)");
  const max = wide ? 3 : 2;
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setCount((c) => c + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  // De nyeste varslene vises, nyeste øverst – og rullerer i det uendelige
  const visible = Array.from({ length: Math.min(count, max) }, (_, i) => {
    const idx = (count - 1 - i) % notes.length;
    return { key: count - i, time: ages[i], ...notes[idx] };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className="relative mx-auto w-full max-w-[30rem] lg:mr-0"
      aria-label="Illustrasjon: varsler fra apoteket på mobilen"
      role="img"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-fjord-800 p-5 pb-8 shadow-2xl shadow-fjord-950/30 ring-1 ring-fjord-950/10 sm:p-7 sm:pb-10">
        <Topo className="bg-fjord-500/35" />
        <div aria-hidden="true" className="absolute -top-24 -right-20 size-72 rounded-full bg-fjord-400/30 blur-3xl" />

        <div className="relative pt-6 text-center text-kalk">
          <p className="text-sm font-medium text-fjord-200">{clock.date}</p>
          <p className="font-display text-7xl leading-none font-medium tracking-tight sm:text-8xl">{clock.time}</p>
        </div>

        <div className="relative mt-8 flex h-[12.75rem] flex-col gap-3 sm:h-[17.5rem]">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((n) => (
              <motion.div
                key={n.key}
                layout
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                className="flex items-start gap-3 rounded-3xl bg-kalk/95 p-3.5 shadow-lg shadow-fjord-950/20 backdrop-blur"
              >
                <span className="relative shrink-0">
                  <LogoMark className="size-10" />
                  <span className={`absolute -right-1.5 -bottom-1.5 grid size-6 place-items-center rounded-full ring-2 ring-kalk ${n.tint}`}>
                    <n.icon className="size-3.5" aria-hidden="true" />
                  </span>
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[0.95rem] font-semibold text-ink">{n.title}</span>
                    <span className="shrink-0 text-xs text-ink-soft">{n.time}</span>
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{n.body}</span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Flytende «åpent nå»-merke */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-5 left-4 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-fjord-950/15 ring-1 ring-sand-200 sm:top-24 sm:-left-10"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className={`absolute inline-flex size-full animate-ping-slow rounded-full ${status.isOpen ? "bg-fjord-400" : "bg-nype-400"}`} />
            <span className={`relative inline-flex size-2.5 rounded-full ${status.isOpen ? "bg-fjord-500" : "bg-nype-500"}`} />
          </span>
          <span className="text-sm font-bold text-ink">{status.label}</span>
        </span>
        <span className="mt-0.5 block pl-5 text-xs font-medium text-ink-soft">{status.detail}</span>
      </motion.div>

      {/* Flytende adresse-merke */}
      <motion.a
        href={business.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-2 -bottom-6 flex items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 shadow-xl shadow-fjord-950/15 ring-1 ring-sand-200 transition hover:ring-fjord-300 sm:-right-8"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-nype-100 text-nype-600">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-sm font-bold text-ink">{business.address.street}</span>
          <span className="block text-xs text-ink-soft">
            {business.address.postalCode} {business.address.city}
          </span>
        </span>
      </motion.a>

      {/* Roterende merke (React Bits «Circular Text»-inspirert) */}
      <div className="absolute -top-8 -right-3 hidden size-28 sm:block lg:-right-8" aria-hidden="true">
        <motion.svg
          viewBox="0 0 120 120"
          className="absolute inset-0 size-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path id="sirkel" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
          </defs>
          <circle cx="60" cy="60" r="59" fill="#ee7b5b" />
          <text className="fill-fjord-950 text-[10.5px] font-bold tracking-[0.2em] uppercase">
            <textPath href="#sirkel">Kjedeuavhengig · Lokalt apotek · </textPath>
          </text>
        </motion.svg>
        <span className="absolute inset-0 grid place-items-center">
          <LogoMark className="size-11" />
        </span>
      </div>
    </motion.div>
  );
}
