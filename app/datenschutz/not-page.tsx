import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { display, inter, CREAM, INK, cx } from "@/lib/ui";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Database, Smartphone, UserCheck, Cookie } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung | Powerbook",
  description: "Datenschutz-Informationen gem. DSGVO für Powerbook (TRO GmbH).",
};

export default function Page() {
  return (
    <main className={cx(inter.className, "bg-white text-gray-900")}>
      <Header />

      {/* Hero – braun bis ganz oben, ohne Überdeckung */}
      <section className="-mt-16 pt-44 pb-16 text-white" style={{ backgroundColor: INK }}>
        <div className="mx-auto max-w-5xl px-4">
          <Badge className="bg-white/15 text-white">DSGVO Österreich</Badge>
          <h1 className={cx(display.className, "mt-4 text-4xl sm:text-5xl leading-tight")}>
            Datenschutzerklärung
          </h1>
          <p className="mt-3 text-white/80">
            Gültig für Website & App unter{" "}
            <Link className="underline" href="https://my.powerbook.at">
              my.powerbook.at
            </Link>.
          </p>
        </div>
      </section>

      {/* Verantwortliche Stelle – nur hier CREAM */}
      <section className="py-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Verantwortliche Stelle</h2>
          <p className="mt-3 text-sm text-gray-700">
            <strong>TRO GmbH</strong>, Mötlas 47, 4273 Unterweißenbach, Österreich · E-Mail:{" "}
            <Link href="mailto:privacy@powerbook.at" className="underline">
              privacy@powerbook.at
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Ab hier alles weiß */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl flex items-center gap-2")}>
            <Shield className="h-5 w-5" /> Zwecke & Rechtsgrundlagen
          </h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-2">
            <li><strong>Account & App-Nutzung</strong> (Registrierung, Login, Sync): Art. 6 Abs. 1 lit. b DSGVO.</li>
            <li><strong>Support & Kommunikation</strong>: Art. 6 Abs. 1 lit. b und f DSGVO.</li>
            <li><strong>Produktverbesserung/Logs</strong>: Art. 6 Abs. 1 lit. f DSGVO.</li>
            <li><strong>Marketing/Newsletter</strong> (optional): Art. 6 Abs. 1 lit. a DSGVO (Einwilligung, widerrufbar).</li>
          </ul>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Welche Daten verarbeiten wir?</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 text-sm">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <UserCheck className="h-4 w-4" /> Basisdaten
              </h3>
              Name, E-Mail, gehashte Passwörter, Account-/Vertragsdaten.
            </div>
            <div className="rounded-2xl border bg-white p-5 text-sm">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Database className="h-4 w-4" /> Nutzungs-/Logdaten
              </h3>
              App-Events, technische Protokolle (IP, Zeitstempel, Browser/OS) zur Sicherheit/Stabilität.
            </div>
            <div className="md:col-span-2 rounded-2xl border bg-white p-5 text-sm">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Smartphone className="h-4 w-4" /> Inhaltsdaten
              </h3>
              Von dir hochgeladene Scans/Seiten/Notizen – Verarbeitung primär zur Synchronisation und
              Anzeige in deinem Account. Du behältst die Kontrolle (Löschen/Export).
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Auftragsverarbeiter & Übermittlungen</h2>
          <p className="mt-3 text-sm text-gray-700">
            Wir setzen sorgfältig ausgewählte Dienstleister (Hosting/Storage in der EU, E-Mail/Ticketing,
            Fehler-Monitoring, optional anonymisierte Analytics) ein. Übermittlungen in Drittländer erfolgen
            nur mit geeigneten Garantien nach Art. 44 ff. DSGVO (z. B. Standardvertragsklauseln).
          </p>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl flex items-center gap-2")}>
            <Cookie className="h-5 w-5" /> Cookies & Tracking
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Wir verwenden technisch notwendige Cookies (Login-Status, Sicherheit, Einstellungen). Optionale
            Analyse-Cookies setzen wir nur mit deiner Einwilligung; du kannst sie im Cookie-Banner jederzeit
            anpassen bzw. widerrufen.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Deine Rechte (Art. 15–22 DSGVO)</h2>
          <p className="mt-3 text-sm text-gray-700">
            Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit
            sowie Widerspruch gegen auf berechtigten Interessen beruhende Verarbeitungen. Kontakt:{" "}
            <Link className="underline" href="mailto:privacy@powerbook.at">privacy@powerbook.at</Link>.{" "}
            Beschwerde:{" "}
            <Link className="underline" href="https://www.dsb.gv.at/">Österreichische Datenschutzbehörde</Link>.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className={cx(display.className, "text-2xl sm:text-3xl")}>Speicherdauer & Sicherheit</h2>
          <p className="mt-3 text-sm text-gray-700">
            Verarbeitung für die Dauer der Vertragsbeziehung; gesetzliche Aufbewahrungspflichten (UGB/BAO)
            bleiben unberührt. Inhalte/Scans kannst du jederzeit löschen; Backups werden rollierend
            überschrieben. Sicherheit: TLS, ruhende Verschlüsselung auf der Plattform, Zugriffskontrollen,
            Protokollierung, regelmäßige Updates. Stand: {new Date().toLocaleDateString("de-AT")}.
          </p>
        </div>
      </section>

      {/* kompakte Kontaktbox in weiß */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <Card className="rounded-2xl border bg-white p-6 text-sm">
            Fragen? Schreib uns an{" "}
            <Link className="underline" href="mailto:privacy@powerbook.at">
              privacy@powerbook.at
            </Link>
            {" "}– wir antworten so rasch wie möglich.
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
