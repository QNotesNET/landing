"use client";

import Link from "next/link";
import { display, inter, cx, CREAM, WHITE, INK } from "@/lib/ui";

export default function NotFound() {
  return (
    <main
      className={cx(
        inter.className,
        "min-h-screen w-full flex items-center justify-center"
      )}
      style={{ backgroundColor: WHITE }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* RIESIGES 404 – responsive über clamp */}
        <h1
          className={cx(
            display.className,
            "leading-none tracking-tight text-black"
          )}
          style={{ fontSize: "clamp(6rem, 16vw, 18rem)" }}
        >
          404
        </h1>

        <p className="mt-12 text-base sm:text-lg text-black">
          Diese Seite konnten wir nicht finden.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 transition"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
