"use client";

import { CREAM, display, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import { Building2, Users2, NotebookPen, ListTodo } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function ValuePillars() {
  return (
    <section className="py-16" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: Building2, title: "Eigenes Branding & Domain", text: "Ihr Logo, Farben, Sub-/Custom-Domain – konsistentes Markenerlebnis für Team & Kund:innen." },
            { icon: Users2, title: "Mitarbeiter global verwalten", text: "Rollen & Rechte, Gruppen, Teams – zentral steuerbar. Optional SSO/SCIM." },
            { icon: NotebookPen, title: "Projekte & Powerbooks", text: "Struktur für Notizbücher/Projekte mit Seiten, Versionen, Tags und Freigaben." },
            { icon: ListTodo, title: "Aufgaben & Workflows", text: "To-Dos, Status & Verantwortliche, Boards & Listen, Automationen (Beta)." },
          ].map((f) => (
            <motion.div
              key={f.title}
              variants={fade}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <f.icon className="h-5 w-5" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
