"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter, cx } from "@/lib/ui";

import Hero from "@/components/business/Hero";
import Pricing from "@/components/business/Pricing";
import ValuePillars from "@/components/business/ValuePillars";
import FeatureStrips from "@/components/business/FeatureStrips";
import SecurityCompliance from "@/components/business/SecurityCompliance";
import ContactCTA from "@/components/business/ContactCTA";


export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      {/* <Header /> */}
      <Hero />
      <ValuePillars />
      <FeatureStrips />
      <SecurityCompliance />
      <Pricing />
      <ContactCTA />
      <Footer />
    </main>
  );
}
