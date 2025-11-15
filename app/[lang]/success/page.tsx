/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter } from "@/lib/ui";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function SuccessPage(props: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = use(props.params);

  const [t, setT] = useState<any>(null);

  // Load translations
  useEffect(() => {
    async function load() {
      try {
        const translations = await import(`@/lib/dictionaries/${lang}.json`);
        setT(translations.default);
      } catch {
        const fallback = await import("@/lib/dictionaries/de.json");
        setT(fallback.default);
      }
    }
    load();
  }, [lang]);

  if (!t) return null;

  const s = t.success;

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Header texts={t.header} />

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            {/* <Image
              src="/images/icons/check-success.png"
              width={100}
              height={100}
              alt="Success"
              className="drop-shadow-md"
            /> */}
            <CheckIcon className="h-24 w-24 text-white drop-shadow-md bg-green-500/60 rounded-full border-2 border-white" />
          </div>

          {/* Title */}
          <h1
            className={`${display.className} text-4xl font-semibold text-gray-900`}
          >
            {s.title}
          </h1>

          {/* Subtitle */}
          <p
            className={`${inter.className} mt-4 text-lg text-gray-600 max-w-xl mx-auto`}
          >
            {s.subtitle}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 rounded-xl bg-black text-white text-lg shadow hover:bg-gray-900 transition"
            >
              {s.backToHome}
            </Link>

            <Link
              href={`mailto:support@powerbook.at`}
              className="px-8 py-3 rounded-xl bg-gray-100 text-gray-800 text-lg shadow hover:bg-gray-200 transition"
            >
              {s.needHelp}
            </Link>
          </div>
        </div>
      </main>

      <Footer texts={t.footer} />
    </div>
  );
}
