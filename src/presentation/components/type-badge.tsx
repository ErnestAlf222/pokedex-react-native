import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  effects,
  fontSize,
  fontWeight,
  getReadableTextColor,
  getTypeColor,
  getTypeLabel,
  radius,
  spacing,
  withAlpha,
} from '../../core';

interface TypeBadgeProps {
  type: string;
  compact?: boolean;
  glass?: boolean;
}

// Etiqueta con el nombre del tipo: compacta o translúcida (sobre el degradado de ese mismo tipo); el texto se adapta al color para leerse bien.
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
    <Text
      style={[
        styles.label,
        compact && styles.labelCompact,
        { color: glass ? colors.onGradient : getReadableTextColor(getTypeColor(type)) },
      ]}>
      {getTypeLabel(type)}
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
