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

interface InfoItemProps {
  label: string;
  value: string;
  tint?: string;
}

// Dato con su etiqueta; con tint se muestra como tarjeta con ese color suave de fondo.
export const InfoItem = ({ label, value, tint }: InfoItemProps) => (
  <View
    style={[
      styles.item,
      tint !== undefined && [
        styles.card,
        { backgroundColor: withAlpha(tint, effects.softTintOpacity) },
      ],
    ]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: { marginBottom: spacing.md },
  card: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  label: { fontSize: fontSize.caption, color: colors.textSecondary },
  value: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
