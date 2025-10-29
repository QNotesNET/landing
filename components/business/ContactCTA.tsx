/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { INK, display, cx } from "@/lib/ui";
import { Rocket, Mail, Phone } from "lucide-react";

export default function ContactCTA({ texts }: { texts: any }) {
  return (
    <section
      id="kontakt"
      className="py-16 text-white"
      style={{ backgroundColor: INK }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Info */}
          <div>
            <h2
              className={cx(
                display.className,
                "text-3xl sm:text-4xl leading-tight"
              )}
            >
              {texts.title}
            </h2>
            <p className="mt-3 text-white/80">{texts.text}</p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              {texts.contacts.map((c: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  {c.type === "mail" && <Mail className="h-4 w-4" />}
                  {c.type === "phone" && <Phone className="h-4 w-4" />}
                  {c.type === "mail" ? (
                    <a href={`mailto:${c.value}`} className="underline">
                      {c.value}
                    </a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <form className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                placeholder={texts.form.firstName}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                required
                placeholder={texts.form.lastName}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                required
                type="email"
                placeholder={texts.form.email}
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <textarea
                rows={4}
                placeholder={texts.form.message}
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black shadow hover:-translate-y-0.5 transition">
                <Rocket className="h-4 w-4" /> {texts.form.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
