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
  compact?: boolean;
}

// Etiqueta con el nombre del tipo sobre el color de ese tipo; admite variante compacta.
export const TypeBadge = ({ type, compact = false }: TypeBadgeProps) => (
  <View
    style={[
      styles.badge,
      compact && styles.badgeCompact,
      { backgroundColor: getTypeColor(type) },
    ]}>
    <Text style={[styles.label, compact && styles.labelCompact]}>
      {formatSlug(type)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  badgeCompact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  label: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
  labelCompact: { fontSize: fontSize.tiny },
});
