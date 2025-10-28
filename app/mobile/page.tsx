// app/mobile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { display, inter, INK, CREAM, cx } from "@/lib/ui";

type Platform = "ios" | "android" | "other";

export default function MobileLandingPage() {
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    const ua = (
      typeof navigator !== "undefined" ? navigator.userAgent : ""
    ).toLowerCase();

    const isIOS =
      /iphone|ipod|ipad/.test(ua) ||
      (typeof navigator !== "undefined" &&
        // iPadOS als Mac mit Touch
        navigator.platform === "MacIntel" &&
        (navigator as any).maxTouchPoints > 1);

    const isAndroid = /android/.test(ua);

    if (isIOS) setPlatform("ios");
    else if (isAndroid) setPlatform("android");
    else setPlatform("other");
  }, []);

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: INK }}>
      <Header />
      {/* Main section: mobile-first Stack, rechts Bild auf md+ */}
      <section className="flex-1 -mt-12">
        <div className="relative aspect-[10/16] w-full  md:max-w-xl mx-auto overflow-hidden rounded-2xl lg:hidden">
          <Image
            src="/images/mobile.svg" // TODO: durch euer Mockup ersetzen
            alt="Powerbook App – Vorschau"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Left: Text + Store buttons */}
            <div>
              <h2
                className={`${display.className} text-4xl text-white lg:text-5xl`}
              >
                Jetzt Powerbook-App herunterladen
              </h2>
              <p className={`${inter?.className ?? ""} mt-6 text-white/85`}>
                Lade dir die Powerbook-App herunter und erlebe, wie einfach es
                ist, deine handschriftlichen Notizen zu digitalisieren und zu
                organisieren – egal, ob du ein iOS- oder Android-Gerät nutzt.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
                <StoreBadges platform={platform} />
              </div>
            </div>

            {/* Right: Dummy image (Mockup später ersetzen) */}
            <div className="relative aspect-[10/16] w-full  md:max-w-xl mx-auto overflow-hidden rounded-2xl lg:block hidden">
              <Image
                src="/images/mobile.svg" // TODO: durch euer Mockup ersetzen
                alt="Powerbook App – Vorschau"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ------------ Subcomponents ------------ */

function StoreBadges({ platform }: { platform: Platform }) {
  // Badge-Images (vom Nutzer vorgegeben)
  const IOS_BADGE =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png";
  const ANDROID_BADGE =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png";

  // TODO: Echte Store-Links eintragen
  const iosHref = "https://apps.apple.com/";
  const androidHref = "https://play.google.com/store";

  const showIOS = platform === "ios" || platform === "other";
  const showAndroid = platform === "android" || platform === "other";

  return (
    <>
      {showIOS && (
        <Link
          href={iosHref}
          aria-label="Im App Store herunterladen"
          className="inline-flex"
        >
          <Image
            src={IOS_BADGE}
            alt="Download on the App Store"
            width={180}
            height={54}
            className="h-12 w-full object-contain"
          />
        </Link>
      )}
      {showAndroid && (
        <Link
          href={androidHref}
          aria-label="Bei Google Play herunterladen"
          className="inline-flex"
        >
          <Image
            src={ANDROID_BADGE}
            alt="Get it on Google Play"
            width={200}
            height={60}
            className="h-12 w-full object-contain"
          />
        </Link>
      )}
    </>
  );
}
