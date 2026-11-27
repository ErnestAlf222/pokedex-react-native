import { ScrollView, StyleSheet } from 'react-native';
import { ALL_TYPES_VALUE, layout, spacing } from '../../core';
import { useChipRowScroll } from '../hooks';
import { TypeFilterChip } from './type-filter-chip';

interface TypeFilterChipsProps {
  types: string[];
  selected: string;
  onSelect: (type: string) => void;
}

// Fila horizontal de chips con "Todos" y los tipos; solo uno puede estar activo y la fila se desplaza para mostrarlo.
export const TypeFilterChips = ({
  types,
  selected,
  onSelect,
}: TypeFilterChipsProps) => {
  const { scrollRef, onViewportLayout, onChipLayout } =
    useChipRowScroll(selected);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onLayout={onViewportLayout}
      style={styles.row}
      contentContainerStyle={styles.content}>
      {[ALL_TYPES_VALUE, ...types].map(type => (
        <TypeFilterChip
          key={type}
          type={type}
          isActive={type === selected}
          onPress={onSelect}
          onLayout={onChipLayout(type)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: layout.listHeader.chipsTop,
    marginBottom: layout.listHeader.chipsBottom,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
});
