import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, Text, View } from 'react-native';
import {
  DetailIconName,
  colors,
  effects,
  fontSize,
  fontWeight,
  radius,
  sizes,
  spacing,
  withAlpha,
} from '../../core';

interface InfoItemProps {
  label: string;
  value: string;
  tint?: string;
  icon?: DetailIconName;
}

// Dato con su etiqueta; con tint se muestra como tarjeta sin elevación (evita el marco gris al animar opacidad), con fondo suave de ese color e ícono opcional.
export const InfoItem = ({ label, value, tint, icon }: InfoItemProps) => (
  <View style={[styles.item, tint !== undefined && styles.card]}>
    {tint !== undefined && (
      <View
        style={[
          styles.tint,
          { backgroundColor: withAlpha(tint, effects.softTintOpacity) },
        ]}
      />
    )}
    <View style={styles.labelRow}>
      {icon !== undefined && tint !== undefined && (
        <MaterialIcons name={icon} size={sizes.cardIcon} color={tint} />
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: { marginBottom: spacing.md },
  card: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  tint: { ...StyleSheet.absoluteFill, borderRadius: radius.md },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  label: { fontSize: fontSize.caption, color: colors.textSecondary },
  value: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
