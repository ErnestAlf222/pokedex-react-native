import { formatSlug } from '../../core';
import { PokemonSummary } from '../entities';

const DIGITS_ONLY = /^\d+$/;

// Normaliza la consulta: minúsculas y sin espacios sobrantes.
const normalize = (query: string): string => query.trim().toLowerCase();

// Indica si el nombre contiene el texto, en su forma de slug o en la legible.
const matchesName = (name: string, text: string): boolean =>
  name.includes(text) || formatSlug(name).toLowerCase().includes(text);

// Filtra por nombre (parcial) o, si la consulta son dígitos, por el inicio del número.
export const searchPokemon = (
  list: PokemonSummary[],
  query: string,
): PokemonSummary[] => {
  const text = normalize(query);
  if (text === '') {
    return list;
  }
  const idPrefix = DIGITS_ONLY.test(text) ? String(Number(text)) : null;
  return list.filter(
    ({ id, name }) =>
      matchesName(name, text) ||
      (idPrefix !== null && String(id).startsWith(idPrefix)),
  );
};
