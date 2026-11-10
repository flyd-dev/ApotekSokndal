import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { business } from "./src/data/business.ts";

/** Legger inn strukturerte data (schema.org/Pharmacy) for Google, hentet fra src/data/business.ts */
function businessMeta(): Plugin {
  const dayIds = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: business.name,
    legalName: business.legalName,
    url: business.siteUrl,
    telephone: business.phone.e164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: "NO",
    },
    openingHoursSpecification: business.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayIds[h.day], opens: h.open, closes: h.close })),
    sameAs: [business.facebookUrl],
  };
  return {
    name: "business-meta",
    transformIndexHtml(html) {
      return html
        .replaceAll("%SITE_URL%", business.siteUrl)
        .replace("<!--JSON-LD-->", `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
    },
  };
}

// `npm run build`         → vanlig produksjonsbygg i dist/ (for webhotell / Vercel / Netlify)
// `npm run build:utkast`  → én selvstendig HTML-fil som kan sendes på e-post og åpnes med dobbeltklikk
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react(), tailwindcss(), businessMeta(), mode === "singlefile" && viteSingleFile()].filter(Boolean),
  build: {
    outDir: mode === "singlefile" ? "dist-utkast" : "dist",
    assetsInlineLimit: mode === "singlefile" ? 100_000_000 : 4096,
  },
}));
