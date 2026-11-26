import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../core';

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

// Sección del detalle: título y contenido con el espaciado común.
export const DetailSection = ({ title, children }: DetailSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: { marginTop: spacing.lg },
  title: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});
