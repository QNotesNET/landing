// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

const LOCALES = ["de", "en"] as const;

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>; // <-- Promise in v15
}) {
  const { lang } = await params; // <-- await
  if (!LOCALES.includes(lang as (typeof LOCALES)[number])) notFound();

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
