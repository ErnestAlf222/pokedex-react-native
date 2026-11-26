import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { END_REACHED_THRESHOLD, LIST_COLUMNS, spacing } from '../../core';
import { PokemonSummary } from '../../domain';
import { PokemonCard } from './pokemon-card';

type GridListProps = Pick<
  FlatListProps<PokemonSummary>,
  | 'onEndReached'
  | 'onRefresh'
  | 'refreshing'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
>;

interface PokemonGridProps extends GridListProps {
  data: PokemonSummary[];
  onPressPokemon: (id: number) => void;
}

// Cuadrícula de tarjetas de Pokémon, reutilizada por el listado y la búsqueda.
export const PokemonGrid = ({
  data,
  onPressPokemon,
  ...listProps
}: PokemonGridProps) => (
  <FlatList
    {...listProps}
    data={data}
    keyExtractor={item => String(item.id)}
    renderItem={({ item }) => (
      <PokemonCard pokemon={item} onPress={() => onPressPokemon(item.id)} />
    )}
    numColumns={LIST_COLUMNS}
    contentContainerStyle={styles.content}
    onEndReachedThreshold={END_REACHED_THRESHOLD}
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="on-drag"
  />
);

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: spacing.sm },
});
