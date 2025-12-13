/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, INK } from "@/lib/ui";

type Platform = "ios" | "android" | "other";

export default function MobileLandingPage(props: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = use(props.params);

  const [platform, setPlatform] = useState<Platform>("other");
  const [showAndroidModal, setShowAndroidModal] = useState(false);

  const [t, setT] = useState<any>(null);

  // Language load
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

  // Detect platform
  useEffect(() => {
    const ua = navigator?.userAgent?.toLowerCase() ?? "";
    const isIOS =
      /iphone|ipod|ipad/.test(ua) ||
      (navigator.platform === "MacIntel" &&
        (navigator as any).maxTouchPoints > 1);
    const isAndroid = /android/.test(ua);
    if (isIOS) setPlatform("ios");
    else if (isAndroid) setPlatform("android");
    else setPlatform("other");
  }, []);

  if (!t) return null;

  const m = t.mobile;

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: INK }}>
      <Header texts={t.header} />

      {/* Hero Section */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto text-center lg:text-left pt-20">
            <h2
              className={`${display.className} text-4xl font-semibold tracking-tight text-white sm:text-5xl`}
            >
              {m.heading}
            </h2>

            <p
              className={`${
                inter?.className ?? ""
              } mt-6 text-lg text-white/85 sm:text-xl`}
            >
              {m.subheading}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
              <StoreBadges
                platform={platform}
                labels={m.storeLabels}
                onAndroidClick={() => setShowAndroidModal(true)}
              />
            </div>
          </div>

          {/* Right: Image */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:shrink-0 lg:grow">
            <Image
              src="/images/mobile-mock2.svg"
              alt={m.imageAlt}
              width={366}
              height={729}
              priority
              className="mx-auto w-[366px] max-w-full drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Desktop Download Section */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h3
            className={`${display.className} text-3xl font-semibold text-gray-900`}
          >
            {m.desktopTitle}
          </h3>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            {m.desktopSubtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            {/* Windows */}
            <Link
              href="/download/windows"
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-6 py-4 shadow-sm hover:shadow-md transition bg-gray-50 hover:bg-gray-100"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/1/1816.png"
                alt="Windows"
                width={32}
                height={32}
              />
              <span className="text-gray-800 font-medium text-lg">
                {m.downloadWindows}
              </span>
            </Link>

            {/* Mac */}
            <Link
              href="/download/mac"
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-6 py-4 shadow-sm hover:shadow-md transition bg-gray-50 hover:bg-gray-100"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2/2235.png"
                alt="Mac"
                width={32}
                height={32}
              />
              <span className="text-gray-800 font-medium text-lg">
                {m.downloadMac}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer texts={t.footer} />

      {showAndroidModal && (
        <AndroidTestModal
          texts={m.androidTest}
          onClose={() => setShowAndroidModal(false)}
        />
      )}
    </div>
  );
}

/* ------------ Store Badges ------------ */
function StoreBadges({
  platform,
  labels,
  onAndroidClick,
}: {
  platform: Platform;
  labels: { ios: string; android: string };
  onAndroidClick: () => void;
}) {
  const IOS_BADGE = "/images/icons/appstore.webp";
  const ANDROID_BADGE = "/images/icons/playstore.webp";

  const iosHref =
    "https://apps.apple.com/at/app/powrbook-papier-aber-smart/id6754575938";

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
        <button
          type="button"
          onClick={onAndroidClick}
          aria-label={labels.android}
          className="inline-flex focus:outline-none"
        >
          <Image
            src={ANDROID_BADGE}
            alt={labels.android}
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </button>
      )}
    </>
  );
}

function AndroidTestModal({
  texts,
  onClose,
}: {
  texts: any;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const N8N_WEBHOOK_URL =
    "https://n8n.automatedirect.net/webhook/723babdf-f2f7-4b58-af7d-f5ae0bde5504";

  async function submit() {
    if (!email) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "google_play_internal_test",
        }),
      });

      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-900">
              {texts.title}
            </h3>

            <p className="mt-2 text-gray-600">{texts.description}</p>

            <input
              type="email"
              placeholder={texts.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-6 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
            />

            {error && (
              <p className="mt-3 text-sm text-red-600">{texts.error}</p>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-medium text-white hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? texts.loading : texts.submit}
            </button>
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-2xl font-semibold text-gray-900">
              {texts.successTitle}
            </h3>
            <p className="mt-2 text-gray-600">{texts.successText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
