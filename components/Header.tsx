"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, Check } from "lucide-react";
import { cx } from "@/lib/ui";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

/* shadcn/ui */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type HeaderTexts = {
  nav: {
    how: string;
    pricing: string;
    shop: string;
    app: string;
    business: string;
  };
  login: string;
  cta: string;
  language: {
    label: string;
    de: string;
    en: string;
  };
};

export default function Header({ texts }: { texts: HeaderTexts }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // UI-State der aktuellen Sprache aus URL ableiten
  const [lang, setLang] = useState<"de" | "en">("de");
  useEffect(() => {
    const mPrefix = pathname.match(/^\/(de|en)(\/|$)/);
    const mSuffix = pathname.match(/\/(de|en)(\/|$)$/);
    if (mPrefix) setLang(mPrefix[1] as "de" | "en");
    else if (mSuffix) setLang(mSuffix[1] as "de" | "en");
    else setLang("de");
  }, [pathname]);

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
    { label: texts.nav.how, href: "/#how" },
    { label: texts.nav.pricing, href: "/#pricing" },
    { label: texts.nav.shop, href: "/shop" },
    { label: texts.nav.app, href: "/mobile" },
    { label: texts.nav.business, href: "/business" },
  ];

  // Sprachwechsel: erkennt Prefix- und Suffix-Routen (z. B. /datenschutz/de)
  const switchLang = (nextLang: "de" | "en") => {
    if (nextLang === lang) return;

    const suffixBases = ["/datenschutz"]; // hier deine Suffix-Routen pflegen
    const isSuffix = suffixBases.find(
      (base) => pathname === base || pathname.startsWith(`${base}/`)
    );

    if (isSuffix) {
      const nextPath = /(\/)(de|en)(\/|$)/.test(pathname.slice(isSuffix.length))
        ? pathname.replace(/(\/)(de|en)(\/|$)/, `$1${nextLang}$3`)
        : `${pathname.replace(/\/+$/, "")}/${nextLang}`;
      router.push(nextPath);
      setLang(nextLang);
      return;
    }

    // Prefix-Fall: /de/...  <->  /en/...
    const hasPrefix = /^\/(de|en)(\/|$)/.test(pathname);
    const nextPath = hasPrefix
      ? pathname.replace(/^\/(de|en)(?=\/|$)/, `/${nextLang}`)
      : `/${nextLang}${pathname}`;
    router.push(nextPath);
    setLang(nextLang);
  };

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition",
        scrolled
          ? "backdrop-blur bg-white/70 border-b border-black/5"
          : "backdrop-blur-sm bg-gradient-to-b from-black/30 to-transparent text-white"
      )}
    >
      {/* Topbar */}
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
              scrolled && "invert"
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
          {/* Sprach-Auswahl */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label={texts.language.label}
                className="rounded-xl px-3 py-2 cursor-pointer hover:bg-white/10 inline-flex items-center"
              >
                <Globe className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{texts.language.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  switchLang("de");
                }}
                className="justify-between"
              >
                {texts.language.de} {lang === "de" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  switchLang("en");
                }}
                className="justify-between"
              >
                {texts.language.en} {lang === "en" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="https://my.powerbook.at/login"
            className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            {texts.login}
          </Link>
          <Link
            href="https://my.powerbook.at/register"
            className={cx(
              "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-lg shadow-black/10 hover:-translate-y-0.5 transition",
              scrolled ? "bg-black text-white" : "bg-white text-black"
            )}
          >
            {texts.cta}
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-0">
            <div className="absolute inset-0 bg-[#2D2825]" />
            <div className="relative flex h-full w-full flex-col">
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

              <nav className="flex flex-1 items-center justify-center px-6 bg-[#2D2825]">
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

              <div className="px-6 pb-6 grid gap-3 bg-gradient-to-b bg-[#2D2825] pt-6 rounded-b-lg">
                <Link
                  href="https://my.powerbook.at/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm font-medium text-white bg-white/10 hover:bg-white/15"
                >
                  {texts.login}
                </Link>
                <Link
                  href="https://my.powerbook.at/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
                >
                  {texts.cta}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
