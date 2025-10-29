/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { CREAM, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import { Building2, Users2, NotebookPen, ListTodo } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function ValuePillars({ texts }: { texts: any }) {
  // Zuordnung Icon ↔ Key
  const ICONS: Record<string, any> = {
    building: Building2,
    users: Users2,
    notebook: NotebookPen,
    todo: ListTodo,
  };

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
          {texts.items.map((item: any) => {
            const Icon = ICONS[item.icon] ?? Building2;
            return (
              <motion.div
                key={item.title}
                variants={fade}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <Icon className="h-5 w-5" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
