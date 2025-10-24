import Link from "next/link";
import { INK, cx, display } from "@/lib/ui";


export default function StorySplit() {
return (
<section className="py-20" style={{ backgroundColor: INK }}>
<div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 text-white">
<div>
<h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Papier, das Kraft hat.</h2>
<p className="mt-4 text-white/85">Ein schönes, robustes Notizbuch mit dezenter Markierung pro Seite. Keine QR‑Codes, keine Ablenkung – nur Papier, das smart wird, wenn du es willst.</p>
<ul className="mt-6 space-y-3 text-sm text-white/90">
<li className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px]">✓</span> 120g Papier, tintenfest</li>
<li className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px]">✓</span> Flacher Aufschlag, Fadenbindung</li>
<li className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px]">✓</span> Minimalistische Seitenmarken – unsichtbar im Alltag</li>
</ul>
<div className="mt-8 flex flex-wrap gap-3">
<Link href="/signup" className="rounded-xl bg-white px-6 py-3 text-black shadow-lg hover:-translate-y-0.5 transition">Vorbestellen</Link>
<Link href="#cta" className="rounded-xl border border-white/30 px-6 py-3 text-white/90 hover:bg-white/10">Benachrichtigt werden</Link>
</div>
</div>
<div className="relative">
<div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
<img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1920&auto=format&fit=crop" alt="Schreibtisch Setup" className="h-full w-full object-cover" />
</div>
</div>
</div>
</section>
);
}