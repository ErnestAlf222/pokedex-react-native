import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  POKEBALL_ICON_NAME,
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  sizes,
  spacing,
} from '../../core';

// Cabecera propia del listado: icono de Pokéball y título grande respetando el status bar.
export const ScreenHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <MaterialIcons
        name={POKEBALL_ICON_NAME}
        size={sizes.headerIcon}
        color={colors.primary}
      />
      <Text accessibilityRole="header" style={styles.title}>
        {UI_MESSAGES.listTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
