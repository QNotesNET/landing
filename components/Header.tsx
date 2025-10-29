"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Rocket, Menu, X, Globe, Check } from "lucide-react";
import { cx } from "@/lib/ui";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale, defaultLocale } from "@/lib/i18n";

/* ⬇️ shadcn/ui DropdownMenu */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/** --- Mini-Dictionary für DE/EN (inkl. Dropdown-Texte) --- */
const DICT = {
  de: {
    nav: [
      { label: "So funktioniert's", hash: "#how" },
      { label: "Preise", hash: "#pricing" },
      { label: "Shop", path: "/shop" },
      { label: "App", path: "/mobile" },
      { label: "Business", path: "/business" },
    ],
    login: "Anmelden",
    cta: "Jetzt starten",
    menuLabel: "Sprache",
    menuItems: [
      { code: "de", label: "Deutsch" },
      { code: "en", label: "Englisch" },
    ] as const,
  },
  en: {
    nav: [
      { label: "How it works", hash: "#how" },
      { label: "Pricing", hash: "#pricing" },
      { label: "Shop", path: "/shop" },
      { label: "App", path: "/mobile" },
      { label: "Business", path: "/business" },
    ],
    login: "Sign in",
    cta: "Get started",
    menuLabel: "Language",
    menuItems: [
      { code: "de", label: "German" },
      { code: "en", label: "English" },
    ] as const,
  },
} as const;

export default function Header({ current }: { current: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // (optional) Local UI-Status – bleibt für die Check-Icons erhalten
  const [lang, setLang] = useState<"de" | "en">("de");

  const pathname = usePathname();
  const router = useRouter();

  // Aktive Sprache aus der URL ableiten (Fallback auf prop 'current' oder 'de')
  const activeLocale: Locale = (() => {
    const seg = pathname?.split("/")[1] || "";
    if ((locales as readonly string[]).includes(seg)) return seg as Locale;
    if (current && (locales as readonly string[]).includes(current)) return current;
    return "de";
  })();

  useEffect(() => {
    // sync lokaler UI-State mit aktiver URL-Sprache (für Check-Icon)
    if (activeLocale === "de" || activeLocale === "en") setLang(activeLocale);
  }, [activeLocale]);

  // Robuster Pfadwechsel (mit defaultLocale = "de"): ersetzt vorhandenes Sprachsegment oder fügt es ein/entfernt es
  function switchTo(locale: Locale) {
    if (!pathname) return;

    const segments = pathname.split("/"); // ["", maybeLang, ...]
    const hasPrefix = (locales as readonly string[]).includes(segments[1]);

    if (locale === defaultLocale) {
      // -> Defaultsprache: Prefix entfernen (falls vorhanden)
      if (hasPrefix) segments.splice(1, 1);
    } else {
      // -> Nicht-Default: Prefix setzen/ersetzen
      if (hasPrefix) segments[1] = locale;
      else segments.splice(1, 0, locale);
    }

    const next = segments.join("/") || "/";
    router.push(next);
  }

  // Scroll-State (für Logo-Invert im Header)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren, wenn Drawer offen
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  /** --- Texte & URL-Prefix pro Sprache --- */
  const T = DICT[activeLocale];
  const prefix = activeLocale === defaultLocale ? "" : `/${activeLocale}`;

  // Navigation-Items mit richtigem Prefix bauen
  const items = T.nav.map((i) => {
    const href =
      "hash" in i && i.hash
        ? `${prefix}/${i.hash.replace(/^#/, "") ? i.hash : ""}`
        : `${prefix}${i.path || ""}`;
    return {
      label: i.label,
      href: href.replace(/\/+$/, "").replace(/([^:])\/{2,}/g, "$1/") || "/",
    };
  });

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition",
        scrolled
          ? "backdrop-blur bg-white/70 border-b border-black/5"
          : "backdrop-blur-sm bg-gradient-to-b from-black/30 to-transparent text-white"
      )}
    >
      {/* Topbar – wird unsichtbar, sobald der Drawer offen ist */}
      <div
        className={cx(
          "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
          mobileOpen &&
            "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
        )}
      >
        <Link href={prefix || "/"}>
          <Image
            src="/images/logos/logo-white.svg"
            className={cx(
              "flex items-center h-35 w-35 transition",
              scrolled && "invert" // beim Scrollen invertieren (weiß -> schwarz)
            )}
            alt="Powerbook Logo"
            width={25}
            height={15}
            priority
          />
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {items.map((i) => (
            <Link key={i.label} href={i.href} className="hover:opacity-80">
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* ⬇️ Sprach-Auswahl über Globus-Icon (shadcn Dropdown) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Sprache wählen"
                className="rounded-xl px-3 py-2 cursor-pointer hover:bg-white/10 inline-flex items-center"
              >
                <Globe className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>

            {/* Design bleibt unverändert – nur Texte dynamisch */}
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{T.menuLabel}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {T.menuItems.map(({ code, label }) => (
                <DropdownMenuItem
                  key={code}
                  onSelect={(e) => {
                    e.preventDefault();
                    setLang(code as "de" | "en");
                    switchTo(code as Locale);
                  }}
                  className="justify-between"
                >
                  {label} {lang === code && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* ⬆️ Globus + Dropdown */}

          <Link
            href="https://my.powerbook.at/login"
            className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            {T.login}
          </Link>

          <Link
            href="https://my.powerbook.at/register"
            className={cx(
              "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-lg shadow-black/10 hover:-translate-y-0.5 transition",
              scrolled ? "bg-black text-white" : "bg-white text-black"
            )}
          >
            {T.cta}
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <button
          aria-label="Menü öffnen"
          aria-controls="mobile-drawer"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {mobileOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel: Fullscreen, dunkler Gradient + Blur */}
          <aside className="absolute inset-0">
            <div className="absolute inset-0 bg-[#2D2825]" />

            <div className="relative flex h-full w-full flex-col">
              {/* Drawer-Topbar */}
              <div className="flex h-16 items-center justify-between px-4">
                <Link href={prefix || "/"} onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/images/logos/logo-white.svg"
                    alt="Powerbook Logo"
                    width={25}
                    height={15}
                    className="h-35 w-35"
                    priority
                  />
                </Link>
                <button
                  aria-label="Menü schließen"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center p-2"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex flex-1 items-center justify-center px-6  bg-[#2D2825]">
                <ul className="w-full space-y-3 text-center">
                  {items.map((i) => (
                    <li key={i.label}>
                      <Link
                        href={i.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-white hover:bg-white/10"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA-Buttons unten */}
              <div className="px-6 pb-6 grid gap-3 bg-gradient-to-b bg-[#2D2825] pt-6 rounded-b-lg">
                <Link
                  href="https://my.powerbook.at/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm font-medium text-white bg-white/10 hover:bg-white/15"
                >
                  {T.login}
                </Link>
                <Link
                  href="https://my.powerbook.at/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
                >
                  {T.cta}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
