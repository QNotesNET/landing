"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bolt, ChevronRight, Rocket, Youtube, ShieldCheck, Sparkles, Layers } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";

// Fonts – elegante Headline + ruhiger Body
const inter = Inter({ subsets: ["latin"], display: "swap" });
const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Brand Colors (aus deinen Screens): Creme & Dunkelbraun
const CREAM = "#F6F2EB"; // helles, warmes Weiß
const INK = "#2D2825";   // sehr dunkles Braun/Anthrazit

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Sticky, transparenter Header wie remarkable.com
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { label: "Shop", href: "/shop" },
    { label: "Entdecken", href: "#features" },
    { label: "Business", href: "#business" },
    { label: "Support", href: "#faq" },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition",
        scrolled
          ? "backdrop-blur bg-white/70 border-b border-black/5"
          : "backdrop-blur-sm bg-gradient-to-b from-black/30 to-transparent text-white"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bolt className="h-6 w-6" />
          <span>Powerbook</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {items.map((i) => (
            <Link key={i.label} href={i.href} className="hover:opacity-80">
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#video"
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Video ansehen
          </Link>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/10 hover:-translate-y-0.5 transition"
          >
            Jetzt starten <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

// Vollflächiges Hero mit Unsplash-Hintergrundbild & eleganter Serif-Headline
function Hero() {
  return (
    <section className="relative isolate min-h-[92vh]">
      {/* Background image via Unsplash */}
      <img
        src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1920&auto=format&fit=crop"
        alt="Minimaler Arbeitsplatz mit Notizbuch"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* remarkable-Style Overlays: dunkle Vignette + warmer Verlauf nach unten in Creme */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_10%,rgba(0,0,0,0.55),transparent)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.06) 78%, ${CREAM} 95%, #ffffff 100%)`,
        }}
      />

      {/* Content left-aligned & vertically centered */}
      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 items-center px-4 pt-24 pb-24 sm:px-6 lg:grid-cols-[minmax(0,680px)_1fr] lg:px-8">
        <div className="text-white text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black">NEU</span>
            <span>Powerbook Paper • Move Light</span>
          </div>

          <h1 className={cx(display.className, "text-5xl sm:text-6xl leading-[1.05] drop-shadow-md")}>Papier das Kraft hat</h1>
          <p className={cx(inter.className, "mt-6 max-w-2xl text-lg text-white/85")}>Schreibe analog. Arbeite digital. Das Notizbuch, das deine Seiten elegant mit der App verbindet – ohne Ablenkung.</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 font-medium text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 transition">
              Jetzt entdecken <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link href="#youtube" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white backdrop-blur hover:bg-white/20">
              <Youtube className="h-4 w-4" /> YouTube
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow() {
  const feats = [
    {
      title: "Elegantes Schreiben",
      text: "Feines Papier, flacher Aufschlag – dein Flow bleibt analog.",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "Magische Scans",
      text: "Auto‑Zuschneiden, Entzerren und Seitenzahl‑Erkennung.",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Datenschutz zuerst",
      text: "EU‑Hosting, DSGVO‑ready, minimale Datenspeicherung.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];
  return (
    <section id="features" className="py-20" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {feats.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                {f.icon}
              </div>
              <h3 className={cx(inter.className, "mt-3 text-lg font-semibold")}>{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Split-Section mit Foto auf dunklem Hintergrund
function StorySplit() {
  return (
    <section className="py-20" style={{ backgroundColor: INK }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 text-white">
        <div>
          <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Papier, das Kraft hat.</h2>
          <p className="mt-4 text-white/85">
            Ein schönes, robustes Notizbuch mit dezenter Markierung pro Seite. Keine QR‑Codes, keine Ablenkung – nur Papier, das smart wird, wenn du es willst.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px]">✓</span>
              120g Papier, tintenfest
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px]">✓</span>
              Flacher Aufschlag, Fadenbindung
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px]">✓</span>
              Minimalistische Seitenmarken – unsichtbar im Alltag
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-xl bg-white px-6 py-3 text-black shadow-lg hover:-translate-y-0.5 transition">Vorbestellen</Link>
            <Link href="#cta" className="rounded-xl border border-white/30 px-6 py-3 text-white/90 hover:bg-white/10">Benachrichtigt werden</Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
              alt="Schreibtisch Setup"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-2 text-xs text-white/60">* Beispielbild via Unsplash</p>
        </div>
      </div>
    </section>
  );
}

// Gitter mit Mockup-Bildern
function Gallery() {
  const imgs = [
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529336953121-4a1121188589?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1200&auto=format&fit=crop",
  ];
  return (
    <section className="py-20" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {imgs.map((src, i) => (
            <div key={src} className="aspect-[3/4] overflow-hidden rounded-2xl border">
              <img src={src} alt={`Powerbook Mockup ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature-Details (alternierend Bild/Text)
function FeatureDetails() {
  const blocks = [
    {
      title: "Magische Scans",
      text: "Ränder, Perspektive, Kontrast – automatisch erkannt. Ein Tap reicht.",
      img: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Sofort gefunden",
      text: "Seiten, Notizbücher und Tags blitzschnell filtern – auch offline.",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    },
  ];
  return (
    <section className="bg-gradient-to-b from-white to-[rgba(0,0,0,0.02)] py-20">
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
        {blocks.map((b, i) => (
          <div key={b.title} className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
            <div>
              <h3 className={cx(display.className, "text-2xl sm:text-3xl leading-tight")}>{b.title}</h3>
              <p className="mt-3 text-gray-600">{b.text}</p>
            </div>
            <div className="overflow-hidden rounded-3xl border shadow-sm">
              <img src={b.img} alt={b.title} className="h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Vergleichssektion
function Comparison() {
  const rows = [
    { k: "Ablenkungsfrei", pb: "✔", other: "✖" },
    { k: "Automatische Seiten-Erkennung", pb: "✔", other: "Teils" },
    { k: "EU‑Hosting & DSGVO", pb: "✔", other: "Unklar" },
    { k: "Offline‑Scans", pb: "✔", other: "✖" },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight text-center")}>Powerbook vs. App‑Chaos</h2>
        <p className="mt-3 text-center text-gray-600">Warum ein fokussiertes System besser funktioniert.</p>
        <div className="mt-8 overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-medium">Merkmal</th>
                <th className="p-4 text-left font-medium">Powerbook</th>
                <th className="p-4 text-left font-medium">Andere</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.k} className="odd:bg-white even:bg-gray-50">
                  <td className="p-4 text-gray-700">{r.k}</td>
                  <td className="p-4">{r.pb}</td>
                  <td className="p-4">{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// Video/Embed Bereich
function VideoSection() {
  return (
    <section id="video" className="relative isolate overflow-hidden py-24" style={{ backgroundColor: INK }}>
      <img
        src="https://images.unsplash.com/photo-1520975922284-2fda0b1b4ee3?q=80&w=1920&auto=format&fit=crop"
        alt="Dunkler Texturhintergrund"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="mx-auto max-w-5xl px-4 text-center text-white">
        <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Schreiben wie auf Papier – Digital gedacht</h2>
        <p className="mt-3 text-white/80">Ein kurzer Einblick in Scan‑Flow, Seitenverwaltung und Sync.</p>
        <div className="mx-auto mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Powerbook Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

// Pricing / Early Access
function Pricing() {
  return (
    <section id="pricing" className="py-20" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Early‑Access</h2>
        <p className="mt-3 text-gray-600">Sichere dir deinen Slot und spare beim Launch.</p>
        <div className="mx-auto mt-10 max-w-md rounded-3xl border p-8 shadow-sm bg-white">
          <div className="text-4xl font-semibold">€9 <span className="text-base font-normal text-gray-500">/ Monat</span></div>
          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>Unbegrenzte Scans</li>
            <li>Cloud‑Sync (EU)</li>
            <li>Priorisierter Support</li>
          </ul>
          <div className="mt-8">
            <Link href="/signup" className="rounded-xl bg-black px-6 py-3 text-white shadow-lg hover:-translate-y-0.5 transition">Jetzt sichern</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ
function FAQ() {
  const items = [
    {
      q: "Brauche ich Internet zum Scannen?",
      a: "Nein. Scans funktionieren offline. Sie werden synchronisiert, sobald du wieder online bist.",
    },
    { q: "Gibt es eine Web‑App?", a: "Ja. Powerbook funktioniert auf iOS, Android und im Browser." },
    {
      q: "Wie sieht der Datenschutz aus?",
      a: "EU‑Hosting, minimale Datenspeicherung, du behältst die Kontrolle.",
    },
  ];
  return (
    <section id="faq" className="border-t border-black/5 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className={cx(display.className, "text-center text-3xl sm:text-4xl leading-tight")}>
          Häufige Fragen
        </h2>
        <div className="mt-8 divide-y">
          {items.map((it) => (
            <details key={it.q} className="group py-4">
              <summary className="cursor-pointer list-none text-left font-medium">{it.q}</summary>
              <p className="mt-2 text-sm text-gray-600">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative overflow-hidden py-20" style={{ backgroundColor: INK }}>
      <div className="mx-auto max-w-3xl px-4 text-center text-white">
        <h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Bleib am Laufenden</h2>
        <p className="mt-3 text-white/80">Tipps, Updates und Testplätze zuerst erfahren.</p>
        <form className="mx-auto mt-8 flex max-w-md gap-2">
          <input type="email" required placeholder="deine@email.com" className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40" />
          <button className="rounded-xl bg-white px-5 py-3 font-medium text-black">Abonnieren</button>
        </form>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-20" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className={cx(display.className, "text-4xl sm:text-5xl leading-tight text-gray-900")}>Schreibe analog. Arbeite digital.</h2>
        <p className="mt-3 text-gray-700">Werde Early Adopter und sichere dir 20% auf die erste Bestellung.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/signup" className="rounded-xl bg-black px-6 py-3 font-medium text-white shadow-lg hover:-translate-y-0.5 transition">Early Access</Link>
          <Link href="/login" className="rounded-xl border px-6 py-3 text-gray-900 hover:bg-black/5">Anmelden</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Bolt className="h-4 w-4" /> Powerbook
        </div>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <Link href="/imprint" className="hover:text-gray-900">Impressum</Link>
          <Link href="/privacy" className="hover:text-gray-900">Datenschutz</Link>
          <Link href="/contact" className="hover:text-gray-900">Kontakt</Link>
        </nav>
        <div className="text-xs text-gray-400">© {new Date().getFullYear()} Powerbook</div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>      
      <Navbar />
      <Hero />
      <FeatureRow />
      <StorySplit />
      <Gallery />
      <FeatureDetails />
      <Comparison />
      <VideoSection />
      <Pricing />
      <FAQ />
      <Newsletter />
      <CTA />
      <Footer />
    </main>
  );
}
