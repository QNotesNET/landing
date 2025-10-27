/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { display, cx } from "@/lib/ui";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
const Features = ({
  stagger,
  fade,
  HERO_IMG,
  features,
  left,
}: {
  stagger: any;
  fade: any;
  HERO_IMG: string;
  features: any;
  left?: boolean;
}) => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-2"
        >
          {features.map((feature: any, index: number) => (
            <>
              {feature.left ? (
                <>
                  <motion.div
                    variants={fade}
                    className="overflow-hidden rounded-2xl border bg-white"
                  >
                    <img
                      src={HERO_IMG}
                      alt=""
                      className="h-64 w-full object-cover sm:h-96"
                    />
                  </motion.div>
                  <motion.div
                    variants={fade}
                    className="flex flex-col justify-center"
                  >
                    <h2
                      className={cx(
                        display.className,
                        "text-2xl leading-tight"
                      )}
                    >
                      {feature.title}
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      {feature.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    variants={fade}
                    className="order-last flex flex-col justify-center lg:order-none"
                  >
                    <h2
                      className={cx(
                        display.className,
                        "text-2xl leading-tight"
                      )}
                    >
                      {feature.title}
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      {feature.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    variants={fade}
                    className="overflow-hidden rounded-2xl border bg-white"
                  >
                    <img
                      src={HERO_IMG}
                      alt=""
                      className="h-64 w-full object-cover sm:h-96"
                    />
                  </motion.div>
                </>
              )}
            </>
          ))}

          {/* 
          <div>

          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
