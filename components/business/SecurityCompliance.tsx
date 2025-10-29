/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { CREAM } from "@/lib/ui";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Lock } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function SecurityCompliance({ texts }: { texts: any }) {
  const ICONS: Record<string, any> = {
    shield: ShieldCheck,
    server: Server,
    lock: Lock,
  };

  return (
    <section className="py-16" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {texts.items.map((item: any) => {
            const Icon = ICONS[item.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={item.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <Icon className="h-5 w-5" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
