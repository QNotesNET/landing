"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Rocket, Menu, X } from "lucide-react";
import { cx } from "@/lib/ui";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const items = [
    { label: "So funktioniert's", href: "/#features" },
    { label: "Preise", href: "/#pricing" },
    { label: "Shop", href: "/shop" },
    { label: "App", href: "/app" },
    { label: "Business", href: "/business" },
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
      {/* Topbar – wird unsichtbar, sobald der Drawer offen ist */}
      <div
        className={cx(
          "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
          mobileOpen && "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
        )}
      >
        <Link href="/">
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
          <Link
            href="https://my.powerbook.at/login"
            className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Anmelden
          </Link>
          {/* ⬇️ EINZIGE ÄNDERUNG: Farbe abhängig von `scrolled` */}
          <Link
            href="https://my.powerbook.at/register"
            className={cx(
              "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-lg shadow-black/10 hover:-translate-y-0.5 transition",
              scrolled ? "bg-black text-white" : "bg-white text-black"
            )}
          >
            Jetzt starten 
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
              {/* Drawer-Topbar: gleiche Höhe/Alignment wie Header */}
              <div className="flex h-16 items-center justify-between px-4">
                <Link href="/" onClick={() => setMobileOpen(false)}>
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

              {/* Nav zentriert & mittig */}
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
                  Anmelden
                </Link>
                <Link
                  href="https://my.powerbook.at/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
                >
                  Jetzt starten
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
