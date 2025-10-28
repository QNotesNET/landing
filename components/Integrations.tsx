// app/(site)/components/Integrations.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowPathIcon, LinkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { cx, display } from "@/lib/ui";

type Integration = {
  key: "google" | "nexoro" | "whatsapp" | "telegram";
  name: string;
  href: string;
  desc: string;
  status?: "connected" | "available";
};

const INTEGRATIONS: Integration[] = [
  {
    key: "google",
    name: "Google",
    href: "https://google.com",
    desc: "Kalender, Kontakte & Aufgaben nahtlos synchronisieren.",
    status: "available",
  },
  {
    key: "nexoro",
    name: "Nexoro",
    href: "https://nexoro.net",
    desc: "Kundenkommunikation & Inbox mit Powerbook verbinden.",
    status: "available",
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    href: "https://whatsapp.com",
    desc: "Nachrichten versenden, Workflows starten.",
    status: "available",
  },
  {
    key: "telegram",
    name: "Telegram",
    href: "https://telegram.org",
    desc: "Nachrichten, Erinnerungen & Bots direkt verknüpfen.",
    status: "available",
  },
];

export default function Integrations() {
  return (
    <section id="integrations" className="relative bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        {/* Heading */}
        <div className="text-center">
          <h2 className={cx(display.className, "text-3xl sm:text-4xl md:text-5xl tracking-tight")}>
            Unsere Integrationen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600">
            Verknüpfe Powerbook mit deinen Lieblings-Tools und halte Daten <br />
            automatisch synchron – sicher, transparent und jederzeit widerrufbar.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((it, idx) => {
            const iconSrc = `/images/icons/${it.key}.svg`;
            return (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                viewport={{ once: true, margin: "-60px" }}
                className="h-full"
              >
                <Link
                  href={it.href}
                  target="_blank"
                  className={cx(
                    "group block h-full rounded-2xl border border-black/5 bg-white p-5",
                    "shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:border-black/10 hover:shadow-md transition"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cx(
                        "rounded-xl p-2 ring-1 ring-inset ring-black/5 bg-white/80 backdrop-blur-sm"
                      )}
                    >
                      <span
                        className={cx(
                          "grid h-10 w-10 place-items-center rounded-lg",
                        )}
                      >
                        <Image
                          src={iconSrc}
                          alt={`${it.name} Logo`}
                          width={22}
                          height={22}
                          className="h-[40px] w-[40px] object-contain"
                        />
                      </span>
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold tracking-tight">{it.name}</h3>
                        <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-500">
                          Öffnen ↗
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-3 text-xs text-gray-600">{it.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <StatusPill status={it.status ?? "available"} />
                    <span className="text-[11px] text-gray-400">API & OAuth</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Value bullets */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Feature
            icon={ArrowPathIcon}
            title="Nahtlose Synchronisierung"
            desc="Zwei-Wege-Sync für Aufgaben, Kalender & Kontakte – ohne doppelte Einträge."
          />
          <Feature
            icon={ShieldCheckIcon}
            title="Datenschutz an erster Stelle"
            desc="EU-Hosting, klare Berechtigungen, jederzeit widerrufbar."
          />
          <Feature
            icon={LinkIcon}
            title="Mehr als nur APIs"
            desc="Events & Workflows verbinden – Powerbook passt sich deinem Stack an."
          />
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="mailto:info@powerbook.at"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            Weitere Integrationen anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: "connected" | "available" }) {
  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700 ring-1 ring-inset ring-green-200">
        Verbunden
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-700 ring-1 ring-inset ring-gray-200">
      Verfügbar
    </span>
  );
}

function Feature(props: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}) {
  const Icon = props.icon;
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
      <div className="flex items-start gap-3">
        <span className="rounded-xl border border-black/10 bg-gray-50 p-2">
          <Icon className="h-5 w-5 text-gray-700" />
        </span>
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{props.title}</h3>
          <p className="mt-1 text-xs text-gray-600">{props.desc}</p>
        </div>
      </div>
    </div>
  );
}
