import topoUrl from "../../assets/topo.svg";

/**
 * Kotelinje-mønster – profilens grafiske element.
 * Inspirert av det kuperte Dalane-landskapet. Generert med scripts/generate-topo.mjs.
 * Brukes som CSS-maske slik at fargen kan styres med bakgrunnsfarge (bg-*).
 */
export function Topo({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: `url("${topoUrl}")`,
        WebkitMaskImage: `url("${topoUrl}")`,
        maskSize: "cover",
        WebkitMaskSize: "cover",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
