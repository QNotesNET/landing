"use client";

import * as React from "react";
import { motion } from "framer-motion";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export const MotionSection: React.FC<
  React.PropsWithChildren<{ delay?: number }>
> = ({ children, delay = 0 }) => (
  <motion.section
    variants={fade}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
  >
    {children}
  </motion.section>
);
