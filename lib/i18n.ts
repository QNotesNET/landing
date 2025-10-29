// lib/i18n.ts
import "server-only";

const dictionaries = {
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default), // 🇷🇺 hinzugefügt
};

export type Locale = keyof typeof dictionaries; // "de" | "en" | "ru"

export async function getDictionary(lang: Locale) {
  const loader = dictionaries[lang];
  if (!loader) {
    throw new Error(`No dictionary found for language: ${lang}`);
  }
  return loader();
}
