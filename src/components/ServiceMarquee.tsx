const items = [
  "Resepter og e-resept",
  "Vaksinasjon",
  "Reseptfrie legemidler",
  "Hudpleie",
  "Vitaminer og kosttilskudd",
  "Førstehjelp",
  "Mor og barn",
  "Allergi",
  "Reiseapotek",
  "Røykeslutt",
];

function Plus() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-nype-400" aria-hidden="true">
      <rect x="6" y="1" width="4" height="14" rx="2" fill="currentColor" />
      <rect x="1" y="6" width="14" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}

/** Løpende bånd med vareutvalg (inspirert av Magic UI sin Marquee). Pauses ved hover. */
export function ServiceMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 font-display text-2xl whitespace-nowrap text-kalk sm:text-3xl">
          {t}
          <Plus />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Vareutvalg" className="relative overflow-hidden bg-fjord-800 py-6">
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-fjord-800" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-fjord-800" />
    </section>
  );
}
