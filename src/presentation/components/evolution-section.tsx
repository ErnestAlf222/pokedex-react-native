import { ScrollView, StyleSheet, Text } from 'react-native';
import { UI_MESSAGES, colors, fontSize, spacing } from '../../core';
import { EvolutionStage } from '../../domain';
import { EvolutionStageItem } from './evolution-stage-item';

interface EvolutionSectionProps {
  stages: EvolutionStage[];
  currentId: number;
  onSelect: (id: number) => void;
}

// Fila horizontal con la cadena evolutiva, o un aviso si no hay evoluciones.
export const EvolutionSection = ({
  stages,
  currentId,
  onSelect,
}: EvolutionSectionProps) =>
  stages.length <= 1 ? (
    <Text style={styles.empty}>{UI_MESSAGES.noEvolutions}</Text>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}>
      {stages.map(stage => (
        <EvolutionStageItem
          key={stage.id}
          stage={stage}
          isCurrent={stage.id === currentId}
          onPress={() => onSelect(stage.id)}
        />
      ))}
    </ScrollView>
  );

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
  empty: { fontSize: fontSize.body, color: colors.textSecondary },
});
