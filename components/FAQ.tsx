import { cx, display } from "@/lib/ui";

export default function FAQ() {
  const items = [
    {
      q: "Muss ich ein Powerbook kaufen, um die App zu nutzen?",
      a: "Nein. Du kannst Powerbook auch ohne physisches Notizbuch verwenden. Das gedruckte Powerbook bietet dir zusätzlich ein optimiertes Schreibgefühl und einen besonders reibungslosen Workflow.",
    },
    {
      q: "Wo werden meine Daten und Scans gespeichert?",
      a: "Deine Daten werden auf EU-Servern gespeichert. Wir setzen auf Transportverschlüsselung (TLS), speichern nur das Nötigste und du kannst Inhalte jederzeit löschen.",
    },
    {
      q: "Sind meine Scans privat?",
      a: "Ja. Bei uns sind alle deine Scans privat.",
    },
    {
      q: "Brauche ich Internet zum Scannen?",
      a: "Nein. Scans funktionieren offline. Sie werden synchronisiert, sobald du wieder online bist.",
    },
    {
      q: "Gibt es eine Web-App?",
      a: "Ja. Powerbook funktioniert auf iOS, Android und im Browser.",
    },
    {
      q: "Was kostet Powerbook?",
      a: "Du kannst kostenlos starten. Preise für erweiterte Funktionen und das physische Powerbook findest du auf unserer Website.",
    },
    {
      q: "Kann ich Powerbook mit anderen Tools verbinden?",
      a: "Optional kannst du Integrationen (z. B. Kalender oder Aufgaben) aktivieren. Deine Zustimmung ist dafür erforderlich und du kannst sie jederzeit wieder trennen.",
    },
    {
      q: "Kann ich meine Scans exportieren oder teilen?",
      a: "Ja. Du kannst Seiten als PDF/JPG exportieren und über deine bevorzugten Dienste teilen.",
    },
  ];
  return (
    <section id="faq" className="border-t border-black/5 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className={cx(display.className, "text-center text-3xl sm:text-4xl leading-tight")}>
          Häufige Fragen
        </h2>
        <div className="mt-8 divide-y">
          {items.map((it) => (
            <details key={it.q} className="group py-4">
              <summary className="cursor-pointer list-none text-left font-medium">{it.q}</summary>
              <p className="mt-2 text-sm text-gray-600">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
