"use client";

import { cx, inter } from "@/lib/ui";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// ⬇️ Neu: Framer Motion + dezente Fade/Stagger Presets (wie auf Business)
import { motion } from "framer-motion";
import How from "@/components/How";
import AppPreview from "@/components/AppPreview";
import DashboardPreview from "@/components/DashboardPreview";
import Integrations from "@/components/Integrations";
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const MotionSection: React.FC<React.PropsWithChildren<{ delay?: number }>> = ({
  children,
  delay = 0,
}) => (
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

export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header />

      {/* ⬇️ Jede Section nur dezent animiert beim Scroll-Eintritt */}
      <Hero />
      <MotionSection><How /></MotionSection>
      <MotionSection><AppPreview /></MotionSection>
      <MotionSection><DashboardPreview /></MotionSection>
      <MotionSection><Integrations /></MotionSection>
      <MotionSection><Pricing /></MotionSection>
      <MotionSection><FAQ /></MotionSection>
      <Footer />
    </main>
  );
}
