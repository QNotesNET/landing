/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { display, INK, cx } from "@/lib/ui";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Server, Lock, ArrowRight } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function Hero({ texts }: { texts: any }) {
  return (
    <section
      className="-mt-16 pt-44 pb-20 text-white relative overflow-hidden"
      style={{ backgroundColor: INK }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(255,255,255,0.12),transparent)]" />
      <div className="mx-auto max-w-7xl px-4">
        <Badge className="bg-white/15 text-white backdrop-blur lg:hidden">
          {texts.badge}
        </Badge>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,640px)_1fr]"
        >
          <motion.div variants={fade}>
            <h1
              className={cx(
                display.className,
                "text-4xl sm:text-6xl leading-[1.05]"
              )}
            >
              {texts.title}{" "}
              <span className="text-white/80">{texts.titleAccent}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-white/85 text-lg">
              {texts.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={texts.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black shadow-lg shadow-black/20 hover:-translate-y-0.5 transition"
              >
                {texts.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={texts.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10"
              >
                {texts.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
              {texts.badges.map((b: { icon: string; label: string }) => {
                const Icon =
                  b.icon === "shield"
                    ? ShieldCheck
                    : b.icon === "server"
                    ? Server
                    : Lock;
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" /> {b.label}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Mockup rechts */}
          <motion.div variants={fade} className="relative hidden lg:block">
            <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur shadow-2xl">
              <div className="rounded-2xl bg-white/90 p-4 shadow">
                {/* Dummy Dashboard */}
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 rounded bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border p-3 bg-gray-50/50 h-28"
                    />
                  ))}
                </div>
                <div className="mt-4 rounded-lg border">
                  <div className="grid grid-cols-4 gap-2 border-b p-3 text-xs text-gray-500">
                    <div>Projekt</div>
                    <div>Owner</div>
                    <div>Status</div>
                    <div>Fällig</div>
                  </div>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 gap-2 p-3 text-xs text-gray-500"
                    >
                      <div className="h-3 w-24 rounded bg-gray-200" />
                      <div className="h-3 w-20 rounded bg-gray-200" />
                      <div className="h-3 w-16 rounded bg-gray-200" />
                      <div className="h-3 w-12 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -inset-10 -z-10 blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(400px 200px at 60% 40%, rgba(255,255,255,.25), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
