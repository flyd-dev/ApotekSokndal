import { business } from "../data/business";
import { groupedHours } from "../lib/openingHours";
import { Logo } from "./Logo";
import { FacebookIcon } from "./ui/FacebookIcon";

export function Footer({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-fjord-950 text-fjord-100">
      {/* Åsene i Dalane */}
      <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-full left-0 h-16 w-full sm:h-24">
        <path d="M0 120V70c120-40 220-50 340-20s220 20 330-15 230-45 360-5 260 30 410-10v100Z" fill="#135e55" opacity=".55" />
        <path d="M0 120V92c140-30 260-26 380-6s240 10 360-14 240-24 380 0 220 14 320-6v54Z" fill="#072723" />
      </svg>

      <div className="container-x grid gap-12 pt-16 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs leading-relaxed text-fjord-200">
            Selvstendig apotek midt på Haua. Resepter, vaksiner og gode råd – med god tid til deg.
          </p>
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-fjord-800 px-4 py-2.5 text-sm font-semibold text-kalk ring-1 ring-fjord-700 transition hover:bg-fjord-700"
          >
            <FacebookIcon className="size-5" /> Følg oss på Facebook
          </a>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.18em] text-fjord-300 uppercase">Kontakt</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={business.phone.href} className="hover:text-kalk">
                Tlf. {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="break-all hover:text-kalk">
                {business.email}
              </a>
            </li>
            <li>
              <address className="not-italic">
                {business.address.street}
                <br />
                {business.address.postalCode} {business.address.city}
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.18em] text-fjord-300 uppercase">Åpningstider</h2>
          <dl className="mt-4 space-y-2.5">
            {groupedHours().map((r) => (
              <div key={r.days}>
                <dt className="text-sm text-fjord-300">{r.days}</dt>
                <dd className="tabular-nums">{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.18em] text-fjord-300 uppercase">Snarveier</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="#bestill-medisin" className="hover:text-kalk">
                Bestill medisin
              </a>
            </li>
            <li>
              <a href="#bestill-vaksine" className="hover:text-kalk">
                Bestill vaksinasjon
              </a>
            </li>
            <li>
              <a href="#sporsmal" className="hover:text-kalk">
                Spørsmål og svar
              </a>
            </li>
            <li>
              <button type="button" onClick={onOpenPrivacy} className="hover:text-kalk">
                Personvern
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-fjord-800">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-fjord-300 sm:flex-row sm:justify-between">
          <p>
            © {year} {business.legalName} · Org.nr. {business.orgNr}
          </p>
          <p>Ingen sporingscookies på denne nettsiden.</p>
        </div>
      </div>
    </footer>
  );
}
