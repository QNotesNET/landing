// app/proxy.ts (oder proxy.js)
import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { locales, defaultLocale } from '@/lib/i18n';

function getLocale(request: Request) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales as unknown as string[], defaultLocale);
}

export function proxy(request: Request) {
  const { pathname } = new URL(request.url);
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = new URL(request.url);
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

// Alle Routen außer internem _next
export const config = {
  matcher: ['/((?!_next).*)'],
};
