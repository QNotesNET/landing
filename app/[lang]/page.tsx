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
import ExclusivePartner from "@/components/ExclusivePartner";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const LOCALES = ["de", "en", "ru"] as const;

export async function generateStaticParams(): Promise<{ lang: string }[]> {
  return LOCALES.map((lang) => ({ lang }));
}

// ✅ KORREKTER PARAM-TYP für Next.js App Router
interface PageProps {
  params: { lang: string };
}

export default async function HomePage({ params }: any)
{
  const { lang } = params;

  // Validierung der Sprache
  if (!LOCALES.includes(lang as (typeof LOCALES)[number])) {
    notFound();
  }

  // Dynamisches Dictionary laden
  const t = await getDictionary(lang as "de" | "en" | "ru");

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
            ru: t.header.language.ru,
          },
        }}
      />

      <Hero texts={t.hero} />
      <How texts={t.how} />

      {/* @ts-expect-error --- */}
      <AppPreview texts={t.appPreview} />
      {/* @ts-expect-error --- */}
      <DashboardPreview texts={t.dashboard} />
      {/* @ts-expect-error --- */}
      <ExclusivePartner texts={t.exclusivePartner} />
      {/* @ts-expect-error --- */}
      <Integrations texts={t.integrations} />

      <Pricing texts={t.pricing} />
      <FAQ texts={t.faq} />
      <Footer texts={t.footer} />
    </main>
  );
}
