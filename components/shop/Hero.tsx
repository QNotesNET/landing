/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { display, INK, cx } from "@/lib/ui";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Size = "A5" | "A4";
type Pages = 100 | 140 | 200;

function Hero({
    stagger,
    fade,
    trackRef,
    slideTo,
    index,
    images,
    setLightboxSrc,
    discountPct,
    basePrices: BASE_PRICES,
    compareAt,
    size,
    pages,
    setSize,
    setPages,
    qty,
    setQty,
    total,
    onCheckoutClick,
}: {
    stagger: any;
    fade: any;
    trackRef: React.RefObject<HTMLDivElement>;
    slideTo: (i: number) => void;
    index: number;
    images: string[];
    setLightboxSrc: (src: string) => void;
    discountPct: number;
    basePrices: Record<string, Record<number, number>>;
    compareAt: (price: number) => number;
    size: Size;
    pages: Pages;
    setSize: (size: Size) => void;
    setPages: (pages: Pages) => void;
    qty: number;
    setQty: (qty: number | ((qty: number) => number)) => void;
    total: number;
    onCheckoutClick: () => void;
}) {
  return (
          <section
        className="-mt-16 pt-44 pb-10 text-white min-h-[110vh] flex items-center"
        style={{ backgroundColor: INK }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
          >
            {/* Galerie */}
            <motion.div variants={fade} className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="relative">
                  {/* Track */}
                  <div className="overflow-hidden">
                    <motion.div
                      ref={trackRef}
                      drag="x"
                      dragConstraints={{ left: -9999, right: 9999 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        const threshold = 50;
                        if (info.offset.x < -threshold) slideTo(index + 1);
                        if (info.offset.x > threshold) slideTo(index - 1);
                      }}
                      animate={{ x: `-${index * 100}%` }}
                      transition={{ type: "spring", stiffness: 220, damping: 28 }}
                      className="flex"
                      style={{ width: `${images.length * 100}%` }}
                    >
                      {images.map((src, i) => (
                        <button
                          key={i}
                          className="relative h-72 w-full flex-[0_0_100%] sm:h-[28rem] lg:h-[30rem]"
                          onClick={() => setLightboxSrc(src)}
                          aria-label="Bild vergrößern"
                        >
                          <Image
                            src={src}
                            alt={`Powerbook Ansicht ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={i === 0}
                          />
                        </button>
                      ))}
                    </motion.div>
                  </div>

                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => slideTo(i)}
                        className={cx(
                          "h-2.5 w-2.5 rounded-full",
                          i === index ? "bg-white" : "bg-white/40"
                        )}
                        aria-label={`Bild ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Thumbs */}
              <div className="grid grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => slideTo(i)}
                    className={cx(
                      "overflow-hidden rounded-xl border border-white/10",
                      i === index ? "ring-2 ring-white" : ""
                    )}
                    aria-label={`Vorschaubild ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Produktinfos */}
            <motion.div variants={fade} className="flex flex-col">
              <div className="mb-3 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                  -{discountPct}% Rabatt
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs">
                  3–7 Tage Versand
                </span>
              </div>

              <h1 className={cx(display.className, "text-4xl leading-tight")}>Powerbook</h1>
              <p className="mt-2 text-white/85">
                Hard-Cover, Soft-Touch. Flacher Aufschlag. 120g Papier. Dezente Seiten-Markierung
                für perfektes Scannen mit der App.
              </p>

              {/* Preis */}
              <div className="mt-4 flex items-end gap-3">
                <div className="text-3xl font-semibold tracking-tight">
                  €{BASE_PRICES[size][pages].toFixed(2)}
                </div>
                <div className="text-lg text-white/60 line-through">
                  €{compareAt(BASE_PRICES[size][pages]).toFixed(2)}
                </div>
              </div>

              {/* Optionen */}
              <div className="mt-6 space-y-5">
                {/* Format */}
                <div>
                  <div className="text-sm font-medium">Format</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["A5", "A4"] as Size[]).map((opt) => {
                      const active = size === opt;
                      return (
                        <button
                          key={opt}
                          aria-pressed={active}
                          onClick={() => setSize(opt)}
                          className={cx(
                            "rounded-xl border px-4 py-2 text-sm",
                            active
                              ? "border-white bg-white text-black"
                              : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seiten */}
                <div>
                  <div className="text-sm font-medium">Seiten</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {([100, 140, 200] as Pages[]).map((n) => {
                      const active = pages === n;
                      return (
                        <button
                          key={n}
                          aria-pressed={active}
                          onClick={() => setPages(n)}
                          className={cx(
                            "rounded-xl border px-4 py-2 text-sm",
                            active
                              ? "border-white bg-white text-black"
                              : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Menge */}
                <div className="max-w-[11rem]">
                  <div className="text-sm font-medium">Menge</div>
                  <div className="mt-2 flex overflow-hidden rounded-xl border border-white/20">
                    <button
                      className="w-10 select-none px-2 py-2 text-lg text-white hover:bg-white/10"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Menge verringern"
                    >
                      −
                    </button>
                    <div className="min-w-12 flex-1 select-none text-center py-2 text-white">
                      {qty}
                    </div>
                    <button
                      className="w-10 select-none px-2 py-2 text-lg text-white hover:bg-white/10"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Menge erhöhen"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA - Öffnet Drawer */}
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <Button
                  onClick={onCheckoutClick}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black shadow-lg hover:bg-white/80 transition"
                >
                  Zur Kasse <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-sm text-white/85">
                  Gesamt:{" "}
                  <span className="font-semibold">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-white/85 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> 3–7 Tage Versand (AT/DE)
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" /> 30 Tage Rückgaberecht
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> 2 Jahre Garantie
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  )
}

export default Hero