import { INK, cx, display } from "@/lib/ui";


export default function VideoSection() {
return (
<section id="video" className="relative isolate overflow-hidden py-24" style={{ backgroundColor: INK }}>
<img src="https://images.unsplash.com/photo-1520975922284-2fda0b1b4ee3?q=80&w=1920&auto=format&fit=crop" alt="Dunkler Texturhintergrund" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
<div className="mx-auto max-w-5xl px-4 text-center text-white">
<h2 className={cx(display.className, "text-3xl sm:text-4xl leading-tight")}>Schreiben wie auf Papier – Digital gedacht</h2>
<p className="mt-3 text-white/80">Ein kurzer Einblick in Scan‑Flow, Seitenverwaltung und Sync.</p>
<div className="mx-auto mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
<iframe className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Powerbook Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
</div>
</div>
</section>
);
}