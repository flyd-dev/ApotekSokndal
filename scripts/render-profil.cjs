// Gjengir profilmaterial (Facebook-bilder, delingsbilde og profilark) til PNG.
// Krever Playwright med Chromium:  node scripts/render-profil.cjs
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const maler = path.join(__dirname, "profil-maler");
const ut = path.join(__dirname, "..", "profil");
const jobber = [
  { mal: "facebook-profilbilde.html", fil: "facebook-profilbilde.png", w: 720, h: 720 },
  { mal: "facebook-forsidebilde.html", fil: "facebook-forsidebilde.png", w: 1640, h: 624 },
  { mal: "og-bilde.html", fil: "og-bilde.png", w: 1200, h: 630, kopi: path.join(__dirname, "..", "public", "og-bilde.png") },
  { mal: "profilark.html", fil: "profilark.png", w: 1600, h: 0 },
];

// CSS-masker kan ikke lastes fra file:// (CORS), så kotelinjene legges inn som data-URL
const topo = "data:image/svg+xml;base64," + fs.readFileSync(path.join(__dirname, "..", "src", "assets", "topo.svg")).toString("base64");
const topoCss = `.topo{-webkit-mask-image:url("${topo}");mask-image:url("${topo}")}`;

(async () => {
  const browser = await chromium.launch();
  for (const j of jobber) {
    if (!fs.existsSync(path.join(maler, j.mal))) continue;
    const page = await browser.newPage({ viewport: { width: j.w, height: j.h || 1000 }, deviceScaleFactor: 1 });
    await page.goto("file://" + path.join(maler, j.mal));
    await page.addStyleTag({ content: topoCss });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const fil = path.join(ut, j.fil);
    await page.screenshot({ path: fil, fullPage: !j.h });
    if (j.kopi) fs.copyFileSync(fil, j.kopi);
    console.log("✓", path.relative(process.cwd(), fil));
    await page.close();
  }
  await browser.close();
})();
