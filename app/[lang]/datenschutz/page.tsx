/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Database, Smartphone, UserCheck, Cookie } from "lucide-react";
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

  const txt = t.privacy;

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
          <p
            className="mt-3 text-white/80"
            dangerouslySetInnerHTML={{ __html: txt.hero.text }}
          />
        </div>
      </section>

      {/* Verantwortliche Stelle */}
      <section className="py-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>
            {txt.controller.title}
          </h2>
          <p
            className="mt-3 text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: txt.controller.text }}
          />
        </div>
      </section>

      {/* Abschnitte */}
      {txt.sections.map((s: any, i: number) => {
        const Icon =
          // @ts-expect-error ---
          { Shield, Database, Smartphone, UserCheck, Cookie }[s.icon] || null;
        return (
          <section key={i} className="py-10 bg-white">
            <div className="mx-auto max-w-5xl px-4">
              <h2
                className={cx(
                  display.className,
                  "text-2xl sm:text-3xl flex items-center gap-2"
                )}
              >
                {Icon && <Icon className="h-5 w-5" />} {s.title}
              </h2>
              {s.list ? (
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-2">
                  {s.list.map((li: string, j: number) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
                  ))}
                </ul>
              ) : (
                <p
                  className="mt-3 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: s.text }}
                />
              )}
            </div>
          </section>
        );
      })}

      {/* Kontaktbox */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <Card className="rounded-2xl border bg-white p-6 text-sm">
            <span dangerouslySetInnerHTML={{ __html: txt.contactBox }} />
          </Card>
        </div>
      </section>

      <Footer texts={t.footer} />
    </main>
  );
}
