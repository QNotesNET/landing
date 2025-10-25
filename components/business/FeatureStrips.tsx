"use client";

import { display, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BarChart3, Palette, Globe, Contact, Layers, ListTodo, CalendarClock } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function FeatureStrips() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 space-y-16">
        {/* Strip 1 */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          <motion.div variants={fade}>
            <Badge className="bg-black/5 text-gray-900">Dashboard</Badge>
            <h2 className={cx(display.className, "mt-3 text-3xl sm:text-4xl leading-tight")}>
              Ein zentrales Business-Dashboard
            </h2>
            <p className="mt-3 text-gray-700">
              KPIs, Termine, Aufgaben und Projektstatus auf einen Blick – individuell je Rolle.
              Widgets für Team-Auslastung, To-Do-Burndown, Kalender, Kontakte und Notiz-Streams.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Drag-&-Drop Widgets</li>
              <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Team-/Projektfilter</li>
              <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Export & Berichte</li>
            </ul>
          </motion.div>
          <motion.div variants={fade} className="rounded-3xl border bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm">
            <BarChart3 className="h-8 w-8 text-gray-600" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-24 rounded-lg bg-gray-100" />
              <div className="h-24 rounded-lg bg-gray-100" />
              <div className="col-span-2 h-28 rounded-lg bg-gray-100" />
            </div>
          </motion.div>
        </motion.div>

        {/* Strip 2 */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid items-center gap-10 lg:grid-cols-2 lg:[&>div:first-child]:order-2"
        >
          <motion.div variants={fade}>
            <Badge className="bg-black/5 text-gray-900">Branding</Badge>
            <h2 className={cx(display.className, "mt-3 text-3xl sm:text-4xl leading-tight")}>
              Eigenes Branding & eigene Domain
            </h2>
            <p className="mt-3 text-gray-700">
              Whitelabel-Oberfläche mit Logo, Farben und Hostname (z. B. <em>notes.ihre-domain.at</em>).
              Einheitliches Erlebnis über Web & Mobile – für interne Teams und Clients.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">Logo/Colors</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">Custom Domain</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">E-Mail-Templates</span>
            </div>
          </motion.div>
          <motion.div variants={fade} className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Palette className="h-6 w-6" />
              <Globe className="h-6 w-6" />
            </div>
            <div className="mt-4 h-40 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50" />
          </motion.div>
        </motion.div>

        {/* Strip 3 */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          <motion.div variants={fade}>
            <Badge className="bg-black/5 text-gray-900">Arbeiten</Badge>
            <h2 className={cx(display.className, "mt-3 text-3xl sm:text-4xl leading-tight")}>
              Kontakte, Projekte, Aufgaben & Kalender
            </h2>
            <p className="mt-3 text-gray-700">
              CRM-light für Teams: Kontakte & Firmen, Powerbooks/Projekte,
              Aufgaben mit Verantwortlichen, Deadlines & Abhängigkeiten,
              Kalender (ICS-Import/Export), Notiz-Streams.
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <li className="flex items-center gap-2"><Contact className="h-4 w-4" /> Kontakt-/Firma-Datensätze</li>
              <li className="flex items-center gap-2"><Layers className="h-4 w-4" /> Powerbooks/Projekte</li>
              <li className="flex items-center gap-2"><ListTodo className="h-4 w-4" /> Boards & Listen</li>
              <li className="flex items-center gap-2"><CalendarClock className="h-4 w-4" /> Kalender & Termine</li>
            </ul>
          </motion.div>
          <motion.div variants={fade} className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 h-32 rounded-xl bg-gray-100" />
              <div className="h-32 rounded-xl bg-gray-100" />
              <div className="col-span-3 h-28 rounded-xl bg-gray-100" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
