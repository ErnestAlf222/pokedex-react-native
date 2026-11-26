import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  formatSlug,
  getTypeColor,
  radius,
  spacing,
} from '../../core';

interface TypeBadgeProps {
  type: string;
}

// Etiqueta con el nombre del tipo sobre el color de ese tipo.
export const TypeBadge = ({ type }: TypeBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
    <Text style={styles.label}>{formatSlug(type)}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
});
