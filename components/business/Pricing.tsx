"use client";

import { display, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl border bg-white p-8 shadow-sm"
          >
            <Badge className="bg-black/5 text-gray-900">Business</Badge>
            <h3 className={cx(display.className, "mt-3 text-2xl leading-tight")}>Team</h3>
            <p className="mt-2 text-sm text-gray-600">
              Alles für kleine bis mittlere Teams – volle Powerbook-Funktionalität mit Team-Features.
            </p>
            <div className="mt-6 text-4xl font-semibold">
              €9<span className="text-base font-normal text-gray-500"> / Nutzer:in / Monat</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li>Projekte, Kontakte, Boards/Listen</li>
              <li>Kalender, Notiz-Streams, Exporte</li>
              <li>Rollen/Rechte, Gruppen</li>
            </ul>
            <Link
              href="/signup"
              className="mt-8 inline-flex rounded-xl bg-black px-5 py-3 text-white shadow hover:-translate-y-0.5 transition"
            >
              Jetzt starten
            </Link>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm"
          >
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              <Sparkles className="h-3 w-3" /> Beliebt
            </span>
            <Badge className="bg-black/5 text-gray-900">Business</Badge>
            <h3 className={cx(display.className, "mt-3 text-2xl leading-tight")}>Enterprise</h3>
            <p className="mt-2 text-sm text-gray-600">
              Für größere Organisationen mit Compliance- und Integrations-anforderungen.
            </p>
            <div className="mt-6 text-4xl font-semibold">Auf Anfrage</div>
            <ul className="mt-6 space-y-2 text-sm">
              <li>Custom Domain & Branding</li>
              <li>SSO/SCIM, IdP-Integration</li>
              <li>Premium-Support & SLA</li>
            </ul>
            <Link
              href="#kontakt"
              className="mt-8 inline-flex rounded-xl border px-5 py-3 hover:bg-black/5 transition"
            >
              Gespräch vereinbaren
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
