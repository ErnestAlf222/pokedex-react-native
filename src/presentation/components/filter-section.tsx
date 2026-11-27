import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../core';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

// Sección del panel de filtros: título y sus opciones en filas que saltan de línea.
export const FilterSection = ({ title, children }: FilterSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.options}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  section: { marginTop: spacing.md },
  title: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
