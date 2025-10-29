/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, ShieldCheck, Truck } from "lucide-react";
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

  const txt = t.agb;

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header texts={t.header} />

      {/* Hero */}
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

      {/* Einleitung */}
      <section className="py-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm text-gray-700">{txt.intro}</p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl space-y-6 px-4">
          {txt.sections.map((s: any, i: number) => {
            if (s.type === "card") {
              return (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle
                      className={s.icon ? "flex items-center gap-2" : ""}
                    >
                      {s.icon === "Handshake" && (
                        <Handshake className="h-5 w-5" />
                      )}
                      {s.icon === "ShieldCheck" && (
                        <ShieldCheck className="h-5 w-5" />
                      )}
                      {s.icon === "Truck" && <Truck className="h-5 w-5" />}
                      {s.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 space-y-2">
                    {s.paragraphs.map((p: string, j: number) => (
                      <p key={j}>{p}</p>
                    ))}
                  </CardContent>
                </Card>
              );
            }

            if (s.type === "list") {
              return (
                <div key={i}>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {s.icon === "ShieldCheck" && (
                      <ShieldCheck className="h-5 w-5" />
                    )}
                    {s.icon === "Truck" && <Truck className="h-5 w-5" />}
                    {s.title}
                  </h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {s.items.map((li: string, j: number) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <div key={i}>
                <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>
                  {s.title}
                </h2>
                <p className="mt-2 text-sm text-gray-700">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer texts={t.footer} />
    </main>
  );
}
