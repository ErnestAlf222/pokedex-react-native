import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  effects,
  fontSize,
  fontWeight,
  formatMultiplier,
  getTypeLabel,
  isHighlightedMultiplier,
  spacing,
} from '../../core';
import { TypeMultiplier } from '../../domain';
import { TypeIcon } from './type-icon';

// Celda de la matriz: ícono del tipo y su multiplicador debajo; los ×1 se atenúan y el resto se destaca.
export const EffectivenessCell = ({ type, multiplier }: TypeMultiplier) => {
  const isHighlighted = isHighlightedMultiplier(multiplier);

  return (
    <View
      accessibilityLabel={`${getTypeLabel(type)} ${formatMultiplier(multiplier)}`}
      style={[styles.cell, !isHighlighted && styles.dimmed]}>
      <TypeIcon type={type} />
      <Text style={[styles.multiplier, isHighlighted && styles.highlighted]}>
        {formatMultiplier(multiplier)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: { alignItems: 'center', gap: spacing.xs },
  dimmed: { opacity: effects.neutralTypeOpacity },
  multiplier: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
  },
  highlighted: { fontWeight: fontWeight.bold, color: colors.textPrimary },
});
