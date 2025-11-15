/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

const LOCALES = ["de", "en", "ru"] as const;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  if (!LOCALES.includes(lang)) notFound();

  const t = await getDictionary(lang);

  return {
    title: t.meta?.title ?? "Powerbook",
    description: t.meta?.description ?? "",
  };
}

export default function LangLayout({ children, params }: any) {
  const lang = params.lang;

  if (!LOCALES.includes(lang)) notFound();

  return <>{children}</>;
}
