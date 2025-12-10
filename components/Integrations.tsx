"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowPathIcon,
  LinkIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { cx, display } from "@/lib/ui";

type Integration = {
  key: string;
  name: string;
  href: string;
  desc: string;
  status?: "connected" | "available";
};

type IntegrationTexts = {
  heading: string;
  description: string;
  integrations: Integration[];
  features: { title: string; desc: string; icon: "sync" | "shield" | "link" }[];
  labels: {
    open: string;
    api: string;
    connected: string;
    available: string;
    cta: string;
  };
};

const iconMap = {
  sync: ArrowPathIcon,
  shield: ShieldCheckIcon,
  link: LinkIcon,
};

export default function Integrations({ texts }: { texts: IntegrationTexts }) {
  return (
    <section id="integrations" className="relative bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 pb-25">
        {/* Heading */}
        <div className="text-center">
          <h2
            className={cx(
              display.className,
              "text-3xl sm:text-4xl tracking-tight"
            )}
          >
            {texts.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 lg:hidden">
            {texts.description}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 hidden lg:block">
            {texts.description}
          </p>
        </div>

        {/* Integration Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {texts.integrations.map((it, idx) => {
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
                    <span className="rounded-xl p-2 ring-1 ring-inset ring-black/5 bg-white/80 backdrop-blur-sm">
                      <span className="grid h-10 w-10 place-items-center rounded-lg">
                        <Image
                          src={iconSrc}
                          alt={`${it.name} Logo`}
                          width={40}
                          height={40}
                          className="h-[40px] w-[40px] object-contain"
                        />
                      </span>
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold tracking-tight">
                          {it.name}
                        </h3>
                        <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-500">
                          {texts.labels.open}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-3 text-xs text-gray-600">
                        {it.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <StatusPill
                      status={it.status ?? "available"}
                      labels={texts.labels}
                    />
                    <span className="text-[11px] text-gray-400">
                      {texts.labels.api}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Value bullets */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {texts.features.map((feat) => {
            const Icon = iconMap[feat.icon];
            return (
              <Feature
                key={feat.title}
                icon={Icon}
                title={feat.title}
                desc={feat.desc}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="mailto:info@powrbook.com"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            {texts.labels.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatusPill({
  status,
  labels,
}: {
  status: "connected" | "available";
  labels: IntegrationTexts["labels"];
}) {
  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700 ring-1 ring-inset ring-green-200">
        {labels.connected}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-700 ring-1 ring-inset ring-gray-200">
      {labels.available}
    </span>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
      <div className="flex items-start gap-3">
        <span className="rounded-xl border border-black/10 bg-gray-50 p-2">
          <Icon className="h-5 w-5 text-gray-700" />
        </span>
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-xs text-gray-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}
