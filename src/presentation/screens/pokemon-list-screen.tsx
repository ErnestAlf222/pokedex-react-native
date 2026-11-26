import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  END_REACHED_THRESHOLD,
  LIST_COLUMNS,
  ROUTES,
  getErrorMessage,
  layout,
  sizes,
  spacing,
} from '../../core';
import {
  EmptyView,
  ErrorView,
  PokeballLoader,
  PokemonCard,
} from '../components';
import { usePokemonList } from '../hooks';
import { AppNavigation } from '../navigation';

// Pantalla del listado en cuadrícula con scroll infinito, refresco y estados.
export const PokemonListScreen = () => {
  const navigation = useNavigation<AppNavigation>();
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
    <FlatList
      data={data}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          onPress={() =>
            navigation.navigate(ROUTES.pokemonDetail, { id: item.id })
          }
        />
      )}
      numColumns={LIST_COLUMNS}
      contentContainerStyle={styles.content}
      onEndReached={loadMore}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
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
  content: { flexGrow: 1, padding: spacing.sm },
  footer: { alignItems: 'center', padding: spacing.md },
});
