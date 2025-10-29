"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Instagram, Linkedin, Facebook } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

type FooterTexts = {
  navHeading: string;
  linksHeading: string;
  appHeading: string;
  nav: { label: string; href: string }[];
  links: { label: string; href: string }[];
  legal: { label: string; href: string }[];
  copyright: string;
};

export default function Footer({ texts }: { texts: FooterTexts }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-200">
      {/* Top area */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile Accordion */}
        <div className="md:hidden space-y-6">
          {/* 1. Logo + Socials */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              Powerbook
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <Link href="/" className="inline-flex items-center">
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
                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </details>

          {/* 2. Navigation */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              {texts.navHeading}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <nav className="px-4 pb-4">
              <ul className="space-y-3">
                {texts.nav.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-neutral-300 hover:text-white"
                    >
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
              {texts.linksHeading}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <nav className="px-4 pb-4">
              <ul className="space-y-3">
                {texts.links.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-neutral-300 hover:text-white"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>

          {/* 4. App Section */}
          <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium">
              {texts.appHeading}
              <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.apple.com/"
                  aria-label="App Store"
                  className="inline-block"
                >
                  <img
                    src="/images/icons/appstore.webp"
                    alt="Download on the App Store"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://play.google.com/"
                  aria-label="Google Play"
                  className="inline-block"
                >
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

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-8">
          {/* Logo + Socials */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center">
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
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {texts.navHeading}
            </h3>
            <nav className="mt-4">
              <ul className="space-y-3">
                {texts.nav.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-sm text-neutral-300 hover:text-white"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {texts.linksHeading}
            </h3>
            <nav className="mt-4">
              <ul className="space-y-3">
                {texts.links.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-sm text-neutral-300 hover:text-white"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* App */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {texts.appHeading}
            </h3>
            <div className="mt-4 space-y-4">
              <Link
                href="https://my.powerbook.at"
                className="text-sm text-neutral-300 hover:text-white"
              >
                Anmelden
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <a
                  href="https://apps.apple.com/"
                  aria-label="App Store"
                  className="inline-block"
                >
                  <img
                    src="/images/icons/appstore.webp"
                    alt="Download on the App Store"
                    className="h-11 w-auto"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://play.google.com/"
                  aria-label="Google Play"
                  className="inline-block"
                >
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

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div
          className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8
            flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Left */}
          <div
            className="flex flex-col items-center gap-2
              md:flex-row md:items-center md:justify-start md:gap-3"
          >
            <div className="order-1 md:order-2 text-xs">
              <span className="hidden md:inline-block md:order-3 text-neutral-400">
                |ㅤ{" "}
              </span>
              <StatusBadge />
            </div>
            <p className="order-2 md:order-1 text-xs text-neutral-400">
              © {year} Powerbook · {texts.copyright}
            </p>
          </div>

          {/* Right */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            {texts.legal.map((it) => (
              <Link key={it.label} href={it.href} className="hover:text-white">
                {it.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
