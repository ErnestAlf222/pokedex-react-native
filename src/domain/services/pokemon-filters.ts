import {
  ALL_GENERATIONS_VALUE,
  ALL_TYPES_VALUE,
  DEFAULT_SORT_ORDER,
} from '../../core';
import {
  PokemonFilterCriteria,
  PokemonGenerationIndex,
  PokemonSummary,
  PokemonTypeIndex,
} from '../entities';
import { filterPokemonByGeneration } from './filter-pokemon-by-generation';
import { filterPokemonByType } from './filter-pokemon-by-type';
import { searchPokemon } from './search-pokemon';
import { sortPokemon } from './sort-pokemon';

const EMPTY_GENERATION_INDEX: PokemonGenerationIndex = {
  generations: [],
  bySpecies: {},
};

// Pipeline único del listado local: búsqueda, tipo, generación y orden, en ese orden.
export const applyPokemonFilters = (
  list: PokemonSummary[],
  { query, type, generation, order }: PokemonFilterCriteria,
  typeIndex: PokemonTypeIndex = {},
  generationIndex: PokemonGenerationIndex = EMPTY_GENERATION_INDEX,
): PokemonSummary[] =>
  sortPokemon(
    filterPokemonByGeneration(
      filterPokemonByType(searchPokemon(list, query), typeIndex, type),
      generationIndex,
      generation,
    ),
    order,
  );

// Cuántos filtros del panel (generación y orden) están activos.
export const countPanelFilters = ({
  generation,
  order,
}: Pick<PokemonFilterCriteria, 'generation' | 'order'>): number =>
  Number(generation !== ALL_GENERATIONS_VALUE) +
  Number(order !== DEFAULT_SORT_ORDER);

// Indica si hay alguna búsqueda o filtro activo (entonces se usa la lista completa).
export const hasActiveFilters = (criteria: PokemonFilterCriteria): boolean =>
  criteria.query.trim() !== '' ||
  criteria.type !== ALL_TYPES_VALUE ||
  countPanelFilters(criteria) > 0;
