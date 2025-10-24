import { ShieldCheck, Sparkles, Layers } from "lucide-react";
import { CREAM, cx, inter } from "@/lib/ui";


export default function FeatureRow() {
const feats = [
{ title: "Elegantes Schreiben", text: "Feines Papier, flacher Aufschlag – dein Flow bleibt analog.", icon: <Sparkles className="h-5 w-5" /> },
{ title: "Magische Scans", text: "Auto‑Zuschneiden, Entzerren und Seitenzahl‑Erkennung.", icon: <Layers className="h-5 w-5" /> },
{ title: "Datenschutz zuerst", text: "EU‑Hosting, DSGVO‑ready, minimale Datenspeicherung.", icon: <ShieldCheck className="h-5 w-5" /> },
];
return (
<section id="features" className="py-20" style={{ backgroundColor: CREAM }}>
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
{feats.map((f) => (
<li key={f.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">{f.icon}</div>
<h3 className={cx(inter.className, "mt-3 text-lg font-semibold")}>{f.title}</h3>
<p className="mt-2 text-sm text-gray-600">{f.text}</p>
</li>
))}
</ul>
</div>
</section>
);
}