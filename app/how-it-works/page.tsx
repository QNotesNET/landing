"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";

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

// Animations wie auf Business
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const Pill: React.FC<{ label: string; caption?: string }> = ({ label, caption }) => (
  <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
    <span className="font-semibold">{label}</span>
    {caption && <span className="text-gray-500">{caption}</span>}
  </div>
);

export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header />

      {/* HERO – reduziert, ikonisch */}
      <section
        className="-mt-16 pt-44 pb-12 text-white"
        style={{ backgroundColor: INK }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <motion.div variants={fade} initial="hidden" animate="show" className="text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <QrCode className="h-3.5 w-3.5" /> Kurzanleitung
            </span>

            <h1 className={cx(display.className, "mt-4 text-4xl sm:text-5xl leading-[1.05]")}>
              So funktioniert <span className="text-white/80">Powerbook</span>
            </h1>

            <p className="mt-3 max-w-2xl text-white/85">
              Schreiben wie immer. <strong>Aktion</strong> {""}
              <strong>Einkreisen</strong>, Scannen. Fertig.
            </p>

            {/* Icon-Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
              <div className="inline-flex items-center gap-2"><PenLine className="h-5 w-5" /> Schreiben</div>
              <div className="inline-flex items-center gap-2"><Circle className="h-5 w-5" /> Einkreisen</div>
              <div className="inline-flex items-center gap-2"><Camera className="h-5 w-5" /> Scannen</div>
              <div className="inline-flex items-center gap-2"><Sparkles className="h-5 w-5" /> Automatisch sortiert</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KEYWORDS – "KEYWORD / AKTION" + HARTE REGEL: zählt nur, wenn eingekreist */}
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
              <h2 className={cx(display.className, "text-2xl sm:text-3xl leading-tight")}>
                KEYWORD <span className="text-gray-400">/</span> AKTION
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Schreibe ein <strong>KEYWORD</strong> neben deinen Punkt und <strong>kreise es ein</strong>.{" "}
              </p>
            </motion.div>

            <motion.ul
              variants={stagger}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {/* TODO */}
              <motion.li variants={fade} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <Pill label="KEYWORD" />
                  <Circle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-wide">TODO</div>
                <div className="mt-1 text-xs uppercase text-gray-500">AKTION</div>
                <div className="text-sm">Erstellt eine Aufgabe in <em>Aufgaben</em>.</div>
                <div className="mt-3 text-xs text-gray-500">Optional: + Datum/Uhrzeit in der Notiz.</div>
              </motion.li>

              {/* CAL */}
              <motion.li variants={fade} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <Pill label="KEYWORD" />
                  <Circle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-wide">CAL</div>
                <div className="mt-1 text-xs uppercase text-gray-500">AKTION</div>
                <div className="text-sm">Erstellt einen Termin im <em>Kalender</em>.</div>
                <div className="mt-3 text-xs text-gray-500">Optional: Uhrzeit/Datum mitschreiben.</div>
              </motion.li>

              {/* WA */}
              <motion.li variants={fade} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <Pill label="KEYWORD" />
                  <Circle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-wide">WA</div>
                <div className="mt-1 text-xs uppercase text-gray-500">AKTION</div>
                <div className="text-sm">Teilt den erkannten Ausschnitt via <em>WhatsApp</em>.</div>
                <div className="mt-3 text-xs text-gray-500">Perfekt für Team-Updates.</div>
              </motion.li>

              {/* CO */}
              <motion.li variants={fade} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <Pill label="KEYWORD" />
                  <Circle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-wide">CO</div>
                <div className="mt-1 text-xs uppercase text-gray-500">AKTION</div>
                <div className="text-sm">Legt einen neuen Kontakt in <em>Kontakte</em> an.</div>
                <div className="mt-3 text-xs text-gray-500">Name/Telefon/Notiz – wie geschrieben.</div>
              </motion.li>
            </motion.ul>

            {/* HARTE REGEL */}
            <motion.div
              variants={fade}
              className="rounded-xl border border-black/10 bg-black/5 p-4 text-sm"
            >
              <div className="flex items-center gap-2 font-semibold">
                <Circle className="h-4 w-4" /> Wichtig:
              </div>
              <p className="mt-1 text-gray-800">
                Ein KEYWORD zählt nur, wenn es einkreist ist.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SCHRITTE – super simpel */}
      {/* <section className="pb-10">
        <div className="mx-auto max-w-6xl px-4">
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4"
          >
            <motion.li variants={fade} className="rounded-xl border p-4">
              <div className="text-xs uppercase text-gray-500">Schritt 1</div>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <PenLine className="h-5 w-5" /> normal schreiben
              </div>
              <p className="mt-1 text-gray-700">
                Notiere deine Punkte wie gewohnt – kein QR, keine Ablenkung.
              </p>
            </motion.li>

            <motion.li variants={fade} className="rounded-xl border p-4">
              <div className="text-xs uppercase text-gray-500">Schritt 2</div>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <Circle className="h-5 w-5" /> KEYWORD daneben & einkreisen
              </div>
              <p className="mt-1 text-gray-700">
                Schreibe <strong>TODO</strong>, <strong>CAL</strong>, <strong>WA</strong> oder <strong>CO</strong> –{" "}
                <u>und kreise es ein</u>.
              </p>
            </motion.li>

            <motion.li variants={fade} className="rounded-xl border p-4">
              <div className="text-xs uppercase text-gray-500">Schritt 3</div>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <Camera className="h-5 w-5" /> scannen
              </div>
              <p className="mt-1 text-gray-700">
                App öffnen, kurz drüber halten – Ränder & Perspektive erkennt Powerbook automatisch.
              </p>
            </motion.li>

            <motion.li variants={fade} className="rounded-xl border p-4">
              <div className="text-xs uppercase text-gray-500">Schritt 4</div>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <Sparkles className="h-5 w-5" /> fertig
              </div>
              <p className="mt-1 text-gray-700">
                Die App legt Aufgaben, Termine, Kontakte an oder teilt den Ausschnitt – ganz automatisch.
              </p>
            </motion.li>
          </motion.ol>
        </div>
      </section> */}

      {/* MINILEGENDE: wohin geht's? – neutraler Look */}
      <section className="py-12" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 font-semibold">
                <ListTodo className="h-4 w-4" /> Aufgaben
              </div>
              <p className="mt-1 text-gray-700">Alle TODOs – mit Priorität & Fälligkeit.</p>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 font-semibold">
                <Calendar className="h-4 w-4" /> Kalender
              </div>
              <p className="mt-1 text-gray-700">CAL wird zu Terminen – ICS kompatibel.</p>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 font-semibold">
                <Contact className="h-4 w-4" /> Kontakte
              </div>
              <p className="mt-1 text-gray-700">CO legt neue Kontakte an.</p>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 font-semibold">
                <MessageCircle className="h-4 w-4" /> Weiterleiten
              </div>
              <p className="mt-1 text-gray-700">WA teilt Ausschnitte z. B. via WhatsApp.</p>
            </div>
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
                In 30 Sekunden ausprobieren
              </h3>
              <p className="mt-1 text-gray-700 text-sm">
                Beispiel: <strong>TODO Neues Angebot</strong> schreiben & einkreisen → scannen → Aufgabe erstellt.
              </p>
            </div>
            <Link
              href="https://my.powerbook.at/login"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white shadow hover:-translate-y-0.5 transition sm:mt-0"
            >
              App öffnen <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
