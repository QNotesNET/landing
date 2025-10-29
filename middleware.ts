// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as intlMatch } from "@formatjs/intl-localematcher";

const LOCALES = ["de", "en"] as const;
const DEFAULT_LOCALE = "de";
const SUFFIX_ROUTES = [""]; // => /datenschutz/de

function isInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

function getBestLocale(req: NextRequest) {
  // 1) Cookie bevorzugen (wenn du Lokalsprache persistieren willst)
  const cookieLocale = req.cookies.get("locale")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as any)) {
    return cookieLocale as (typeof LOCALES)[number];
  }

  // 2) Accept-Language korrekt parsen & matchen
  const headers = { "accept-language": req.headers.get("accept-language") ?? "" };
  const languages = new Negotiator({ headers }).languages(); // sortiert nach q-Wert
  const best = intlMatch(languages, LOCALES, DEFAULT_LOCALE);
  return best as (typeof LOCALES)[number];
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (isInternal(pathname)) return NextResponse.next();

  // --- Suffix-Routen: /datenschutz -> /datenschutz/<lang>
  const suffixBase = SUFFIX_ROUTES.find(
    (base) => pathname === base || pathname.startsWith(`${base}/`)
  );
  if (suffixBase) {
    const hasSuffix = LOCALES.some(
      (l) => pathname === `${suffixBase}/${l}` || pathname.startsWith(`${suffixBase}/${l}/`)
    );
    if (!hasSuffix) {
      const locale = getBestLocale(req);
      url.pathname = `${pathname.replace(/\/+$/, "")}/${locale}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // --- Prefix-Routen: / -> /<lang>   und   /foo -> /<lang>/foo
  const hasPrefix = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (!hasPrefix) {
    const locale = getBestLocale(req);
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|assets|.*\\..*).*)"],
};
