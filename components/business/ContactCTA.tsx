"use client";

import { INK, display, cx } from "@/lib/ui";
import { Rocket, Mail, Phone } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="kontakt" className="py-16 text-white" style={{ backgroundColor: INK }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>
              Persönliche Beratung für Ihr Team
            </h2>
            <p className="mt-3 text-white/80">
              Wir begleiten Sie vom Onboarding bis zum Rollout – mit Templates, Rollenmodellen und Best Practices.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> <a href="mailto:hello@powerbook.at" className="underline">hello@powerbook.at</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +43 (0) XXX XXX XXX
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <form className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Vorname"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                required
                placeholder="Nachname"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                required
                type="email"
                placeholder="E-Mail"
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <textarea
                rows={4}
                placeholder="Ihr Vorhaben"
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black shadow hover:-translate-y-0.5 transition">
                <Rocket className="h-4 w-4" /> Anfrage senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
