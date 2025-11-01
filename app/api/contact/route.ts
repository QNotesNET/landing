// app/api/contact/route.ts
export const runtime = "nodejs";

const N8N_WEBHOOK =
  "https://n8n.automatedirect.net/webhook/22357134-d704-4d7f-aca0-bdeca9deada3";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // optional: timeout, revalidate, etc.
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false }), { status: 502 });
    }

    // Antworte immer mit etwas, das der Client lesen darf
    return Response.json({ ok: true });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
