import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '../config';

interface LocalizedEntry {
  language: { name: string };
}

const SOFT_HYPHEN = '­';
const SPACE_CODE = 0x20;
const DELETE_CODE = 0x7f;
const LAST_CONTROL_CODE = 0x9f;
const WHITESPACE_RUN = /\s+/g;

// Elige la entrada más reciente (la última de la lista) en el idioma indicado, o en el de respaldo si no hay.
export const pickLocalized = <T extends LocalizedEntry>(
  entries: T[],
  language: string = DEFAULT_LANGUAGE,
  fallback: string = FALLBACK_LANGUAGE,
): T | undefined => {
  // Última entrada del idioma dado, si existe.
  const lastIn = (code: string): T | undefined =>
    entries.filter(entry => entry.language.name === code).pop();
  return lastIn(language) ?? lastIn(fallback);
};

// Indica si el carácter es de control (C0, DEL o C1).
const isControlChar = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return (
    code < SPACE_CODE || (code >= DELETE_CODE && code <= LAST_CONTROL_CODE)
  );
};

// Limpia un texto de la API: cambia saltos y controles por espacio, quita guiones suaves y compacta espacios.
export const cleanApiText = (text: string): string =>
  Array.from(text, char => {
    if (char === SOFT_HYPHEN) {
      return '';
    }
    return isControlChar(char) ? ' ' : char;
  })
    .join('')
    .replace(WHITESPACE_RUN, ' ')
    .trim();

// Texto limpio de la entrada localizada más reciente, tomado con el selector (names → name, flavor_text → flavor_text); cadena vacía si no hay.
export const pickLocalizedText = <T extends LocalizedEntry>(
  entries: T[],
  select: (entry: T) => string,
  language?: string,
  fallback?: string,
): string => {
  const entry = pickLocalized(entries, language, fallback);
  return entry === undefined ? '' : cleanApiText(select(entry));
};
