import { StyleSheet, View } from 'react-native';
import { getErrorMessage, layout, sizes, spacing } from '../../core';
import { usePokemonList } from '../hooks';
import { EmptyView } from './empty-view';
import { ErrorView } from './error-view';
import { PokeballLoader } from './pokeball-loader';
import { PokemonGrid } from './pokemon-grid';

interface PokemonInfiniteListProps {
  onPressPokemon: (id: number) => void;
}

// Listado paginado con scroll infinito, pull to refresh y estados de carga y error.
export const PokemonInfiniteList = ({
  onPressPokemon,
}: PokemonInfiniteListProps) => {
  const {
    data,
    error,
    isPending,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = usePokemonList();

  if (isPending) {
    return (
      <View style={layout.center}>
        <PokeballLoader />
      </View>
    );
  }

  if (!data) {
    return (
      <ErrorView message={getErrorMessage(error)} onRetry={() => refetch()} />
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
