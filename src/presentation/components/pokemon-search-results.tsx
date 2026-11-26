import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getQueryViewState, noResultsMessage } from '../../core';
import { PokemonSummary, searchPokemon } from '../../domain';
import { EmptyView } from './empty-view';
import { PokemonGrid } from './pokemon-grid';
import { QueryFallbackView } from './query-fallback-view';

interface PokemonSearchResultsProps {
  all: UseQueryResult<PokemonSummary[]>;
  query: string;
  onPressPokemon: (id: number) => void;
}

// Resultados de la búsqueda local sobre la lista completa, con sus estados de carga, sin conexión y error.
export const PokemonSearchResults = ({
  all,
  query,
  onPressPokemon,
}: PokemonSearchResultsProps) => {
  const results = useMemo(
    () => searchPokemon(all.data ?? [], query),
    [all.data, query],
  );
  const viewState = getQueryViewState(all);

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
      onPressPokemon={onPressPokemon}
      ListEmptyComponent={
        <EmptyView message={noResultsMessage(query.trim())} />
      }
    />
  );
};
