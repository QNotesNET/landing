// components/Hero.tsx
"use client";

import Link from "next/link";
import { ChevronRight, Scan, Search, Sparkles } from "lucide-react";
import { CREAM, cx, display, inter } from "@/lib/ui";

type HeroTexts = {
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: { scan: string; search: string; ai: string };
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function Hero({ texts }: { texts: HeroTexts }) {
  return (
    <section className="relative isolate min-h-[100vh]">
      <img
        src="/images/3.png"
        alt="Minimaler Arbeitsplatz mit Notizbuch"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Vignetten / Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_35%_18%,rgba(0,0,0,0.55),transparent)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.44) 35%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.08) 78%, ${CREAM} 95%, #ffffff 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 right-1/4 bg-gradient-to-r from-black/75 via-black/45 to-transparent sm:right-1/5 lg:right-1/3" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 items-center px-4 pt-24 pb-24 sm:px-6 lg:grid-cols-[minmax(0,680px)_1fr] lg:px-8">
        <div className="text-white text-left">
          <h1
            className={cx(
              display.className,
              "text-4xl sm:text-5xl lg:text-6xl leading-tight sm:leading-[1.05]"
            )}
            style={{ textShadow: "0 4px 18px rgba(0,0,0,.45)" }}
          >
            <span className="block whitespace-nowrap">{texts.titleLine1}</span>
            <span className="block whitespace-nowrap">{texts.titleLine2}</span>
          </h1>

          <p
            className={cx(
              inter.className,
              "mt-5 max-w-2xl text-[15px] sm:text-[17px] text-white/90"
            )}
          >
            {texts.description}
          </p>

          <ul className="mt-5 grid max-w-2xl grid-cols-1 gap-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <Scan className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{texts.features.scan}</span>
            </li>
            <li className="flex items-start gap-2">
              <Search className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{texts.features.search}</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{texts.features.ai}</span>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="https://my.powrbook.com/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#2D2825] px-5 py-3 font-medium text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 transition"
            >
              {texts.ctaPrimary}
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#how"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white backdrop-blur hover:bg-white/20"
            >
              {texts.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
