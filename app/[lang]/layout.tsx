// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((l) => ({ lang: l }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
