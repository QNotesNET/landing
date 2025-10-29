/* eslint-disable @typescript-eslint/no-explicit-any */

// app/[lang]/page.tsx
import { getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';

const LOCALES = ['de', 'en'] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as any)) notFound();
  const t = await getDictionary(lang as 'de' | 'en');

  return (
    <main>
      <h1>{t.home.title}</h1>
      {/* Füge hier deinen bisherigen Page‑Inhalt ein */}
      <a href="#start">{t.home.cta}</a>
    </main>
  );
}
