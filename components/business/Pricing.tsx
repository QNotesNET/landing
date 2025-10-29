/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { display, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Pricing({ texts }: { texts: any }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {texts.plans.map((plan: any, idx: number) => (
            <motion.div
              key={plan.title}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className={cx(
                "relative rounded-3xl border p-8 shadow-sm",
                plan.popular
                  ? "overflow-hidden bg-gradient-to-b from-white to-gray-50"
                  : "bg-white"
              )}
            >
              {plan.popular && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  <Sparkles className="h-3 w-3" /> {plan.popularLabel}
                </span>
              )}
              <Badge className="bg-black/5 text-gray-900">{plan.badge}</Badge>
              <h3
                className={cx(
                  display.className,
                  "mt-3 text-2xl leading-tight text-gray-900"
                )}
              >
                {plan.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{plan.text}</p>
              <div className="mt-6 text-4xl font-semibold text-gray-900">
                {plan.price}
                {plan.priceNote && (
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    {plan.priceNote}
                  </span>
                )}
              </div>

              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className={cx(
                  "mt-8 inline-flex rounded-xl px-5 py-3 transition",
                  plan.popular
                    ? "border hover:bg-black/5"
                    : "bg-black text-white shadow hover:-translate-y-0.5"
                )}
              >
                {plan.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
