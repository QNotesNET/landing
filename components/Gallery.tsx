import { CREAM } from "@/lib/ui";


export default function Gallery() {
const imgs = [
"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
"https://images.unsplash.com/photo-1529336953121-4a1121188589?q=80&w=1200&auto=format&fit=crop",
"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
"https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1200&auto=format&fit=crop",
];
return (
<section className="py-20" style={{ backgroundColor: CREAM }}>
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
{imgs.map((src) => (
<div key={src} className="aspect-[3/4] overflow-hidden rounded-2xl border">
<img src={src} alt="Powerbook Mockup" className="h-full w-full object-cover" />
</div>
))}
</div>
</div>
</section>
);
}