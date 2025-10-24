import { INK, cx, display } from "@/lib/ui";


export default function Newsletter() {
return (
<section className="relative overflow-hidden py-20" style={{ backgroundColor: INK }}>
<div className="mx-auto max-w-3xl px-4 text-center text-white">
<h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Bleib am Laufenden</h2>
<p className="mt-3 text-white/80">Tipps, Updates und Testplätze zuerst erfahren.</p>
<form className="mx-auto mt-8 flex max-w-md gap-2">
<input type="email" required placeholder="deine@email.com" className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40" />
<button className="rounded-xl bg-white px-5 py-3 font-medium text-black">Abonnieren</button>
</form>
</div>
</section>
);
}