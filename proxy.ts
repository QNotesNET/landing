// proxy.ts (Projektwurzel)
import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

const locales = ['de', 'en'] as const;
const defaultLocale = 'de';

function getLocale(request: Request) {
  const headers = { 'accept-language': request.headers.get('accept-language') ?? '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(request: Request) {
  const { pathname } = new URL(request.url);

  // Interne Pfade überspringen
  const isInternal = pathname.startsWith('/_next') || pathname.startsWith('/api');
  if (isInternal) return;

  // Hat die URL bereits ein Sprachprefix?
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  // Redirect auf passende Sprache
  const locale = getLocale(request);
  const url = new URL(request.url);
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}
