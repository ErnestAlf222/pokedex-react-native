import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { View } from 'react-native';
import { getErrorMessage, layout, noResultsMessage } from '../../core';
import { PokemonSummary, searchPokemon } from '../../domain';
import { EmptyView } from './empty-view';
import { ErrorView } from './error-view';
import { PokeballLoader } from './pokeball-loader';
import { PokemonGrid } from './pokemon-grid';

interface PokemonSearchResultsProps {
  all: UseQueryResult<PokemonSummary[]>;
  query: string;
  onPressPokemon: (id: number) => void;
}

// Resultados de la búsqueda local sobre la lista completa, con sus estados de carga y error.
export const PokemonSearchResults = ({
  all,
  query,
  onPressPokemon,
}: PokemonSearchResultsProps) => {
  const results = useMemo(
    () => searchPokemon(all.data ?? [], query),
    [all.data, query],
  );

  if (all.isPending) {
    return (
      <View style={layout.center}>
        <PokeballLoader />
      </View>
    );
  }

  if (!all.data) {
    return (
      <ErrorView
        message={getErrorMessage(all.error)}
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
