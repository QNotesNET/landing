"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, INK, CREAM, cx } from "@/lib/ui";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Check,
  X,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

// shadcn/ui
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Motion Presets
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// Ein Bildlink für alles (Platzhalter)
const HERO_IMG =
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1600&auto=format&fit=crop";

type Size = "A5" | "A4";
type Pages = 100 | 140 | 200;

const BASE_PRICES: Record<Size, Record<Pages, number>> = {
  A5: { 100: 16.9, 140: 18.9, 200: 21.9 },
  A4: { 100: 21.9, 140: 24.9, 200: 28.9 },
};

function compareAt(price: number) {
  return Math.round(price * 1.2 * 100) / 100; // ~+20%
}

export default function ShopPage() {
  const [size, setSize] = useState<Size>("A5");
  const [pages, setPages] = useState<Pages>(140);
  const [qty, setQty] = useState(1);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Address state (sehr simpel – du kannst an dein Backend binden)
  const [shipToBilling, setShipToBilling] = useState(true);
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    street: "",
    zip: "",
    city: "",
    country: "Österreich",
    email: "",
  });
  const [billing, setBilling] = useState({
    company: "",
    vatId: "",
  });

  // Payment state
  const [payMethod, setPayMethod] = useState<
    "card" | "paypal" | "klarna" | "apple" | "google"
  >("card");
  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvc: "",
  });

  const price = useMemo(() => BASE_PRICES[size][pages], [size, pages]);
  const was = useMemo(() => compareAt(price), [price]);
  const discountPct = useMemo(() => Math.round(((was - price) / was) * 100), [price, was]);
  const sku = useMemo(() => `PB-${size}-${pages}`, [size, pages]);

  const subtotal = useMemo(() => price * qty, [price, qty]);
  const shippingFee = 0; // z.B. 0 innerhalb AT/DE
  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

  // Simple, dragbares Carousel
  const images = [HERO_IMG, HERO_IMG, HERO_IMG];
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideTo = (i: number) => setIndex((i + images.length) % images.length);

  // Actions
  const onCheckoutClick = () => {
    setStep(1);
    setSheetOpen(true);
  };

  const onNext = () => setStep(2);
  const onBack = () => setStep(1);

  const disabledNext =
    !shipping.firstName ||
    !shipping.lastName ||
    !shipping.street ||
    !shipping.zip ||
    !shipping.city ||
    !shipping.email;

  const disabledPay =
    payMethod === "card" &&
    (!card.number || !card.holder || !card.expiry || !card.cvc);

  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header />

      {/* HERO (INK) – fullscreen */}
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

      {/* DETAILS / FEATURES (weiß) */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-2"
          >
            {/* L Bild / R Text */}
            <motion.div variants={fade} className="overflow-hidden rounded-2xl border bg-white">
              <img src={HERO_IMG} alt="" className="h-64 w-full object-cover sm:h-96" />
            </motion.div>
            <motion.div variants={fade} className="flex flex-col justify-center">
              <h2 className={cx(display.className, "text-2xl leading-tight")}>
                Hard-Cover, Soft-Touch
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Flacher Aufschlag, Fadenbindung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> 120g Papier, tintenfest
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Dezente Seiten-Markierung fürs Scannen
                </li>
              </ul>
            </motion.div>

            {/* R Bild / L Text */}
            <motion.div variants={fade} className="order-last flex flex-col justify-center lg:order-none">
              <h2 className={cx(display.className, "text-2xl leading-tight")}>
                Optimiert für die App
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> „Scan & Go“ – Ränder & Perspektive automatisch
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Keywords TODO / CAL / WA / CO (Einkreis-Erkennung)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Offline-Scan, EU-Sync
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fade} className="overflow-hidden rounded-2xl border bg-white">
              <img src={HERO_IMG} alt="" className="h-64 w-full object-cover sm:h-96" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INFO BAR (CREAM) */}
      <section className="py-12" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border bg-white p-6"
          >
            <h3 className={cx(display.className, "text-xl leading-tight")}>
              Analog schreiben. Digital arbeiten.
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              Powerbook funktioniert mit iOS, Android & Web. Datenhaltung in der EU, DSGVO-ready.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <dialog
        open={!!lightboxSrc}
        className="fixed inset-0 z-[70] m-0 h-full w-full bg-black/80 p-0 backdrop:backdrop-blur-sm"
        onClick={() => setLightboxSrc(null)}
      >
        <Button
          aria-label="Schließen"
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          onClick={() => setLightboxSrc(null)}
          variant="ghost"
        >
          <X className="h-5 w-5" />
        </Button>
        {lightboxSrc && (
          <div className="grid h-full place-items-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxSrc} alt="" className="max-h-full max-w-full rounded-xl" />
          </div>
        )}
      </dialog>

      {/* CHECKOUT SHEET (Drawer von rechts) */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0">
          <div className="flex h-full flex-col">
            <div className="p-6 border-b">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {step === 2 ? (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="-ml-1"
                        onClick={onBack}
                        aria-label="Zurück"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      Zahlung
                    </>
                  ) : (
                    "Bestellung"
                  )}
                </SheetTitle>
                <SheetDescription>
                  {step === 1
                    ? "Prüfe Produkt & gib deine Adressen ein."
                    : "Zahlungsart wählen & Daten eingeben."}
                </SheetDescription>
              </SheetHeader>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Summary */}
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={HERO_IMG}
                    alt=""
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      Powerbook — {size}, {pages} Seiten
                    </div>
                    <div className="text-xs text-muted-foreground">SKU: {sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">€{price.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">x {qty}</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Zwischensumme</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versand</span>
                    {/* @ts-expect-error --- */}
                    <span>{shippingFee === 0 ? "Kostenlos" : `€${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-1">
                    <span>Gesamt</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {step === 1 ? (
                <>
                  {/* Versandadresse */}
                  <div className="space-y-3">
                    <div className="font-medium">Lieferadresse</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="pb-2">Vorname</Label>
                        <Input
                          value={shipping.firstName}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, firstName: e.target.value }))
                          }
                          placeholder="Max"
                        />
                      </div>
                      <div>
                        <Label className="pb-2">Nachname</Label>
                        <Input
                          value={shipping.lastName}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, lastName: e.target.value }))
                          }
                          placeholder="Mustermann"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="pb-2">Straße & Hausnummer</Label>
                        <Input
                          value={shipping.street}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, street: e.target.value }))
                          }
                          placeholder="Musterstraße 1"
                        />
                      </div>
                      <div>
                        <Label className="pb-2">PLZ</Label>
                        <Input
                          value={shipping.zip}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, zip: e.target.value }))
                          }
                          placeholder="1010"
                        />
                      </div>
                      <div>
                        <Label className="pb-2">Ort</Label>
                        <Input
                          value={shipping.city}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, city: e.target.value }))
                          }
                          placeholder="Wien"
                        />
                      </div>
                      <div>
                        <Label className="pb-2">Land</Label>
                        <Input
                          value={shipping.country}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, country: e.target.value }))
                          }
                          placeholder="Österreich"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="pb-2">E-Mail (Bestellbestätigung)</Label>
                        <Input
                          type="email"
                          value={shipping.email}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, email: e.target.value }))
                          }
                          placeholder="max@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rechnungsadresse */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Rechnungsdetails</div>
                      <label className="inline-flex items-center gap-2 text-sm ">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={shipToBilling}
                          onChange={(e) => setShipToBilling(e.target.checked)}
                        />
                        Rechnungsadresse = Lieferadresse
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <Label className="pb-2">Firma (optional)</Label>
                        <Input
                          value={billing.company}
                          onChange={(e) =>
                            setBilling((b) => ({ ...b, company: e.target.value }))
                          }
                          placeholder="Muster GmbH"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="pb-2">UID (optional)</Label>
                        <Input
                          value={billing.vatId}
                          onChange={(e) =>
                            setBilling((b) => ({ ...b, vatId: e.target.value }))
                          }
                          placeholder="ATU12345678"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Zahlungsarten */}
                  <div className="space-y-4">
                    <div className="font-medium">Zahlungsmethode</div>
                    <RadioGroup
                      value={payMethod}
                      onValueChange={(v) =>
                        setPayMethod(v as typeof payMethod)
                      }
                      className="grid grid-cols-1 gap-2"
                    >
                      <label className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="card" id="pm-card" />
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Kredit-/Debitkarte</span>
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="paypal" id="pm-paypal" />
                          <span className="inline-flex items-center gap-2">
                            {/* PayPal Logo (einfaches Wortbild) */}
                            <span className="font-semibold">PayPal</span>
                          </span>
                        </div>
                      </label>

                      <label className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="klarna" id="pm-klarna" />
                          <span>Klarna</span>
                        </div>
                      </label>

                      <label className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="apple" id="pm-apple" />
                          <span>Apple&nbsp;Pay</span>
                        </div>
                      </label>

                      <label className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="google" id="pm-google" />
                          <span>Google&nbsp;Pay</span>
                        </div>
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Kartenformular */}
                  {payMethod === "card" && (
                    <div className="space-y-3 rounded-xl border p-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <Label className="pb-2">Kartennummer</Label>
                          <Input
                            inputMode="numeric"
                            placeholder="4242 4242 4242 4242"
                            value={card.number}
                            onChange={(e) =>
                              setCard((c) => ({ ...c, number: e.target.value }))
                            }
                          />
                        </div>
                        <div>
                          <Label className="pb-2">Karteninhaber*in</Label>
                          <Input
                            placeholder="Max Mustermann"
                            value={card.holder}
                            onChange={(e) =>
                              setCard((c) => ({ ...c, holder: e.target.value }))
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="pb-2">Ablauf (MM/YY)</Label>
                            <Input
                              placeholder="12/27"
                              value={card.expiry}
                              onChange={(e) =>
                                setCard((c) => ({ ...c, expiry: e.target.value }))
                              }
                            />
                          </div>
                          <div>
                            <Label className="pb-2">CVC</Label>
                            <Input
                              placeholder="123"
                              value={card.cvc}
                              onChange={(e) =>
                                setCard((c) => ({ ...c, cvc: e.target.value }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alternative Buttons */}
                  {payMethod !== "card" && (
                    <div className="space-y-3">
                      {payMethod === "paypal" && (
                        <Button
                          className="w-full h-11 rounded-lg font-semibold"
                          variant="secondary"
                        >
                          {/* Placeholder Logo-Style */}
                          Mit PayPal zahlen
                        </Button>
                      )}
                      {payMethod === "klarna" && (
                        <Button className="w-full h-11 rounded-lg font-semibold" variant="secondary">
                          Mit Klarna fortfahren
                        </Button>
                      )}
                      {payMethod === "apple" && (
                        <Button className="w-full h-11 rounded-lg font-semibold" variant="secondary">
                           Pay
                        </Button>
                      )}
                      {payMethod === "google" && (
                        <Button className="w-full h-11 rounded-lg font-semibold" variant="secondary">
                          Google Pay
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t">
              {step === 1 ? (
                <Button
                  className="w-full h-11 rounded-xl"
                  onClick={onNext}
                  disabled={disabledNext}
                >
                  Weiter zur Zahlung <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="w-full h-11 rounded-xl"
                  disabled={disabledPay}
                  onClick={() => {
                    // Hier später tatsächliche Zahlungs-Integration triggern
                    // z.B. Stripe confirm, oder zu PayPal/Klarna umleiten
                    alert("Demo: Zahlung ausgelöst 🚀");
                    setSheetOpen(false);
                  }}
                >
                  Jetzt zahlen €{total.toFixed(2)}
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
