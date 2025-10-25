import { NextResponse } from "next/server";

/**
 * ENV-Konfig:
 *  KUMA_BASE_URL=https://status.powerbook.at
 *  KUMA_SLUG=powerbook            // Dein Status-Page-Slug (unter Uptime Kuma → Status Pages)
 *
 * Die Route versucht, die öffentliche Status-Page-Summary abzurufen
 * und auf einen simplen Gesamtstatus zu mappen.
 */
export async function GET() {
  try {
    const base = process.env.KUMA_BASE_URL;
    const slug = process.env.KUMA_SLUG;

    if (!base || !slug) {
      // Fallback (z. B. in Dev) – alles ok
      return NextResponse.json({ overall: "up" });
    }

    // Uptime Kuma Status-Page Summary (public)
    // Hinweis: Für Uptime Kuma ≥1.23.* funktioniert folgender Endpoint:
    const url = `${base.replace(/\/$/, "")}/api/status-page/summary?slug=${encodeURIComponent(slug)}`;

    const r = await fetch(url, { next: { revalidate: 0 } });
    if (!r.ok) throw new Error(`Kuma summary fetch failed: ${r.status}`);
    const summary = await r.json();

    // Sehr defensives Mapping:
    // Wir schauen, ob irgendein Monitor "down" ist → overall=down
    // sonst, wenn irgendein Monitor "degraded"/"maintenance" ist → overall=degraded
    // sonst → up
    const monitors: Array<{ status?: string }> =
      summary?.monitors || summary?.data?.monitors || [];

    const statuses = monitors.map((m) => String(m.status || "").toLowerCase());

    let overall: "up" | "degraded" | "down" = "up";
    if (statuses.some((s) => s.includes("down") || s.includes("critical"))) {
      overall = "down";
    } else if (
      statuses.some((s) =>
        ["degraded", "maintenance", "partial", "warning"].some((k) => s.includes(k))
      )
    ) {
      overall = "degraded";
    }

    return NextResponse.json({ overall });
  } catch (e) {
    // Bei Fehlern: unknown (grau)
    return NextResponse.json({ overall: "unknown" });
  }
}
