/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Mail, Phone, Globe, Scale } from "lucide-react";
import Link from "next/link";

export default function Page(props: { params: Promise<{ lang: string }> }) {
  const { lang } = use(props.params);
  const [t, setT] = useState<any>(null);

  useEffect(() => {
    async function loadLang() {
      try {
        const translations = await import(`@/lib/dictionaries/${lang}.json`);
        setT(translations.default);
      } catch (err) {
        const fallback = await import("@/lib/dictionaries/de.json");
        setT(fallback.default);
      }
    }
    loadLang();
  }, [lang]);

  if (!t) return null;
  const txt = t.impressum;

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header texts={t.header} />

      {/* HERO */}
      <section
        className="-mt-16 pt-44 pb-16 text-white"
        style={{ backgroundColor: INK }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <Badge className="bg-white/15 text-white">{txt.hero.badge}</Badge>
          <h1
            className={cx(
              display.className,
              "mt-4 text-4xl sm:text-5xl leading-tight"
            )}
          >
            {txt.hero.title}
          </h1>
          <p className="mt-3 text-white/80">{txt.hero.text}</p>
        </div>
      </section>

      {/* COMPANY */}
      <section className="py-12" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>
              {txt.company.title}
            </h2>
            <div className="mt-4 space-y-3 text-sm sm:text-base">
              <p className="font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4" /> {txt.company.name}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                {txt.company.address}
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <Link href={txt.company.url} className="underline">
                  {txt.company.urlLabel}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Link
                  href={`mailto:${txt.company.email}`}
                  className="underline"
                >
                  {txt.company.email}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                {txt.company.phone}
              </p>
            </div>

            <h3 className="mt-10 text-lg font-semibold">{txt.editor.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{txt.editor.text}</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" /> {txt.legal.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                {txt.legal.lines.map((l: string, i: number) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: l }} />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{txt.authority.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {txt.authority.text}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LIABILITY */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>
            {txt.liability.title}
          </h2>
          <div className="mt-4 space-y-4 text-sm text-gray-700">
            {txt.liability.paragraphs.map((p: string, i: number) => (
              <p
                key={i}
                className={
                  i === txt.liability.paragraphs.length - 1
                    ? "text-gray-500"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer texts={t.footer} />
    </main>
  );
}
