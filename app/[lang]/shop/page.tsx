/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, cx } from "@/lib/ui";

import { motion } from "framer-motion";
import { use, useEffect, useRef, useState } from "react";

import imageUrlBuilder from "@sanity/image-url";
import { client as sanityClient } from "@/sanity/lib/client";
import { getProduct } from "@/lib/getProduct";

import Hero from "@/components/shop/Hero";
import Features from "@/components/shop/Features";

// IMAGE BUILDER
const builder = imageUrlBuilder(sanityClient);
const urlFor = (src: any) => builder.image(src).url();

// MOTION
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// TYPES
type Size = "A5" | "A4";
type Pages = 100 | 140 | 200;
type Paper = "Liniert" | "Kariert" | "Blanko";

// Fake Compare-At
function compareAt(price: number) {
  return Math.round(price * 1.2 * 100) / 100;
}

export default function ShopPage(props: {
  params: Promise<{ lang?: string }>;
}) {
  // -------- LANGUAGE --------
  const [t, setT] = useState<any>(null);
  const { lang } = use(props.params);

  useEffect(() => {
    async function loadLang() {
      try {
        const translations = await import(`@/lib/dictionaries/${lang}.json`);
        setT(translations.default);
      } catch {
        const fallback = await import("@/lib/dictionaries/de.json");
        setT(fallback.default);
      }
    }
    loadLang();
  }, [lang]);

  // -------- PRODUCT FROM SANITY --------
  const [product, setProduct] = useState<any | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const p = await getProduct();
      setProduct(p || null);
      setLoaded(true);
    }
    load();
  }, []);

  // -------- USER SELECTION --------
  const [size, setSize] = useState<Size>("A5");
  const [pages, setPages] = useState<Pages>(140);
  const [paper, setPaper] = useState<Paper>("Liniert");
  const [qty, setQty] = useState(1);

  // -------- LIGHTBOX + CAROUSEL --------
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // IMAGES (immer nach Hooks, kein Hook darin)
  const images = product?.images?.map((img: any) => urlFor(img)) ?? [
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
  ];

  const slideTo = (i: number) => setIndex((i + images.length) % images.length);

  // -------- VARIANT (kein Hook!) --------
  let variant: any = null;
  if (product?.variants) {
    variant = product.variants.find(
      (v: any) => v.format === size && v.pages === pages && v.paper === paper
    );
  }

  const price = variant?.price ?? 0;
  const was = compareAt(price);
  const discountPct = price > 0 ? Math.round(((was - price) / was) * 100) : 0;
  const subtotal = price * qty;
  const total = subtotal;
  const paymentUrl: string | null = variant?.paymentUrl || null;
  const stock: number = variant?.stock || 0;

  // -------- LOADING / NO PRODUCT UI --------
  if (!loaded || !t) {
    return (
      <main className="min-h-screen grid place-items-center">
        <p className="text-gray-600">Lädt…</p>
      </main>
    );
  }

  if (loaded && !product) {
    return (
      <main className={cx(inter.className, "bg-white text-gray-900")}>
        <Header texts={t.header} />
        <section className="min-h-[60vh] grid place-items-center">
          <h1 className="text-3xl font-medium">
            {lang === "en"
              ? "Currently no product available"
              : "Derzeit kein Produkt verfügbar"}
          </h1>
        </section>
        <Footer texts={t.footer} />
      </main>
    );
  }

  // -------- NORMAL RENDER --------
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header texts={t.header} />

      <Hero
        price={price}
        was={was}
        discountPct={discountPct}
        images={images}
        size={size}
        setSize={setSize}
        pages={pages}
        setPages={setPages}
        paper={paper}
        setPaper={setPaper}
        qty={qty}
        setQty={setQty}
        total={total}
        trackRef={trackRef}
        slideTo={slideTo}
        index={index}
        setLightboxSrc={setLightboxSrc}
        fade={fade}
        stagger={stagger}
        paymentUrl={paymentUrl}
        stock={stock}
      />

      <Features
        stagger={stagger}
        fade={fade}
        HERO_IMG={images[0]}
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

      {/* INFO BOX */}
      <section className="py-12" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl border bg-white p-6"
          >
            <h3 className={cx(display.className, "text-xl leading-tight")}>
              Analog schreiben. Digital arbeiten.
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              Powrbook funktioniert mit iOS, Android & Web. Datenhaltung in der
              EU, DSGVO-ready.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer texts={t.footer} />

      {/* LIGHTBOX */}
      <dialog
        open={!!lightboxSrc}
        className="fixed inset-0 z-[70] bg-black/80"
        onClick={() => setLightboxSrc(null)}
      >
        {lightboxSrc && (
          <div className="grid h-full place-items-center p-4">
            <img
              src={lightboxSrc}
              alt=""
              className="max-h-full max-w-full rounded-xl"
            />
          </div>
        )}
      </dialog>
    </main>
  );
}
