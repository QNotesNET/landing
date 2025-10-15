"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, type MotionValue } from "framer-motion";
import { useEffect } from "react";

export default function Page() {
  // sanfter, pendelnder Glow über dem Bild (performant, typisiert)
  const x = useMotionValue(0);
  const bgPos: MotionValue<string> = useTransform(x, [0, 1], ["0% 50%", "100% 50%"]);

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
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* RIGHT: Edge-to-edge image pane (hidden on mobile) */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        {/* Bild füllt die rechte Hälfte bis zum Rand */}
        <Image
          src="https://app.qnotes.net/images/login-image.png"
          alt="QNotes Vorschau"
          fill
          className="object-cover"
          priority
        />

        {/* Animierter Glow-Overlay */}
        <motion.div
          style={{ backgroundPosition: bgPos }}
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(42rem 42rem at 0% 50%, rgba(2,6,23,0.18), transparent 60%), radial-gradient(42rem 42rem at 100% 50%, rgba(2,6,23,0.22), transparent 60%)",
              backgroundRepeat: "no-repeat",
            }}
          />
        </motion.div>

        {/* Vignette & Bodenverlauf für Tiefe */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90rem_60rem_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* LEFT: Content (nimmt auf Desktop die linke Hälfte ein) */}
      <section className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 sm:px-8">
        <div className="flex min-h-screen items-center lg:w-1/2">
          <div className="py-16 sm:py-24">
            <div className="mb-8">
              <Image
                src="https://app.qnotes.net/images/logos/logo-black.svg"
                alt="Powerbook"
                width={280}
                height={64}
                className="h-14 w-auto sm:h-16"
                priority
              />
            </div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[13px] text-slate-700">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-900" />
              Wir polieren Powerbook – Launch in Kürze.
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Powerbook – <span className="text-slate-600">Notizen, die bleiben.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Schreib weiter auf Papier. Powerbook verknüpft jede Seite automatisch mit deinem digitalen
              Workspace – damit Ideen nicht verloren gehen, sondern sofort gefunden, geteilt und
              weiterbearbeitet werden.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile: kein Bild */}
    </main>
  );
}
