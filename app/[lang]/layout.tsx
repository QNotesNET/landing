// app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

// Welche Sprachen unterstützt werden
const LOCALES = ["de", "en"] as const;

// Fonts einbinden wie bisher
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Statische Metadaten (optional später pro Sprache anpassbar)
export const metadata: Metadata = {
  title: "Powerbook - Analog schreiben. Digital organisiert.",
  description:
    "Schreibe auf Papier – Powerbook macht den Rest: scannen, sauber ordnen, durchsuchen. AI erkennt Aufgaben & Highlights, übergibt Termine an deinen Kalender und synchronisiert mit iOS, Android & Web.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

// Für statische Prerendering der Sprachen (Next.js 15)
export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Hauptlayout, akzeptiert params als Promise in Next.js 15
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  // Ungültige Sprache? -> 404
  if (!LOCALES.includes(lang as (typeof LOCALES)[number])) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
