// lib/i18n.ts
import 'server-only';

const dictionaries = {
  de: () =>
    import('./dictionaries/de.json').then((module) => module.default),
  en: () =>
    import('./dictionaries/en.json').then((module) => module.default),
};

export async function getDictionary(lang: 'de' | 'en') {
  return dictionaries[lang]();
}
