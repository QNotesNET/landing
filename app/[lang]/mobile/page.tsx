/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react"; // <– wichtig: use() importieren
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, INK, cx } from "@/lib/ui";

type Platform = "ios" | "android" | "other";

export default function MobileLandingPage(props: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = use(props.params); // <– Promise korrekt auflösen

  const [platform, setPlatform] = useState<Platform>("other");
  const [t, setT] = useState<any>(null);

  // Sprachdatei laden
  useEffect(() => {
    async function loadLang() {
      try {
        const translations =
          lang === "en"
            ? await import("@/lib/dictionaries/en.json")
            : await import("@/lib/dictionaries/de.json");
        setT(translations.default);
      } catch (err) {
        console.error("Fehler beim Laden der Sprachdatei:", err);
        const fallback = await import("@/lib/dictionaries/de.json");
        setT(fallback.default);
      }
    }
    loadLang();
  }, [lang]);

  // Geräteplattform erkennen
  useEffect(() => {
    const ua = (
      typeof navigator !== "undefined" ? navigator.userAgent : ""
    ).toLowerCase();
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

  if (!t) return null;
  const m = t.mobile; // Kurzreferenz

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: INK }}>
      <Header texts={t.header} />

      {/* Hero Section */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto lg:pt-0 pt-20 text-center lg:text-left ">
            <h2
              className={`${display.className} text-4xl font-semibold tracking-tight text-white sm:text-5xl`}
            >
              {m.heading}
            </h2>
            <p
              className={`${
                inter?.className ?? ""
              } mt-6 text-lg text-white/85 sm:text-xl/8`}
            >
              {m.subheading}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center lg:items-left">
              <StoreBadges platform={platform} labels={m.storeLabels} />
            </div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-0 lg:shrink-0 lg:grow">
            <svg
              role="img"
              viewBox="0 0 366 729"
              className="mx-auto w-[366px] max-w-full drop-shadow-xl"
            >
              <title>{m.imageAlt}</title>
              <defs>
                <clipPath id="clip-screen-316x684">
                  <rect rx="36" width="316" height="684" />
                </clipPath>
              </defs>
              <path
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68..."
                fill="#4B5563"
              />
              <path
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615..."
                fill="#343E4E"
              />
              <foreignObject
                width="316"
                height="684"
                clipPath="url(#clip-screen-316x684)"
                transform="translate(24 24)"
              >
                <img
                  alt={m.imageAlt}
                  src="/images/mobile-mock.png"
                  style={{
                    width: "316px",
                    height: "684px",
                    objectFit: "cover",
                  }}
                />
              </foreignObject>
            </svg>
          </div>
        </div>
      </section>

      <Footer texts={t.footer} />
    </div>
  );
}

/* ------------ Subcomponent: StoreBadges ------------ */
function StoreBadges({
  platform,
  labels,
}: {
  platform: Platform;
  labels: { ios: string; android: string };
}) {
  const IOS_BADGE = "/images/icons/appstore.webp";
  const ANDROID_BADGE = "/images/icons/playstore.webp";

  const iosHref = "https://apps.apple.com/";
  const androidHref = "https://play.google.com/store";

  const showIOS = platform === "ios" || platform === "other";
  const showAndroid = platform === "android" || platform === "other";

  return (
    <>
      {showIOS && (
        <Link href={iosHref} aria-label={labels.ios} className="inline-flex">
          <Image
            src={IOS_BADGE}
            alt={labels.ios}
            width={180}
            height={54}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>
      )}
      {showAndroid && (
        <Link
          href={androidHref}
          aria-label={labels.android}
          className="inline-flex"
        >
          <Image
            src={ANDROID_BADGE}
            alt={labels.android}
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
