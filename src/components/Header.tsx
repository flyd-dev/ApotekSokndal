import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { business } from "../data/business";
import { useInquiry } from "../state/inquiry";

const nav = [
  { href: "#tjenester", label: "Tjenester" },
  { href: "#apningstider", label: "Åpningstider" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#sporsmal", label: "Spørsmål og svar" },
  { href: "#kontakt", label: "Kontakt" },
];

export function AnnouncementBar() {
  return (
    <div className="relative bg-fjord-900 text-kalk">
      <div className="container-x flex items-center justify-center gap-3 py-2.5 text-center text-sm">
        <span className="relative hidden size-2 sm:inline-flex" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-fjord-300" />
          <span className="relative inline-flex size-2 rounded-full bg-fjord-300" />
        </span>
        <p>
          <strong className="font-semibold">Apoteket på Haua er åpent igjen!</strong>{" "}
          <span className="text-fjord-200">Velkommen innom – vi gleder oss til å hilse på deg.</span>
        </p>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openForm } = useInquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-sand-200/80 bg-kalk/85 shadow-[0_8px_30px_-20px_rgba(11,56,51,0.35)] backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#" aria-label={`${business.name} – til toppen`} className="rounded-xl">
          <Logo />
        </a>

        <nav aria-label="Hovedmeny" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink-soft transition hover:bg-sand-100 hover:text-fjord-900"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phone.href}
            className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-fjord-800 transition hover:bg-sand-100 md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {business.phone.display}
          </a>
          <button
            type="button"
            onClick={() => openForm("medisin")}
            className="group hidden items-center gap-2 rounded-full bg-fjord-800 px-5 py-2.5 text-sm font-semibold text-kalk shadow-lg shadow-fjord-900/15 transition hover:bg-fjord-900 sm:inline-flex"
          >
            Bestill medisin
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-fjord-900 transition hover:bg-sand-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobilmeny"
            aria-label="Mobilmeny"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-2 pb-6">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-xl text-fjord-900 transition hover:bg-sand-100"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={business.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-fjord-800/20 px-4 py-3 font-semibold text-fjord-800"
                >
                  <Phone className="size-4" aria-hidden="true" /> Ring oss
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openForm("medisin");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-fjord-800 px-4 py-3 font-semibold text-kalk"
                >
                  Bestill medisin
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
