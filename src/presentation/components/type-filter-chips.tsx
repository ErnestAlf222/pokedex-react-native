import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import {
  ALL_TYPES_VALUE,
  UI_MESSAGES,
  colors,
  effects,
  fontSize,
  fontWeight,
  formatSlug,
  getTypeColor,
  radius,
  sizes,
  spacing,
  withAlpha,
} from '../../core';

interface TypeFilterChipsProps {
  types: string[];
  selected: string;
  onSelect: (type: string) => void;
}

// Color del chip: el del tipo, o el de marca para "Todos".
const getChipColor = (type: string): string =>
  type === ALL_TYPES_VALUE ? colors.primary : getTypeColor(type);

// Fila horizontal de chips con "Todos" y los tipos; solo uno puede estar activo.
export const TypeFilterChips = ({
  types,
  selected,
  onSelect,
}: TypeFilterChipsProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    style={styles.row}
    contentContainerStyle={styles.content}>
    {[ALL_TYPES_VALUE, ...types].map(type => {
      const isActive = type === selected;
      const chipColor = getChipColor(type);
      return (
        <Pressable
          key={type}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
          onPress={() => onSelect(type)}
          style={[
            styles.chip,
            {
              backgroundColor: isActive
                ? chipColor
                : withAlpha(chipColor, effects.chipInactiveOpacity),
            },
          ]}>
          <Text
            style={[
              styles.label,
              { color: isActive ? colors.onGradient : colors.textPrimary },
            ]}>
            {type === ALL_TYPES_VALUE ? UI_MESSAGES.allTypes : formatSlug(type)}
          </Text>
        </Pressable>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  row: { flexGrow: 0, flexShrink: 0, marginTop: spacing.md },
  content: { paddingHorizontal: spacing.md, gap: spacing.sm },
  chip: {
    justifyContent: 'center',
    height: sizes.chipHeight,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  label: { fontSize: fontSize.caption, fontWeight: fontWeight.bold },
});
