import { business } from "../data/business";

/**
 * Logomerket «kapselkorset»: apotekkorset bygget av to kapsler.
 * Den korallfargede toppen gir varme og gjør merket gjenkjennelig, også i små størrelser (favicon, profilbilde).
 */
export function LogoMark({ className = "size-10", tile = true }: { className?: string; tile?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {tile && <rect width="64" height="64" rx="18" fill="#0e4a43" />}
      <rect x="25" y="12" width="14" height="24" rx="7" fill="#ee7b5b" />
      <rect x="25" y="26" width="14" height="26" rx="7" fill="#f7f3ec" />
      <rect x="12" y="25" width="40" height="14" rx="7" fill="#f7f3ec" />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="size-10 shrink-0 sm:size-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-semibold tracking-[-0.02em] sm:text-2xl ${light ? "text-kalk" : "text-fjord-900"}`}
        >
          {business.shortName}
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-bold uppercase tracking-[0.34em] ${light ? "text-fjord-300" : "text-fjord-600"}`}
        >
          {business.location}
        </span>
      </span>
    </span>
  );
}
