import Link from "next/link";
import { CREAM, cx, display } from "@/lib/ui";


export default function Pricing() {
return (
<section id="pricing" className="py-20" style={{ backgroundColor: CREAM }}>
<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
<h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Early‑Access</h2>
<p className="mt-3 text-gray-600">Sichere dir deinen Slot und spare beim Launch.</p>
<div className="mx-auto mt-10 max-w-md rounded-3xl border p-8 shadow-sm bg-white">
<div className="text-4xl font-semibold">€9 <span className="text-base font-normal text-gray-500">/ Monat</span></div>
<ul className="mt-6 space-y-2 text-sm text-gray-700">
<li>Unbegrenzte Scans</li>
<li>Cloud‑Sync (EU)</li>
<li>Priorisierter Support</li>
</ul>
<div className="mt-8">
<Link href="/signup" className="rounded-xl bg-black px-6 py-3 text-white shadow-lg hover:-translate-y-0.5 transition">Jetzt sichern</Link>
</div>
</div>
</div>

</section>
);
}