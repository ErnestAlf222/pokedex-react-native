import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import {
  CARD_ENTER_DELAY_MS,
  END_REACHED_THRESHOLD,
  LIST_COLUMNS,
  MAX_ANIMATED_CARDS,
  sizes,
  spacing,
} from '../../core';
import { PokemonSummary, PokemonTypeIndex } from '../../domain';
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
  typeIndex?: PokemonTypeIndex;
  onPressPokemon: (id: number) => void;
}

// Retraso de entrada de la tarjeta; solo las primeras se animan.
const getEnterDelay = (index: number): number | undefined =>
  index < MAX_ANIMATED_CARDS ? index * CARD_ENTER_DELAY_MS : undefined;

// Cuadrícula de tarjetas de Pokémon, reutilizada por el listado y los resultados filtrados.
export const PokemonGrid = ({
  data,
  typeIndex,
  onPressPokemon,
  ...listProps
}: PokemonGridProps) => (
  <FlatList
    {...listProps}
    data={data}
    keyExtractor={item => String(item.id)}
    renderItem={({ item, index }) => (
      <PokemonCard
        pokemon={item}
        types={typeIndex?.[item.id]}
        enterDelayMs={getEnterDelay(index)}
        onPress={() => onPressPokemon(item.id)}
      />
    )}
    numColumns={LIST_COLUMNS}
    contentContainerStyle={styles.content}
    onEndReachedThreshold={END_REACHED_THRESHOLD}
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="on-drag"
  />
);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.sm,
    paddingBottom: sizes.fabListInset,
  },
});
