import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { formatSlug, getQueryViewState, noResultsMessage } from '../../core';
import {
  PokemonSummary,
  PokemonTypeIndex,
  filterPokemonByType,
  searchPokemon,
} from '../../domain';
import { EmptyView } from './empty-view';
import { PokemonGrid } from './pokemon-grid';
import { QueryFallbackView } from './query-fallback-view';

interface PokemonSearchResultsProps {
  all: UseQueryResult<PokemonSummary[]>;
  query: string;
  typeName: string;
  typeIndex?: PokemonTypeIndex;
  onPressPokemon: (id: number) => void;
}

// Resultados locales sobre la lista completa (texto y tipo a la vez), con sus estados de carga, sin conexión y error.
export const PokemonSearchResults = ({
  all,
  query,
  typeName,
  typeIndex,
  onPressPokemon,
}: PokemonSearchResultsProps) => {
  const results = useMemo(
    () =>
      filterPokemonByType(
        searchPokemon(all.data ?? [], query),
        typeIndex ?? {},
        typeName,
      ),
    [all.data, query, typeIndex, typeName],
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
      typeIndex={typeIndex}
      onPressPokemon={onPressPokemon}
      ListEmptyComponent={
        <EmptyView
          message={noResultsMessage(
            query.trim(),
            typeName === '' ? '' : formatSlug(typeName),
          )}
        />
      }
    />
  );
};
