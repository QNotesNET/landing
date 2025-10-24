import { cx, display } from "@/lib/ui";


export default function Comparison() {
const rows = [
{ k: "Ablenkungsfrei", pb: "✔", other: "✖" },
{ k: "Automatische Seiten-Erkennung", pb: "✔", other: "Teils" },
{ k: "EU‑Hosting & DSGVO", pb: "✔", other: "Unklar" },
{ k: "Offline‑Scans", pb: "✔", other: "✖" },
];
return (
<section className="bg-white py-20">
<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
<h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight text-center")}>Powerbook vs. App‑Chaos</h2>
<p className="mt-3 text-center text-gray-600">Warum ein fokussiertes System besser funktioniert.</p>
<div className="mt-8 overflow-hidden rounded-2xl border">
<table className="w-full text-sm">
<thead className="bg-gray-50">
<tr>
<th className="p-4 text-left font-medium">Merkmal</th>
<th className="p-4 text-left font-medium">Powerbook</th>
<th className="p-4 text-left font-medium">Andere</th>
</tr>
</thead>
<tbody>
{rows.map((r) => (
<tr key={r.k} className="odd:bg-white even:bg-gray-50">
<td className="p-4 text-gray-700">{r.k}</td>
<td className="p-4">{r.pb}</td>
<td className="p-4">{r.other}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</section>
);
}