import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  effects,
  fontSize,
  fontWeight,
  radius,
  spacing,
  withAlpha,
} from '../../core';

interface LabelChipProps {
  label: string;
  color: string;
  filled?: boolean;
}

interface LabelChipListProps {
  labels: string[];
  color: string;
}

// Chip con texto: tinte suave del color, o relleno completo con texto blanco si es filled.
export const LabelChip = ({ label, color, filled = false }: LabelChipProps) => (
  <View
    style={[
      styles.chip,
      {
        backgroundColor: filled
          ? color
          : withAlpha(color, effects.softTintOpacity),
      },
    ]}>
    <Text style={[styles.label, filled && styles.labelFilled]}>{label}</Text>
  </View>
);

// Fila de chips que salta de línea cuando no caben.
export const LabelChipList = ({ labels, color }: LabelChipListProps) => (
  <View style={styles.list}>
    {labels.map(label => (
      <LabelChip key={label} label={label} color={color} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  labelFilled: { color: colors.onGradient },
  list: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
