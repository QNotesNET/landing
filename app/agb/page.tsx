import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "AGB | Powerbook",
  description: "Allgemeine Geschäftsbedingungen der TRO GmbH (Powerbook) – Österreich.",
};

export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header />

      {/* Hero – braun bis ganz oben */}
      <section className="-mt-16 pt-44 pb-16 text-white" style={{ backgroundColor: INK }}>
        <div className="mx-auto max-w-5xl px-4">
          <Badge className="bg-white/15 text-white">Vertragsbedingungen</Badge>
          <h1 className={cx(display.className, "mt-4 text-4xl sm:text-5xl leading-tight")}>
            Allgemeine Geschäftsbedingungen 
          </h1>
          <p className="mt-3 text-white/80">
            Geltend für die Nutzung der Powerbook-App und verbundener Dienste.
          </p>
        </div>
      </section>

      {/* Einleitung */}
      <section className="py-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm text-gray-700">
            Vertragspartnerin: <strong>TRO GmbH, Mötlas 47, 4273 Unterweißenbach</strong>. 
            Abweichende Bedingungen gelten nur bei schriftlicher Bestätigung.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl space-y-6 px-4">
          <div>
            <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>1. Geltung & Vertragspartner</h2>
            <p className="mt-2 text-sm text-gray-700">
              Diese AGB gelten zwischen der Anbieterin (TRO GmbH) und Nutzer:innen der Powerbook-App
              sowie aller zugehörigen Dienste (
              <Link href="https://my.powerbook.at" className="underline">my.powerbook.at</Link>).
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" /> 2. Leistungsbeschreibung
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Digitalisierung, Verwaltung und Synchronisation analoger Notizseiten; Web- und Mobile-App.</p>
              <p>Beta-/Early-Access-Features können variieren; kein Anspruch auf bestimmte Funktionen.</p>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> 3. Nutzung, Accounts & Pflichten
            </h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Account erforderlich; Zugangsdaten vertraulich behandeln.</li>
              <li>Unzulässig: rechtswidrige Inhalte, Systemeingriffe, geteilte Accounts ohne Erlaubnis.</li>
              <li>Backups werden erstellt; Verantwortung für Exporte eigener Inhalte bleibt bei Nutzer:innen.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5" /> 4. Preise, Laufzeit & Kündigung
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Entgelte inkl. USt., sofern nicht anders angegeben. Abos verlängern sich automatisch;
              Kündigung zum Ende der Periode in der App/im Kundenkonto möglich. Gesetzliche Rechte
              bleiben unberührt.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>5. Verfügbarkeit & Wartung</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              Stand-der-Technik-Verfügbarkeit; Wartungsfenster können zu kurzen Unterbrechungen führen.
              Geplante Wartungen kündigen wir – soweit möglich – vorab an.
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold">6. Haftung</h3>
            <p className="mt-2 text-sm text-gray-700">
              Bei leichter Fahrlässigkeit Haftung nur bei Verletzung wesentlicher Pflichten und begrenzt
              auf den typischen, vorhersehbaren Schaden. Unberührt: Produkthaftung und Ansprüche wegen
              Verletzung von Leben, Körper, Gesundheit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">7. Geistiges Eigentum</h3>
            <p className="mt-2 text-sm text-gray-700">
              Rechte an Software, Marken, Inhalten und Designs verbleiben bei der Anbieterin bzw. Lizenzgebern.
              Nutzung als einfaches, nicht übertragbares Recht für die Vertragsdauer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">8. Datenschutz</h3>
            <p className="mt-2 text-sm text-gray-700">
              Es gilt unsere <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">9. Schlussbestimmungen</h3>
            <p className="mt-2 text-sm text-gray-700">
              Österreichisches Recht; Gerichtsstand Linz (soweit zulässig). Salvatorische Klausel.
              Stand: {new Date().toLocaleDateString("de-AT")}.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
