/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { display, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  BarChart3,
  Palette,
  Globe,
  Contact,
  Layers,
  ListTodo,
  CalendarClock,
} from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function FeatureStrips({ texts }: { texts: any }) {
  const ICONS: Record<string, any> = {
    barchart: BarChart3,
    palette: Palette,
    globe: Globe,
    contact: Contact,
    layers: Layers,
    todo: ListTodo,
    calendar: CalendarClock,
    check: BadgeCheck,
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 space-y-16">
        {texts.items.map((item: any, i: number) => (
          <motion.div
            key={i}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={cx(
              "grid items-center gap-10 lg:grid-cols-2",
              i % 2 === 1 && "lg:[&>div:first-child]:order-2"
            )}
          >
            <motion.div variants={fade}>
              <Badge className="bg-black/5 text-gray-900">{item.badge}</Badge>
              <h2
                className={cx(
                  display.className,
                  "mt-3 text-3xl sm:text-4xl leading-tight"
                )}
              >
                {item.title}
              </h2>
              <p className="mt-3 text-gray-700">{item.text}</p>

              {/* Bullets oder Tags */}
              {item.bullets && (
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {item.bullets.map((b: any, idx: number) => {
                    const Icon = ICONS[b.icon] ?? BadgeCheck;
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" /> {b.label}
                      </li>
                    );
                  })}
                </ul>
              )}

              {item.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Rechte Grafikfläche (Dummy bleibt statisch) */}
            <motion.div
              variants={fade}
              className="rounded-3xl border bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm"
            >
              {item.icon && (
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {(item.icon as string[]).map((ic: string, idx: number) => {
                      const Icon = ICONS[ic] ?? BarChart3;
                      return (
                        <Icon key={idx} className="h-6 w-6 text-gray-600" />
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-24 rounded-lg bg-gray-100" />
                <div className="h-24 rounded-lg bg-gray-100" />
                <div className="col-span-2 h-28 rounded-lg bg-gray-100" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
