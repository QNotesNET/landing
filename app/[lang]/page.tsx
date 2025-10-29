/* eslint-disable @typescript-eslint/no-explicit-any */

// app/[lang]/page.tsx
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { cx, inter } from "@/lib/ui";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import How from "@/components/How";
import AppPreview from "@/components/AppPreview";
import DashboardPreview from "@/components/DashboardPreview";
import { ExclusivePartner } from "@/components/ExclusivePartner";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const LOCALES = ["de", "en"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as any)) notFound();

  const t = await getDictionary(lang as "de" | "en");

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header
        texts={{
          nav: {
            how: t.header.nav.how,
            pricing: t.header.nav.pricing,
            shop: t.header.nav.shop,
            app: t.header.nav.app,
            business: t.header.nav.business,
          },
          login: t.header.login,
          cta: t.header.cta,
          language: {
            label: t.header.language.label,
            de: t.header.language.de,
            en: t.header.language.en,
          },
        }}
      />

      <Hero
        // title={t.home?.title ?? "Powerbook"}
        // subtitle={t.home?.subtitle ?? ""}
        // ctaLabel={t.home?.cta ?? "Get started"}
      />

      <How />
      <AppPreview />
      <DashboardPreview />
      <ExclusivePartner />
      <Integrations />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
