/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { display, INK, cx } from "@/lib/ui";
import Link from "next/link";
import { motion } from "framer-motion";
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

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col items-center text-center"
        >
          <motion.h1
            variants={fade}
            className={cx(
              display.className,
              "text-4xl sm:text-6xl leading-[1.05] max-w-4xl"
            )}
          >
            {texts.title} <span className="text-white/80">{texts.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={fade}
            className="mt-5 max-w-2xl text-white/85 text-lg"
          >
            {texts.subtitle}
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-wrap justify-center gap-3">
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
          </motion.div>

          <motion.div
            variants={fade}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70"
          >
            {texts.badges.map((b: { icon: string; label: string }) => {
              const Icon =
                b.icon === "shield"
                  ? ShieldCheck
                  : b.icon === "server"
                  ? Server
                  : Lock;
              return (
                <span key={b.label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {b.label}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
