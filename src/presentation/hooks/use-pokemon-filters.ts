import { useMemo, useState } from 'react';
import {
  ALL_GENERATIONS_VALUE,
  ALL_TYPES_VALUE,
  DEFAULT_SORT_ORDER,
  SEARCH_DEBOUNCE_MS,
  SortOrder,
} from '../../core';
import {
  PokemonFilterCriteria,
  countPanelFilters,
  hasActiveFilters,
} from '../../domain';
import { useDebouncedValue } from './use-debounced-value';

interface PanelFilters {
  generation: number;
  order: SortOrder;
}

// Estado único de los filtros del listado: búsqueda (con debounce), tipo, generación y orden.
export const usePokemonFilters = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(ALL_TYPES_VALUE);
  const [generation, setGeneration] = useState(ALL_GENERATIONS_VALUE);
  const [order, setOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  const criteria = useMemo<PokemonFilterCriteria>(
    () => ({ query: debouncedQuery, type, generation, order }),
    [debouncedQuery, type, generation, order],
  );

  // Aplica de una vez los filtros elegidos en el panel.
  const applyPanelFilters = (next: PanelFilters) => {
    setGeneration(next.generation);
    setOrder(next.order);
  };

  // Vuelve todo al estado inicial: búsqueda, tipo, generación y orden.
  const clearAll = () => {
    setQuery('');
    setType(ALL_TYPES_VALUE);
    setGeneration(ALL_GENERATIONS_VALUE);
    setOrder(DEFAULT_SORT_ORDER);
  };

  return {
    query,
    setQuery,
    setType,
    setGeneration,
    setOrder,
    criteria,
    applyPanelFilters,
    clearAll,
    activeFilterCount: countPanelFilters(criteria),
    isFiltering: hasActiveFilters(criteria),
  };
};
