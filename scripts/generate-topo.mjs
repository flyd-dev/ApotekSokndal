// Genererer kotelinje-mønsteret (inspirert av Dalane-landskapet) som brukes som bakgrunn.
// Kjør: node scripts/generate-topo.mjs  →  src/assets/topo.svg
import { contours } from "d3-contour";
import { geoPath } from "d3-geo";
import { createNoise2D } from "simplex-noise";
import { writeFileSync } from "node:fs";

// Deterministisk tilfeldighet slik at mønsteret blir likt hver gang
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const noise = createNoise2D(mulberry32(4380)); // postnummeret til Hauge i Dalane 🙂

const W = 120, H = 75, SCALE = 16; // rutenett → 1920x1200 px
const values = new Float64Array(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const nx = x / 42, ny = y / 42;
    let v = noise(nx, ny) * 1.0 + noise(nx * 2.1, ny * 2.1) * 0.45 + noise(nx * 4.3, ny * 4.3) * 0.18;
    values[y * W + x] = v;
  }
}
const thresholds = Array.from({ length: 13 }, (_, i) => -1.2 + i * 0.2);
const cs = contours().size([W, H]).smooth(true).thresholds(thresholds)(values);
const path = geoPath();
const scale = (d) => d.replace(/-?\d+(\.\d+)?/g, (n) => Math.round(parseFloat(n) * SCALE));
const paths = cs
  .map((c) => scale(path(c) || ""))
  .filter(Boolean)
  .map((d) => `<path d="${d}"/>`)
  .join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W * SCALE} ${H * SCALE}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor" stroke-width="1.4" vector-effect="non-scaling-stroke">${paths}</g></svg>`;
writeFileSync(new URL("../src/assets/topo.svg", import.meta.url), svg);
console.log("topo.svg:", (svg.length / 1024).toFixed(1), "KB,", cs.length, "kotenivåer");
