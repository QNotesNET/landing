"use client";

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cx, display } from "@/lib/ui";

type Integration = {
  key: "google" | "nexoro" | "whatsapp" | "darlean";
  name: string;
  href: string;
  desc: string;
  status?: "connected" | "available";
};

const INTEGRATIONS: Integration[] = [
  {
    key: "darlean",
    name: "Darlean",
    href: "https://darlean.com",
    desc: "Projekte, Aufgaben & Workflows nahtlos synchronisieren.",
    status: "available",
  },
  {
    key: "nexoro",
    name: "Nexoro",
    href: "https://nexoro.net",
    desc: "Projekte, Aufgaben & Workflows nahtlos synchronisieren.",
    status: "available",
  },
];

export const ExclusivePartner = () => {
  return (
    <section id="integrations" className="relative bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        {/* Heading */}
        <div className="text-center">
          <h2 className={cx(display.className, "text-3xl sm:text-4xl tracking-tight")}>
            Unsere exklusiven Integrationspartner
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 lg:hidden">
            Verknüpfe Powerbook mit deinem Darlean und Nexoro Konto und halte Daten automatisch synchron – sicher, transparent und jederzeit widerrufbar.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 hidden lg:block">
            Verknüpfe Powerbook mit deinem Darlean und Nexoro Konto und halte <br />
            Daten automatisch synchron – sicher, transparent und jederzeit widerrufbar.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto justify-center place-items-center">
          {INTEGRATIONS.map((it, idx) => {
            const iconSrc = `/images/icons/${it.key}.svg`;
            return (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                viewport={{ once: true, margin: "-60px" }}
                className="h-full w-full"
              >
                <Link
                  href={it.href}
                  target="_blank"
                  className={cx(
                    // Karten größer gemacht (mehr Padding), sonst unverändert
                    "group block h-full rounded-2xl border border-black/5 bg-white p-6 lg:p-8",
                    "shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:border-black/10 hover:shadow-md transition"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Innere Border entfernt (kein ring-1) – Icon-Größe bleibt wie zuvor */}
                    <span className="rounded-xl p-2 bg-white/80 backdrop-blur-sm">
                      <span className="grid h-10 w-10 place-items-center rounded-lg">
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

                  <div className="mt-5 flex items-center justify-between">
                    <StatusPill status={it.status ?? "available"} />
                    <span className="text-[11px] text-gray-400">API & More</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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
