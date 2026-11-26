import { PokemonSummary, PokemonTypeIndex } from '../entities';

// Filtra por tipo usando el índice; con el tipo vacío devuelve toda la lista.
export const filterPokemonByType = (
  list: PokemonSummary[],
  typeIndex: PokemonTypeIndex,
  typeName: string,
): PokemonSummary[] =>
  typeName === ''
    ? list
    : list.filter(({ id }) => typeIndex[id]?.includes(typeName) ?? false);

// Deriva del índice los nombres de tipo que existen, sin repetir y ordenados.
export const listTypeNames = (typeIndex: PokemonTypeIndex): string[] =>
  [...new Set(Object.values(typeIndex).flat())].sort();
