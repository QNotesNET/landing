/* eslint-disable @typescript-eslint/no-explicit-any */
// app/mobile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { display, inter, INK, cx } from "@/lib/ui";

type Platform = "ios" | "android" | "other";

export default function MobileLandingPage() {
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "").toLowerCase();

    const isIOS =
      /iphone|ipod|ipad/.test(ua) ||
      (typeof navigator !== "undefined" &&
        navigator.platform === "MacIntel" &&
        (navigator as any).maxTouchPoints > 1);

    const isAndroid = /android/.test(ua);

    if (isIOS) setPlatform("ios");
    else if (isAndroid) setPlatform("android");
    else setPlatform("other");
  }, []);

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: INK }}>
      {/* <Header /> */}

      {/* Hero Section (angepasst aus deiner Tailwind-Section) */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-28">
          {/* Left: Text */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto lg:pt-0 pt-20 text-center lg:text-left ">
            <h2 className={`${display.className} text-4xl font-semibold tracking-tight text-white sm:text-5xl`}>
              Jetzt Powerbook-App herunterladen
            </h2>

            <p className={`${inter?.className ?? ""} mt-6 text-lg text-white/85 sm:text-xl/8`}>
              Ein Foto genügt: Seiten werden erkannt, Inhalte zugeordnet und sicher gespeichert.
              Starte jetzt auf deinem Gerät.
            </p>

            {/* Store Badges statt CTA-Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center lg:items-left">
              <StoreBadges platform={platform} />
            </div>
          </div>

          {/* Right: Phone SVG mit mockup (kein Gradient, kein Dark) */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:shrink-0 lg:grow">
            <svg role="img" viewBox="0 0 366 729" className="mx-auto w-[366px] max-w-full drop-shadow-xl">
              <title>App screenshot</title>
              <defs>
                {/* Sichtbarer Screen-Clip: 316 × 684 px mit abgerundeten Ecken */}
                <clipPath id="clip-screen-316x684">
                  <rect rx="36" width="316" height="684" />
                </clipPath>
              </defs>

              {/* Geräte-Rahmen (unverändert, nur graue Töne) */}
              <path
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                fill="#4B5563"
              />
              <path
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                fill="#343E4E"
              />

              {/* Screen-Fläche 316×684px, beginnend bei (24,24) */}
              <foreignObject
                width="316"
                height="684"
                clipPath="url(#clip-screen-316x684)"
                transform="translate(24 24)"
              >
                {/* Dein Mockup: exakt 316×684 px oder 632×1368 px */}
                <img
                  alt="Powerbook App – Vorschau"
                  src="/images/mobile-mock.png" // <-- Ersetze durch dein finales Mockup
                  style={{ width: "316px", height: "684px", objectFit: "cover" }}
                />
              </foreignObject>
            </svg>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ------------ Subcomponents ------------ */

function StoreBadges({ platform }: { platform: Platform }) {
  // Eure vorhandenen Badge-Dateien (lokal)
  const IOS_BADGE = "/images/icons/appstore.webp";
  const ANDROID_BADGE = "/images/icons/playstore.webp";

  // TODO: echte Store-Links einsetzen
  const iosHref = "https://apps.apple.com/";
  const androidHref = "https://play.google.com/store";

  const showIOS = platform === "ios" || platform === "other";
  const showAndroid = platform === "android" || platform === "other";

  return (
    <>
      {showIOS && (
        <Link href={iosHref} aria-label="Im App Store herunterladen" className="inline-flex">
          <Image
            src={IOS_BADGE}
            alt="Download on the App Store"
            width={180}
            height={54}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>
      )}
      {showAndroid && (
        <Link href={androidHref} aria-label="Bei Google Play herunterladen" className="inline-flex">
          <Image
            src={ANDROID_BADGE}
            alt="Get it on Google Play"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>
      )}
    </>
  );
}
