/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { display, INK, cx } from "@/lib/ui";
import { motion } from "framer-motion";
import Image from "next/image";
import { Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

type Size = "A5" | "A4";
type Pages = 100 | 140 | 200;
type Paper = "Liniert" | "Kariert" | "Blanko";

function Hero({
  stagger,
  fade,
  trackRef,
  slideTo,
  index,
  images,
  setLightboxSrc,
  discountPct,
  price,
  was,
  size,
  pages,
  setSize,
  setPages,
  paper,
  setPaper,
  qty,
  setQty,
  total,
  paymentUrl,
  stock,
}: any) {
  const hasPayment = !!paymentUrl;

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
              <div className="relative overflow-hidden">
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
                  {images.map((src: string, i: number) => (
                    <button
                      key={i}
                      className="relative h-72 w-full flex-[0_0_100%] sm:h-[28rem] lg:h-[30rem]"
                      onClick={() => setLightboxSrc(src)}
                    >
                      <Image
                        src={src}
                        alt={`Powrbook Ansicht ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={i === 0}
                      />
                    </button>
                  ))}
                </motion.div>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => slideTo(i)}
                      className={cx(
                        "h-2.5 w-2.5 rounded-full",
                        i === index ? "bg-white" : "bg-white/40"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbs */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={() => slideTo(i)}
                  className={cx(
                    "overflow-hidden rounded-xl border border-white/10",
                    i === index ? "ring-2 ring-white" : ""
                  )}
                >
                  <img src={src} alt="" className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Produktinfos */}
          <motion.div variants={fade} className="flex flex-col">
            {/* Rabatt */}
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                -{discountPct}% Rabatt
              </span>
            </div>

            <h1 className={cx(display.className, "text-4xl leading-tight")}>
              Powrbook
            </h1>

            <p className="mt-2 text-white/85">
              Hard-Cover, Soft-Touch. Flacher Aufschlag. 120g Papier.
            </p>

            {/* Preis */}
            <div className="mt-4 flex items-end gap-3">
              <div className="text-3xl font-semibold tracking-tight">
                €{price.toFixed(2)}
              </div>
              <div className="text-lg text-white/60 line-through">
                €{was.toFixed(2)}
              </div>
            </div>

            {/* Optionen */}
            <div className="mt-6 space-y-5">
              {/* Format + Seiten */}
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-4">
                <div>
                  <div className="text-sm font-medium">Format</div>
                  <div className="mt-2 flex gap-2">
                    {(["A5", "A4"] as Size[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSize(opt)}
                        className={cx(
                          "rounded-xl border px-4 py-2 text-sm",
                          size === opt
                            ? "border-white bg-white text-black"
                            : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium">Seiten</div>
                  <div className="mt-2 flex gap-2">
                    {([100, 140, 200] as Pages[]).map((n) => (
                      <button
                        key={n}
                        onClick={() => setPages(n)}
                        className={cx(
                          "rounded-xl border px-4 py-2 text-sm",
                          pages === n
                            ? "border-white bg-white text-black"
                            : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Papier */}
              <div>
                <div className="text-sm font-medium">Papier</div>
                <div className="mt-2 flex gap-2">
                  {(["Liniert", "Kariert", "Blanko"] as Paper[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPaper(p)}
                      className={cx(
                        "rounded-xl border px-4 py-2 text-sm",
                        paper === p
                          ? "border-white bg-white text-black"
                          : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menge */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="max-w-[14rem]">
                  <div className="text-sm font-medium">Menge</div>
                  <div className="mt-2 flex overflow-hidden rounded-xl border border-white/20">
                    <button
                      className="w-10 text-lg text-white hover:bg-white/10"
                      onClick={() => setQty((q: number) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <div className="flex-1 text-center py-2">{qty}</div>
                    <button
                      className="w-10 text-lg text-white hover:bg-white/10"
                      onClick={() => setQty((q: number) => Math.min(stock, q + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-sm font-medium text-white/85 sm:self-end">
                  <span className="block text-xs text-white/60">Gesamt</span>
                  <span className="text-base font-semibold text-white">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            {stock > 0 && stock <= 10 ? (
              <div className="mt-6 text-sm text-white/85">
                Nur noch {stock} Stück auf Lager!
              </div>
            ) : null}
            {stock > 0 ? (
              <div className="mt-6">
                <Link
                  href={
                    hasPayment || stock > 0
                      ? `${paymentUrl}&pieces=${qty}`
                      : "#"
                  }
                  className={cx(
                    "w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium shadow-lg",
                    hasPayment || stock > 0
                      ? "bg-white text-black hover:bg-white/80"
                      : "bg-white/20 text-white/40 cursor-not-allowed"
                  )}
                >
                  Zur Kasse <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-6">
                <Link
                  href={"#"}
                  className={cx(
                    "w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium shadow-lg bg-white/20 text-white/40 cursor-not-allowed"
                  )}
                >
                  Derzeit nicht verfügbar
                </Link>
              </div>
            )}

            {/* Trust */}
            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-white/85 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-white/70" /> 3–7 Tage Versand
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-white/70" /> 30 Tage Rückgabe
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-white/70" /> 2 Jahre
                Garantie
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
