import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Mail, Phone, Globe, Scale } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Impressum | Powerbook",
  description: "Impressum der TRO GmbH (Powerbook) – Österreich.",
};

export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header />

      {/* Hero / Headerband – Hintergrund geht bis ganz oben, Inhalt hat Abstand */}
      <section className="-mt-16 pt-44 pb-16 text-white" style={{ backgroundColor: INK }}>
        <div className="mx-auto max-w-5xl px-4">
          <Badge className="bg-white/15 text-white">Rechtliche Angaben</Badge>
          <h1 className={cx(display.className, "mt-4 text-4xl sm:text-5xl leading-tight")}>
            Impressum
          </h1>
          <p className="mt-3 text-white/80">
            Angaben gemäß § 5 ECG, § 14 UGB und § 24 MedienG (Österreich).
          </p>
        </div>
      </section>

      {/* Company + Register (mix) */}
      <section className="py-12" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Unternehmen</h2>
            <div className="mt-4 space-y-3 text-sm sm:text-base">
              <p className="font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                TRO GmbH
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                Mötlas 47, 4273 Unterweißenbach, Österreich
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <Link href="https://my.powerbook.at" className="underline">my.powerbook.at</Link>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Link href="mailto:hello@powerbook.at" className="underline">hello@powerbook.at</Link>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                +43 (0) XXX XXX XXX
              </p>
            </div>

            <h3 className="mt-10 text-lg font-semibold">Medieninhaberin / Redaktion</h3>
            <p className="mt-2 text-sm text-gray-700">
              TRO GmbH – Inhalte dieser Website und der App werden intern erstellt und gewartet.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Unternehmensdaten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p>Firmenbuchgericht: <strong>Landesgericht Linz</strong></p>
                <p>Firmenbuchnummer: <strong>FN 000000x</strong> (Dummy)</p>
                <p>UID/USt-ID: <strong>ATU00000000</strong> (Dummy)</p>
                <p>Geschäftsführung: <strong>—</strong> (Dummy)</p>
                <p>Mitglied der WKÖ, Fachgruppe: <strong>Information & Consulting</strong> (Beispiel)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Aufsichtsbehörde</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Bezirkshauptmannschaft Freistadt (Beispiel)
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Haftung / Urheberrecht */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Haftung / Urheberrecht</h2>
          <div className="mt-4 space-y-4 text-sm text-gray-700">
            <p>
              Inhalte wurden mit größter Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und
              Aktualität übernehmen wir keine Gewähr. Externe Links werden sorgfältig geprüft; für
              deren Inhalte sind ausschließlich die Betreiber:innen verantwortlich.
            </p>
            <p>
              Texte, Marken, Fotos und Grafiken auf dieser Website und in der App sind urheberrechtlich
              geschützt. Jede Nutzung außerhalb der engen Grenzen des Urheberrechts bedarf der vorherigen
              schriftlichen Zustimmung der Rechteinhaber.
            </p>
            <p className="text-gray-500">
              Genderhinweis: Aus Gründen der Lesbarkeit wird auf Doppelnennungen verzichtet; alle
              Bezeichnungen gelten gleichermaßen für alle Geschlechter.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
