import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  getGenerationLabel,
  getQueryViewState,
  getTypeLabel,
  noResultsMessage,
} from '../../core';
import {
  PokemonFilterCriteria,
  PokemonGenerationIndex,
  PokemonSummary,
  PokemonTypeIndex,
  applyPokemonFilters,
} from '../../domain';
import { EmptyView } from './empty-view';
import { PokemonGrid } from './pokemon-grid';
import { QueryFallbackView } from './query-fallback-view';

interface PokemonSearchResultsProps {
  all: UseQueryResult<PokemonSummary[]>;
  criteria: PokemonFilterCriteria;
  typeIndex?: PokemonTypeIndex;
  generationIndex?: PokemonGenerationIndex;
  onPressPokemon: (id: number) => void;
}

// Resultados locales sobre la lista completa (búsqueda, tipo, generación y orden a la vez), con sus estados de carga, sin conexión y error.
export const PokemonSearchResults = ({
  all,
  criteria,
  typeIndex,
  generationIndex,
  onPressPokemon,
}: PokemonSearchResultsProps) => {
  const results = useMemo(
    () =>
      applyPokemonFilters(all.data ?? [], criteria, typeIndex, generationIndex),
    [all.data, criteria, typeIndex, generationIndex],
  );
  const viewState = getQueryViewState(all);
  const generation = generationIndex?.generations.find(
    ({ id }) => id === criteria.generation,
  );

  if (viewState !== 'content' || !all.data) {
    return (
      <QueryFallbackView
        state={viewState}
        error={all.error}
        onRetry={() => all.refetch()}
      />
    );
  }

  return (
    <PokemonGrid
      data={results}
      typeIndex={typeIndex}
      onPressPokemon={onPressPokemon}
      ListEmptyComponent={
        <EmptyView
          message={noResultsMessage(
            criteria.query.trim(),
            criteria.type === '' ? '' : getTypeLabel(criteria.type),
            generation === undefined
              ? ''
              : getGenerationLabel(generation.name, generation.region),
          )}
        />
      }
    />
  );
};
