/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Hero from "@/components/shop/Hero";
import Features from "@/components/shop/Features";

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
  const discountPct = useMemo(
    () => Math.round(((was - price) / was) * 100),
    [price, was]
  );
  const sku = useMemo(() => `PB-${size}-${pages}`, [size, pages]);

  const subtotal = useMemo(() => price * qty, [price, qty]);
  const shippingFee = 0; // z.B. 0 innerhalb AT/DE
  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

  // Simple, dragbares Carousel
  const images = [HERO_IMG, HERO_IMG, HERO_IMG];
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null!);
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
      <Hero
        basePrices={BASE_PRICES}
        size={size}
        setSize={setSize}
        pages={pages}
        setPages={setPages}
        qty={qty}
        setQty={setQty}
        compareAt={compareAt}
        discountPct={discountPct}
        fade={fade}
        stagger={stagger}
        images={images}
        index={index}
        onCheckoutClick={onCheckoutClick}
        slideTo={slideTo}
        trackRef={trackRef}
        setLightboxSrc={setLightboxSrc}
        total={total}
      />

      {/* DETAILS / FEATURES (weiß) */}
      <Features
        stagger={stagger}
        fade={fade}
        HERO_IMG={HERO_IMG}
        features={[
          {
            title: "Hard-Cover, Soft-Touch",
            points: [
              "Flacher Aufschlag, Fadenbindung",
              "120g Papier, tintenfest",
              "Dezente Seiten-Markierung fürs Scannen",
            ],
            left: true,
          },
          {
            title: "Vielseitige Größen & Seitenanzahl",
            points: [
              "A5 & A4 Formate",
              "100, 140 oder 200 Seiten",
              "Ideal für Notizen, Skizzen & Pläne",
            ],
          },
        ]}
      />

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
              Powerbook funktioniert mit iOS, Android & Web. Datenhaltung in der
              EU, DSGVO-ready.
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
            <img
              src={lightboxSrc}
              alt=""
              className="max-h-full max-w-full rounded-xl"
            />
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
                    <div className="text-xs text-muted-foreground">
                      SKU: {sku}
                    </div>
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
                    <span>
                      {shippingFee === 0
                        ? "Kostenlos"
                        // @ts-expect-error ---
                        : `€${shippingFee.toFixed(2)}`}
                    </span>
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
                            setShipping((s) => ({
                              ...s,
                              firstName: e.target.value,
                            }))
                          }
                          placeholder="Max"
                        />
                      </div>
                      <div>
                        <Label className="pb-2">Nachname</Label>
                        <Input
                          value={shipping.lastName}
                          onChange={(e) =>
                            setShipping((s) => ({
                              ...s,
                              lastName: e.target.value,
                            }))
                          }
                          placeholder="Mustermann"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="pb-2">Straße & Hausnummer</Label>
                        <Input
                          value={shipping.street}
                          onChange={(e) =>
                            setShipping((s) => ({
                              ...s,
                              street: e.target.value,
                            }))
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
                            setShipping((s) => ({
                              ...s,
                              country: e.target.value,
                            }))
                          }
                          placeholder="Österreich"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="pb-2">
                          E-Mail (Bestellbestätigung)
                        </Label>
                        <Input
                          type="email"
                          value={shipping.email}
                          onChange={(e) =>
                            setShipping((s) => ({
                              ...s,
                              email: e.target.value,
                            }))
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
                            setBilling((b) => ({
                              ...b,
                              company: e.target.value,
                            }))
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
                      onValueChange={(v) => setPayMethod(v as typeof payMethod)}
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
                                setCard((c) => ({
                                  ...c,
                                  expiry: e.target.value,
                                }))
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
                        <Button
                          className="w-full h-11 rounded-lg font-semibold"
                          variant="secondary"
                        >
                          Mit Klarna fortfahren
                        </Button>
                      )}
                      {payMethod === "apple" && (
                        <Button
                          className="w-full h-11 rounded-lg font-semibold"
                          variant="secondary"
                        >
                           Pay
                        </Button>
                      )}
                      {payMethod === "google" && (
                        <Button
                          className="w-full h-11 rounded-lg font-semibold"
                          variant="secondary"
                        >
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
