import { cx, display } from "@/lib/ui";


export default function FeatureDetails() {
const blocks = [
{ title: "Magische Scans", text: "Ränder, Perspektive, Kontrast – automatisch erkannt. Ein Tap reicht.", img: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=1600&auto=format&fit=crop" },
{ title: "Sofort gefunden", text: "Seiten, Notizbücher und Tags blitzschnell filtern – auch offline.", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop" },
];
return (
<section className="bg-gradient-to-b from-white to-[rgba(0,0,0,0.02)] py-20">
<div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
{blocks.map((b, i) => (
<div key={b.title} className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
<div>
<h3 className={cx(display.className, "text-2xl sm:text-3xl leading-tight")}>{b.title}</h3>
<p className="mt-3 text-gray-600">{b.text}</p>
</div>
<div className="overflow-hidden rounded-3xl border shadow-sm">
<img src={b.img} alt={b.title} className="h-full w-full object-cover" />
</div>
</div>
))}
</div>
</section>
);
}