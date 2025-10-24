// Shared Utilities, Fonts & Colors
import { Inter, Playfair_Display } from "next/font/google";


export const inter = Inter({ subsets: ["latin"], display: "swap" });
export const display = Playfair_Display({
subsets: ["latin"],
style: ["normal", "italic"],
weight: ["400", "500", "600", "700", "800", "900"],
display: "swap",
});


// Brand Colors (aus deinen Screens): Creme & Dunkelbraun
export const CREAM = "#F6F2EB"; // helles, warmes Weiß
export const INK = "#2D2825"; // sehr dunkles Braun/Anthrazit


export function cx(...classes: Array<string | false | null | undefined>) {
return classes.filter(Boolean).join(" ");
}