import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UI_MESSAGES, colors, fontSize, sizes, spacing } from '../../core';
import { EvolutionStage } from '../../domain';
import { EvolutionStageItem } from './evolution-stage-item';

interface EvolutionSectionProps {
  stages: EvolutionStage[];
  currentId: number;
  onSelect: (id: number) => void;
}

const ITEM_STRIDE = sizes.evolutionItem + spacing.sm;

// Calcula la posición de cada tarjeta (ancho fijo más separador) para el scroll inicial.
const getItemLayout = (_: unknown, index: number) => ({
  length: sizes.evolutionItem,
  offset: ITEM_STRIDE * index,
  index,
});

// Espacio entre tarjetas de la fila.
const Separator = () => <View style={styles.separator} />;

// Fila horizontal con la cadena evolutiva, abierta en la etapa actual, o un aviso si no hay evoluciones.
export const EvolutionSection = ({
  stages,
  currentId,
  onSelect,
}: EvolutionSectionProps) =>
  stages.length <= 1 ? (
    <Text style={styles.empty}>{UI_MESSAGES.noEvolutions}</Text>
  ) : (
    <FlatList
      horizontal
      data={stages}
      keyExtractor={stage => String(stage.id)}
      getItemLayout={getItemLayout}
      initialScrollIndex={Math.max(
        stages.findIndex(stage => stage.id === currentId),
        0,
      )}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <EvolutionStageItem
          stage={item}
          isCurrent={item.id === currentId}
          onPress={() => onSelect(item.id)}
        />
      )}
    />
  );

const styles = StyleSheet.create({
  separator: { width: spacing.sm },
  empty: { fontSize: fontSize.body, color: colors.textSecondary },
});
