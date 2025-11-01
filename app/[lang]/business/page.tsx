/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter, cx } from "@/lib/ui";

import Hero from "@/components/business/Hero";
import Pricing from "@/components/business/Pricing";
import ValuePillars from "@/components/business/ValuePillars";
import FeatureStrips from "@/components/business/FeatureStrips";
import SecurityCompliance from "@/components/business/SecurityCompliance";
import ContactCTA from "@/components/business/ContactCTA";

export default function BusinessPage(props: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = use(props.params); // <– hier Promise auflösen
  const [t, setT] = useState<any>(null);

  useEffect(() => {
    async function loadLang() {
      try {
        const translations = await import(`@/lib/dictionaries/${lang}.json`);
        setT(translations.default);
      } catch (err) {
        const fallback = await import("@/lib/dictionaries/de.json");
        setT(fallback.default);
      }
    }
    loadLang();
  }, [lang]);

  if (!t) return null;

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header texts={t.header} />
      <Hero texts={t.business.hero} />
      <ValuePillars texts={t.business.valuePillars} />
      {/* <FeatureStrips texts={t.business.featureStrips} /> */}
      {/* <SecurityCompliance texts={t.business.securityCompliance} /> */}
      <Pricing texts={t.business.pricing} />
      <ContactCTA texts={t.business.contactCTA} />
      <Footer texts={t.footer} />
    </main>
  );
}
