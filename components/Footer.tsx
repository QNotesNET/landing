"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Instagram, Linkedin, Facebook, Globe, Check } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale, defaultLocale } from "@/lib/i18n";

/* shadcn/ui */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/** --- Dictionary (DE/EN) --- */
const DICT = {
  de: {
    sections: {
      brand: "Powerbook",
      nav: "Navigation",
      links: "Links",
      app: "Mobile App",
    },
    nav: [
      { label: "So funktioniert's", hash: "#how" },
      { label: "Preise", hash: "#pricing" },
      { label: "Shop", path: "/shop" },
      { label: "Business", path: "/business" },
    ],
    links: [
      { label: "Jetzt starten", href: "https://my.powerbook.at/register" },
      { label: "Status", href: "https://status.powerbook.at" },
      { label: "Kontakt", href: "mailto:info@powerbook.at" },
    ],
    login: "Anmelden",
    legal: { imprint: "Impressum", privacy: "Datenschutz", terms: "AGB" },
    copyrightSuffix: "Alle Rechte vorbehalten.",
    menuLabel: "Sprache",
    menuItems: [
      { code: "de", label: "Deutsch" },
      { code: "en", label: "Englisch" },
    ] as const,
    languageButton: "Sprache",
  },
  en: {
    sections: {
      brand: "Powerbook",
      nav: "Navigation",
      links: "Links",
      app: "Mobile App",
    },
    nav: [
      { label: "How it works", hash: "#how" },
      { label: "Pricing", hash: "#pricing" },
      { label: "Shop", path: "/shop" },
      { label: "Business", path: "/business" },
    ],
    links: [
      { label: "Get started", href: "https://my.powerbook.at/register" },
      { label: "Status", href: "https://status.powerbook.at" },
      { label: "Contact", href: "mailto:info@powerbook.at" },
    ],
    login: "Sign in",
    legal: { imprint: "Imprint", privacy: "Privacy", terms: "Terms" },
    copyrightSuffix: "All rights reserved.",
    menuLabel: "Language",
    menuItems: [
      { code: "de", label: "German" },
      { code: "en", label: "English" },
    ] as const,
    languageButton: "Language",
  },
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  // Aktive Sprache aus URL ableiten
  const activeLocale: Locale = (() => {
    const seg = pathname?.split("/")[1] || "";
    return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
  })();

  const T = DICT[activeLocale];
  // Prefix wie im Header: Defaultsprache ohne Prefix, sonst '/en'
  const prefix = activeLocale === defaultLocale ? "" : `/${activeLocale}`;

  // Links mit korrektem Prefix bauen (Hash-Links respektieren)
  const NAV = T.nav.map((i) => {
    const href =
      "hash" in i && i.hash
        ? `${prefix}/${i.hash.replace(/^#/, "") ? i.hash : ""}`
        : `${prefix}${i.path || ""}`;
    return { label: i.label, href: href.replace(/\/+$/, "").replace(/([^:])\/{2,}/g, "$1/") || "/" };
  });
  const LINKS = T.links; // externe/absolute Links bleiben wie sie sind

  // Sprachwechsel analog Header: DefaultLocale entfernt Prefix
  function switchTo(locale: Locale) {
    if (!pathname) return;
    const segments = pathname.split("/"); // ["", maybeLang, ...]
    const hasPrefix = (locales as readonly string[]).includes(segments[1]);

    if (locale === defaultLocale) {
      if (hasPrefix) segments.splice(1, 1);
    } else {
      if (hasPrefix) segments[1] = locale;
      else segments.splice(1, 0, locale);
    }
    const next = segments.join("/") || "/";
    router.push(next);
  }

  return (
    <footer className="bg-neutral-950 text-neutral-200">
      {/* Top area */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-6">
          {/* 1. Logo + Socials */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              {T.sections.brand}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <Link href={prefix || "/"} className="inline-flex items-center">
                <Image
                  src="/images/logos/logo-white.svg"
                  alt="Powerbook"
                  width={140}
                  height={28}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
              <div className="mt-4 flex items-center gap-4">
                <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </details>

          {/* 2. Navigation */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              {T.sections.nav}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <nav className="px-4 pb-4">
              <ul className="space-y-3">
                {NAV.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} className="text-neutral-300 hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>

          {/* 3. Links */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              {T.sections.links}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <nav className="px-4 pb-4">
              <ul className="space-y-3">
                {LINKS.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} className="text-neutral-300 hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>

          {/* 4. Powerbook (Stores) */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              {T.sections.app}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href="https://apps.apple.com/" aria-label="App Store" className="inline-block">
                  <img
                    src="/images/icons/appstore.webp"
                    alt="Download on the App Store"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </a>
                <a href="https://play.google.com/" aria-label="Google Play" className="inline-block">
                  <img
                    src="/images/icons/playstore.webp"
                    alt="Get it on Google Play"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </details>
        </div>

        {/* Desktop: 4 columns */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-8">
          {/* Col 1: Logo + Socials + Language */}
          <div className="space-y-6">
            <Link href={prefix || "/"} className="inline-flex items-center">
              <Image
                src="/images/logos/logo-white.svg"
                alt="Powerbook"
                width={140}
                height={28}
                className="h-15 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/powerbook"
                aria-label="LinkedIn"
                className="hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* ⬇️ NEW: Globe + Text (Desktop, unter Socials) */}
            <DropdownMenu>
              {/* <DropdownMenuTrigger asChild>
                <button
                  aria-label={T.languageButton}
                  className="rounded-xl px-3 py-2 inline-flex items-center gap-2 text-sm text-neutral-300 hover:bg-white/10"
                >
                  <Globe className="h-4 w-4" />
                  <span>{T.languageButton}</span>
                </button>
              </DropdownMenuTrigger> */}
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>{T.menuLabel}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {T.menuItems.map(({ code, label }) => (
                  <DropdownMenuItem
                    key={code}
                    onSelect={(e) => {
                      e.preventDefault();
                      switchTo(code as Locale);
                    }}
                    className="justify-between"
                  >
                    {label} {activeLocale === code && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* ⬆️ NEW */}
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white">{T.sections.nav}</h3>
            <nav className="mt-4">
              <ul className="space-y-3">
                {NAV.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} className="text-sm text-neutral-300 hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3: Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">{T.sections.links}</h3>
            <nav className="mt-4">
              <ul className="space-y-3">
                {LINKS.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} className="text-sm text-neutral-300 hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4: Powerbook (Login + Stores) */}
          <div>
            <h3 className="text-sm font-semibold text-white">{T.sections.brand}</h3>
            <div className="mt-4 space-y-4">
              <Link href="https://my.powerbook.at" className="text-sm text-neutral-300 hover:text-white">
                {T.login}
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <a href="https://apps.apple.com/" aria-label="App Store" className="inline-block">
                  <img
                    src="/images/icons/appstore.webp"
                    alt="Download on the App Store"
                    className="h-11 w-auto"
                    loading="lazy"
                  />
                </a>
                <a href="https://play.google.com/" aria-label="Google Play" className="inline-block">
                  <img
                    src="/images/icons/playstore.webp"
                    alt="Get it on Google Play"
                    className="h-11 w-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar with legal + status */}
      <div className="border-t border-white/10">
        <div
          className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8
                        flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* LEFT GROUP: Copyright | Language | Status */}
          <div
            className="flex flex-col items-center gap-2
                          md:flex-row md:items-center md:justify-start md:gap-3"
          >
            {/* ⬇️ NEW: Language switch (Mobile & Desktop, in der Bottom-Bar) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={T.languageButton}
                  className="rounded-xl px-3 py-2 inline-flex items-center gap-2 text-xs text-neutral-300 hover:bg-white/10"
                >
                  <Globe className="h-4 w-4" />
                  <span>{T.languageButton}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>{T.menuLabel}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {T.menuItems.map(({ code, label }) => (
                  <DropdownMenuItem
                    key={code}
                    onSelect={(e) => {
                      e.preventDefault();
                      switchTo(code as Locale);
                    }}
                    className="justify-between"
                  >
                    {label} {activeLocale === code && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* ⬆️ NEW */}

    <span className="hidden md:inline-block text-neutral-400">|</span>
            {/* Divider only on desktop + Status
            <div className="text-xs">
              <span className="hidden md:inline-block text-neutral-400">|ㅤ</span>
              <StatusBadge />
            </div> */}

            {/* Copyright */}
            <p className="text-xs text-neutral-400">
              © {year} <span className="font-medium text-neutral-200">Powerbook</span> · {T.copyrightSuffix}
            </p>
          </div>

          {/* RIGHT GROUP: Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            <Link href={`${prefix}/impressum`} className="hover:text-white">
              {T.legal.imprint}
            </Link>
            <Link href={`${prefix}/datenschutz`} className="hover:text-white">
              {T.legal.privacy}
            </Link>
            <Link href={`${prefix}/agb`} className="hover:text-white">
              {T.legal.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
