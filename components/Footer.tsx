import Link from "next/link";
import { Bolt } from "lucide-react";


export default function Footer() {
return (
<footer className="border-t border-black/5 bg-white py-10">
<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
<div className="flex items-center gap-2 text-sm text-gray-600"><Bolt className="h-4 w-4" /> Powerbook</div>
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