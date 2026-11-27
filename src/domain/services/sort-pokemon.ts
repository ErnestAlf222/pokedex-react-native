import { SortOrder } from '../../core';
import { PokemonSummary } from '../entities';

type Comparator = (a: PokemonSummary, b: PokemonSummary) => number;

const COMPARATORS: Record<SortOrder, Comparator> = {
  'number-asc': (a, b) => a.id - b.id,
  'number-desc': (a, b) => b.id - a.id,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
};

// Devuelve una copia de la lista ordenada por número ascendente, número descendente o nombre A–Z.
export const sortPokemon = (
  list: PokemonSummary[],
  order: SortOrder,
): PokemonSummary[] => [...list].sort(COMPARATORS[order]);
