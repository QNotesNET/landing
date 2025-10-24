"use client";


import { cx, inter } from "@/lib/ui";
import Hero from "@/components/Hero";
import FeatureRow from "@/components/FeatureRow";
import StorySplit from "@/components/StorySplit";
import Gallery from "@/components/Gallery";
import FeatureDetails from "@/components/FeatureDetails";
import Comparison from "@/components/Comparison";
import VideoSection from "@/components/VideoSection";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Page() {
return (
<main className={cx(inter.className, "bg-white text-gray-900")}>
<Header />
<Hero />
<StorySplit />
<FeatureDetails />
<Comparison />
<Pricing />
<FAQ />
<Newsletter />
<Footer />
</main>
);
}