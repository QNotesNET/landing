// app/[lang]/(marketing)/landing/page.tsx
import { notFound } from "next/navigation";
import { getDictionary } from "../../i18n";

const LOCALES = ["de", "en"] as const;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>; // <-- Promise
}) {
  const { lang } = await params; // <-- await
  if (!LOCALES.includes(lang as (typeof LOCALES)[number])) notFound();

  const t = await getDictionary(lang as "de" | "en");

  return (
    <main>
      <h1>{t.landing.title}</h1>
      <p>{t.landing.subtitle}</p>
      <a href="#shop">{t.landing.cta}</a>
    </main>
  );
}
