/* eslint-disable @typescript-eslint/no-explicit-any */

// app/datenschutz/[lang]/page.tsx
import { getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';

const LOCALES = ['de', 'en'] as const;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as any)) notFound();
  const t = await getDictionary(lang as 'de' | 'en');

  return (
    <main>
      <h1>{t.datenschutz.heading}</h1>
      <p>{t.datenschutz.content}</p>
      {/* Hier fügst du deinen bisherigen Datenschutz‑Inhalt ein */}
    </main>
  );
}
