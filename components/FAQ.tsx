import { cx, display } from "@/lib/ui";


export default function FAQ() {
const items = [
{ q: "Brauche ich Internet zum Scannen?", a: "Nein. Scans funktionieren offline. Sie werden synchronisiert, sobald du wieder online bist." },
{ q: "Gibt es eine Web‑App?", a: "Ja. Powerbook funktioniert auf iOS, Android und im Browser." },
{ q: "Wie sieht der Datenschutz aus?", a: "EU‑Hosting, minimale Datenspeicherung, du behältst die Kontrolle." },
];
return (
<section id="faq" className="border-t border-black/5 bg-white py-20">
<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
<h2 className={cx(display.className, "text-center text-3xl sm:text-4xl leading-tight")}>Häufige Fragen</h2>
<div className="mt-8 divide-y">
{items.map((it) => (
<details key={it.q} className="group py-4">
<summary className="cursor-pointer list-none text-left font-medium">{it.q}</summary>
<p className="mt-2 text-sm text-gray-600">{it.a}</p>
</details>
))}
</div>
</div>
</section>
);
}