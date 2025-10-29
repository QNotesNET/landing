// app/[lang]/i18n.ts
import 'server-only';

const dictionaries = {
  de: () => import('./dictionaries/de.json').then(m => m.default),
  en: () => import('./dictionaries/en.json').then(m => m.default),
};

export async function getDictionary(lang: 'de' | 'en') {
  return dictionaries[lang]();
}
