import Link from "next/link";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3-Spalten-Layout: Logo | Mitte (Links+Status) | Copyright */}
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[auto_1fr_auto]">
          {/* Links: Logo */}
          <Link href="/" className="flex items-center justify-center sm:justify-start">
            <Image
              src="/images/logos/logo-black.svg"
              alt="Powerbook"
              width={120}
              height={24}
              className="h-15 w-auto"
              priority
            />
          </Link>

          {/* Mitte: Rechts-Links + Status darunter, zentriert */}
          <div className="flex flex-col items-center">
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <Link href="/impressum" className="hover:text-gray-900">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-gray-900">Datenschutz</Link>
              <Link href="/agb" className="hover:text-gray-900">AGB</Link>
            </nav>
            <div className="mt-2">
              <StatusBadge />
            </div>
          </div>

          {/* Rechts: Copyright */}
          <div className="text-center text-xs text-gray-400 sm:text-right">
            © {new Date().getFullYear()} Powerbook - Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
}
