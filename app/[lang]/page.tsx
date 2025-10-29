// app/[lang]/page.tsx
"use client";

import { cx, inter } from "@/lib/ui";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import How from "@/components/How";
import AppPreview from "@/components/AppPreview";
import DashboardPreview from "@/components/DashboardPreview";
import Integrations from "@/components/Integrations";
import { ExclusivePartner } from "@/components/ExclusivePartner";
import type { Locale } from "@/lib/i18n";

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

export default function Page({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = params;

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      {/* ⬇️ WICHTIG: Header erhält die aktuelle Sprache */}
      <Header current={lang} />

      {/* ⬇️ Deine Sections bleiben 1:1 gleich */}
      <Hero />
      <MotionSection><How /></MotionSection>
      <MotionSection><AppPreview /></MotionSection>
      <MotionSection><DashboardPreview /></MotionSection>
      <MotionSection><ExclusivePartner /></MotionSection>
      <MotionSection><Integrations /></MotionSection>
      <MotionSection><Pricing /></MotionSection>
      <MotionSection><FAQ /></MotionSection>
      <Footer />
    </main>
  );
}
