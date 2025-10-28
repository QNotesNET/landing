"use client";

import Link from "next/link";
import { INK, cx, display, inter } from "@/lib/ui";
import {
  PencilLine,
  Scan,
  Search,
  FolderOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  CalendarDays,
  ListChecks,
} from "lucide-react";

export default function How() {
  return (
    <section id="how-it-works" className="py-24 sm:py-28" style={{ backgroundColor: INK }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>
            So funktioniert’s
          </h2>
          <p className={cx(inter.className, "mt-3 text-white/85")}>
            Schreibe wie immer auf Papier. Powerbook macht daraus durchsuchbare Notizen,
            Aufgaben und Termine – automatisch organisiert.
          </p>
        </div>

        {/* 3-Step Flow — in einer Reihe mit Pfeilen (mobil: untereinander mit Pfeilen) */}
        <StepsRow />

        {/* Visual Mockup: Papier + App */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Erklärung / Nutzen */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <Search className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Volltextsuche: Finde Inhalte in Sekunden (auch aus Scans).</span>
              </li>
              <li className="flex items-start gap-3">
                <ListChecks className="mt-0.5 h-4 w-4 shrink-0" />
                <span>AI-Assist: To-dos automatisch erkennen &amp; zu Listen hinzufügen.</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Kalender-Übergabe: Termine direkt nach Apple/Google Kalender.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Tags &amp; Struktur: Projekte, Themen, Meetings – sauber geordnet.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-xl bg-white px-6 py-3 text-black shadow-lg hover:-translate-y-0.5 transition"
              >
                Jetzt kostenlos starten
              </Link>
              <Link
                href="/#pricing"
                className="rounded-xl border border-white/30 px-6 py-3 text-white/90 hover:bg-white/10"
              >
                Preise ansehen
              </Link>
            </div>
          </div>

          {/* Right: Mockup-Stack */}
          <div className="relative">
            {/* Papierfoto */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <img
                src="/images/11.jpg"
                alt="Papier mit TODO/CAL Notizen"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Handy-App Mockup */}
            {/* Mobile: unterhalb des Fotos, rechtsbündig, mit -mt-* so, dass die obere Hälfte im Foto sichtbar ist */}
            {/* Ab sm: absolute Overlay wie vorher */}
            <div className="w-[86%] max-w-sm ml-auto -mt-24 pr-1
                            sm:w-[72%] sm:max-w-sm sm:ml-0 sm:pr-0 sm:absolute sm:-bottom-6 sm:-right-4
                            lg:w-[68%] lg:-bottom-8 lg:-right-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between px-4 py-2 text-xs text-white/70">
                  <span className="truncate">Powerbook App</span>
                  <span className="rounded bg-white/10 px-2 py-0.5">Scan · 1/1</span>
                </div>
                <div className="bg-black/30 px-4 py-3">
                  <div className="mb-2 h-8 w-full rounded-md bg-white/10" /> {/* Suchleiste */}
                  <div className="space-y-2">
                    <MockLine label="TODO: Angebot senden" />
                    <MockLine label="CAL: 14:00 Team-Call" />
                    <MockLine label="Notizen: Budget prüfen" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4 py-3 text-xs">
                  <Badge>To-dos erkannt (2)</Badge>
                  <Badge>Tags: Projekt, Sales</Badge>
                  <Badge>Export: PDF</Badge>
                  <Badge>Kalender-Sync</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem → Lösung */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProblemSolutionCard
            variant="problem"
            title="Ohne Powerbook"
            points={[
              "Zettelwirtschaft & doppelte Notizen",
              "Nicht durchsuchbar, nichts verknüpft",
              "Aufgaben & Termine gehen unter",
            ]}
          />
          <ProblemSolutionCard
            variant="solution"
            title="Mit Powerbook"
            points={[
              "Scannt, erkennt, verschlagwortet",
              "Durchsuchbar & sauber strukturiert",
              "AI-To-dos, Kalender-Übergabe, Export",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Steps Row with arrows ---------- */

function StepsRow() {
  const steps = [
    {
      icon: <PencilLine className="h-5 w-5" aria-hidden />,
      title: "Schreiben",
      text: "Notiere auf deinem Powerbook-Papier: TODO, CAL, Stichpunkte.",
      badge: "Analog",
    },
    {
      icon: <Scan className="h-5 w-5" aria-hidden />,
      title: "Scannen",
      text: "App öffnen, Seite erfassen. Auto-Rand, Begradigung & OCR.",
      badge: "Scan",
    },
    {
      icon: <FolderOpen className="h-5 w-5" aria-hidden />,
      title: "Organisieren",
      text: "AI erkennt To-dos & Termine, Tags & Suche – alles geordnet.",
      badge: "Digital",
    },
  ];

  return (
    <div className="mt-10 md:mt-14">
      <div className="flex flex-col items-stretch md:flex-row md:items-center md:justify-center gap-4 md:gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-col md:flex-row md:items-center">
            <StepCard icon={s.icon} title={s.title} text={s.text} badge={s.badge} />
            {/* Arrow between cards */}
            {i < steps.length - 1 && (
              <div className="flex justify-center md:justify-start">
                <ArrowRight
                  className="my-2 h-6 w-6 text-white/40 md:my-0 md:mx-3 md:rotate-0 rotate-90"
                  aria-hidden
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function StepCard({
  icon,
  title,
  text,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  badge: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg w-full md:w-[320px]">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
        {icon}
        <span>{badge}</span>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/85">{text}</p>
    </div>
  );
}

function ProblemSolutionCard({
  variant,
  title,
  points,
}: {
  variant: "problem" | "solution";
  title: string;
  points: string[];
}) {
  const isSolution = variant === "solution";
  return (
    <div
      className={
        "rounded-2xl p-6 sm:p-7 shadow-xl border " +
        (isSolution
          ? "bg-white/10 border-white/10"
          : "bg-black/30 border-white/5")
      }
    >
      <div className="mb-3 inline-flex items-center gap-2 text-sm">
        {isSolution ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
        ) : (
          <XCircle className="h-5 w-5 text-rose-300" />
        )}
        <span className="font-semibold">{title}</span>
      </div>
      <ul className="space-y-2 text-sm text-white/90">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            {isSolution ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 text-rose-300" />
            )}
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockLine({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white/90">
      <span className="truncate">{label}</span>
      <span className="rounded bg-white/10 px-2 py-0.5 text-[11px]">Erkannt</span>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-white/10 px-2.5 py-1 text-white/80">
      {children}
    </span>
  );
}
