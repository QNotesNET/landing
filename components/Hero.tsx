import Link from "next/link";
import { Youtube, ChevronRight } from "lucide-react";
import { CREAM, cx, display, inter } from "@/lib/ui";


export default function Hero() {
    return (
        <section className="relative isolate min-h-[100vh]">
            <img
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1920&auto=format&fit=crop"
                alt="Minimaler Arbeitsplatz mit Notizbuch"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_10%,rgba(0,0,0,0.55),transparent)]" />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        `linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.06) 78%, ${CREAM} 95%, #ffffff 100%)`,
                }}
            />


            <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 items-center px-4 pt-24 pb-24 sm:px-6 lg:grid-cols-[minmax(0,680px)_1fr] lg:px-8">
                <div className="text-white text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black">NEU</span>
                        <span>Powerbook A5 • Bald erhältlich</span>
                    </div>


                    <h1 className={cx(display.className, "text-5xl sm:text-6xl leading-[1.05] drop-shadow-md")}>Papier das Kraft hat</h1>
                    <p className={cx(inter.className, "mt-6 max-w-2xl text-lg text-white/85")}>Schreibe analog. Arbeite digital. Das Powerbook, das deine Seiten elegant mit der App verbindet – ohne Ablenkung.</p>


                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <Link href="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-[#2D2825] px-5 py-3 font-medium text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 transition">
                            Jetzt entdecken <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <Link href="/shop" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white backdrop-blur hover:bg-white/20">
                            Kaufen
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}