import { useEffect, useState } from "react";
import { business, dayNames, fmtTime } from "../data/business";

const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Nåværende ukedag og minutter etter midnatt i norsk tid, uansett hvor besøkeren er. */
export function osloNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Oslo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: WEEKDAYS[get("weekday")] ?? date.getDay(), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const hoursFor = (day: number) => business.hours.find((h) => h.day === day);

export type OpenStatus = { isOpen: boolean; label: string; detail: string; today: number };

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = osloNow(date);
  const today = hoursFor(day);

  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return { isOpen: true, label: "Åpent nå", detail: `Stenger kl. ${fmtTime(today.close)}`, today: day };
    }
    if (minutes < open) {
      return { isOpen: false, label: "Stengt nå", detail: `Åpner i dag kl. ${fmtTime(today.open)}`, today: day };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const h = hoursFor(next);
    if (h?.open) {
      const when = i === 1 ? "i morgen" : dayNames[next];
      return { isOpen: false, label: "Stengt nå", detail: `Åpner ${when} kl. ${fmtTime(h.open)}`, today: day };
    }
  }
  return { isOpen: false, label: "Stengt", detail: "", today: day };
}

/** Oppdaterer seg selv hvert halve minutt, slik at «Åpent nå» alltid stemmer. */
export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

/** Grupperer like dager: «Mandag–fredag 09.00–17.00» */
export function groupedHours() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: { from: number; to: number; text: string }[] = [];
  for (const d of order) {
    const h = hoursFor(d);
    const text = h?.open && h.close ? `${fmtTime(h.open)}–${fmtTime(h.close)}` : "Stengt";
    const last = rows[rows.length - 1];
    if (last && last.text === text) last.to = d;
    else rows.push({ from: d, to: d, text });
  }
  const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
  return rows.map((r) => ({
    days: r.from === r.to ? cap(dayNames[r.from]) : `${cap(dayNames[r.from])}–${dayNames[r.to]}`,
    text: r.text,
  }));
}
