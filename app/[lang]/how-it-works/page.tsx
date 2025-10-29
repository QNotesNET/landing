/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PenLine,
  Circle,
  Camera,
  Calendar,
  ListTodo,
  MessageCircle,
  Contact,
  Sparkles,
  ArrowRight,
  QrCode,
} from "lucide-react";
import { use, useEffect, useState } from "react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const ICONS: Record<string, any> = {
  PenLine,
  Circle,
  Camera,
  Calendar,
  ListTodo,
  MessageCircle,
  Contact,
  Sparkles,
  QrCode,
  ArrowRight,
};

const Pill = ({ label, caption }: { label: string; caption?: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
    <span className="font-semibold">{label}</span>
    {caption && <span className="text-gray-500">{caption}</span>}
  </div>
);

export default function Page(props: { params: Promise<{ lang: string }> }) {
  const { lang } = use(props.params);
  const [t, setT] = useState<any>(null);

  useEffect(() => {
    async function loadLang() {
      try {
        const translations =
          lang === "en"
            ? await import("@/lib/dictionaries/en.json")
            : await import("@/lib/dictionaries/de.json");
        setT(translations.default);
      } catch (err) {
        console.error("Fehler beim Laden der Sprachdatei:", err);
        const fallback = await import("@/lib/dictionaries/de.json");
        setT(fallback.default);
      }
    }
    loadLang();
  }, [lang]);

  if (!t) return null;

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header texts={t.header} />

      {/* HERO */}
      <section
        className="-mt-16 pt-44 pb-12 text-white"
        style={{ backgroundColor: INK }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <QrCode className="h-3.5 w-3.5" /> {t.howItWorks.hero.badge}
            </span>

            <h1
              className={cx(
                display.className,
                "mt-4 text-4xl sm:text-5xl leading-[1.05]"
              )}
            >
              {t.howItWorks.hero.title}{" "}
              <span className="text-white/80">Powerbook</span>
            </h1>

            <p className="mt-3 max-w-2xl text-white/85">
              {t.howItWorks.hero.text}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
              {t.howItWorks.hero.icons.map((i: any) => {
                const Icon = ICONS[i.icon];
                return (
                  <div key={i.icon} className="inline-flex items-center gap-2">
                    <Icon className="h-5 w-5" /> {i.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* KEYWORDS */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <motion.div variants={fade}>
              <h2
                className={cx(
                  display.className,
                  "text-2xl sm:text-3xl leading-tight"
                )}
              >
                {t.howItWorks.keywords.heading}
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                {t.howItWorks.keywords.sub}
              </p>
            </motion.div>

            <motion.ul
              variants={stagger}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {t.howItWorks.keywords.items.map((kw: any) => (
                <motion.li
                  key={kw.code}
                  variants={fade}
                  className="rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between">
                    <Pill label={kw.pillLabel} />
                    <Circle className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-wide">
                    {kw.code}
                  </div>
                  <div className="mt-1 text-xs uppercase text-gray-500">
                    {kw.actionLabel}
                  </div>
                  <div className="text-sm">{kw.desc}</div>
                  <div className="mt-3 text-xs text-gray-500">{kw.note}</div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fade}
              className="rounded-xl border border-black/10 bg-black/5 p-4 text-sm"
            >
              <div className="flex items-center gap-2 font-semibold">
                <Circle className="h-4 w-4" /> {t.howItWorks.keywords.ruleTitle}
              </div>
              <p className="mt-1 text-gray-800">
                {t.howItWorks.keywords.ruleText}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-12" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.howItWorks.destinations.map((d: any) => {
              const Icon = ICONS[d.icon];
              return (
                <div key={d.icon} className="rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Icon className="h-4 w-4" /> {d.title}
                  </div>
                  <p className="mt-1 text-gray-700">{d.text}</p>
                </div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 flex flex-col items-start rounded-2xl border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className={cx(display.className, "text-xl leading-tight")}>
                {t.howItWorks.cta.title}
              </h3>
              <p className="mt-1 text-gray-700 text-sm">
                {t.howItWorks.cta.text}
              </p>
            </div>
            <Link
              href={t.howItWorks.cta.button.href}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white shadow hover:-translate-y-0.5 transition sm:mt-0"
            >
              {t.howItWorks.cta.button.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer texts={t.footer} />
    </main>
  );
}
