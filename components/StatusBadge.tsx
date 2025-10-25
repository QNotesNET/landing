"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Overall = "up" | "degraded" | "down" | "unknown";

const LABELS: Record<Overall, string> = {
  up: "Alle Systeme laufen normal",
  degraded: "Teilweise Beeinträchtigung",
  down: "Störung",
  unknown: "Status unbekannt",
};

const COLOR: Record<Overall, string> = {
  up: "text-emerald-600",      // grün
  degraded: "text-amber-600",  // orange
  down: "text-red-600",        // rot
  unknown: "text-gray-500",    // grau
};

const DOT_BG: Record<Overall, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
  unknown: "bg-gray-400",
};

export default function StatusBadge() {
  const [state, setState] = useState<Overall>("up"); // Default grün
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) throw new Error("status fetch failed");
        const data = (await res.json()) as { overall?: Overall };
        if (active && data?.overall) setState(data.overall);
      } catch {
        if (active) setState("unknown");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 60_000); // jede Minute aktualisieren
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const color = COLOR[state];
  const dot = DOT_BG[state];
  const label = loading ? "Prüfe Status …" : LABELS[state];

  return (
    <Link
      href="https://status.powerbook.at"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm ${color} hover:underline`}
      aria-label={`Systemstatus: ${label}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      <span>{label}</span>
    </Link>
  );
}
