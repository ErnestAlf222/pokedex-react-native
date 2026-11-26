import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../core';

interface InfoItemProps {
  label: string;
  value: string;
}

// Dato con su etiqueta, usado en la ficha del detalle.
export const InfoItem = ({ label, value }: InfoItemProps) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: { marginBottom: spacing.md },
  label: { fontSize: fontSize.caption, color: colors.textSecondary },
  value: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
