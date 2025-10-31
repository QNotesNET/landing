/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

const LOCALES = ["de", "en", "ru"] as const;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang as (typeof LOCALES)[number];
  if (!LOCALES.includes(lang)) notFound();

  const t = await getDictionary(lang);
  return {
    title: t.meta?.title ?? "Powerbook",
    description: t.meta?.description ?? "",
  };
}

async function LangLayoutComponent({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;
  if (!LOCALES.includes(lang as any)) notFound();

  return <>{children}</>;
}

export default LangLayoutComponent as unknown as (props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) => Promise<ReactNode>;
