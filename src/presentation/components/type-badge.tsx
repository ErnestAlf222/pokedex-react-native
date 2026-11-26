import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  effects,
  fontSize,
  fontWeight,
  formatSlug,
  getTypeColor,
  radius,
  spacing,
  withAlpha,
} from '../../core';

interface TypeBadgeProps {
  type: string;
  compact?: boolean;
  glass?: boolean;
}

// Etiqueta con el nombre del tipo: compacta o translúcida (para usarla sobre el degradado de ese mismo tipo).
export const TypeBadge = ({
  type,
  compact = false,
  glass = false,
}: TypeBadgeProps) => (
  <View
    style={[
      styles.badge,
      compact && styles.badgeCompact,
      {
        backgroundColor: glass
          ? withAlpha(colors.onGradient, effects.glassOpacity)
          : getTypeColor(type),
      },
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
