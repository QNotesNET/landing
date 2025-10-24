"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { Bolt, Rocket } from "lucide-react";
import { cx } from "@/lib/ui";


export default function Header() {
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