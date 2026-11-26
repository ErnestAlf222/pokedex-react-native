import { StyleSheet, View } from 'react-native';
import { getQueryViewState, sizes, spacing } from '../../core';
import { usePokemonList } from '../hooks';
import { EmptyView } from './empty-view';
import { PokeballLoader } from './pokeball-loader';
import { PokemonGrid } from './pokemon-grid';
import { QueryFallbackView } from './query-fallback-view';

interface PokemonInfiniteListProps {
  onPressPokemon: (id: number) => void;
}

// Listado paginado con scroll infinito, pull to refresh y estados de carga, sin conexión y error.
export const PokemonInfiniteList = ({
  onPressPokemon,
}: PokemonInfiniteListProps) => {
  const query = usePokemonList();
  const {
    data,
    error,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = query;
  const viewState = getQueryViewState(query);

  if (viewState !== 'content' || !data) {
    return (
      <QueryFallbackView
        state={viewState}
        error={error}
        onRetry={() => refetch()}
      />
    );
  }

  // Pide la siguiente página si existe y no hay otra carga en curso.
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <PokemonGrid
      data={data}
      onPressPokemon={onPressPokemon}
      onEndReached={loadMore}
      refreshing={isRefetching && !isFetchingNextPage}
      onRefresh={() => refetch()}
      ListEmptyComponent={EmptyView}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footer}>
            <PokeballLoader size={sizes.loaderSmall} />
          </View>
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  footer: { alignItems: 'center', padding: spacing.md },
});
