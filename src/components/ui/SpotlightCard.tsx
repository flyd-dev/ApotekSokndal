import { useRef, type ReactNode } from "react";

/** Kort med et mykt lys som følger musepekeren (inspirert av React Bits sin Spotlight Card). */
export function SpotlightCard({
  children,
  className = "",
  color = "rgba(143, 211, 184, 0.28)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={`group/spot relative isolate overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${color}, transparent 65%)` }}
      />
      {children}
    </div>
  );
}
