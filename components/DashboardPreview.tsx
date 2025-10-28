import React from "react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { INK, cx, display } from "@/lib/ui"; // Playfair (display) + Markenfarbe INK

const features = [
  { name: "Scannen & loslegen.", description: "Seiten erfassen, automatisch erkennen lassen und direkt im Dashboard weiterarbeiten.", icon: CloudArrowUpIcon },
  { name: "Datenschutz in der EU.", description: "Serverstandorte in Europa und entwickelt mit Blick auf die DSGVO – deine Notizen bleiben bei dir.", icon: FingerPrintIcon },
  { name: "Verschlüsselt.", description: "Daten werden verschlüsselt übertragen und gespeichert, damit Privates privat bleibt.", icon: LockClosedIcon },
  { name: "Automatische Backups.", description: "Regelmäßige Sicherungen sorgen dafür, dass nichts verloren geht.", icon: ServerIcon },
  { name: "Immer synchron.", description: "Web-App und Mobile-App halten deine Inhalte automatisch auf allen Geräten aktuell.", icon: ArrowPathIcon },
  { name: "Viele Integrationen.", description: "Verbinde Kalender, Aufgaben & weitere Tools in wenigen Klicks – alles an einem Ort.", icon: Cog6ToothIcon },
];

export default function DashboardPreview() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          {/* Titel in Playfair Display + INK */}
          <p
            className={cx(
                          display.className,
                          // mobil kleiner, ab sm wieder größer
                          "text-3xl sm:text-4xl leading-tight sm:leading-[1.05]"
                        )}
          >
            Alles an einem Ort. Mit System.
          </p>

          <p className="mt-3 text-gray-600">
            Behalte Überblick über Powerbooks, Seiten und Aufgaben – Powerbook verbindet Papier, Struktur und digitales Arbeiten in einem klaren System.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            alt="App screenshot"
            src="/images/dashboard.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:hidden"
          />
          <img
            alt="App screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 not-dark:hidden"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-black" />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
