"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function Page() {
  // sanfte horizontale Glow-Animation über dem Bild
  const x = useMotionValue(0);
  const bgPos = useTransform(x, [0, 1], ["0% 50%", "100% 50%"]);

  useEffect(() => {
    const controls = animate(x, 1, {
      duration: 16,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [x]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-0 px-6 sm:px-8 lg:grid-cols-2">
        {/* LEFT: Copy */}
        <div className="py-16 sm:py-24 lg:py-0 lg:pr-12">
          <div className="mb-8">
            <Image
              src="https://app.qnotes.net/images/logos/logo-black.svg"
              alt="QNotes"
              width={280}
              height={64}
              className="h-14 w-auto sm:h-16"
              priority
            />
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[13px] text-slate-700">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-900" />
            Wir polieren QNotes – Launch in Kürze.
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            QNotes – <span className="text-slate-600">Notizen, die bleiben.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Schreib weiter auf Papier. QNotes verknüpft jede Seite automatisch mit deinem digitalen
            Workspace – damit Ideen nicht verloren gehen, sondern sofort gefunden, geteilt und
            weiterbearbeitet werden.
          </p>
        </div>

        {/* RIGHT: Full-height media (no box) */}
        <div className="relative hidden h-[60vh] w-full overflow-hidden rounded-none border-0 lg:block lg:h-screen">
          {/* Bild */}
          <Image
            src="https://app.qnotes.net/images/login-image.png"
            alt="QNotes Vorschau"
            fill
            className="object-cover"
            priority
          />

          {/* Animierter Glow-Overlay */}
          <motion.div
            style={{
              backgroundPosition: bgPos as any,
            }}
            className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(40rem 40rem at 0% 50%, rgba(2,6,23,0.18), transparent 60%), radial-gradient(40rem 40rem at 100% 50%, rgba(2,6,23,0.22), transparent 60%)",
                backgroundRepeat: "no-repeat",
              }}
            />
          </motion.div>

          {/* Subtle vignette & gradient bottom */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Mobile Bild (unter dem Text, ohne 50/50) */}
        <div className="relative block h-[46vh] w-full overflow-hidden lg:hidden">
          <Image
            src="https://app.qnotes.net/images/login-image.png"
            alt="QNotes Vorschau"
            fill
            className="object-cover"
            priority
          />
          <motion.div
            style={{ backgroundPosition: bgPos as any }}
            className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(30rem 30rem at 0% 50%, rgba(2,6,23,0.18), transparent 60%), radial-gradient(30rem 30rem at 100% 50%, rgba(2,6,23,0.22), transparent 60%)",
                backgroundRepeat: "no-repeat",
              }}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </section>
    </main>
  );
}
