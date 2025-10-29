// app/[lang]/dictionaries.ts
import 'server-only';

const dicts = {
  de: () => import('./dictionaries/de.json').then(m => m.default),
  en: () => import('./dictionaries/en.json').then(m => m.default),
};

export async function getDictionary(locale: 'de' | 'en') {
  return dicts[locale]();
}
