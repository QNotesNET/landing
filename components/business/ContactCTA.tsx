/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { INK, display, cx } from "@/lib/ui";
import { Rocket, Mail, Phone } from "lucide-react";

const WEBHOOK = "/api/contact"; // Proxy-Route (falls vorhanden)
const N8N_WEBHOOK =
  "https://n8n.automatedirect.net/webhook/22357134-d704-4d7f-aca0-bdeca9deada3";

export default function ContactCTA({ texts }: { texts: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const payload = {
      name: [firstName, lastName].filter(Boolean).join(" ").trim(),
      email,
      company,
      phone,
      message,
    };

    // 1) Primär: an eigene API-Route senden (keine CORS-Probleme)
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Erfolg über Proxy
      setStatus("ok");
      e.currentTarget.reset();
      return;
    } catch (_err) {
      // 2) Fallback: direkt an n8n als FormData, no-cors (fire-and-forget)
      const fdOut = new FormData();
      fdOut.append("name", payload.name);
      fdOut.append("email", payload.email);
      fdOut.append("company", payload.company);
      fdOut.append("phone", payload.phone);
      fdOut.append("message", payload.message);

      // Keine Content-Type-Header setzen! (sonst blockt no-cors)
      fetch(N8N_WEBHOOK, {
        method: "POST",
        body: fdOut,
        mode: "no-cors",
        keepalive: true,
      }).catch(() => { /* still quiet */ });

      // Optimistisch Erfolg anzeigen
      setStatus("ok");
      e.currentTarget.reset();
      return;
    }
  }

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
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <input
                name="firstName"
                required
                placeholder={texts.form?.firstName || "Vorname"}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                name="lastName"
                required
                placeholder={texts.form?.lastName || "Nachname"}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                name="email"
                required
                type="email"
                placeholder={texts.form?.email || "E-Mail"}
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                name="company"
                placeholder={texts.form?.company || "Firma (optional) "}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                name="phone"
                placeholder={texts.form?.phone || "Telefon (optional)"}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <textarea
                name="message"
                rows={4}
                placeholder={texts.form?.message || "Nachricht"}
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black shadow hover:-translate-y-0.5 transition disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <Rocket className="h-4 w-4" />
                {status === "loading"
                  ? texts.form?.sending || "Senden…"
                  : texts.form?.button || "Absenden"}
              </button>

              {/* Status-Feedback */}
              {status === "ok" && (
                <p className="sm:col-span-2 text-sm text-emerald-300">
                  Vielen Dank! Wir melden uns in Kürze bei Ihnen.
                </p>
              )}
              {status === "error" && (
                <p className="sm:col-span-2 text-sm text-rose-300">
                  Ups, etwas ist schiefgelaufen. Bitte später erneut versuchen.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
