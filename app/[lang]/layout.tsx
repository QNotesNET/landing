/* eslint-disable @typescript-eslint/no-explicit-any */

// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

const LOCALES = ["de", "en", "ru"] as const;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as any)) notFound();

  // ⚠️ Kein <html>/<body> hier!
  return <>{children}</>;
}
