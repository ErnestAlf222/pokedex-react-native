import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  DetailIconName,
  colors,
  fontSize,
  fontWeight,
  radius,
  sizes,
  spacing,
} from '../../core';

interface DetailSectionProps {
  title: string;
  icon: DetailIconName;
  color: string;
  children: ReactNode;
}

// Sección del detalle: encabezado discreto con acento e ícono del color del tipo, y el contenido con el espaciado común.
export const DetailSection = ({
  title,
  icon,
  color,
  children,
}: DetailSectionProps) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <View style={[styles.accent, { backgroundColor: color }]} />
      <MaterialIcons name={icon} size={sizes.sectionIcon} color={color} />
      <Text style={styles.title}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: { marginTop: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  accent: {
    width: sizes.sectionAccentWidth,
    height: sizes.sectionAccentHeight,
    borderRadius: radius.full,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
});
