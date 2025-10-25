"use client";

import { CREAM } from "@/lib/ui";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Lock } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function SecurityCompliance() {
  return (
    <section className="py-16" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Security by Design",
              text: "TLS, ruhende Verschlüsselung auf der Plattform, rollenbasierte Rechte, Protokollierung.",
            },
            {
              icon: Server,
              title: "EU-Hosting",
              text: "Datenhaltung in der EU, AV-Verträge, Backups mit rollierendem Retention-Plan.",
            },
            {
              icon: Lock,
              title: "SSO/SCIM (optional)",
              text: "Anbindung an Ihre IdP-Landschaft für Login & Provisionierung.",
            },
          ].map((b) => (
            <motion.div
              key={b.title}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <b.icon className="h-5 w-5" />
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
