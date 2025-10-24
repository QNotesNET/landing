import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Logo (schwarz) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logos/logo-black.svg"
            alt="Powerbook"
            width={120}
            height={24}
            className="h-15 w-auto"
            priority
          />
        </Link>

        {/* Links – auf Handy zentriert, auf Desktop in einer Reihe */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          <Link href="/impressum" className="hover:text-gray-900">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-gray-900">
            Datenschutz
          </Link>
          <Link href="/agb" className="hover:text-gray-900">
            AGB
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} Powerbook - Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
