import { useEffect, useRef } from 'react';
import { ScrollViewInstance, StyleSheet, Text } from 'react-native';
import { PanGesture, ScrollView } from 'react-native-gesture-handler';
import { UI_MESSAGES, colors, fontSize, sizes, spacing } from '../../core';
import { EvolutionStage } from '../../domain';
import { EvolutionStageItem } from './evolution-stage-item';

interface EvolutionSectionProps {
  stages: EvolutionStage[];
  currentId: number;
  color: string;
  onSelect: (id: number) => void;
  blocksGesture?: PanGesture;
}

const ITEM_STRIDE = sizes.evolutionItem + spacing.sm;

// Fila horizontal con la cadena evolutiva, centrada en la etapa actual; su scroll bloquea el deslizado entre pestañas.
export const EvolutionSection = ({
  stages,
  currentId,
  color,
  onSelect,
  blocksGesture,
}: EvolutionSectionProps) => {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const isPositioned = useRef(false);
  const currentIndex = Math.max(
    stages.findIndex(stage => stage.id === currentId),
    0,
  );

  // Coloca la fila en la etapa actual, sin animación, al medir su contenido por primera vez.
  const positionOnFirstLayout = () => {
    if (!isPositioned.current) {
      isPositioned.current = true;
      scrollRef.current?.scrollTo({
        x: ITEM_STRIDE * currentIndex,
        animated: false,
      });
    }
  };

  // Anima el desplazamiento cuando cambia la etapa actual.
  useEffect(() => {
    if (isPositioned.current) {
      scrollRef.current?.scrollTo({
        x: ITEM_STRIDE * currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  if (stages.length <= 1) {
    return <Text style={styles.empty}>{UI_MESSAGES.noEvolutions}</Text>;
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      block={blocksGesture}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      onContentSizeChange={positionOnFirstLayout}>
      {stages.map(stage => (
        <EvolutionStageItem
          key={stage.id}
          stage={stage}
          isCurrent={stage.id === currentId}
          color={color}
          onPress={() => onSelect(stage.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
  empty: { fontSize: fontSize.body, color: colors.textSecondary },
});
